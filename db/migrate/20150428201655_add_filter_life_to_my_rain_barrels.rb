class AddFilterLifeToMyRainBarrels < ActiveRecord::Migration
  def change
    add_column :my_rain_barrels, :filter_life, :integer
  end
end
