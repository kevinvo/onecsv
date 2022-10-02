# frozen_string_literal: true

class HeaderMappingService < ApplicationService
  attr_reader :header_map, :column_value_error_message_lookup

  def initialize(template)
    @template = template
    @column_value_error_message_lookup = {}
  end

  def call
    @header_map = @template.template_headers.map do |template_header|
      header = template_header.header
      data_type = header.read_attribute_before_type_cast(:data_type)
      total_errors = template_header.column_values.each_with_index.map do |column_value, index|
        type_validator_obj = TypeValidatorService.new(column_value,
                                                      data_type,
                                                      header.is_required_field).valid?

        @column_value_error_message_lookup[header.id.to_s + index.to_s] = type_validator_obj.error_message
        type_validator_obj.error_message.empty? ? 0 : 1
      end.sum

      {
        header_name: header.name,
        data_type: header.read_attribute_before_type_cast(:data_type),
        required: header.is_required_field,
        total_errors: total_errors
      }
    end
    self
  rescue StandardError => e
    Rails.logger.error(e)
  end
end
