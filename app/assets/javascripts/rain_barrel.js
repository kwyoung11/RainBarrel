$(document).ready(function() {

	$('.help').click(function() {
		if ($(this).find(".tooltip").css('display') == 'none') {
			$(this).find(".tooltip").css('display', 'block');
		} else {
			$(this).find(".tooltip").css('display', 'none');
		}
		
	});

	$('.login-link').click(function(e) {
		e.preventDefault();
		if ($('.login-popup').css('display') == 'none') {
			$('.login-popup').css('display', 'block');
		} else {
			$('.login-popup').css('display', 'none');
		}
		
	});

	$(".label").click(function() {
		$(this).siblings().css('opacity', '1');
		$(this).css('opacity', '0');
	});	

	// get the current water level and update the graphic	by pinging server every second
	var ph_flag = 0;
	var tds_flag = 0;
	var filter_flag = 0;
	var ping = function () {
		console.log("in ping");
		$.ajax({
			url: "/rain_barrel/stats",
			type: "GET",
			success: function(rain_barrel) {
				var current_water_level = rain_barrel['current_volume'];
				var capacity_in_gallons = rain_barrel['capacity_in_gallons'];
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

				$(".circle-wl").animate({
					"margin-top": "-" + height_target + "px",
				}, 2000, function() {
	
				});

				$("#pH .data-elt .data-bit").html(rain_barrel.ph);
				$("#TDS .data-elt .data-bit").html(rain_barrel.total_dissolved_solids);


				// update the alerts
				var i;
				var alerts = {"pH": "", "TDS": "", "filter": ""};
				
				// pH alert
				if (rain_barrel.ph < 6.0) {
					alerts["pH"] = "";
					alerts["pH"] = "pH is too low (" + rain_barrel.ph + ")";
					ph_flag++;
					$("#pH .data-elt .data-bit").removeClass("green_highlight yellow_highlight");
					$("#pH .data-elt .data-bit").addClass("red_highlight");
					
					if (!(rain_barrel.total_dissolved_solids > 400)) {
						$("#pH .fix").css('display', 'block');
						$("#pH .fix").addClass("highlight");
					}
					
					$(".logo span").css('color', 'red');

				} else if (rain_barrel.ph > 8.0) {
					alerts["pH"] = "";
					alerts["pH"] = "pH is too high (" + rain_barrel.ph + ")";
					ph_flag++;
					$("#pH .data-elt .data-bit").removeClass("green_highlight yellow_highlight");
					$("#pH .data-elt .data-bit").addClass("red_highlight");
					
					if (!(rain_barrel.total_dissolved_solids > 400)) {
						$("#pH .fix").css('display', 'block');
						$("#pH .fix").addClass("highlight");
					}

					$(".logo span").css('color', 'red');
				} else if ((rain_barrel.ph >= 6 && rain_barrel.ph <= 6.5) || (rain_barrel.ph <= 8.0 && rain_barrel.ph >= 7.5)) {
					$("#pH .data-elt .data-bit").removeClass("green_highlight red_highlight");
					$("#pH .data-elt .data-bit").addClass("yellow_highlight");
					$(".logo span").css('color', 'yellow');
					$("#pH .fix").removeClass("highlight");
					// $("#pH .fix").css('display', 'none');
					// $("#pH .fix").css('background-color', 'transparent');
				} else if (rain_barrel.ph > 6.5 && rain_barrel.ph < 7.5) {
					$("#pH .data-elt .data-bit").removeClass("yellow_highlight red_highlight");
					$("#pH .data-elt .data-bit").addClass("green_highlight");
					$(".logo span").css('color', 'green');

					$("#pH .fix").removeClass("highlight");
					// $("#pH .fix").css('display', 'none');
					// $("#pH .fix").css('background-color', 'transparent');
				}

				// TDS alert
				if (rain_barrel.total_dissolved_solids <= 50) {
					$("#TDS .data-elt .data-bit").removeClass("yellow_highlight red_highlight");
					$("#TDS .data-elt .data-bit").addClass("green_highlight");
					$(".logo span").css('color', 'green');

					$("#TDS .fix").removeClass("highlight");
					// $("#TDS .fix").css('display', 'none');
					// $("#TDS .fix").css('background-color', 'transparent');
				} else if (rain_barrel.total_dissolved_solids > 50 && rain_barrel.total_dissolved_solids <= 400) {
					$("#TDS .data-elt .data-bit").removeClass("green_highlight red_highlight");
					$("#TDS .data-elt .data-bit").addClass("yellow_highlight");
					$(".logo span").css('color', 'yellow');

					$("#TDS .fix").removeClass("highlight");
					// $("#TDS .fix").css('display', 'none');
					// $("#TDS .fix").css('background-color', 'transparent');
				} else if (rain_barrel.total_dissolved_solids > 400) {
					alerts["TDS"] = "";
					alerts["TDS"] = "TDS is too high (" + rain_barrel.total_dissolved_solids + ")";	
					tds_flag++;
					$("#TDS .data-elt .data-bit").removeClass("green_highlight yellow_highlight");
					$("#TDS .data-elt .data-bit").addClass("red_highlight");
					$("#TDS .fix").css('display', 'block');

					$("#TDS .fix").addClass("highlight");
					
					$(".logo span").css('color', 'red');
				}

				console.log(rain_barrel);
				// filter life alert
				console.log(rain_barrel.filter_life_remaining);
				if (rain_barrel.filter_life_remaining < 8) {
					alerts["filter"] = ""
					alerts["filter"] = "Filter life remaining: " + rain_barrel.filter_life_remaining + " days";
					filter_flag++;
					$(".logo span").css('color', 'red');
				}

				email_alerts = []

				// update alerts
				for (marker in alerts) {
					if (marker == "pH" && alerts[marker] !== "") {
						$("#alert").css('display', 'block');
						if (ph_flag == 1) {
							$(".warning-text").append("<p id='ph_warning'>"  + alerts[marker] + "</p>");	
							email_alerts.push(alerts[marker]);
						} else {
							$("#ph_warning").html(alerts[marker]);
						}
					}

					if (marker == "TDS" && alerts[marker] !== "") {
						$("#alert").css('display', 'block');
						if (tds_flag == 1) {
							$(".warning-text").append("<p id='tds_warning'>"  + alerts[marker] + "</p>");	
							email_alerts.push(alerts[marker]);
						} else {
							$("#tds_warning").html(alerts[marker]);
						}
					}

					if (marker == "filter" && alerts[marker] !== "") {
						// console.log($("#alert").css('display'));
						$("#alert").css('display', 'block');
						if (filter_flag == 1) {
							$(".warning-text").append("<p id='filter_warning'>"  + alerts[marker] + "</p>");	
							if (tds_flag == 0 && ph_flag == 0) {
								$(".warning-link").attr('href', "/rain_barrel/filter_life");
							}
							email_alerts.push(alerts[marker]);
						} else {
							$("#filter_warning").html(alerts[marker]);
						}
					}
				}

				if (email_alerts.length != 0) {
					email_alert(email_alerts);	
				}
				
				
				// hide warning box if everything is ok again
				if ((rain_barrel.ph > 6 && rain_barrel.ph < 8) && rain_barrel.total_dissolved_solids < 400 && rain_barrel.filter_life_remaining >= 8) {
					$("#alert").css('display', 'none');
				}
				console.log(rain_barrel);
				
				// wait 1 second
				setTimeout(function () {
					ping();	
				}, 1000);
			} 
		});
	}

	ping();

	function email_alert(alert_reasons) {
		var alert_string = alert_reasons.join();
		$.ajax({
			url: '/rain_barrel/email_alert',
			type: 'GET',
			data: { alerts: alert_string },
			success: function(response) {
				console.log("e-mailed the alert!");
			}
		})
	}

	// fix links
	$(".fix_link").click(function() {
		if ($(this).parent().parent().find(".fix").css('display') == 'none') {
			$(this).parent().parent().find(".fix").slideDown("slow");
			// $(this).parent().find(".triangle-down").removeClass("triangle-down").addClass("triangle-up");
			$(this).parent().find(".triangle-down").css('left', '106%');
			$(this).html("Close instruction text");
			$(this).parent().find(".triangle-down").stop().animate({
				rotation: 180
			}, {
  			  duration: 500,
  			  step: function(now, fx) {
  			    $(this).css({"transform": "rotate("+now+"deg)"});
  			  }
  			});
		} else {
			$(this).parent().parent().find(".fix").slideUp('slow');
			// $(this).parent().find(".triangle-up").removeClass("triangle-up").addClass("triangle-down");
			$(this).parent().find(".triangle-down").css('left', '103%');
			$(this).html("Click for intructions when pH levels are unsafe ");
			$(this).parent().find(".triangle-down").stop().animate({
				rotation: 360
			}, {
  			  duration: 500,
  			  step: function(now, fx) {
  			    $(this).css({"transform": "rotate("+now+"deg)"});
  			  }
  			});
		}

	});

});