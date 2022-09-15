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
      @error_message = "This field is required."
      return self
    end

    case @data_type
    when Header.data_types[:email]
      self.is_valid_email
    when Header.data_types[:currency]
      self.is_valid_currency
    when Header.data_types[:number]
      self.is_valid_number
    when Header.data_types[:date]
      self.is_valid_date
    else
      true
    end

    self
  end

  private

  def is_valid_email
    DataTypeValidatorService.new(@value).is_email.tap do |is_valid|
      if not is_valid
        @error_message = "Invalid email."
      end
    end
  end

  def is_valid_currency
    DataTypeValidatorService.new(@value).is_currency.tap do |is_valid|
      if not is_valid
        @error_message = "Invalid currency."
      end
    end
  end

  def is_valid_number
    (DataTypeValidatorService.new(@value).is_integer || DataTypeValidatorService.new(@value).is_float).tap do |is_valid|
      if not is_valid
        @error_message = "Invalid number."
      end
    end
  end

  def is_valid_date
    DataTypeValidatorService.new(@value).is_date.tap do |is_valid|
      if not is_valid
        @error_message = "Invalid date."
      end
    end
  end

end
