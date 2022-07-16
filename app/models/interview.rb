class Interview < ApplicationRecord
  belongs_to :job

  validates :month, numericality: true
  validates :day, numericality: true
  validates :year, numericality: true
  validates :hour, numericality: true
  validates :minute, numericality: true

  validates :month, inclusion: 1..12
  validates :day, inclusion: 1..31
  validates :hour, inclusion: 0..23
  validates :minute, inclusion: 0..59
end
