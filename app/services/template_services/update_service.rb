# frozen_string_literal: true

module TemplateServices
  class UpdateService < ApplicationService
    def initialize(template:, csv_headers:)
      @template = template
      @csv_headers = csv_headers
    end

    def call
      headers.each do |header|
        csv_header = @csv_headers.find { |csv_header| csv_header['header_name'].to_s.strip == header.name }
        data_type = csv_header['data_type'].to_i
        is_required_field = csv_header['required']
        header.update!(data_type: data_type, is_required_field: is_required_field)
      end
      @template.touch
    end

    private

    def headers
      header_names = @csv_headers.map { |csv_header| csv_header['header_name'].to_s.strip }
      Header.joins(:templates).where(templates: { id: @template }).where(headers: { name: header_names })
    end
  end
end
