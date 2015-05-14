$(document).ready(function() {
		
	if (window.location.pathname == "/") {
		if ($(".landing-page").length > 0) {
			$("body").addClass("landing");	
		} else {
			$("body").addClass("home");
		}
	} else if (window.location.pathname == "/rain_barrel/water_usage") {
		$("body").addClass("water_usage");
	}

	var hide_alert = false;
	$("#close-alert").click(function() {
		$("#alert").slideUp();
		hide_alert = true;
	});
	
	function setCookie(key, value) {
      var expires = new Date();
      expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
      document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
  }

  function getCookie(key) {
      var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;
  }

  if ($(".filter-reset").length > 0) {
  	console.log($("#fl-remaining .data-bit").html().split(" ")[1]);
  	if ($("#fl-remaining .data-bit").html().split(" ")[1] !== "300") {
  		setCookie("filter_life_remaining", $("#fl-remaining .data-bit").html().split(" ")[1]);	
  	}
  }

  $(".reset-fl-link").click(function() {
  	var num = getCookie("filter_life_remaining");
  	console.log(num);
  	$.ajax({
  		url: "/rain_barrel/reset_filter_life_remaining",
  		type: "GET",
  		data: { days: num },
  		success: function(response) {
  			$("#fl-remaining .data-bit").html(response.filter_life_remaining + " days");
  		}
  	});

  });


	/************ barrel graphic state handlers **************/

	prev_text = "";
	$('.wq-label, .wl-label, .fl-label').on({
			mouseenter: function() {
			prev_text = $(this).children('.circle-prev-text').html();
			$(this).children('.circle-prev-text').html("");
		}, mouseleave: function () {
			$(this).children('.circle-prev-text').html(prev_text);
		}
	});

	// clicking on labels
	$('.circle-wrap').click(function() {
		$(".preview").hide();
		$(".preview-graphic").hide();
		$(".label").show();
		$(this).find(".label").hide();
		$(this).find(".preview").show();
		$("." + $(this).find(".label").attr("id")).show();
		
		$("#wrapper .circle-wrap").addClass("inactive");
		$(this).removeClass("inactive");
		$(this).addClass("active");

		$("#nav_list div").removeClass('selected');
		if ($(this).hasClass('circle-wl')) {
			$(".wl-link").siblings('.legend').addClass('selected');
		} else if ($(this).hasClass('circle-wq')) {
			$(".wq-link").siblings('.legend').addClass('selected');
			$(".pH-bar").animate({
					top: wq_ph_top_target + "%",
					height: wq_ph_height_target + "px",
				}, 2000, function() {
			
				});
		
				$(".tds-bar").animate({
					top: wq_tds_top_target + "%",
					height: wq_tds_height_target + "px",
				}, 2000, function() {
			
				});
		} else {
			$(".fl-link").siblings('.legend').addClass('selected');
			$(".fl-bar").animate({
				top: 100 - (fl * fl_scale) + '%',
				height: fl_width_target + '%'
			}, 2000, function() {
			
			});
		
			$(".fl-remaining-bar").animate({
				height: fl_remaining_width_target + "%",
			}, 2000, function() {
			
			});
		}

			// siblings('.legend').removeClass('selected').addClass('selected');
		if ($(this).hasClass('circle-fl')) {
			// $("#barrel").addClass("rotate");
		}
	});


	// hovering over navbar links
	$('#nav_list a').hover(function() {
		// remove other selections
		$("#nav_list div").removeClass('selected');
		$(this).siblings('.legend').removeClass('selected').addClass('selected');
	
		$(".preview").hide();
		$(".preview-graphic").hide();
		$(".label").show();
		if ($(this).hasClass('wl-link')) {
				$(".wl-label").hide();
				$(".circle-wl").find('.preview').show();
				$("#water_level").show();

				$("#wrapper .circle-wrap").addClass("inactive");
				$('.circle-wl').removeClass("inactive");
				$('.circle-wl').addClass("active");

		} else if ($(this).hasClass('wq-link')) {
				$(".wq-label").hide();
				$(".circle-wq").find('.preview').show();
				$(".pH-bar").show();
				$(".tds-bar").show();

				$("#wrapper .circle-wrap").addClass("inactive");
				$('.circle-wq').removeClass("inactive");
				$('.circle-wq').addClass("active");

				$(".pH-bar").animate({
					top: wq_ph_top_target + "%",
					height: wq_ph_height_target + "px",
				}, 2000, function() {
			
				});
		
				$(".tds-bar").animate({
					top: wq_tds_top_target + "%",
					height: wq_tds_height_target + "px",
				}, 2000, function() {
			
				});
				$('.bar-label1').show();
				$('.bar-label2').show();
		} else if ($(this).hasClass('fl-link')) {
				$(".fl-label").hide();
				$(".circle-fl").find('.preview').show();
				$(".fl-bar").show();
				$(".fl-remaining-bar").show();
				$('.filter-wrapper').show();

				$("#wrapper .circle-fl").addClass("inactive");
				$('.circle-fl').removeClass("inactive");
				$('.circle-fl').addClass("active");

				$(".fl-bar").animate({
					top: 100 - (fl * fl_scale) + '%',
					height: fl_width_target + '%'
				}, 2000, function() {
			
				});
		
				$(".fl-remaining-bar").animate({
					height: fl_remaining_width_target + "%",
				}, 2000, function() {
			
				});
		}
	}, function() {

	});

	/* water quality barrel graphics (pH and tds) */



	/********* end barrel graphic state handlers ********************/

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

	// get the current water level and update the graphic	by pinging server every second
	var ph_flag = 0;
	var tds_flag = 0;
	var filter_flag = 0;
	var temperature_flag = 0;
	var overflow_flag = 0;
	var ping = function () {
		// console.log("in ping");
		$.ajax({
			url: "/rain_barrel/stats",
			type: "GET",
			success: function(rain_barrel) {
				var current_water_level;
				if (rain_barrel['current_volume'] >= 0) {
					current_water_level = rain_barrel['current_volume'];	
				}
				var capacity_in_gallons = rain_barrel['capacity_in_gallons'];
				var rain_barrel_height = parseInt($("#barrel").css('height'));
				var rain_barrel_width = parseInt($("#barrel").css('width'));
				var times_full =  current_water_level/capacity_in_gallons;
				var percent_filled = (current_water_level/capacity_in_gallons) * 100;
				
				/* wl */
				var wl_top_target = 100 - percent_filled;
				var wl_height_target = rain_barrel_height * times_full;
				if (wl_top_target < 0) {
					wl_top_target = -1;
				}

				if (wl_height_target > rain_barrel_height) {
					wl_height_target = rain_barrel_height + 1;
				}

				$("#water_level").animate({
					top: wl_top_target + "%",
					height: wl_height_target + "px",
				}, 1000, function() {
					
				});

				/* filter life graphic */
				fl = rain_barrel.filter_life;
				fl_remaining = rain_barrel.filter_life_remaining;
				fl_scale = 100 / fl;

				fl_top = 100 - (rain_barrel.filter_life * fl_scale);
				fl_width_target = fl * fl_scale;
				fl_remaining_top = rain_barrel.filter_life_remaining * fl_scale;
				fl_remaining_width_target = fl_remaining * fl_scale;

				if (fl_remaining_width_target < 5) {
					fl_remaining_width_target = 5;
				}

				// $('.fl-bar').css('display', 'block');
				// $(".fl-bar").animate({
				// 	top: 100 - (rain_barrel.filter_life * fl_scale) + '%'
				// }, 2000, function() {
			
				// });
				
				// $(".fl-remaining-bar").css('display', 'block');
				// $(".fl-remaining-bar").animate({
				// 	height: fl_remaining_width_target + "%",
				// }, 3000, function() {
			
				// });

				

				/* wq */
				var ph_scale = 100 / 14;
				wq_ph_top_target = 100 - (rain_barrel.ph * ph_scale);
				wq_ph_height_target = rain_barrel_height * ((rain_barrel.ph * ph_scale)/100);

				var tds_scale = 100 / 400;
				wq_tds_top_target = 100 - (rain_barrel.total_dissolved_solids * tds_scale); 
				wq_tds_height_target = rain_barrel_height * ((rain_barrel.total_dissolved_solids * tds_scale)/100);
				if (wq_tds_height_target > rain_barrel_height) {
					wq_tds_height_target = rain_barrel_height;
				}

				if (wq_tds_top_target < 0) {
					wq_tds_top_target = 0;
				}

				$('.pH-bar .bar-data').html(format(rain_barrel.ph, ""));
				$('.tds-bar .bar-data').html(format(rain_barrel.total_dissolved_solids, ""));

				/* animations */
				$('.circle-wrap').on('click', function() {
					if ($(this).hasClass('circle-fl')) { // filter life animation
						$(".fl-bar").animate({
							top: 100 - (rain_barrel.filter_life * fl_scale) + '%'
						}, 2000, function() {
			
						});
		
						$(".fl-remaining-bar").animate({
							height: fl_remaining_width_target + "%",
						}, 3000, function() {
			
						});
					} else if ($(this).hasClass('circle-wq')) { // water quality animations
						$(".pH-bar").animate({
							top: wq_ph_top_target + "%",
							height: wq_ph_height_target + "px",
						}, 2000, function() {
			
						});
		
						$(".tds-bar").animate({
							top: wq_tds_top_target + "%",
							height: wq_tds_height_target + "px",
						}, 2000, function() {
			
						});
						$('.bar-label1').css('display', 'block');
						$('.bar-label2').css('display', 'block');
					} else if ($(this).hasClass('circle-wl')) { // water level animation
						$("#water_level").animate({
							top: wl_top_target + "%",
							height: wl_height_target + "px",
						}, 1000, function() {
					
						});
					}
				});

				$(".circle-wl").animate({
					"margin-top": "-" + wl_height_target + "px",
				}, 1000, function() {
	
				});

				$("#pH .data-elt .data-bit").html(rain_barrel.ph);
				$("#TDS .data-elt .data-bit").html(rain_barrel.total_dissolved_solids);


				// update the data
				$(".wl-gallons .circle-text").html(Math.min((Math.round(rain_barrel.current_volume * 100) / 100), rain_barrel.capacity_in_gallons) + " gallons");
				$(".wl-percent .circle-text").html(Math.min(Math.floor(percent_filled), 100) + "% full");


				var status;
				ph_ideal = rain_barrel.ph > 6.5 && rain_barrel.ph < 7.5;
				tds_ideal = rain_barrel.total_dissolved_solids <= 50;
				ph_drinkable = (rain_barrel.ph >= 6 && rain_barrel.ph <= 6.5) || (rain_barrel.ph <= 8.0 && rain_barrel.ph >= 7.5);
				tds_drinkable = rain_barrel.total_dissolved_solids > 50 && rain_barrel.total_dissolved_solids <= 400;
				ph_unsafe = rain_barrel.ph < 6 || rain_barrel.ph > 8;
				tds_unsafe = rain_barrel.total_dissolved_solids > 400;
				if (ph_unsafe || tds_unsafe) {
					status = "unsafe";
				} else if (ph_drinkable || tds_drinkable) {
					status = "drinkable";
				} else {
					status = "ideal";
				}

				$(".wq-status .circle-text").html(status + " <small> status <small> ");
				if (ph_ideal) {
					$(".pH-bar").css('background', 'green');
				} else if (ph_drinkable) {
					$(".pH-bar").css('background', 'yellow');
				} else {
					$(".pH-bar").css('background', 'red');
				}

				if (tds_ideal) {
					$(".tds-bar").css('background', 'green');
				} else if (tds_drinkable) {
					$(".tds-bar").css('background', 'yellow');
				} else {
					$(".tds-bar").css('background', 'red');
				}

				$(".fl-status .circle-text").html(rain_barrel.filter_life_remaining + " days remaining");

				// update the alerts
				var i;
				var alerts = {"pH": "", "TDS": "", "filter": "", "overflow": "", "temperature": ""};
				
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
					
					$(".logo .logo-letter").css('color', 'red');
					$('#pH .data-status').removeClass('unsafe-icon legend-box checkmark');
					$('#pH .data-status').addClass('unsafe-icon');
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

					$(".logo .logo-letter").css('color', 'red');
					$('#pH .data-status').removeClass('unsafe-icon legend-box checkmark');
					$('#pH .data-status').addClass('unsafe-icon');
				} else if ((rain_barrel.ph >= 6 && rain_barrel.ph <= 6.5) || (rain_barrel.ph <= 8.0 && rain_barrel.ph >= 7.5)) {
					$("#pH .data-elt .data-bit").removeClass("green_highlight red_highlight");
					$("#pH .data-elt .data-bit").addClass("yellow_highlight");
					$(".logo .logo-letter").css('color', 'yellow');
					$("#pH .fix").removeClass("highlight");
					$('#pH .data-status').removeClass('unsafe-icon legend-box checkmark');
					$('#pH .data-status').addClass('legend-box');
				} else if (rain_barrel.ph > 6.5 && rain_barrel.ph < 7.5) {
					$("#pH .data-elt .data-bit").removeClass("yellow_highlight red_highlight");
					$("#pH .data-elt .data-bit").addClass("green_highlight");
					$(".logo .logo-letter").css('color', 'green');

					$("#pH .fix").removeClass("highlight");
					$('#pH .data-status').removeClass('unsafe-icon legend-box checkmark');
					$('#pH .data-status').addClass('checkmark').html('<div class="checkmark_circle"></div><div class="checkmark_stem"></div><div class="checkmark_kick"></div>');

				}

				// TDS alert
				if (rain_barrel.total_dissolved_solids <= 50) {
					$("#TDS .data-elt .data-bit").removeClass("yellow_highlight red_highlight");
					$("#TDS .data-elt .data-bit").addClass("green_highlight");
					$(".logo .logo-letter").css('color', 'green');

					$("#TDS .fix").removeClass("highlight");
					$('#TDS .data-status').removeClass('unsafe-icon legend-box checkmark');
					$('#TDS .data-status').addClass('checkmark').html('<div class="checkmark_circle"></div><div class="checkmark_stem"></div><div class="checkmark_kick"></div>');
				} else if (rain_barrel.total_dissolved_solids > 50 && rain_barrel.total_dissolved_solids <= 400) {
					$("#TDS .data-elt .data-bit").removeClass("green_highlight red_highlight");
					$("#TDS .data-elt .data-bit").addClass("yellow_highlight");
					$(".logo .logo-letter").css('color', 'yellow');

					$("#TDS .fix").removeClass("highlight");
					$('#TDS .data-status').removeClass('unsafe-icon legend-box checkmark');
					$('#TDS .data-status').addClass('legend-box');
				} else if (rain_barrel.total_dissolved_solids > 400) {
					alerts["TDS"] = "";
					alerts["TDS"] = "TDS is too high (" + rain_barrel.total_dissolved_solids + ")";	
					tds_flag++;
					$("#TDS .data-elt .data-bit").removeClass("green_highlight yellow_highlight");
					$("#TDS .data-elt .data-bit").addClass("red_highlight");
					$("#TDS .fix").css('display', 'block');

					$("#TDS .fix").addClass("highlight");
					
					$(".logo .logo-letter").css('color', 'red');
					$('#TDS .data-status').removeClass('unsafe-icon legend-box checkmark');
					$('#TDS .data-status').addClass('unsafe-icon');
				}

				// filter life alert
				if (rain_barrel.filter_life_remaining < 8) {
					alerts["filter"] = ""
					alerts["filter"] = "Filter life remaining: " + rain_barrel.filter_life_remaining + " days";
					filter_flag++;
					$(".logo .logo-letter").css('color', 'red');
				}

				// overflow alert
				// console.log(rain_barrel.current_volume);
				// console.log(rain_barrel.capacity_in_gallons);
				if (rain_barrel.current_volume >= rain_barrel.capacity_in_gallons) {
					alerts["overflow"] = "";
					alerts["overflow"] = "Barrel is overflowing: drain to collect more water"
					overflow_flag++;
					$(".logo .logo-letter").css('color', 'red');
				}

				// temperature alert
				if (rain_barrel.temperature < 32) {
					alerts["temperature"] = "";
					alerts["temperature"] = "Temperature is below freezing: You may want to disconnect your rain barrel"
					temperature_flag++;
					$(".logo .logo-letter").css('color', 'red');
					$('#temp .data-status').removeClass('unsafe-icon legend-box checkmark');
					$("#temp .data-status").addClass('unsafe-icon');
				} else {
					$('#temp .data-status').removeClass('unsafe-icon legend-box checkmark');
					$("#temp .data-status").addClass('checkmark').html('<div class="checkmark_circle"></div><div class="checkmark_stem"></div><div class="checkmark_kick"></div>');
					$(".logo .logo-letter").css('color', 'green');
				}

				email_alerts = [];

				var new_alert = false;
				if (ph_flag == 1 || tds_flag == 1 || filter_flag == 1 || overflow_flag == 1 || temperature_flag == 1) {
					new_alert = true;
				}

				console.log(hide_alert);

				// update alerts
				for (marker in alerts) {
					if (marker == "pH" && alerts[marker] !== "") {
						if (!hide_alert) {
							$("#alert").css('display', 'inline-block');
						} else if (hide_alert && new_alert) {
							$("#alert").css('display', 'inline-block');
						}
						
						if (ph_flag == 1) {
							$(".warning-text").append("<p id='ph_warning'>"  + alerts[marker] + "</p>");	
							email_alerts.push(alerts[marker]);
						} else {
							$("#ph_warning").html(alerts[marker]);
						}
					}

					if (marker == "TDS" && alerts[marker] !== "") {
						if (!hide_alert && !new_alert) {
							$("#alert").css('display', 'inline-block');
						} else if (hide_alert && new_alert) {
							$("#alert").css('display', 'inline-block');
						}
						if (tds_flag == 1) {
							$(".warning-text").append("<p id='tds_warning'>"  + alerts[marker] + "</p>");	
							email_alerts.push(alerts[marker]);
						} else {
							$("#tds_warning").html(alerts[marker]);
						}
					}

					if (marker == "filter" && alerts[marker] !== "") {
						// console.log($("#alert").css('display'));
						if (!hide_alert && !new_alert) {
							$("#alert").css('display', 'inline-block');
						} else if (hide_alert && new_alert) {
							$("#alert").css('display', 'inline-block');
						}
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

					if (marker == "overflow" && alerts[marker] !== "") {
						if (!hide_alert && !new_alert) {
							$("#alert").css('display', 'inline-block');
						} else if (hide_alert && new_alert) {
							$("#alert").css('display', 'inline-block');
						} 
						if (overflow_flag == 1) {
							$(".warning-text").append("<p id='overflow_warning'>"  + alerts[marker] + "</p>");	
							// if (tds_flag == 0 && ph_flag == 0) {
							// 	$(".warning-link").attr('href', "/rain_barrel/filter_life");
							// }
							// email_alerts.push(alerts[marker]);
						} else {
							$("#overflow_warning").html(alerts[marker]);
						}
					}

					if (marker == "temperature" && alerts[marker] !== "") {
						if (!hide_alert && !new_alert) {
							$("#alert").css('display', 'inline-block');
						} else if (hide_alert && new_alert) {
							$("#alert").css('display', 'inline-block');
						}
						if (temperature_flag == 1) {
							$(".warning-text").append("<p id='temperature_warning'>"  + alerts[marker] + "</p>");	
							// if (tds_flag == 0 && ph_flag == 0) {
							// 	$(".warning-link").attr('href', "/rain_barrel/filter_life");
							// }
							// email_alerts.push(alerts[marker]);
						} else {
							$("#temperature_warning").html(alerts[marker]);
						}	
					}
				}

				// clear the alerts
				alerts = {};

				if (window.location.pathname == "/rain_barrel/water_quality") {
					$(".warning-link").hide();
				}

				if ($(".landing").length > 0) {
					$("#alert").css('display', 'none');
				}

				if (email_alerts.length != 0) {
					email_alert(email_alerts);	
				}
				
				
				// hide warning box if everything is ok again
				if ((rain_barrel.ph > 6 && rain_barrel.ph < 8) && rain_barrel.total_dissolved_solids < 400 && rain_barrel.filter_life_remaining >= 8) {
					$("#alert").css('display', 'none');
				}
				// console.log(rain_barrel);
				
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