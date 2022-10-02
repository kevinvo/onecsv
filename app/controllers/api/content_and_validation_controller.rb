# frozen_string_literal: true

require 'csv'

module Api
  class ContentAndValidationController < ApiController
    def index
      header_mapping_service = HeaderMappingService.new(template, column_value_error_message_lookup)
      header_mapping_service.call
      header_map = header_mapping_service.data

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

      msg = { status: :ok, headers: header_map, rows: rows, template: template }
      render json: msg
    end

    private

    def template
      template_id = session[:template_id]
      @template ||= Template.by_template_and_user(template_id, current_user)
    end

    def column_value_error_message_lookup
      @column_value_error_message_lookup ||= {}
    end
  end
end
