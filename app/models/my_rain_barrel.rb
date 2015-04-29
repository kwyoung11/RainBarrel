class MyRainBarrel < ActiveRecord::Base
 def self.simulation(user_id, type)
 	# initial state: current_volume: 12, capacity: 40, TDS: 30, ph: 7.2
 	rain_barrel = MyRainBarrel.where(id: 1).first
 	if user_id != "none"
 		rain_barrel = MyRainBarrel.where(user_id: user_id).first
 	end
 	
 	puts rain_barrel.to_s
 	if type == "simple"
 		until rain_barrel.current_volume > rain_barrel.capacity_in_gallons do
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
 		until rain_barrel.total_dissolved_solids > 700 && rain_barrel.ph > 9 do
 			rain_barrel.current_volume = rain_barrel.current_volume + 4
 			rain_barrel.ph = rain_barrel.ph + 0.1
 			rain_barrel.total_dissolved_solids = rain_barrel.total_dissolved_solids + 30
 			rain_barrel.save
 			sleep(1)
 		end
 	elsif type == "filter_life"
 		rain_barrel.filter_life_remaining = 3
 		rain_barrel.save
 		sleep(30)
 	end

 	# reset
 	rain_barrel.current_volume = 10
 	rain_barrel.ph = 7.0
 	rain_barrel.total_dissolved_solids = 0
 	rain_barrel.filter_life_remaining = 10
 	rain_barrel.save
 end
end
