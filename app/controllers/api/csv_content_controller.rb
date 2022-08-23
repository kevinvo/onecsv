class Api::CsvContentController < ApiController

  def index
    uploaded_file_path = session[:uploaded_file_path]

    msg = {:status => :ok}
    render :json => msg
  end
end
