$(document).ready(function(){function i(i,e){var l=new Date;l.setTime(l.getTime()+864e5),document.cookie=i+"="+e+";expires="+l.toUTCString()}function e(i){var e=document.cookie.match("(^|;) ?"+i+"=([^;]*)(;|$)");return e?e[2]:null}function l(i){var e=i.join();$.ajax({url:"/rain_barrel/email_alert",type:"GET",data:{alerts:e},success:function(){console.log("e-mailed the alert!")}})}$(".filter-reset").length>0&&(console.log($("#fl-remaining .data-bit").html().split(" ")[1]),"300"!==$("#fl-remaining .data-bit").html().split(" ")[1]&&i("filter_life_remaining",$("#fl-remaining .data-bit").html().split(" ")[1])),$(".reset-fl-link").click(function(){var i=e("filter_life_remaining");console.log(i),$.ajax({url:"/rain_barrel/reset_filter_life_remaining",type:"GET",data:{days:i},success:function(i){$("#fl-remaining .data-bit").html(i.filter_life_remaining+" days")}})}),$(".circle-wrap").click(function(){$(".preview").hide(),$(".preview-graphic").hide(),$(".label").show(),$(this).find(".label").hide(),$(this).find(".preview").show(),$("."+$(this).find(".label").attr("id")).show(),$(this).hasClass("circle-fl")}),$("#nav_list a").hover(function(){$("#nav_list a").removeClass("selected"),$(this).removeClass("selected").addClass("selected"),$(".preview").hide(),$(".preview-graphic").hide(),$(".label").show(),$(this).hasClass("wl-link")?($(".wl-label").hide(),$(".circle-wl").find(".preview").show(),$("#water_level").show()):$(this).hasClass("wq-link")?($(".wq-label").hide(),$(".circle-wq").find(".preview").show(),$(".pH-bar").show(),$(".tds-bar").show()):$(this).hasClass("fl-link")&&($(".fl-label").hide(),$(".circle-fl").find(".preview").show(),$(".fl-bar").show())},function(){}),$(".help").click(function(){"none"==$(this).find(".tooltip").css("display")?$(this).find(".tooltip").css("display","block"):$(this).find(".tooltip").css("display","none")}),$(".login-link").click(function(i){i.preventDefault(),"none"==$(".login-popup").css("display")?$(".login-popup").css("display","block"):$(".login-popup").css("display","none")});var t=0,a=0,s=0,r=function(){console.log("in ping"),$.ajax({url:"/rain_barrel/stats",type:"GET",success:function(i){var e=i.current_volume,n=i.capacity_in_gallons,o=parseInt($("#barrel").css("height")),d=(parseInt($("#barrel").css("width")),e/n),h=e/n*100,p=100-h,g=o*d;$("#water_level").animate({top:p+"%",height:g+"px"},1e3,function(){});var c=i.filter_life,_=i.filter_life_remaining,f=100/c;fl_top=100-i.filter_life*f,fl_width_target=c*f,fl_remaining_top=i.filter_life_remaining*f,fl_remaining_width_target=_*f,console.log(fl_top),console.log("remaining: "+fl_remaining_top),$(".fl-bar").animate({top:100-i.filter_life*f+"%",height:fl_width_target+"%"},2e3,function(){}),$(".fl-remaining-bar").animate({height:fl_remaining_width_target+"%"},3e3,function(){});var m=100/14,w=100-i.ph*m,b=o*(i.ph*m/100),u=.25,v=100-i.total_dissolved_solids*u,k=o*(i.total_dissolved_solids*u/100);$(".pH-bar").animate({top:w+"%",height:b+"px"},2e3,function(){}),$(".tds-bar").animate({top:v+"%",height:k+"px"},2e3,function(){}),$(".circle-wl").animate({"margin-top":"-"+g+"px"},1e3,function(){}),$("#pH .data-elt .data-bit").html(i.ph),$("#TDS .data-elt .data-bit").html(i.total_dissolved_solids),$(".wl-gallons .circle-text").html(i.current_volume+" gallons"),$(".wl-percent .circle-text").html(Math.floor(h)+"% full");var y;ph_ideal=i.ph>6.5&&i.ph<7.5,tds_ideal=i.total_dissolved_solids<=50,ph_drinkable=i.ph>=6&&i.ph<=6.5||i.ph<=8&&i.ph>=7.5,tds_drinkable=i.total_dissolved_solids>50&&i.total_dissolved_solids<=400,ph_unsafe=i.ph<6||i.ph>8,tds_unsafe=i.total_dissolved_solids>400,y=ph_unsafe||tds_unsafe?"unsafe":ph_drinkable||tds_drinkable?"drinkable":"ideal",$(".wq-status .circle-text").html(y+" <small> status <small> "),ph_ideal?$(".pH-bar").css("background","green"):ph_drinkable?$(".pH-bar").css("background","yellow"):$(".pH-bar").css("background","red"),tds_ideal?$(".tds-bar").css("background","green"):tds_drinkable?$(".tds-bar").css("background","yellow"):$(".tds-bar").css("background","red");var C={pH:"",TDS:"",filter:""};i.ph<6?(C.pH="",C.pH="pH is too low ("+i.ph+")",t++,$("#pH .data-elt .data-bit").removeClass("green_highlight yellow_highlight"),$("#pH .data-elt .data-bit").addClass("red_highlight"),i.total_dissolved_solids>400||($("#pH .fix").css("display","block"),$("#pH .fix").addClass("highlight")),$(".logo span").css("color","red")):i.ph>8?(C.pH="",C.pH="pH is too high ("+i.ph+")",t++,$("#pH .data-elt .data-bit").removeClass("green_highlight yellow_highlight"),$("#pH .data-elt .data-bit").addClass("red_highlight"),i.total_dissolved_solids>400||($("#pH .fix").css("display","block"),$("#pH .fix").addClass("highlight")),$(".logo span").css("color","red")):i.ph>=6&&i.ph<=6.5||i.ph<=8&&i.ph>=7.5?($("#pH .data-elt .data-bit").removeClass("green_highlight red_highlight"),$("#pH .data-elt .data-bit").addClass("yellow_highlight"),$(".logo span").css("color","yellow"),$("#pH .fix").removeClass("highlight")):i.ph>6.5&&i.ph<7.5&&($("#pH .data-elt .data-bit").removeClass("yellow_highlight red_highlight"),$("#pH .data-elt .data-bit").addClass("green_highlight"),$(".logo span").css("color","green"),$("#pH .fix").removeClass("highlight")),i.total_dissolved_solids<=50?($("#TDS .data-elt .data-bit").removeClass("yellow_highlight red_highlight"),$("#TDS .data-elt .data-bit").addClass("green_highlight"),$(".logo span").css("color","green"),$("#TDS .fix").removeClass("highlight")):i.total_dissolved_solids>50&&i.total_dissolved_solids<=400?($("#TDS .data-elt .data-bit").removeClass("green_highlight red_highlight"),$("#TDS .data-elt .data-bit").addClass("yellow_highlight"),$(".logo span").css("color","yellow"),$("#TDS .fix").removeClass("highlight")):i.total_dissolved_solids>400&&(C.TDS="",C.TDS="TDS is too high ("+i.total_dissolved_solids+")",a++,$("#TDS .data-elt .data-bit").removeClass("green_highlight yellow_highlight"),$("#TDS .data-elt .data-bit").addClass("red_highlight"),$("#TDS .fix").css("display","block"),$("#TDS .fix").addClass("highlight"),$(".logo span").css("color","red")),console.log(i),console.log(i.filter_life_remaining),i.filter_life_remaining<8&&(C.filter="",C.filter="Filter life remaining: "+i.filter_life_remaining+" days",s++,$(".logo span").css("color","red")),email_alerts=[];for(marker in C)"pH"==marker&&""!==C[marker]&&($("#alert").css("display","block"),1==t?($(".warning-text").append("<p id='ph_warning'>"+C[marker]+"</p>"),email_alerts.push(C[marker])):$("#ph_warning").html(C[marker])),"TDS"==marker&&""!==C[marker]&&($("#alert").css("display","block"),1==a?($(".warning-text").append("<p id='tds_warning'>"+C[marker]+"</p>"),email_alerts.push(C[marker])):$("#tds_warning").html(C[marker])),"filter"==marker&&""!==C[marker]&&($("#alert").css("display","block"),1==s?($(".warning-text").append("<p id='filter_warning'>"+C[marker]+"</p>"),0==a&&0==t&&$(".warning-link").attr("href","/rain_barrel/filter_life"),email_alerts.push(C[marker])):$("#filter_warning").html(C[marker]));0!=email_alerts.length&&l(email_alerts),i.ph>6&&i.ph<8&&i.total_dissolved_solids<400&&i.filter_life_remaining>=8&&$("#alert").css("display","none"),console.log(i),setTimeout(function(){r()},1e3)}})};r(),$(".fix_link").click(function(){"none"==$(this).parent().parent().find(".fix").css("display")?($(this).parent().parent().find(".fix").slideDown("slow"),$(this).parent().find(".triangle-down").css("left","106%"),$(this).html("Close instruction text"),$(this).parent().find(".triangle-down").stop().animate({rotation:180},{duration:500,step:function(i){$(this).css({transform:"rotate("+i+"deg)"})}})):($(this).parent().parent().find(".fix").slideUp("slow"),$(this).parent().find(".triangle-down").css("left","103%"),$(this).html("Click for intructions when pH levels are unsafe "),$(this).parent().find(".triangle-down").stop().animate({rotation:360},{duration:500,step:function(i){$(this).css({transform:"rotate("+i+"deg)"})}}))})});