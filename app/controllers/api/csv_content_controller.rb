class Api::CsvContentController < ApiController

  def index
    uploaded_file_path = session[:uploaded_file_path]
    lines = [].tap do |lines|
      File.open(uploaded_file_path, "r").each_line.with_index(1) do |line, index|
        data = line.split(/\t/)
        lines.append(data)
        if index == 10
          break
        end

      end
    end

    msg = {:status => :ok, :data => lines}
    render :json => msg
  end
end
