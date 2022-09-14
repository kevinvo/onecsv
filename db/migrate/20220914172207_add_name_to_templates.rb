class AddNameToTemplates < ActiveRecord::Migration[7.0]
  def change
    add_column :templates, :name, :string
  end
end
