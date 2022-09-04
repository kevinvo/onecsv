require 'csv'

class Api::CsvContentAndValidationController < ApiController

  def index
    uploaded_file_path = session[:uploaded_file_path]

    csv = CSV.read(uploaded_file_path, :headers=>true, encoding: "ISO-8859-1:UTF-8")

    header_map = csv.headers.map do |header_name|
      {header_name: header_name.strip,
       data_type: CsvDataTypeService.new([]).call,
       required: false
      }
    end

    rows = csv.map do |values|
      values.map do |value|
        {value: value.last.to_s.strip,
         errors: []}
      end
    end

    data = {headers: header_map, rows: rows}
    msg = {:status => :ok, :data => data}
    render :json => msg
  end
end
