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
      selected_sample_values = clean_sample_values.first(3)

      {header_name: header_name,
       sample_values: selected_sample_values,
       data_type: CsvDataTypeService.new(selected_sample_values).call,
       required: top_sample_values.length == clean_sample_values.length}
    end

    data = {data_types: header_data_types, headers: header_map}
    msg = {:status => :ok, :data => data}
    render :json => msg
  end

  def create
    params["csv_headers"].each do |csv_header|
      Header.new.tap do |header|
        # TODO: temporarily adding
        template = Template.create!(user_id: 1)
        header.template_id = template.id
        # TODO: temporarily adding
        header.name = csv_header["header_name"]
        header.is_required_field = csv_header["required"]
        header.data_type = csv_header["data_type"]
        header.save!
      end
    end

    # TODO: render error and success case
    render :json => {:status => :ok}
  end
end
