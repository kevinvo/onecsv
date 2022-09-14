# == Schema Information
#
# Table name: headers
#
#  id                :bigint           not null, primary key
#  data_type         :integer
#  is_required_field :boolean
#  name              :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  template_id       :bigint           not null
#
# Indexes
#
#  index_headers_on_template_id  (template_id)
#
# Foreign Keys
#
#  fk_rails_...  (template_id => templates.id)
#
class Header < ApplicationRecord
  belongs_to :template

  enum data_type: %i[date currency email number text]

  scope :required, -> { where(is_required_field: true ) }
  scope :optional, -> { where(is_required_field: false ) }

end
