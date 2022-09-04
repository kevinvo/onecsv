class CsvDataTypeService < ApplicationService

  attr_reader :values

  def initialize(values)
    @values = values
  end

  def call
    DataTypeConstant::EMAIL
  end
end
