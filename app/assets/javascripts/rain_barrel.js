$(document).ready(function() {

	console.log("hello!");

	// get the current water level and update the graphic
	$.ajax({
		url: "/rain_barrel/stats",
		type: "GET",
		success: function(response) {
			var current_water_level = response['current_volume'];
			var capacity_in_gallons = response['capacity_in_gallons'];
			var rain_barrel_height = parseInt($("#barrel").css('height'));
			var times_full =  current_water_level/capacity_in_gallons;
			var percent_filled = (current_water_level/capacity_in_gallons) * 100;
			
			var top_target = 100 - percent_filled;
			var height_target = rain_barrel_height * times_full;

			$("#water_level").animate({
				top: top_target + "%",
				height: height_target + "px",
			}, 2000, function() {

			});

			// $("#water_level").css('top', (100 - percent_filled) + '%');
			// $("#water_level").css('height', (rain_barrel_height * times_full) + "px");
		} 
	});

	$(".water_quality_link").hover(function() { // #FFA500 (orange), #3f6 (green), #A0522D
		$("#barrel").css('text-shadow', '0 0.3px 3px #A0522D'); }, function() {
		$("#barrel").css('text-shadow', '0 0.3px 3px #111');
	});

	// ping server every 5 seconds for update
	var ping = function () {
		console.log("in ping");
		$.ajax({
			url: "/rain_barrel/stats",
			type: "GET",
			success: function(response) {
				var current_water_level = response['current_volume'];
				var capacity_in_gallons = response['capacity_in_gallons'];
				var rain_barrel_height = parseInt($("#barrel").css('height'));
				var times_full =  current_water_level/capacity_in_gallons;
				var percent_filled = (current_water_level/capacity_in_gallons) * 100;
				
				var top_target = 100 - percent_filled;
				var height_target = rain_barrel_height * times_full;
	
				$("#water_level").animate({
					top: top_target + "%",
					height: height_target + "px",
				}, 2000, function() {
	
				});
	
				// $("#water_level").css('top', (100 - percent_filled) + '%');
				// $("#water_level").css('height', (rain_barrel_height * times_full) + "px");
				
				// wait 5 seconds
				setTimeout(function () {
					ping();	
				}, 1000);
			} 
		});
	}

	ping();

	$(".run_sim").click(function(e) {
		e.preventDefault();
		$.ajax({
			url: "/rain_barrel/run_sim",
			type: "GET",
			success: function(response) {
				console.log(response["pid"]);
				$(".end_sim").click(function(e2) {
					e2.preventDefault();
					$.ajax({
						url: "/rain_barrel/end_sim",
						type: "GET",
						data: "pid=" + response["pid"],
						success: function(response) {
							console.log("ending sim");
						}
					});
				});

			}
		});
	});

});