
require "monetize"
require "money"
require "chronic"

class DataTypeValidatorService

  attr_reader :value

  def initialize(value)
    @value = value
  end

  def is_date
    self.is_value_a_date(@value)
  end

  def is_email
    !!URI::MailTo::EMAIL_REGEXP.match(@value)
  end

  def is_currency
    Money::Currency.analyze(@value).length > 0 ? !!Monetize.parse(@value) : false
  end

  def is_integer
    !!Integer(value, exception: false)
  end

  def is_float
    !!Float(value, exception: false)
  end

  private

  def is_value_a_date(val)
    !!Chronic.parse(val)
  end

end
