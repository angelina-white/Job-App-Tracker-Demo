class Offer < ApplicationRecord
  belongs_to :job

  validates :salary, numericality: true
  validates :pto, numericality: true
  validates :sickLeave, numericality: true
  validates :bonus, numericality: true
end
