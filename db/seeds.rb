# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# 2625 sq. ft., chevy chase, md, 40 gallon barrel
# assume 1.0 inches of rainfall ammounts to 600 gal for 1,000 sq. ft. catchment area

records = []


	roof_sq_ft = 2625
	day = 0
	total_precip = 0
	puts Dir.pwd
	file = open("water-data.txt");
	line = file.gets
	month = line
	total_gallons_collected = 0
	gallons_in_barrel = 0
	overflowed = false
	amount_overflown = 0
	
	count = 0
	# if line == nil then return end
	
	# iterate over data points
	while line = file.gets do
		timestamp = DateTime.new(2018,12,1) + count.days
		drain = Random.rand(2)
		amount_to_drain = Random.rand(0..40);
		ph = Random.rand(5.0..9.0)
		tds = Random.rand(0..400);
		
		if (line[0] == "0" || line[1] == "1" || line[3] == "T")
			precip = line	
			precip = "0.00" if precip.include? "T"
			precip = precip.to_f
			puts precip
			total_precip += precip
			gallons_collected = precip * 600 * (roof_sq_ft/1000);
			
			puts "gallons_in_barrel: #{gallons_in_barrel}"
			puts "gallons_collected: #{gallons_collected}"
			puts "amount_to_drain: #{amount_to_drain}"
			puts "drain? #{drain}"
			
			if (40 - gallons_in_barrel >= gallons_collected)
				real_gallons_collected = gallons_collected
			else 
				real_gallons_collected = (40 - gallons_in_barrel) % gallons_collected
			end

			total_gallons_collected += gallons_collected;
			
			if (!overflowed && (gallons_in_barrel + gallons_collected) < 40)
				gallons_in_barrel += gallons_collected;
			else 
				amount_overflown = (gallons_in_barrel + gallons_collected) - 40
				gallons_in_barrel = 40;
			end
			
			# if I decided to drain today
			if drain == 1
				if gallons_in_barrel >= amount_to_drain
					gallons_in_barrel = gallons_in_barrel - amount_to_drain 
				else # gallons_in_barrel < amount_to_drain
					gallons_in_barrel = gallons_in_barrel - gallons_in_barrel
					amount_to_drain = gallons_in_barrel.to_i
				end
			else 
				amount_to_drain = 0
			end
			
			# if it overflowed
			if (amount_overflown > 0) # either drain or not drain
				overflowed = true
			end
		else 
			month = line
			day = 0
		end

		# make record
		records.push({water_collected: real_gallons_collected, water_used: amount_to_drain , overflowed: overflowed, amount_overflown: amount_overflown, ph: ph, tds: tds, water_level: total_precip, created_at: timestamp, updated_at: timestamp})
		puts records[count].inspect
		count += 1
		overflowed = false
		amount_overflown = 0
	end


records.each do |r|
	logs = DailyWaterLog.create(
		water_collected: r[:water_collected],
		water_used: r[:water_used],
		overflowed: r[:overflowed],
		amount_overflown: r[:amount_overflown],
		ph: r[:ph],
		tds: r[:tds],
		created_at: r[:created_at],
		updated_at: r[:updated_at],
		user_id: 1)
end