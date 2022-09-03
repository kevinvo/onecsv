
module Services
  class CsvDataTypeServices

    attr_reader :str

    def initialize(str)
      @str = str
    end

    def call
      Constants.EMAIL
    end

  end
end