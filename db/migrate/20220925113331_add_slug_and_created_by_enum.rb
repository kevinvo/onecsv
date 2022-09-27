class AddSlugAndCreatedByEnum < ActiveRecord::Migration[7.0]
  def change
    add_column :templates, :slug, :string, null: false
    add_column :templates, :created_by, :integer, null: false
    remove_column :headers, :template_id
    remove_column :headers, :csv_columns
  end
end
