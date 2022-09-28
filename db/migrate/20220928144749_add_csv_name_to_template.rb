class AddCsvNameToTemplate < ActiveRecord::Migration[7.0]
  def change
    add_column :templates, :csv_name, :string
  end
end
