class AddCsvColumnToHeaders < ActiveRecord::Migration[7.0]
  def change
    add_column :headers, :csv_columns, :json
  end
end
