class Header < ApplicationRecord
  belongs_to :template

  enum data_type: %i[date currency email number text]
end
