# frozen_string_literal: true

class DateDirectiveDataObject
  include Virtus.model

  attribute :id, Integer
  attribute :directive, String # "%m/%d/%Y"
  attribute :sample_date, String # '02/17/2009'
  attribute :sample_format, String # MM/DD/YYYY

  def valid?(value)
    date_from_directive = Date.strptime(value, directive).strftime(directive)
    date_from_directive == value
  rescue StandardError
    false
  end
end
