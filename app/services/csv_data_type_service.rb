class CsvDataTypeService

  attr_reader :str

  def initialize(str)
    @str = str
  end

  def call
    DataTypeConstant::EMAIL
  end
end
