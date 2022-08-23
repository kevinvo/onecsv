class Api::CsvContentController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    uploaded_file_path = cookies[:uploaded_file_path]
    puts("uploaded_file_path = #{uploaded_file_path}")

    msg = {:status => :ok}
    render :json => msg
  end
end
