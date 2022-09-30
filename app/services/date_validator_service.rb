# frozen_string_literal: true

class DateValidatorService
  attr_reader :value

  # https://www.shortcutfoo.com/app/dojos/ruby-date-format-strftime/cheatsheet
  DATE_DIRECTIVE = [
    DateDirectiveDataObject.new(directive: '%m/%d/%Y', sample_value: '02/17/2009', sample_format: 'MM/DD/YYYY'),
    DateDirectiveDataObject.new(directive: '%Y-%m-%d', sample_value: '2009-02-17', sample_format: 'YYYY-MM-DD'),

    DateDirectiveDataObject.new(directive: '%Y/%m/%d', sample_value: '2009/02/17', sample_format: 'YYYY/MM/DD'),
    DateDirectiveDataObject.new(directive: '%Y-%m-%d', sample_value: '2009-02-17', sample_format: 'YYYY-MM-DD')
  ].freeze

  def initialize(value)
    @value = value
  end

  def call
    if DataTypeValidatorService.new(@value).date?
      DATE_DIRECTIVE.detect do |date_directive|
        date_directive.valid?(@value)
      end
    end
  end
end
