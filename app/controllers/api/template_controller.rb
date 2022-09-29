# frozen_string_literal: true

module Api
  class TemplateController < ApiController
    def index
      templates = current_user.templates.order(updated_at: :desc)
      template = Template.find_by(id: session[:template_id])

      json = { status: :ok, templates: templates, current_template: template }
      render json: json
    end

    def create
      # template_name = params[:template_name]
      template_name = ''
      uploaded_file_path = session[:uploaded_file_path]

      csv_headers = params['csv_headers'].map do |csv_header|
        CsvHeaderDataObject.new(required: csv_header['required'],
                                data_type: csv_header['data_type'],
                                name: csv_header['header_name'])
      end
      template = TemplateServices::CreateService.new(uploaded_file_path,
                                                     csv_headers,
                                                     current_user,
                                                     template_name).call
      session[:template_id] = template.id
      json = { status: :created, message: 'Success!', template: template }
      render json: json
    end

    def update
      template = current_user.templates.find_by(id: params[:id])
      TemplateServices::UpdateService.new(template, params['csv_headers']).call
      json = { status: :error, message: 'Error.' }
      if template
        session[:template_id] = template.id
        template.touch
        json = { status: :updated, message: 'Updated!', template: template }
      end

      render json: json
    end
  end
end
