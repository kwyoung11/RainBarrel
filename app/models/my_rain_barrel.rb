class MyRainBarrel < ActiveRecord::Base
 def self.simulation
 	rain_barrel = MyRainBarrel.where(id: "1").first
 	until rain_barrel.current_volume == rain_barrel.capacity_in_gallons do
 		puts rain_barrel.current_volume
 		rain_barrel.current_volume = rain_barrel.current_volume + 4;
 		rain_barrel.save
 		sleep(1)
 	end

 	# reset
 	rain_barrel.current_volume = 12
 	rain_barrel.save
 end
end
