class FixpHColumnName < ActiveRecord::Migration
  def change
  	rename_column :my_rain_barrels, :pH, :ph
  end
end
