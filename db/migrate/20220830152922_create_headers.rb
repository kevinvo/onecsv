class CreateHeaders < ActiveRecord::Migration[7.0]
  def change
    create_table :headers do |t|
      t.references :template, null: false, foreign_key: true

      t.timestamps
    end
  end
end
