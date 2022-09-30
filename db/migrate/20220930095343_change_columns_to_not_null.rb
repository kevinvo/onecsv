class ChangeColumnsToNotNull < ActiveRecord::Migration[7.0]
  def change
    change_column :templates, :csv_name, :string, null: false
    change_column :templates, :name, :string, null: false
    change_column :templates, :slug, :string, null: false

    change_column :headers, :data_type, :integer, null: false
    change_column :headers, :name, :string, null: false
    change_column :headers, :is_required_field, :boolean, null: false

    change_column :template_headers, :column_values, :jsonb, null: false
  end

end
