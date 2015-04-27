class MyRainBarrel < ActiveRecord::Base
 def self.simulation(type)
 	# initial state: current_volume: 12, capacity: 40, TDS: 30, ph: 7.2
 	rain_barrel = MyRainBarrel.where(id: "1").first
 	if type == "simple"
 		until rain_barrel.current_volume == rain_barrel.capacity_in_gallons do
 			rain_barrel.current_volume = rain_barrel.current_volume + 4;
 			rain_barrel.save
 			sleep(1)
 		end
 	elsif type == "ph"
 		until rain_barrel.ph > 9 do
 			rain_barrel.current_volume = rain_barrel.current_volume + 4
 			rain_barrel.ph = rain_barrel.ph + 0.1
 			rain_barrel.save
 			sleep(1)
 		end
 	elsif type == "TDS"
 		until rain_barrel.total_dissolved_solids > 450 do
 			rain_barrel.current_volume = rain_barrel.current_volume + 4
 			rain_barrel.total_dissolved_solids = rain_barrel.total_dissolved_solids + 5
 			rain_barrel.save
 			sleep(1)
 		end
 	elsif type == "ph_and_TDS"
 		until rain_barrel.total_dissolved_solids > 450 && rain_barrel.ph > 9 do
 			rain_barrel.current_volume = rain_barrel.current_volume + 4
 			rain_barrel.ph = rain_barrel.ph + 0.1
 			rain_barrel.total_dissolved_solids = rain_barrel.total_dissolved_solids + 5
 			rain_barrel.save
 			sleep(1)
 		end
 	end

 	# reset
 	rain_barrel.current_volume = 12
 	rain_barrel.ph = 7.2
 	rain_barrel.total_dissolved_solids = 320
 	rain_barrel.save
 end
end
