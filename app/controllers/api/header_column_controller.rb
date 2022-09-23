class Api::HeaderColumnController < ApiController

  def create

    template_name = session[:template_name]
    column_value = params["value"]
    header_name = params["header_name"]
    header = current_user.templates.find_by(name: template_name).headers.find_by(name: header_name)
    header.csv_columns[params["index"]] = column_value
    header.save!

    type_validator_obj = TypeValidatorService.new(column_value=column_value,
                                                  data_type=header.read_attribute_before_type_cast(:data_type),
                                                  is_required_field=header.is_required_field).is_valid
    render :json => {:status => :updated, error: type_validator_obj.error_message}
  end

end
