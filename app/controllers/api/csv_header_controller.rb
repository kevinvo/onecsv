require 'csv'

class Api::CsvHeaderController < ApiController
  TOTAL_LINES = 20
  SAMPLE_TOTAL_LINES = 3

  def index
    uploaded_file_path = session[:uploaded_file_path]

    csv = CSV.read(uploaded_file_path, :headers=>true, encoding: CsvConstant::ENCODING)
    header_data_types = %w(Text Number Email Date Currency).sort

    header_map = csv.headers.map do |header_name|
      top_sample_values = csv[header_name].first(TOTAL_LINES)
      clean_sample_values = top_sample_values.compact.sort
      selected_sample_values = clean_sample_values.first(SAMPLE_TOTAL_LINES)

      {header_name: header_name,
       sample_values: selected_sample_values,
       data_type: CsvDataTypeService.new(clean_sample_values).call,
       required: top_sample_values.length == clean_sample_values.length}
    end

    data = {headers: header_map}
    msg = {:status => :ok, :data => data}
    render :json => msg
  end

  def create
    # TODO: get template from input template name
    template = current_user.templates.last

    uploaded_file_path = session[:uploaded_file_path]
    csv = CSV.read(uploaded_file_path, :headers=>true, encoding: CsvConstant::ENCODING)

    headers = params["csv_headers"].each_with_index.map do |csv_header, index|
      header_name = csv_header["header_name"]
      {
        name: header_name,
        is_required_field: csv_header["required"],
        data_type: csv_header["data_type"].to_i,
        csv_columns: csv[header_name],
        position: index + 1,
        template_id: template.id
      }
    end
    Header.insert_all(headers)

    # TODO: render error and success case
    render :json => {:status => :ok}
  end
end
