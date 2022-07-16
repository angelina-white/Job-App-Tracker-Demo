class CreateInterviews < ActiveRecord::Migration[6.1]
  def change
    create_table :interviews do |t|
      t.belongs_to :job, null: false, foreign_key: true
      t.integer :month
      t.integer :day
      t.integer :year
      t.integer :hour
      t.integer :minute
    end
  end
end
