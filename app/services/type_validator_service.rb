# frozen_string_literal: true

class TypeValidatorService
  attr_reader :value, :data_type, :is_required_field, :error_message

  def initialize(value, data_type, is_required_field)
    @value = value
    @data_type = data_type
    @is_required_field = is_required_field
    @error_message = ''
  end

  def valid?
    if @is_required_field && @value.to_s.empty?
      @error_message = 'This field is required.'
      return self
    end

    case @data_type
    when Header.data_types[:email]
      valid_email?
    when Header.data_types[:currency]
      valid_currency?
    when Header.data_types[:number]
      valid_number?
    when Header.data_types[:date]
      valid_date?
    else
      true
    end

    self
  end

  private

  def valid_email?
    DataTypeValidatorService.new(@value).email?.tap do |is_valid|
      @error_message = 'Invalid email.' unless is_valid
    end
  end

  def valid_currency?
    DataTypeValidatorService.new(@value).currency?.tap do |is_valid|
      @error_message = 'Invalid currency.' unless is_valid
    end
  end

  def valid_number?
    (DataTypeValidatorService.new(@value).integer? || DataTypeValidatorService.new(@value).float?).tap do |is_valid|
      @error_message = 'Invalid number.' unless is_valid
    end
  end

  def valid_date?
    DataTypeValidatorService.new(@value).date?.tap do |is_valid|
      @error_message = 'Invalid date.' unless is_valid
    end
  end
end
