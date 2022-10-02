# frozen_string_literal: true

class DateValidatorService < ApplicationService
  # https://www.shortcutfoo.com/app/dojos/ruby-date-format-strftime/cheatsheet
  DATE_DIRECTIVES = [
    DateDirectiveDataObject.new(id: 1,
                                directive: '%m/%d/%Y',
                                sample_date: '02/17/2009',
                                sample_format: 'MM/DD/YYYY'),
    DateDirectiveDataObject.new(id: 2,
                                directive: '%Y-%m-%d',
                                sample_date: '2009-02-17',
                                sample_format: 'YYYY-MM-DD'),

    DateDirectiveDataObject.new(id: 3,
                                directive: '%Y/%m/%d',
                                sample_date: '2009/02/17',
                                sample_format: 'YYYY/MM/DD'),
    DateDirectiveDataObject.new(id: 4,
                                directive: '%Y-%m-%d',
                                sample_date: '2009-02-17',
                                sample_format: 'YYYY-MM-DD'),

    DateDirectiveDataObject.new(id: 5,
                                directive: '%b %Y',
                                sample_date: 'Jul 2022',
                                sample_format: 'MM YYYY'),
    DateDirectiveDataObject.new(id: 6,
                                directive: '%^b %Y',
                                sample_date: 'JUL 2022',
                                sample_format: 'MM YYYY'),

    DateDirectiveDataObject.new(id: 7,
                                directive: '%B %Y',
                                sample_date: 'July 2022',
                                sample_format: 'MM YYYY'),
    DateDirectiveDataObject.new(id: 8,
                                directive: '%^B %Y',
                                sample_date: 'JULY 2022',
                                sample_format: 'MM YYYY')

  ].freeze

  attr_reader :value, :date_directive

  def initialize(value)
    @value = value
  end

  def self.from_values(column_values)
    column_values.map do |val|
      DateValidatorService.new(val).call.date_directive
    end.compact.group_by(&:id).values.max_by(&:size).to_a.first
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
