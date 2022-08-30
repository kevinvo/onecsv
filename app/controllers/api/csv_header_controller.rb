require 'csv'

class Api::CsvHeaderController < ApiController

  TOTAL_LINES = 20

  def index
    uploaded_file_path = session[:uploaded_file_path]

    csv = CSV.read(uploaded_file_path, :headers=>true)
    header_map = csv.headers.map do |header_name|
      column_values = csv[header_name].compact.first(6).sort.uniq.first(3)
      {header_name: header_name,
       sample_values: column_values}
    end

    header_data_types = %w(Text Number Email Date Currency).sort
    data = {data_types: header_data_types, headers: header_map}
    msg = {:status => :ok, :data => data}
    render :json => msg

  end
end
