# frozen_string_literal: true

module Api
  class HeaderColumnController < ApiController
    def create
      template_id = session[:template_id]
      column_value = params['value']
      header_name = params['header_name']
      column_value_index = params['index']

      header = Header.where(template_headers: { template_id: template_id },
                            templates: { user: current_user })
                     .joins(:templates)
                     .find_by(name: header_name)
      template_header = TemplateHeader.find_by(template_id: template_id, header_id: header.id)
      template_header.column_values[column_value_index] = column_value
      template_header.save!

      header = template_header.header
      type_validator_obj = TypeValidatorService.new(column_value,
                                                    header.read_attribute_before_type_cast(:data_type),
                                                    header.is_required_field).valid?
      render json: { status: :updated, error: type_validator_obj.error_message }
    end
  end
end
