# frozen_string_literal: true

require 'csv'
require 'pp'

module Api
  class DuplicateCheckController < ApiController
    def index
      uploaded_file_path = session[:uploaded_file_path]
      csv = CSV.read(uploaded_file_path, headers: true, encoding: CsvConstant::ENCODING)
      clean_header_names = csv.headers.map(&:to_s).map(&:strip).map(&:downcase)
      headers = Header.includes(:templates).where('lower(headers.name) in (?)',
                                               clean_header_names).where(templates: { user: current_user })
      puts "header_count = #{headers.count}"
      puts "clean_header_names.length = #{clean_header_names.length}"
      # pp headers

      json = { status: :ok }
      render json: json
    end
  end
end
