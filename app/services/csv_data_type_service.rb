# frozen_string_literal: true

class CsvDataTypeService < ApplicationService
  ACCURACY = 1
  attr_reader :values

  def initialize(values)
    @values = values
  end

  def call
    if email?
      Header.data_types[:email]
    elsif currency?
      Header.data_types[:currency]
    elsif integer? || float?
      Header.data_types[:number]
    elsif date?
      Header.data_types[:date]
    else
      Header.data_types[:text]
    end
  end

  private

  def date?
    @values.map { |value| DataTypeValidatorService.new(value).date? }.select(&:itself).length > ACCURACY
  end

  def email?
    @values.map { |value| DataTypeValidatorService.new(value).email? }.select(&:itself).length > ACCURACY
  end

  def currency?
    @values.map { |value| DataTypeValidatorService.new(value).currency? }.select { |value| value }.length > ACCURACY
  end

  def integer?
    @values.map { |value| DataTypeValidatorService.new(value).integer? }.select(&:itself).length > ACCURACY
  end

  def float?
    @values.map { |value| DataTypeValidatorService.new(value).float? }.select(&:itself).length > ACCURACY
  end
end
