class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.date :dateApplied
      t.text :description
      t.string :applicationLink
      t.string :status
      t.belongs_to :user, null: false, foreign_key: true
      t.string :company
    end
  end
end
