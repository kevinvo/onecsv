# frozen_string_literal: true

# == Schema Information
#
# Table name: jwt_denylists
#
#  id         :bigint           not null, primary key
#  expired_at :datetime         not null
#  jti        :string           not null
#
# Indexes
#
#  index_jwt_denylists_on_jti  (jti)
#
class JwtDenylist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist
  self.table_name = 'jwt_denylists'
end
