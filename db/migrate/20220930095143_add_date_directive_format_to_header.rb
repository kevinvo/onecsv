class AddDateDirectiveFormatToHeader < ActiveRecord::Migration[7.0]
  def change
    add_column :headers, :date_directive_format, :string
  end
end
