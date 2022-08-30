require 'csv'

class Api::CsvContentController < ApiController
  TOTAL_LINES = 20

  def index
    uploaded_file_path = session[:uploaded_file_path]
    lines = [].tap do |lines|
      File.open(uploaded_file_path, "r:ISO-8859-1:UTF-8").first(TOTAL_LINES).each.with_index(1) do |line|
        per_line = line.split(/\t/).first
        values = CSV.parse(per_line).first
        lines << values.map { |value| value.to_s.strip}
      end
    end

    msg = {:status => :ok, :data => lines}
    render :json => msg
  end
end
