require 'csv'
# require 'services/csv_header'

class Api::CsvHeaderController < ApiController

  TOTAL_LINES = 40

  def index
    uploaded_file_path = session[:uploaded_file_path]

    lines = File.open(uploaded_file_path, "r:ISO-8859-1:UTF-8").first(TOTAL_LINES)
    header_line = lines.first
    per_line = header_line.split(/\t/).first
    # puts("per_line = #{per_line}")

    values = CSV.parse(per_line).first.map { |value| value.to_s.strip}
    # puts("values = #{values}")

    value_map = values.map do |value, my_hash|
      {value: value}
    end

    puts "value_map = #{value_map}"

    msg = {:status => :ok, :data => value_map}
    render :json => msg

  end
end
