# frozen_string_literal: true

require 'csv'

module Api
  class HeaderController < ApiController
    TOTAL_LINES = 20
    SAMPLE_TOTAL_LINES = 3

    def index
      template_id = session[:template_id]
      header_map = []

      if template_id
        template = Template.includes(template_headers: :header).find_by(id: template_id, user: current_user)
        header_map = template.template_headers.map do |template_header|
          header = template_header.header
          { header_name: header.name,
            sample_values: template_header.column_values.compact.sort.first(SAMPLE_TOTAL_LINES),
            data_type: header.read_attribute_before_type_cast(:data_type),
            required: header.is_required_field }
        end
      else
        uploaded_file_path = session[:uploaded_file_path]
        csv = CSV.read(uploaded_file_path, headers: true, encoding: CsvConstant::ENCODING)
        header_map = csv.headers.map do |header_name|
          top_sample_values = csv[header_name].first(TOTAL_LINES)
          clean_sample_values = top_sample_values.compact.sort
          selected_sample_values = clean_sample_values.first(SAMPLE_TOTAL_LINES)

          { header_name: header_name,
            sample_values: selected_sample_values,
            data_type: CsvDataTypeService.new(clean_sample_values).call,
            required: top_sample_values.length == clean_sample_values.length }
        end
      end

      data = { headers: header_map }
      msg = { status: :ok, data: data }
      render json: msg
    end
    
  end
end
