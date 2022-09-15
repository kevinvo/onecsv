
require "monetize"
require "money"
require "date"

class TypeValidatorService

  attr_reader :value, :data_type, :is_required_field, :error_message

  def initialize(value, data_type, is_required_field)
    @value = value
    @data_type = data_type
    @is_required_field = is_required_field
    @error_message = ""
  end

  def is_valid
    if @is_required_field && !@value
      return false
    end

    case @data_type
    when Header.data_types[:email]
      DataTypeValidatorService.new(@value).is_email
    when Header.data_types[:currency]
      DataTypeValidatorService.new(@value).is_currency
    when Header.data_types[:number]
      DataTypeValidatorService.new(@value).is_integer || DataTypeValidatorService.new(@value).is_float
    when Header.data_types[:date]
      DataTypeValidatorService.new(@value).is_date
    else
      true
    end

  end

end
