class Api::CsvTemplateController < ApiController
  def create
    template_name = params[:template_name]

    if session[:template_name]
      template = current_user.templates.find_by(name: session[:template_name])
      template.update(name: template_name)
      session[:template_name] = template.name
    else
      template = current_user.templates.create(name: template_name)
      session[:template_name] = template_name
    end

    msg = {:status => :created, :message => "Success!", :template => template}
    render :json => msg
  end
end
