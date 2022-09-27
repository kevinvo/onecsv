# frozen_string_literal: true

require 'csv'

module Api
  class ContentAndValidationController < ApiController
    def index
      template_id = session[:template_id]
      template = Template.includes(template_headers: :header).find_by(id: template_id, user: current_user)
      header_map = template.template_headers.map do |template_header|
        header = template_header.header
        { header_name: header.name,
          data_type: header.read_attribute_before_type_cast(:data_type),
          required: header.is_required_field }
      end

      rows = template.template_headers.map do |template_header|
        template_header.column_values.map do |column_value|
          column_value = column_value.to_s.strip
          header = template_header.header
          type_validator_obj = TypeValidatorService.new(column_value,
                                                        header.read_attribute_before_type_cast(:data_type),
                                                        header.is_required_field).valid?
          { value: column_value,
            data_type: data_type,
            error: type_validator_obj.error_message }
        end
      end.transpose

      data = { headers: header_map, rows: rows, template: template }
      msg = { status: :ok, data: data }
      render json: msg
    end
  end
end
