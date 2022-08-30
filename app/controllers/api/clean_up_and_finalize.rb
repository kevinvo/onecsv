class Api::CleanUpAndFinalizeController < ApiController

  def index
    uploaded_file_path = session[:uploaded_file_path]

    msg = {:status => :ok, :data => {}}
    render :json => msg
  end
end
