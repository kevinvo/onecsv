require 'csv'

class Api::CsvContentAndValidationController < ApiController

  def index
    uploaded_file_path = session[:uploaded_file_path]

    csv = CSV.read(uploaded_file_path, :headers=>true, encoding: CsvConstant::ENCODING)

    header_map = csv.headers.map do |header_name|
      {header_name: header_name.to_s.strip,
       data_type: CsvDataTypeService.new([]).call,
       required: false
      }
    end

    # look_up_via_header_name = header_map.map { |header| [header[:header_name], header] }.to_h

    rows = csv.map do |values|
      values.map do |value|
        # data_type = look_up_via_header_name[value.first.to_s.strip][:data_type]
        # puts "data_type = #{data_type}"
        {value: value.last.to_s.strip,
         error: "We are expecting a date but this field is a number!",
         warning: "not so bad!"}
      end
    end

    data = {headers: header_map, rows: rows}
    msg = {:status => :ok, :data => data}
    render :json => msg
  end
end
