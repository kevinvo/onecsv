require 'csv'

class Api::CsvHeaderController < ApiController

  TOTAL_LINES = 40

  def index
    uploaded_file_path = session[:uploaded_file_path]

    lines = File.open(uploaded_file_path, "r:ISO-8859-1:UTF-8").first(TOTAL_LINES)
    header_line = lines.first.split(/\t/).first
    header_names = CSV.parse(header_line).first.map { |value| value.to_s.strip}

    # puts "header_names = #{header_names}"
    # data_table = CSV.table(uploaded_file_path)
    # puts "data_table = #{data_table}"


    # header_names.each do |header_name|
    #   puts "header_name.to_sym = #{header_name.to_sym}"
    #   columns = data_table[header_name.to_sym]
    # end

    header_map = header_names.map do |header_name|
      {header_name: header_name,
       sample_values: %w(Text Number Email).sort}
    end

    header_data_types = %w(Text Number Email Date Currency).sort
    data = {data_types: header_data_types, headers: header_map}
    msg = {:status => :ok, :data => data}
    render :json => msg

  end
end
