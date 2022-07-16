# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_07_16_174747) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "interviews", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.integer "month"
    t.integer "day"
    t.integer "year"
    t.integer "hour"
    t.integer "minute"
    t.index ["job_id"], name: "index_interviews_on_job_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.date "dateApplied"
    t.text "description"
    t.string "applicationLink"
    t.string "status"
    t.bigint "user_id", null: false
    t.string "company"
    t.index ["user_id"], name: "index_jobs_on_user_id"
  end

  create_table "offers", force: :cascade do |t|
    t.integer "salary"
    t.string "medical"
    t.integer "pto"
    t.integer "sickLeave"
    t.integer "bonus"
    t.string "positionType"
    t.bigint "job_id", null: false
    t.index ["job_id"], name: "index_offers_on_job_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
  end

  add_foreign_key "interviews", "jobs"
  add_foreign_key "jobs", "users"
  add_foreign_key "offers", "jobs"
end
