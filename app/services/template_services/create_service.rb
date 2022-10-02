# frozen_string_literal: true

module TemplateServices
  class CreateService < ApplicationService
    def initialize(uploaded_file_path, csv_headers, current_user, template_name = '')
      @uploaded_file_path = uploaded_file_path
      @csv_headers = csv_headers
      @template_name = template_name
      @current_user = current_user
    end

    def call
      create_template.tap do |template|
        csv_headers = create_headers
        create_template_headers(template, csv_headers)
      end
    end

    private

    def create_template
      slug = Random.uuid.to_s.parameterize
      @current_user.templates.create(name: @template_name,
                                     created_by: Template.created_bies[:user],
                                     csv_name: csv_filename,
                                     slug: slug)
    end

    def csv_filename
      @csv_filename ||= File.basename(@uploaded_file_path, '.*')
    end

    def create_template_headers(template, csv_headers)
      csv_headers.map do |header|
        TemplateHeader.create(header: header, template: template, column_values: csv[header.name])
      end
    end

    def create_headers
      @csv_headers.each_with_index.map do |csv_header, index|
        header_name = StringService.new(csv_header.name).to_ascii
        Header.create!(name: header_name,
                       is_required_field: csv_header.required,
                       position: index + 1,
                       data_type: csv_header.data_type.to_i)
      end
    end

    def csv
      @csv ||= CSV.read(@uploaded_file_path, headers: true, encoding: CsvConstant::ENCODING)
    end
  end
end
