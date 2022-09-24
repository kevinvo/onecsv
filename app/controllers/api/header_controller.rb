require 'csv'

class Api::HeaderController < ApiController
  TOTAL_LINES = 20
  SAMPLE_TOTAL_LINES = 3

  def index
    template_name = session[:template_name].to_s
    puts "template_name = #{template_name}"

    header_map = []
    if template_name.empty?
      uploaded_file_path = session[:uploaded_file_path]
      csv = CSV.read(uploaded_file_path, :headers=>true, encoding: CsvConstant::ENCODING)
      header_map = csv.headers.map do |header_name|
        top_sample_values = csv[header_name].first(TOTAL_LINES)
        clean_sample_values = top_sample_values.compact.sort
        selected_sample_values = clean_sample_values.first(SAMPLE_TOTAL_LINES)

        {header_name: header_name,
         sample_values: selected_sample_values,
         data_type: CsvDataTypeService.new(clean_sample_values).call,
         required: top_sample_values.length == clean_sample_values.length}
      end
    else
      template = current_user.templates.find_by(name: template_name)
      header_map = template.headers.sort_by_position.map do |header|
        {header_name: header.name,
         sample_values: header.csv_columns.sample(3),
         data_type: header.read_attribute_before_type_cast(:data_type),
         required: header.is_required_field}
        end
    end

    data = {headers: header_map}
    msg = {:status => :ok, :data => data}
    render :json => msg
  end

  def create
    template_name = session[:template_name]
    template = current_user.templates.find_by(name: template_name)
    header_names = params["csv_headers"].map{|csv_header| csv_header["header_name"]}
    headers = Header.where(name: header_names, template_id: template.id)

    header_hashes = headers.map { |header| [header.name, header] }.to_h
    uploaded_file_path = session[:uploaded_file_path]
    csv = CSV.read(uploaded_file_path, :headers=>true, encoding: CsvConstant::ENCODING)

    headers = params["csv_headers"].each_with_index.map do |csv_header, index|
      header_name = csv_header["header_name"]
      header = header_hashes[header_name]
      id_hash = header ? {id: header.id} : {}
      csv_columns_hash = header ? {csv_columns: header.csv_columns} : {csv_columns: csv[header_name]}
      position_hash = header ? {position: header.position} : {position: index + 1}

      {
        name: header_name,
        is_required_field: csv_header["required"],
        data_type: csv_header["data_type"].to_i,
        csv_columns: csv_columns_hash,
        template_id: template.id
      }.merge(id_hash).merge(csv_columns_hash).merge(position_hash)

    end
    Header.upsert_all(headers)

    # TODO: render error and success case
    render :json => {:status => :ok}
  end
end
