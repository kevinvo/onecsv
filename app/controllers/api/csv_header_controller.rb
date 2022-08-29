require 'csv'

class Api::CsvHeaderController < ApiController

  TOTAL_LINES = 40

  def index
    uploaded_file_path = session[:uploaded_file_path]

    lines = File.open(uploaded_file_path, "r:ISO-8859-1:UTF-8").first(TOTAL_LINES)
    header_line = lines.first
    per_line = header_line.split(/\t/).first
    values = CSV.parse(per_line).first.map { |value| value.to_s.strip}

    value_map = values.map do |value, my_hash|
      {value: value}
    end

    header_data_types = %w(Text Number Email Date Currency).sort
    data = {data_types: header_data_types, headers: value_map}
    msg = {:status => :ok, :data => data}
    render :json => msg

  end
end
