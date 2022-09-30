# frozen_string_literal: true

# == Schema Information
#
# Table name: headers
#
#  id                    :bigint           not null, primary key
#  data_type             :integer          not null
#  date_directive_format :string
#  is_required_field     :boolean          not null
#  name                  :string           not null
#  position              :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class Header < ApplicationRecord
  # belongs_to :template_services #TODO: remove

  has_many :template_headers, dependent: :destroy
  has_many :templates, through: :template_headers

  enum data_type: {
    text: 1,
    number: 2,
    email: 3,
    date: 4,
    currency: 5
  }

  scope :by_names, ->(header_names) { where(name: header_names) }
  scope :by_template, lambda { |template_id|
                        joins(:template_headers).where(template_headers: { template_id: template_id })
                      }
  scope :sort_by_position, -> { order('position') }
  scope :required, -> { where(is_required_field: true) }
  scope :optional, -> { where(is_required_field: false) }

  validates :position, presence: true
  validates :name, presence: true
  validates :data_type, presence: true

  def date?
    read_attribute_before_type_cast(:data_type) == Header.data_types[:date]
  end
end
