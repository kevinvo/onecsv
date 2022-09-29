# frozen_string_literal: true

module TemplateServices
  class CreateService < ApplicationService

    #https://stackoverflow.com/a/9420531/1103087
    ENCODING_OPTIONS = {
      :invalid           => :replace,  # Replace invalid byte sequences
      :undef             => :replace,  # Replace anything not defined in ASCII
      :replace           => '',        # Use a blank for those replacements
      :universal_newline => true       # Always break lines with \n
    }

    def initialize(uploaded_file_path, csv_headers, current_user, template_name = '')
      @uploaded_file_path = uploaded_file_path
      @csv_headers = csv_headers
      @template_name = template_name
      @current_user = current_user
    end

    def call
      create_template.tap do |template|
        csv_headers = create_csv_headers
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
      csv = CSV.read(@uploaded_file_path, headers: true, encoding: CsvConstant::ENCODING)
      csv_headers.map do |header|
        TemplateHeader.create(header: header, template: template, column_values: csv[header.name])
      end
    end

    def create_csv_headers
      @csv_headers.each_with_index.map do |csv_header, index|
        header_name = csv_header.name.to_s.strip.encode(Encoding.find('ASCII'), **ENCODING_OPTIONS)
        Header.create!(name: header_name,
                       is_required_field: csv_header.required,
                       position: index + 1,
                       data_type: csv_header.data_type.to_i)
      end
    end
  end
end
