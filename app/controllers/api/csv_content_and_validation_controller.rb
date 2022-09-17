require 'csv'

class Api::CsvContentAndValidationController < ApiController

  def index
    template = current_user.templates.last
    header_map = template.headers.map do |header|
      { header_name: header.name.to_s.strip,
        data_type: header.read_attribute_before_type_cast(:data_type),
        required: header.is_required_field }
    end

    rows = template.headers.map do |header|
      header.csv_columns.map do |column_value|
        type_validator_obj = TypeValidatorService.new(column_value=column_value,
                                                      data_type=header.read_attribute_before_type_cast(:data_type),
                                                      is_required_field=header.is_required_field).is_valid
        { value: column_value.to_s,
          data_type: data_type,
          error: type_validator_obj.error_message }
      end
    end.transpose

    data = {headers: header_map, rows: rows}
    msg = {:status => :ok, :data => data}
    render :json => msg
  end
end
