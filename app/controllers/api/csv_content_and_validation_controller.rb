require 'csv'

class Api::CsvContentAndValidationController < ApiController

  def index
    uploaded_file_path = session[:uploaded_file_path]

    csv = CSV.read(uploaded_file_path, :headers=>true, encoding: "ISO-8859-1:UTF-8")
    header_data_types = %w(Text Number Email Date Currency).sort

    header_map = csv.headers.map do |header_name|
      {header_name: header_name,
       data_type: header_data_types.sample,
       required: false
      }
    end

    rows = csv.map do |values|
      values.map do |value|
        {value: value.last.to_s.strip,
         errors: [CsvDataTypeServices.new("abc").call]}
      end
    end

    data = {headers: header_map, rows: rows}
    msg = {:status => :ok, :data => data}
    render :json => msg
  end
end
