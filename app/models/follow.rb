# == Schema Information
#
# Table name: follows
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  subject_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Follow < ActiveRecord::Base
  validates :user_id, uniqueness: {scope: :subject}, presence: true
  validate :check_user_against_author

  def check_user_against_author
    errors.add(:user_id, "can't follow your own subjects") if self.user_id == subject.user_id
  end

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  belongs_to :subject,
  primary_key: :id,
  foreign_key: :subject_id,
  class_name: :Subject

end
