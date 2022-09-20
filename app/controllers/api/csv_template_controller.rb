class Api::CsvTemplateController < ApiController
  def create
    template_name = params[:template_name]
    template = current_user.templates.create(name: template_name)
    session[:template_name] = template_name
    msg = {:status => :created, :message => "Success!", :template => template}
    render :json => msg
  end
end
