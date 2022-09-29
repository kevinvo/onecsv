# frozen_string_literal: true

require 'csv'

module Api
  TOTAL_LINES = 20

  class FileUploadersController < ApiController
    def create
      new_file = params[:file]
      uploaded_file_path = Rails.root.join('tmp', new_file.original_filename)
      File.open(uploaded_file_path, 'wb') do |file|
        file.write(new_file.read)
      end

      csv = CSV.read(uploaded_file_path, headers: true, encoding: CsvConstant::ENCODING)
      csv_header_data_objects = csv.headers.map do |header_name|
        top_sample_values = csv[header_name].first(TOTAL_LINES)
        clean_sample_values = top_sample_values.compact.sort
        CsvHeaderDataObject.new(required: top_sample_values.length == clean_sample_values.length,
                                data_type: CsvDataTypeService.new(clean_sample_values).call,
                                name: header_name)
      end
      template_name = ''
      template = TemplateServices::CreateService.new(uploaded_file_path,
                                                     csv_header_data_objects,
                                                     current_user,
                                                     template_name).call


      session[:template_id] = template.id
      msg = { status: :created, message: 'Success!' }
      render json: msg
    end
  end
end
