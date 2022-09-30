# frozen_string_literal: true

require 'csv'

module Api
  class ContentAndValidationController < ApiController
    def index
      template_id = session[:template_id]
      template = Template.by_template_and_user(template_id, current_user)

      column_value_error_message_lookup = {}
      header_map = template.template_headers.map do |template_header|
        header = template_header.header
        data_type = header.read_attribute_before_type_cast(:data_type)
        total_errors = template_header.column_values.each_with_index.map do |column_value, index|
          type_validator_obj = TypeValidatorService.new(column_value,
                                                        data_type,
                                                        header.is_required_field).valid?

          column_value_error_message_lookup[header.id.to_s + index.to_s] = type_validator_obj.error_message
          type_validator_obj.error_message.empty? ? 0 : 1
        end.sum

        { header_name: header.name,
          data_type: header.read_attribute_before_type_cast(:data_type),
          required: header.is_required_field,
          total_errors: total_errors }
      end

      rows = template.template_headers.map do |template_header|
        template_header.column_values.each_with_index.map do |column_value, index|
          column_value = column_value.to_s.strip
          header = template_header.header
          data_type = header.read_attribute_before_type_cast(:data_type)
          error_message = column_value_error_message_lookup[header.id.to_s + index.to_s]

          { value: column_value,
            data_type: data_type,
            error: error_message }
        end
      end.transpose

      render json: { status: :ok, headers: header_map, rows: rows, template: template }
    end
  end
end
