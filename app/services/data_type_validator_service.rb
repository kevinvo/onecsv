# frozen_string_literal: true

require 'monetize'
require 'money'
require 'chronic'

class DataTypeValidatorService
  attr_reader :value

  def initialize(value)
    @value = value
  end

  def date?
    value_a_date?(@value)
  end

  def email?
    !!URI::MailTo::EMAIL_REGEXP.match(@value)
  end

  def currency?
    Money::Currency.analyze(@value).length.positive? ? !!Monetize.parse(@value) : false
  end

  def integer?
    !!Integer(value, exception: false)
  end

  def float?
    !!Float(value, exception: false)
  end

  private

  def value_a_date?(val)
    !!Chronic.parse(val)
  end
end
