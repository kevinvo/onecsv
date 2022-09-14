class Header < ApplicationRecord
  belongs_to :template

  enum data_type: %i[date currency email number text]
  
  scope :required, -> { where(is_required_field: true ) }
  scope :optional, -> { where(is_required_field: false ) }

end
