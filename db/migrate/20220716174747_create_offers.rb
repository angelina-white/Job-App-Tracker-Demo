class CreateOffers < ActiveRecord::Migration[6.1]
  def change
    create_table :offers do |t|
      t.integer :salary
      t.string :medical
      t.integer :pto
      t.integer :sickLeave
      t.integer :bonus
      t.string :positionType
      t.belongs_to :job, null: false, foreign_key: true
    end
  end
end
