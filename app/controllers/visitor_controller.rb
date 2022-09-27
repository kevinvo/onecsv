# frozen_string_literal: true

class VisitorController < ApplicationController
  before_action :authenticate_user!

  def index; end
end
