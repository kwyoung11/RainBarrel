class AddUserIdToDailyWaterLogs < ActiveRecord::Migration
  def change
    add_column :daily_water_logs, :user_id, :integer
  end
end
