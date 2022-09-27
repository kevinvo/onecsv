# == Schema Information
#
# Table name: headers
#
#  id                :bigint           not null, primary key
#  data_type         :integer
#  is_required_field :boolean
#  name              :string
#  position          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Header < ApplicationRecord
  # belongs_to :template #TODO: remove

  has_many :template_headers
  has_many :templates, through: :template_headers

  enum data_type: {
    text: 1,
    number: 2,
    email: 3,
    date: 4,
    currency: 5,
  }

  scope :by_names, -> (header_names) { where(name: header_names) }
  scope :by_template, -> (template_id) { joins(:template_headers).where(template_headers: {template_id: template_id}) }
  scope :sort_by_position, -> {order('position')}
  scope :required, -> { where(is_required_field: true ) }
  scope :optional, -> { where(is_required_field: false ) }

end
