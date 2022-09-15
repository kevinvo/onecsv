require 'csv'

class Api::CsvContentAndValidationController < ApiController

  def index
    uploaded_file_path = session[:uploaded_file_path]
    template = current_user.templates.last
    header_map = template.headers.map do |header|
      { header_name: header.name.to_s.strip,
        data_type: header.read_attribute_before_type_cast(:data_type),
        required: header.is_required_field }
    end

    look_up_via_header_name = header_map.map { |header| [header[:header_name], header] }.to_h
    csv = CSV.read(uploaded_file_path, :headers=>true, encoding: CsvConstant::ENCODING)

    rows = csv.map do |csv_objects|
      csv_objects.map do |csv_obj|
        header_name = csv_obj.first.to_s.strip
        column_value = csv_obj.last.to_s.strip

        data_type = look_up_via_header_name[header_name][:data_type]
        is_required_field = look_up_via_header_name[header_name][:required]
        type_validator_obj = TypeValidatorService.new(column_value, data_type, is_required_field).is_valid

        { value: column_value,
          data_type: data_type,
          error: type_validator_obj.error_message }
      end
    end

    data = {headers: header_map, rows: rows}
    msg = {:status => :ok, :data => data}
    render :json => msg
  end
end
