# frozen_string_literal: true

class DateValidatorService < ApplicationService
  # https://www.shortcutfoo.com/app/dojos/ruby-date-format-strftime/cheatsheet
  DATE_DIRECTIVES = [
    DateDirectiveDataObject.new(id: 1,
                                directive: '%m/%d/%Y',
                                sample_value: '02/17/2009',
                                sample_format: 'MM/DD/YYYY'),

    DateDirectiveDataObject.new(id: 2,
                                directive: '%Y-%m-%d',
                                sample_value: '2009-02-17',
                                sample_format: 'YYYY-MM-DD'),

    DateDirectiveDataObject.new(id: 3,
                                directive: '%Y/%m/%d',
                                sample_value: '2009/02/17',
                                sample_format: 'YYYY/MM/DD'),
    DateDirectiveDataObject.new(id: 4,
                                directive: '%Y-%m-%d',
                                sample_value: '2009-02-17',
                                sample_format: 'YYYY-MM-DD'),

    DateDirectiveDataObject.new(id: 5,
                                directive: '%b %Y',
                                sample_value: 'Jul 2022',
                                sample_format: 'MM YYYY'),
    DateDirectiveDataObject.new(id: 6,
                                directive: '%^b %Y',
                                sample_value: 'JUL 2022',
                                sample_format: 'MM YYYY'),

    DateDirectiveDataObject.new(id: 7,
                                directive: '%B %Y',
                                sample_value: 'July 2022',
                                sample_format: 'MM YYYY'),
    DateDirectiveDataObject.new(id: 8,
                                directive: '%^B %Y',
                                sample_value: 'JULY 2022',
                                sample_format: 'MM YYYY')

  ].freeze

  attr_reader :value, :date_directive

  def initialize(value)
    @value = value
  end

  def call
    match_date_directive = DATE_DIRECTIVES.detect do |date_directive|
      date_directive.valid?(@value)
    end

    begin
      @date_directive = match_date_directive if !Chronic.parse(@value).nil? && !match_date_directive.nil?
    rescue StandardError
      @date_directive = nil
    end
    self
  end
end