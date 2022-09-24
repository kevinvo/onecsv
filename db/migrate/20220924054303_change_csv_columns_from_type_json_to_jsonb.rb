class ChangeCsvColumnsFromTypeJsonToJsonb < ActiveRecord::Migration[7.0]
  def change
    change_column :headers, :csv_columns, :jsonb
  end
end
