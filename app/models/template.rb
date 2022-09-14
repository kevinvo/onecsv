# == Schema Information
#
# Table name: templates
#
#  id         :bigint           not null, primary key
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
  has_many :headers, dependent: :delete_all
end
