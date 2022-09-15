class Api::CsvTemplateController < ApiController
  def create
    current_user.templates.create(name: params[:template_name])
    msg = {:status => :created, :message => "Success!"}
    render :json => msg
  end
end
