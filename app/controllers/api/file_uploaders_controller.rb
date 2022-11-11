# frozen_string_literal: true

require 'csv'

module Api
  TOTAL_COUNT = 100
  SAMPLE_COUNT = 20

  class FileUploadersController < ApiController
    def create
      new_file = params[:file]
      uploaded_file_path = Rails.root.join('tmp', new_file.original_filename)
      File.open(uploaded_file_path, 'wb') { |file| file.write(new_file.read) }
      csv = CSV.read(uploaded_file_path, headers: true, encoding: CsvConstant::ENCODING)

      csv_header_data_objects = csv.headers.map do |header_name|
        top_sample_values = csv[header_name].first(TOTAL_COUNT)
        clean_sample_values = top_sample_values.compact.sort.first(SAMPLE_COUNT)
        csv_data_type_obj = CsvDataTypeService.new(clean_sample_values, header_name).call
        CsvHeaderDataObject.new(required: top_sample_values.length == clean_sample_values.length,
                                data_type: csv_data_type_obj.data_type,
                                name: header_name)
      end
      template = TemplateServices::CreateService.new(uploaded_file_path: uploaded_file_path,
                                                     csv_headers: csv_header_data_objects,
                                                     current_user: current_user,
                                                     template_name: '').()

      session[:template_id] = template.id
      render json: { status: :created, message: 'Success!' }
    end
  end
end
