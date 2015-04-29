# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# 2625 sq. ft., chevy chase, md, 40 gallon barrel
# assume 1.0 inches of rainfall ammounts to 600 gal for 1,000 sq. ft. catchment area

def populate
	records = []
	roof_sq_ft = 2625
	day = 0
	total_precip = 0

	file = open("../water-data.txt");
	line = file.gets
	month = line
	total_gallons_collected = 0
	gallons_in_barrel = 0
	overflowed = false
	amount_overflown = 0

	if line == nil then return end
	
	# iterate over data points
	while line = file.gets do
		drain = Random.rand(1)
		amount_to_drain = Random.rand(0..30);
		
		if (line[0] == 0 || line[1] == 1)
			precip = line	
			precip = "0.00" if precip.include? "T"
			total_precip += precip
			gallons_collected = precip * 600 * (roof_sq_ft/1,000);
			total_gallons_collected += gallons_collected;
			
			if (!overflowed && (gallons_in_barrel + gallons_collected) < 40))
				gallons_in_barrel += gallons_collected;
			else 
				gallons_in_barrel = 40;
			end
			
			# if I decided to drain today
			if drain == 1
				if gallons_in_barrel >= amount_to_drain
					gallons_in_barrel = gallons_in_barrel - amount_to_drain 
					overflowed = false
				end
			end
			
			# if it overflowed
			if (gallons_in_barrel > 40) # either drain or not drain
				overflowed = true
			end
		else 
			month = line
			day = 0
		end

		# make record
		records.push({water_collected: precip, water_used: , overflowed: overflowed, amount_overflown: , ph: , tds: , water_level: total_precip})
		# increment day
		day += 1
	end

end

logs = DailyWaterLog.create([
	{
		water_collected: ,
		water_used: ,
		overflowed: ,
		amount_overflown: ,
		ph: ,
		tds:,
		created_at: ,
		updated_at: ,
	},
	{},
	{},
	{}, 
	{}
	])