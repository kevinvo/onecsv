class AddAdditionalFieldsToHeaders < ActiveRecord::Migration[7.0]
  def change
    add_column :headers, :name, :string
    add_column :headers, :is_required_field, :boolean
    add_column :headers, :data_type, :string
  end
end
