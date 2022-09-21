class Api::HeaderColumnController < ApiController

  def create

    template_name = session[:template_name]
    header_name = params["header_name"]
    header = current_user.templates.find_by(name: template_name).headers.find_by(name: header_name)
    header.csv_columns[params["index"]] = params["value"]
    header.save!
    
    render :json => {:status => :updated}
  end

end
