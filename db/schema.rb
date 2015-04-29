# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150429055515) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "daily_water_logs", force: true do |t|
    t.decimal  "water_collected"
    t.decimal  "water_used"
    t.boolean  "overflowed"
    t.decimal  "amount_overflown"
    t.decimal  "ph"
    t.decimal  "tds"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "my_rain_barrels", force: true do |t|
    t.float    "capacity_in_gallons"
    t.float    "current_volume"
    t.float    "ph"
    t.integer  "temperature"
    t.integer  "total_dissolved_solids"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "filter_life"
    t.integer  "filter_life_remaining"
    t.integer  "user_id"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.integer  "product_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "auth_token"
    t.integer  "roof_sq_ft"
    t.string   "state"
    t.string   "city"
    t.string   "street_address"
    t.integer  "zip_code"
    t.boolean  "email_alerts"
  end

end
