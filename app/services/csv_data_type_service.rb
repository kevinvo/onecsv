class CsvDataTypeService < ApplicationService

  ACCURACY = 1
  attr_reader :values

  def initialize(values)
    @values = values
  end

  def call
    if self.is_email
      Header.data_types[:email]
    elsif self.is_currency
      Header.data_types[:currency]
    elsif self.is_integer or self.is_float
      Header.data_types[:number]
    elsif self.is_date
      Header.data_types[:date]
    else
      Header.data_types[:text]
    end
  end

  private

  def is_date
    @values.map {|value| DataTypeValidatorService.new(value).is_date }.select(&:itself).length > ACCURACY
  end

  def is_email
    @values.map {|value| DataTypeValidatorService.new(value).is_email}.select(&:itself).length > ACCURACY
  end

  def is_currency
    @values.map {|value| DataTypeValidatorService.new(value).is_currency}.select{|value| value}.length > ACCURACY
  end

  def is_integer
    @values.map {|value| DataTypeValidatorService.new(value).is_integer}.select(&:itself).length > ACCURACY
  end

  def is_float
    @values.map {|value|DataTypeValidatorService.new(value).is_float}.select(&:itself).length > ACCURACY
  end

end
