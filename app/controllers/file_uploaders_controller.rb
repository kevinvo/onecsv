class FileUploadersController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    new_file = params[:file]
    File.open(Rails.root.join('tmp', new_file.original_filename), 'wb') do |file|
      file.write(new_file.read)
    end

    msg = {:status => :created, :message => "Success!"}
    render :json => msg

  end

  private

    # Only allow a list of trusted parameters through.
    def file_uploader_params
      params.fetch(:file, {})
    end
end
