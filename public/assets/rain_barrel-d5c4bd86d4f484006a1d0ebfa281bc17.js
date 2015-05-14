$(document).ready(function(){function e(e,a){var t=new Date;t.setTime(t.getTime()+864e5),document.cookie=e+"="+a+";expires="+t.toUTCString()}function a(e){var a=document.cookie.match("(^|;) ?"+e+"=([^;]*)(;|$)");return a?a[2]:null}function t(e){var a=e.join();$.ajax({url:"/rain_barrel/email_alert",type:"GET",data:{alerts:a},success:function(){console.log("e-mailed the alert!")}})}"/"==window.location.pathname?$("body").addClass($(".landing-page").length>0?"landing":"home"):"/rain_barrel/water_usage"==window.location.pathname&&$("body").addClass("water_usage");var l=!1;$("#close-alert").click(function(){$("#alert").slideUp(),l=!0}),$(".filter-reset").length>0&&(console.log($("#fl-remaining .data-bit").html().split(" ")[1]),"300"!==$("#fl-remaining .data-bit").html().split(" ")[1]&&e("filter_life_remaining",$("#fl-remaining .data-bit").html().split(" ")[1])),$(".reset-fl-link").click(function(){var e=a("filter_life_remaining");console.log(e),$.ajax({url:"/rain_barrel/reset_filter_life_remaining",type:"GET",data:{days:e},success:function(e){$("#fl-remaining .data-bit").html(e.filter_life_remaining+" days")}})}),prev_text="",$(".wq-label, .wl-label, .fl-label").on({mouseenter:function(){prev_text=$(this).children(".circle-prev-text").html(),$(this).children(".circle-prev-text").html("")},mouseleave:function(){$(this).children(".circle-prev-text").html(prev_text)}}),$(".circle-wrap").click(function(){$(".preview").hide(),$(".preview-graphic").hide(),$(".label").show(),$(this).find(".label").hide(),$(this).find(".preview").show(),$("."+$(this).find(".label").attr("id")).show(),$("#wrapper .circle-wrap").addClass("inactive"),$(this).removeClass("inactive"),$(this).addClass("active"),$("#nav_list div").removeClass("selected"),$(this).hasClass("circle-wl")?$(".wl-link").siblings(".legend").addClass("selected"):$(this).hasClass("circle-wq")?($(".wq-link").siblings(".legend").addClass("selected"),$(".pH-bar").animate({top:wq_ph_top_target+"%",height:wq_ph_height_target+"px"},2e3,function(){}),$(".tds-bar").animate({top:wq_tds_top_target+"%",height:wq_tds_height_target+"px"},2e3,function(){})):($(".fl-link").siblings(".legend").addClass("selected"),$(".fl-bar").animate({top:fl_top+"%",height:fl_width_target+"%"},2e3,function(){}),$(".fl-remaining-bar").animate({height:fl_remaining_width_target+"%"},2e3,function(){})),$(this).hasClass("circle-fl")}),$("#nav_list a").hover(function(){$("#nav_list div").removeClass("selected"),$(this).siblings(".legend").removeClass("selected").addClass("selected"),$(".preview").hide(),$(".preview-graphic").hide(),$(".label").show(),$(this).hasClass("wl-link")?($(".wl-label").hide(),$(".circle-wl").find(".preview").show(),$("#water_level").show(),$("#wrapper .circle-wrap").removeClass("active"),$("#wrapper .circle-wrap").addClass("inactive"),$(".circle-wl").removeClass("inactive"),$(".circle-wl").addClass("active")):$(this).hasClass("wq-link")?($(".wq-label").hide(),$(".circle-wq").find(".preview").show(),$(".pH-bar").show(),$(".tds-bar").show(),$("#wrapper .circle-wrap").removeClass("active"),$("#wrapper .circle-wrap").addClass("inactive"),$(".circle-wq").removeClass("inactive"),$(".circle-wq").addClass("active"),$(".pH-bar").animate({top:wq_ph_top_target+"%",height:wq_ph_height_target+"px"},2e3,function(){}),$(".tds-bar").animate({top:wq_tds_top_target+"%",height:wq_tds_height_target+"px"},2e3,function(){}),$(".bar-label1").show(),$(".bar-label2").show()):$(this).hasClass("fl-link")&&($(".fl-label").hide(),$(".circle-fl").find(".preview").show(),$(".fl-bar").show(),$(".fl-remaining-bar").show(),$(".filter-wrapper").show(),$("#wrapper .circle-wrap").removeClass("active"),$("#wrapper .circle-wrap").addClass("inactive"),$(".circle-fl").removeClass("inactive"),$(".circle-fl").addClass("active"),$(".fl-bar").animate({top:fl_top+"%",height:fl_width_target+"%"},2e3,function(){}),$(".fl-remaining-bar").animate({height:fl_remaining_width_target+"%"},2e3,function(){}))},function(){}),$(".help").click(function(){"none"==$(this).find(".tooltip").css("display")?$(this).find(".tooltip").css("display","block"):$(this).find(".tooltip").css("display","none")}),$(".login-link").click(function(e){e.preventDefault(),"none"==$(".login-popup").css("display")?$(".login-popup").css("display","block"):$(".login-popup").css("display","none")});var i=0,s=0,r=0,n=0,o=0,d=function(){$.ajax({url:"/rain_barrel/stats",type:"GET",success:function(e){var a;e.current_volume>=0&&(a=e.current_volume);var c=e.capacity_in_gallons,h=parseInt($("#barrel").css("height")),p=(parseInt($("#barrel").css("width")),a/c),g=a/c*100,_=100-g,m=h*p;0>_&&(_=-1),m>h&&(m=h+1),$("#water_level").animate({top:_+"%",height:m+"px"},1e3,function(){}),fl=e.filter_life,fl_remaining=e.filter_life_remaining,fl_scale=100/fl,fl_top=100-e.filter_life*fl_scale,fl_width_target=fl*fl_scale,fl_remaining_top=e.filter_life_remaining*fl_scale,fl_remaining_width_target=fl_remaining*fl_scale,fl_remaining_width_target<12&&(fl_remaining_width_target=12),fl_top<12&&(fl_top=12);var f=100/14;wq_ph_top_target=100-e.ph*f,wq_ph_height_target=h*(e.ph*f/100);var w=.25;wq_tds_top_target=100-e.total_dissolved_solids*w,wq_tds_height_target=h*(e.total_dissolved_solids*w/100),wq_tds_height_target>h&&(wq_tds_height_target=h),wq_tds_top_target<0&&(wq_tds_top_target=0),$(".pH-bar .bar-data").html(format(e.ph,"")),$(".tds-bar .bar-data").html(format(e.total_dissolved_solids,"")),$(".circle-wrap").on("click",function(){$(this).hasClass("circle-fl")?($(".fl-bar").animate({top:100-e.filter_life*fl_scale+"%"},2e3,function(){}),$(".fl-remaining-bar").animate({height:fl_remaining_width_target+"%"},3e3,function(){})):$(this).hasClass("circle-wq")?($(".pH-bar").animate({top:wq_ph_top_target+"%",height:wq_ph_height_target+"px"},2e3,function(){}),$(".tds-bar").animate({top:wq_tds_top_target+"%",height:wq_tds_height_target+"px"},2e3,function(){}),$(".bar-label1").css("display","block"),$(".bar-label2").css("display","block")):$(this).hasClass("circle-wl")&&$("#water_level").animate({top:_+"%",height:m+"px"},1e3,function(){})}),$(".circle-wl").animate({"margin-top":"-"+m+"px"},1e3,function(){}),$("#pH .data-elt .data-bit").html(e.ph),$("#TDS .data-elt .data-bit").html(e.total_dissolved_solids),$(".wl-gallons .circle-text").html(Math.min(Math.round(100*e.current_volume)/100,e.capacity_in_gallons)+" gallons"),$(".wl-percent .circle-text").html(Math.min(Math.floor(g),100)+"% full");var u;ph_ideal=e.ph>6.5&&e.ph<7.5,tds_ideal=e.total_dissolved_solids<=50,ph_drinkable=e.ph>=6&&e.ph<=6.5||e.ph<=8&&e.ph>=7.5,tds_drinkable=e.total_dissolved_solids>50&&e.total_dissolved_solids<=400,ph_unsafe=e.ph<6||e.ph>8,tds_unsafe=e.total_dissolved_solids>400,u=ph_unsafe||tds_unsafe?"unsafe":ph_drinkable||tds_drinkable?"drinkable":"ideal",$(".wq-status .circle-text").html(u+" <small> status <small> "),ph_ideal?$(".pH-bar").css("background","green"):ph_drinkable?$(".pH-bar").css("background","yellow"):$(".pH-bar").css("background","red"),tds_ideal?$(".tds-bar").css("background","green"):tds_drinkable?$(".tds-bar").css("background","yellow"):$(".tds-bar").css("background","red"),$(".fl-status .circle-text").html(e.filter_life_remaining+"  <small> days </small>");var v={pH:"",TDS:"",filter:"",overflow:"",temperature:""};e.ph<6?(v.pH="",v.pH="pH is too low ("+e.ph+")",i++,$("#pH .data-elt .data-bit").removeClass("green_highlight yellow_highlight"),$("#pH .data-elt .data-bit").addClass("red_highlight"),e.total_dissolved_solids>400||($("#pH .fix").css("display","block"),$("#pH .fix").addClass("highlight")),$(".logo .logo-letter").css("color","red"),$("#pH .data-status").removeClass("unsafe-icon legend-box checkmark"),$("#pH .data-status").addClass("unsafe-icon")):e.ph>8?(v.pH="",v.pH="pH is too high ("+e.ph+")",i++,$("#pH .data-elt .data-bit").removeClass("green_highlight yellow_highlight"),$("#pH .data-elt .data-bit").addClass("red_highlight"),e.total_dissolved_solids>400||($("#pH .fix").css("display","block"),$("#pH .fix").addClass("highlight")),$(".logo .logo-letter").css("color","red"),$("#pH .data-status").removeClass("unsafe-icon legend-box checkmark"),$("#pH .data-status").addClass("unsafe-icon")):e.ph>=6&&e.ph<=6.5||e.ph<=8&&e.ph>=7.5?($("#pH .data-elt .data-bit").removeClass("green_highlight red_highlight"),$("#pH .data-elt .data-bit").addClass("yellow_highlight"),$(".logo .logo-letter").css("color","yellow"),$("#pH .fix").removeClass("highlight"),$("#pH .data-status").removeClass("unsafe-icon legend-box checkmark"),$("#pH .data-status").addClass("legend-box")):e.ph>6.5&&e.ph<7.5&&($("#pH .data-elt .data-bit").removeClass("yellow_highlight red_highlight"),$("#pH .data-elt .data-bit").addClass("green_highlight"),$(".logo .logo-letter").css("color","green"),$("#pH .fix").removeClass("highlight"),$("#pH .data-status").removeClass("unsafe-icon legend-box checkmark"),$("#pH .data-status").addClass("checkmark").html('<div class="checkmark_circle"></div><div class="checkmark_stem"></div><div class="checkmark_kick"></div>')),e.total_dissolved_solids<=50?($("#TDS .data-elt .data-bit").removeClass("yellow_highlight red_highlight"),$("#TDS .data-elt .data-bit").addClass("green_highlight"),$(".logo .logo-letter").css("color","green"),$("#TDS .fix").removeClass("highlight"),$("#TDS .data-status").removeClass("unsafe-icon legend-box checkmark"),$("#TDS .data-status").addClass("checkmark").html('<div class="checkmark_circle"></div><div class="checkmark_stem"></div><div class="checkmark_kick"></div>')):e.total_dissolved_solids>50&&e.total_dissolved_solids<=400?($("#TDS .data-elt .data-bit").removeClass("green_highlight red_highlight"),$("#TDS .data-elt .data-bit").addClass("yellow_highlight"),$(".logo .logo-letter").css("color","yellow"),$("#TDS .fix").removeClass("highlight"),$("#TDS .data-status").removeClass("unsafe-icon legend-box checkmark"),$("#TDS .data-status").addClass("legend-box")):e.total_dissolved_solids>400&&(v.TDS="",v.TDS="TDS is too high ("+e.total_dissolved_solids+")",s++,$("#TDS .data-elt .data-bit").removeClass("green_highlight yellow_highlight"),$("#TDS .data-elt .data-bit").addClass("red_highlight"),$("#TDS .fix").css("display","block"),$("#TDS .fix").addClass("highlight"),$(".logo .logo-letter").css("color","red"),$("#TDS .data-status").removeClass("unsafe-icon legend-box checkmark"),$("#TDS .data-status").addClass("unsafe-icon")),e.filter_life_remaining<8&&(v.filter="",v.filter="Filter life remaining: "+e.filter_life_remaining+" days",r++,$(".logo .logo-letter").css("color","red")),e.current_volume>=e.capacity_in_gallons&&(v.overflow="",v.overflow="Barrel is overflowing: drain to collect more water",o++,$(".logo .logo-letter").css("color","red")),e.temperature<32?(v.temperature="",v.temperature="Temperature is below freezing: You may want to disconnect your rain barrel",n++,$(".logo .logo-letter").css("color","red"),$("#temp .data-status").removeClass("unsafe-icon legend-box checkmark"),$("#temp .data-status").addClass("unsafe-icon")):($("#temp .data-status").removeClass("unsafe-icon legend-box checkmark"),$("#temp .data-status").addClass("checkmark").html('<div class="checkmark_circle"></div><div class="checkmark_stem"></div><div class="checkmark_kick"></div>'),$(".logo .logo-letter").css("color","green")),email_alerts=[];var k=!1;(1==i||1==s||1==r||1==o||1==n)&&(k=!0),console.log(l);for(marker in v)"pH"==marker&&""!==v[marker]&&(l?l&&k&&$("#alert").css("display","block"):$("#alert").css("display","block"),1==i?($(".warning-text").append("<p id='ph_warning'>"+v[marker]+"</p>"),email_alerts.push(v[marker])):$("#ph_warning").html(v[marker])),"TDS"==marker&&""!==v[marker]&&(l||k?l&&k&&$("#alert").css("display","block"):$("#alert").css("display","block"),1==s?($(".warning-text").append("<p id='tds_warning'>"+v[marker]+"</p>"),email_alerts.push(v[marker])):$("#tds_warning").html(v[marker])),"filter"==marker&&""!==v[marker]&&(l||k?l&&k&&$("#alert").css("display","block"):$("#alert").css("display","block"),1==r?($(".warning-text").append("<p id='filter_warning'>"+v[marker]+"</p>"),0==s&&0==i&&$(".warning-link").attr("href","/rain_barrel/filter_life"),email_alerts.push(v[marker])):$("#filter_warning").html(v[marker])),"overflow"==marker&&""!==v[marker]&&(l||k?l&&k&&$("#alert").css("display","block"):$("#alert").css("display","block"),1==o?$(".warning-text").append("<p id='overflow_warning'>"+v[marker]+"</p>"):$("#overflow_warning").html(v[marker])),"temperature"==marker&&""!==v[marker]&&(l||k?l&&k&&$("#alert").css("display","inline-block"):$("#alert").css("display","inline-block"),1==n?$(".warning-text").append("<p id='temperature_warning'>"+v[marker]+"</p>"):$("#temperature_warning").html(v[marker]));v={},"/rain_barrel/water_quality"==window.location.pathname&&$(".warning-link").hide(),$(".landing").length>0&&$("#alert").css("display","none"),0!=email_alerts.length&&t(email_alerts),e.ph>6&&e.ph<8&&e.total_dissolved_solids<400&&e.filter_life_remaining>=8&&$("#alert").css("display","none"),setTimeout(function(){d()},1e3)}})};d(),$(".fix_link").click(function(){"none"==$(this).parent().parent().find(".fix").css("display")?($(this).parent().parent().find(".fix").slideDown("slow"),$(this).parent().find(".triangle-down").css("left","106%"),$(this).html("Close instruction text"),$(this).parent().find(".triangle-down").stop().animate({rotation:180},{duration:500,step:function(e){$(this).css({transform:"rotate("+e+"deg)"})}})):($(this).parent().parent().find(".fix").slideUp("slow"),$(this).parent().find(".triangle-down").css("left","103%"),$(this).html("Click for intructions when pH levels are unsafe "),$(this).parent().find(".triangle-down").stop().animate({rotation:360},{duration:500,step:function(e){$(this).css({transform:"rotate("+e+"deg)"})}}))})});