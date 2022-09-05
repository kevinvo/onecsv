require "monetize"
require "money"

class CsvDataTypeService < ApplicationService

  ACCURACY = 1
  attr_reader :values

  def initialize(values)
    @values = values
  end

  def call
    if self.is_email
      DataTypeConstant::EMAIL
    elsif self.is_currency
      DataTypeConstant::CURRENCY
    elsif self.is_integer or self.is_float
      DataTypeConstant::NUMBER
    else
      DataTypeConstant::TEXT
    end
  end

  private
  def is_email
    @values.map {|value| URI::MailTo::EMAIL_REGEXP.match value}.select(&:itself).length > ACCURACY
  end

  def is_currency
    currency_values = @values.map {|amount| Money::Currency.analyze(amount).length > 0 ? amount : nil}.select(&:itself)
    currency_values.map {|amount| Monetize.parse(amount)}.length > ACCURACY
  end

  def is_integer
    @values.map {|value| Integer(value, exception: false)}.select(&:itself).length > ACCURACY
  end

  def is_float
    @values.map {|value| Float(value, exception: false)}.select(&:itself).length > ACCURACY
  end

end
