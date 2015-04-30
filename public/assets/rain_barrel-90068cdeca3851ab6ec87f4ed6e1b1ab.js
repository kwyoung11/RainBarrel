$(document).ready(function(){function i(i,l){var e=new Date;e.setTime(e.getTime()+864e5),document.cookie=i+"="+l+";expires="+e.toUTCString()}function l(i){var l=document.cookie.match("(^|;) ?"+i+"=([^;]*)(;|$)");return l?l[2]:null}function e(i){var l=i.join();$.ajax({url:"/rain_barrel/email_alert",type:"GET",data:{alerts:l},success:function(){console.log("e-mailed the alert!")}})}$(".filter-reset").length>0&&(console.log($("#fl-remaining .data-bit").html().split(" ")[1]),"300"!==$("#fl-remaining .data-bit").html().split(" ")[1]&&i("filter_life_remaining",$("#fl-remaining .data-bit").html().split(" ")[1])),$(".reset-fl-link").click(function(){var i=l("filter_life_remaining");console.log(i),$.ajax({url:"/rain_barrel/reset_filter_life_remaining",type:"GET",data:{days:i},success:function(i){$("#fl-remaining .data-bit").html(i.filter_life_remaining+" days")}})}),$(".circle-wrap").click(function(){$(".preview").hide(),$(".preview-graphic").hide(),$(".label").show(),$(this).find(".label").hide(),$(this).find(".preview").show(),$("."+$(this).find(".label").attr("id")).show()}),$("#nav_list a").hover(function(){$("#nav_list a").removeClass("selected"),$(this).removeClass("selected").addClass("selected"),$(".preview").hide(),$(".preview-graphic").hide(),$(".label").show(),$(this).hasClass("wl-link")?($(".wl-label").hide(),$(".circle-wl").find(".preview").show(),$("#water_level").show()):$(this).hasClass("wq-link")?($(".wq-label").hide(),$(".circle-wq").find(".preview").show(),$(".pH-bar").show(),$(".tds-bar").show()):$(this).hasClass("fl-link")&&($(".fl-label").hide(),$(".circle-fl").find(".preview").show(),$(".fl-bar").show())},function(){}),$(".help").click(function(){"none"==$(this).find(".tooltip").css("display")?$(this).find(".tooltip").css("display","block"):$(this).find(".tooltip").css("display","none")}),$(".login-link").click(function(i){i.preventDefault(),"none"==$(".login-popup").css("display")?$(".login-popup").css("display","block"):$(".login-popup").css("display","none")});var t=0,a=0,s=0,r=function(){console.log("in ping"),$.ajax({url:"/rain_barrel/stats",type:"GET",success:function(i){var l=i.current_volume,n=i.capacity_in_gallons,o=parseInt($("#barrel").css("height")),d=l/n,h=l/n*100,p=100-h,g=o*d;$("#water_level").animate({top:p+"%",height:g+"px"},1e3,function(){});var c=100/14,_=100-i.ph*c,f=o*(i.ph*c/100),m=.25,b=100-i.total_dissolved_solids*m,u=o*(i.total_dissolved_solids*m/100);$(".pH-bar").animate({top:_+"%",height:f+"px"},2e3,function(){}),$(".tds-bar").animate({top:b+"%",height:u+"px"},2e3,function(){}),$(".circle-wl").animate({"margin-top":"-"+g+"px"},1e3,function(){}),$("#pH .data-elt .data-bit").html(i.ph),$("#TDS .data-elt .data-bit").html(i.total_dissolved_solids),$(".wl-gallons .circle-text").html(i.current_volume+" gallons"),$(".wl-percent .circle-text").html(Math.floor(h)+"% full");var w;ph_ideal=i.ph>6.5&&i.ph<7.5,tds_ideal=i.total_dissolved_solids<=50,ph_drinkable=i.ph>=6&&i.ph<=6.5||i.ph<=8&&i.ph>=7.5,tds_drinkable=i.total_dissolved_solids>50&&i.total_dissolved_solids<=400,ph_unsafe=i.ph<6||i.ph>8,tds_unsafe=i.total_dissolved_solids>400,w=ph_unsafe||tds_unsafe?"unsafe":ph_drinkable||tds_drinkable?"drinkable":"ideal",$(".wq-status .circle-text").html(w+" <small> status <small> "),ph_ideal?$(".pH-bar").css("background","green"):ph_drinkable?$(".pH-bar").css("background","yellow"):$(".pH-bar").css("background","red"),tds_ideal?$(".tds-bar").css("background","green"):tds_drinkable?$(".tds-bar").css("background","yellow"):$(".tds-bar").css("background","red");var v={pH:"",TDS:"",filter:""};i.ph<6?(v.pH="",v.pH="pH is too low ("+i.ph+")",t++,$("#pH .data-elt .data-bit").removeClass("green_highlight yellow_highlight"),$("#pH .data-elt .data-bit").addClass("red_highlight"),i.total_dissolved_solids>400||($("#pH .fix").css("display","block"),$("#pH .fix").addClass("highlight")),$(".logo span").css("color","red")):i.ph>8?(v.pH="",v.pH="pH is too high ("+i.ph+")",t++,$("#pH .data-elt .data-bit").removeClass("green_highlight yellow_highlight"),$("#pH .data-elt .data-bit").addClass("red_highlight"),i.total_dissolved_solids>400||($("#pH .fix").css("display","block"),$("#pH .fix").addClass("highlight")),$(".logo span").css("color","red")):i.ph>=6&&i.ph<=6.5||i.ph<=8&&i.ph>=7.5?($("#pH .data-elt .data-bit").removeClass("green_highlight red_highlight"),$("#pH .data-elt .data-bit").addClass("yellow_highlight"),$(".logo span").css("color","yellow"),$("#pH .fix").removeClass("highlight")):i.ph>6.5&&i.ph<7.5&&($("#pH .data-elt .data-bit").removeClass("yellow_highlight red_highlight"),$("#pH .data-elt .data-bit").addClass("green_highlight"),$(".logo span").css("color","green"),$("#pH .fix").removeClass("highlight")),i.total_dissolved_solids<=50?($("#TDS .data-elt .data-bit").removeClass("yellow_highlight red_highlight"),$("#TDS .data-elt .data-bit").addClass("green_highlight"),$(".logo span").css("color","green"),$("#TDS .fix").removeClass("highlight")):i.total_dissolved_solids>50&&i.total_dissolved_solids<=400?($("#TDS .data-elt .data-bit").removeClass("green_highlight red_highlight"),$("#TDS .data-elt .data-bit").addClass("yellow_highlight"),$(".logo span").css("color","yellow"),$("#TDS .fix").removeClass("highlight")):i.total_dissolved_solids>400&&(v.TDS="",v.TDS="TDS is too high ("+i.total_dissolved_solids+")",a++,$("#TDS .data-elt .data-bit").removeClass("green_highlight yellow_highlight"),$("#TDS .data-elt .data-bit").addClass("red_highlight"),$("#TDS .fix").css("display","block"),$("#TDS .fix").addClass("highlight"),$(".logo span").css("color","red")),console.log(i),console.log(i.filter_life_remaining),i.filter_life_remaining<8&&(v.filter="",v.filter="Filter life remaining: "+i.filter_life_remaining+" days",s++,$(".logo span").css("color","red")),email_alerts=[];for(marker in v)"pH"==marker&&""!==v[marker]&&($("#alert").css("display","block"),1==t?($(".warning-text").append("<p id='ph_warning'>"+v[marker]+"</p>"),email_alerts.push(v[marker])):$("#ph_warning").html(v[marker])),"TDS"==marker&&""!==v[marker]&&($("#alert").css("display","block"),1==a?($(".warning-text").append("<p id='tds_warning'>"+v[marker]+"</p>"),email_alerts.push(v[marker])):$("#tds_warning").html(v[marker])),"filter"==marker&&""!==v[marker]&&($("#alert").css("display","block"),1==s?($(".warning-text").append("<p id='filter_warning'>"+v[marker]+"</p>"),0==a&&0==t&&$(".warning-link").attr("href","/rain_barrel/filter_life"),email_alerts.push(v[marker])):$("#filter_warning").html(v[marker]));0!=email_alerts.length&&e(email_alerts),i.ph>6&&i.ph<8&&i.total_dissolved_solids<400&&i.filter_life_remaining>=8&&$("#alert").css("display","none"),console.log(i),setTimeout(function(){r()},1e3)}})};r(),$(".fix_link").click(function(){"none"==$(this).parent().parent().find(".fix").css("display")?($(this).parent().parent().find(".fix").slideDown("slow"),$(this).parent().find(".triangle-down").css("left","106%"),$(this).html("Close instruction text"),$(this).parent().find(".triangle-down").stop().animate({rotation:180},{duration:500,step:function(i){$(this).css({transform:"rotate("+i+"deg)"})}})):($(this).parent().parent().find(".fix").slideUp("slow"),$(this).parent().find(".triangle-down").css("left","103%"),$(this).html("Click for intructions when pH levels are unsafe "),$(this).parent().find(".triangle-down").stop().animate({rotation:360},{duration:500,step:function(i){$(this).css({transform:"rotate("+i+"deg)"})}}))})});