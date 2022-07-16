class Job < ApplicationRecord
  belongs_to :user
  has_many :offers, dependent: :destroy
  has_many :interviews, dependent: :destroy
end
