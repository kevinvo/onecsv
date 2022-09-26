class Api::TemplateController < ApiController
  def create
    template_name = params[:template_name]
    slug = "#{template_name}-#{Random.uuid()}".parameterize
    template = current_user.templates.create(name: template_name,
                                             created_by: Template.created_bies[:user],
                                             slug: slug)
    session[:template_id] = template.id

    msg = {:status => :created, :message => "Success!", :template => template}
    render :json => msg
  end

  def index
    templates = current_user.templates.order(updated_at: :desc)
    msg = {:status => :ok, :templates => templates}
    render :json => msg
  end

  def update
    template = current_user.templates.find_by(id: params[:id])

    if template
      session[:template_id] = template.id
      template.touch
      msg = {:status => :updated, :message => "Updated!", :template => template}
    else
      msg = {:status => :error, :message => "Error!"}
    end

    render :json => msg
  end
end
