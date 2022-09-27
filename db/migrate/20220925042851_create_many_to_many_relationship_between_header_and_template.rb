class CreateManyToManyRelationshipBetweenHeaderAndTemplate < ActiveRecord::Migration[7.0]
  def change
    create_table :template_headers do |t|
      t.timestamps
      t.belongs_to :template
      t.belongs_to :header
      t.column :column_values, :jsonb
    end
    add_index :template_headers, [:template_id, :header_id], unique: true

  end
end
