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

  def index
    templates = current_user.templates
    msg = {:status => :ok, :templates => templates}
    render :json => msg
  end

  def update
    template = current_user.templates.find_by(id: params[:id])

    if template
      session[:template_name] = template.name
      msg = {:status => :updated, :message => "Updated!", :template => template}
    else
      msg = {:status => :error, :message => "Error!"}
    end

    render :json => msg
  end
end
