# frozen_string_literal: true

class CsvHeaderDataObject
  include Virtus.model

  attribute :required, Boolean
  attribute :data_type, Integer
  attribute :name, String
end
