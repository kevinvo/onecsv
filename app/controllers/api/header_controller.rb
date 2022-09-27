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

    def create
      template_id = session[:template_id]
      template = Template.includes(:headers).find_by(id: template_id, user: current_user)
      header_hashes = template.headers.index_by(&:name)

      headers = params['csv_headers'].each_with_index.map do |csv_header, index|
        header_name = csv_header['header_name'].to_s.strip
        header = header_hashes[header_name]
        id_hash = header ? { id: header.id } : {}
        position_hash = header ? { position: header.position } : { position: index + 1 }
        { name: header_name,
          is_required_field: csv_header['required'],
          data_type: csv_header['data_type'].to_i }.merge(id_hash).merge(position_hash)
      end

      header_objs = Header.upsert_all(headers, returning: %w[id name])

      uploaded_file_path = session[:uploaded_file_path]
      csv = CSV.read(uploaded_file_path, headers: true, encoding: CsvConstant::ENCODING)

      template_headers = header_objs.map do |header_obj|
        { template_id: template.id,
          header_id: header_obj['id'],
          column_values: csv[header_obj['name']] }
      end
      TemplateHeader.upsert_all(template_headers)

      # TODO: render error and success case
      render json: { status: :ok }
    end
  end
end
