
class StringService

  #https://stackoverflow.com/a/9420531/1103087
  ENCODING_OPTIONS = {
    :invalid           => :replace,  # Replace invalid byte sequences
    :undef             => :replace,  # Replace anything not defined in ASCII
    :replace           => '',        # Use a blank for those replacements
    :universal_newline => true       # Always break lines with \n
  }

  attr_reader :value

  def initialize(value)
    @value = value
  end

  def to_ascii
    @value.to_s.strip.encode(Encoding.find('ASCII'), **ENCODING_OPTIONS)
  end
end