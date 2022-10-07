# frozen_string_literal: true

require 'json'

module Api
  class TemplateController < ApiController
    SAMPLE_TOTAL_LINES = 3

    def index
      templates = current_user.templates.order(updated_at: :desc)
      template = Template.by_template_and_user(session[:template_id], current_user)

      header_map = template.template_headers.map do |template_header|
        header = template_header.header
        column_values = template_header.column_values.compact.sort
        { header_name: header.name,
          sample_values: column_values.first(SAMPLE_TOTAL_LINES).uniq,
          data_type: header.read_attribute_before_type_cast(:data_type),
          required: header.is_required_field }
      end

      render json: { status: :ok, templates: templates, current_template: template, headers: header_map }
    end

    def update
      template = current_user.templates.find_by(id: params[:id])
      TemplateServices::UpdateService.new(template, params['csv_headers']).call
      json = { status: :error, message: 'Error.' }
      if template
        session[:template_id] = template.id
        json = { status: :updated, message: 'Updated!', template: template }
      end

      render json: json
    end
  end
end
