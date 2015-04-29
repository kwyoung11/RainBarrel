class CreateDailyWaterLogs < ActiveRecord::Migration
  def change
    create_table :daily_water_logs do |t|
      t.integer :water_collected
      t.integer :water_used
      t.boolean :overflowed
      t.integer :amount_overflown
      t.integer :ph
      t.integer :tds

      t.timestamps
    end
  end
end
