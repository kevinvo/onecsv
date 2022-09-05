class ChangeDataTypeToCustomers < ActiveRecord::Migration[7.0]
  def change
    change_column :headers, :data_type, "integer USING data_type::integer"
  end
end
