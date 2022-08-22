class FileUploadersController < ApplicationController
  # protect_from_forgery with: :null_session
  # before_action :set_file_uploader, only: %i[ show edit update destroy ]

  # POST /file_uploaders or /file_uploaders.json
  def create
    @file_uploader = FileUploader.new(file_uploader_params)
    print(f"@file_uploader = #{@file_uploader}")
    format.json { render :show, status: :created }

  end

  private

    # Only allow a list of trusted parameters through.
    def file_uploader_params
      params.fetch(:file_uploader, {})
    end
end
