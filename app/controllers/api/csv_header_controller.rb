require 'csv'

class Api::CsvHeaderController < ApiController

  TOTAL_LINES = 20

  def index
    uploaded_file_path = session[:uploaded_file_path]

    csv = CSV.read(uploaded_file_path, :headers=>true, encoding: "r:ISO-8859-1:UTF-8")
    header_data_types = %w(Text Number Email Date Currency).sort

    header_map = csv.headers.map do |header_name|
      top_sample_values = csv[header_name].first(20)
      clean_sample_values = top_sample_values.compact.sort

      {header_name: header_name,
       sample_values: clean_sample_values.first(3),
       data_type: header_data_types.sample,
       required: top_sample_values.length == clean_sample_values.length}
    end

    data = {data_types: header_data_types, headers: header_map}
    msg = {:status => :ok, :data => data}
    render :json => msg

  end
end
