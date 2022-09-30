# frozen_string_literal: true

class DateValidatorService < ApplicationService
  attr_reader :value, :date_directive

  # https://www.shortcutfoo.com/app/dojos/ruby-date-format-strftime/cheatsheet
  DATE_DIRECTIVES = [
    DateDirectiveDataObject.new(directive: '%m/%d/%Y', sample_value: '02/17/2009', sample_format: 'MM/DD/YYYY'),
    DateDirectiveDataObject.new(directive: '%Y-%m-%d', sample_value: '2009-02-17', sample_format: 'YYYY-MM-DD'),

    DateDirectiveDataObject.new(directive: '%Y/%m/%d', sample_value: '2009/02/17', sample_format: 'YYYY/MM/DD'),
    DateDirectiveDataObject.new(directive: '%Y-%m-%d', sample_value: '2009-02-17', sample_format: 'YYYY-MM-DD'),

    DateDirectiveDataObject.new(directive: '%b %Y', sample_value: 'Jul 2022', sample_format: 'MM YYYY'),
    DateDirectiveDataObject.new(directive: '%^b %Y', sample_value: 'JUL 2022', sample_format: 'MM YYYY'),

    DateDirectiveDataObject.new(directive: '%B %Y', sample_value: 'July 2022', sample_format: 'MM YYYY'),
    DateDirectiveDataObject.new(directive: '%^B %Y', sample_value: 'JULY 2022', sample_format: 'MM YYYY')

  ].freeze

  def initialize(value)
    @value = value
  end

  def call
    @date_directive = DATE_DIRECTIVES.detect do |date_directive|
      date_directive.valid?(@value)
    end

    begin
      (!Chronic.parse(@value).nil? && !date_directive.nil?)
    rescue StandardError
      StandardError false
    end
  end
end
