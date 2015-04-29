class ChangeDailyWaterLogValuesToDecimal < ActiveRecord::Migration
  def change
    change_column :daily_water_logs, :water_collected, :decimal
    change_column :daily_water_logs, :water_used, :decimal
    change_column :daily_water_logs, :amount_overflown, :decimal
    change_column :daily_water_logs, :ph, :decimal
    change_column :daily_water_logs, :tds, :decimal
  end
end
