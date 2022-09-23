require 'csv'

class Api::ContentAndValidationController < ApiController

  def index
    template_name = session[:template_name]
    template = current_user.templates.find_by(name: template_name)
    headers = template&.headers&.sort_by_position || []

    header_map = headers.map do |header|
      { header_name: header.name.to_s.strip,
        data_type: header.read_attribute_before_type_cast(:data_type),
        required: header.is_required_field }
    end

    rows = headers.map do |header|
      header.csv_columns.map do |column_value|
        column_value = column_value.to_s.strip
        type_validator_obj = TypeValidatorService.new(column_value=column_value,
                                                      data_type=header.read_attribute_before_type_cast(:data_type),
                                                      is_required_field=header.is_required_field).is_valid
        { value: column_value,
          data_type: data_type,
          error: type_validator_obj.error_message }
      end
    end.transpose

    data = {headers: header_map, rows: rows, template: template}
    msg = {:status => :ok, :data => data}
    render :json => msg
  end
end