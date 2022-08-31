require 'csv'

class Api::CsvContentAndTypeController < ApiController

  def index
    uploaded_file_path = session[:uploaded_file_path]

    csv = CSV.read(uploaded_file_path, :headers=>true, encoding: "r:ISO-8859-1:UTF-8")
    header_data_types = %w(Text Number Email Date Currency).sort

    header_map = csv.headers.map do |header_name|
      {header_name: header_name,
       values: csv[header_name],
       data_type: header_data_types.sample,
       required: true,
       errors: []}
    end


    msg = {:status => :ok, :data => header_map}
    render :json => msg
  end
end
