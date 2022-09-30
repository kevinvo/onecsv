# frozen_string_literal: true

class DateDirectiveDataObject
  include Virtus.model

  attribute :directive, String # "%m/%d/%Y"
  attribute :sample_value, String # '02/17/2009'
  attribute :sample_format, String # MM/DD/YYYY

  def valid?(value)
    begin
      Date.strptime(value.to_s.strip, directive)
    rescue StandardError
      return false
    end
    true
  end
end
