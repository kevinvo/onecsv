class Api::FileUploadersController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    new_file = params[:file]
    uploaded_file_path = Rails.root.join('tmp', new_file.original_filename)
    File.open(uploaded_file_path, 'wb') do |file|
      file.write(new_file.read)
    end

    puts("FileUploadersController uploaded_file_path = #{uploaded_file_path}")
    cookies[:uploaded_file_path] = uploaded_file_path
    msg = {:status => :created, :message => "Success!"}
    render :json => msg
  end

end
