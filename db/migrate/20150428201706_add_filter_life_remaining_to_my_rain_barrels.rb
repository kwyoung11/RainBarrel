class AddFilterLifeRemainingToMyRainBarrels < ActiveRecord::Migration
  def change
    add_column :my_rain_barrels, :filter_life_remaining, :integer
  end
end
