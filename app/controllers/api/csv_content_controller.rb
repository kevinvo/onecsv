require 'csv'

class Api::CsvContentController < ApiController
  def index
    uploaded_file_path = session[:uploaded_file_path]
    lines = [].tap do |lines|
      File.open(uploaded_file_path, "r:ISO-8859-1:UTF-8").first(40).each.with_index(1) do |line|
        per_line = line.split(/\t/)[0]
        values = CSV.parse(per_line)
        lines << values[0]
      end
    end

    msg = {:status => :ok, :data => lines}
    render :json => msg
  end
end
