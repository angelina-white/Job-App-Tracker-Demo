class InterviewSerializer < ActiveModel::Serializer
  attributes :id, :month, :day, :year, :hour, :minute
  has_one :job
end
