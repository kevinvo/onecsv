# frozen_string_literal: true

class CsvDataTypeService < ApplicationService
  ACCURACY = 0
  attr_reader :values, :header_name, :data_type

  def initialize(values, header_name)
    @values = values
    @header_name = header_name
    @data_type = data_type
  end

  def call
    if @values.length.zero?
      has_date = @header_name.to_s.downcase.include? 'date'
      @data_type = has_date ? Header.data_types[:date] : Header.data_types[:text]
    elsif email?
      @data_type = Header.data_types[:email]
    elsif currency?
      @data_type = Header.data_types[:currency]
    elsif integer? || float?
      @data_type = Header.data_types[:number]
    elsif date?
      @data_type = Header.data_types[:date]
    else
      @data_type = Header.data_types[:text]
    end
    self
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
