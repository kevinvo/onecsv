# frozen_string_literal: true

# == Schema Information
#
# Table name: templates
#
#  id         :bigint           not null, primary key
#  created_by :integer          not null
#  csv_name   :string           not null
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_templates_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Template < ApplicationRecord
  belongs_to :user

  has_many :template_headers, dependent: :destroy
  has_many :headers, through: :template_headers

  enum created_by: {
    user: 1,
    automated: 2
  }
  scope :by_template_and_user, lambda { |template_id, user|
                                 includes(template_headers: :header)
                                   .joins(template_headers: :header)
                                   .merge(Header.sort_by_position).find_by(id: template_id, user: user)
                               }

  validates :csv_name, presence: true
  validates :slug, presence: true
end
