class AddPositionToHeader < ActiveRecord::Migration[7.0]
  def change
    add_column :headers, :position, :integer
  end
end
