class AddUserIdToMyRainBarrels < ActiveRecord::Migration
  def change
    add_column :my_rain_barrels, :user_id, :integer
  end
end
