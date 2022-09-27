# frozen_string_literal: true

# == Schema Information
#
# Table name: template_headers
#
#  id            :bigint           not null, primary key
#  column_values :jsonb
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  header_id     :bigint
#  template_id   :bigint
#
# Indexes
#
#  index_template_headers_on_header_id                  (header_id)
#  index_template_headers_on_template_id                (template_id)
#  index_template_headers_on_template_id_and_header_id  (template_id,header_id) UNIQUE
#
class TemplateHeader < ApplicationRecord
  belongs_to :header
  belongs_to :template
end
