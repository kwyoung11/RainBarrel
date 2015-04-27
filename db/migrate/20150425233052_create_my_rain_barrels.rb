class CreateMyRainBarrels < ActiveRecord::Migration
  def change
    create_table :my_rain_barrels do |t|
      t.float :capacity_in_gallons
      t.float :current_volume
      t.float :pH
      t.integer :temperature
      t.integer :total_dissolved_solids

      t.timestamps
    end
  end
end
