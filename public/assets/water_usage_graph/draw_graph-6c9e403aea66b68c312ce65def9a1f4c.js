function draw(t,e,a,o,r,n){function l(t){for(var e=0;e<t.length;e++)t[e].load_volume=+t[e].load_volume;return t}function i(){var o="water_collected",r="Days",n=c(r,o);n.success(function(n){n=l(n),n=convertToMilliseconds(n);var i=setXDomain(r,t,a),c=setYDomain(n,e,a);d3.select("#date-period").html(""+strftime("%b %e %Y",new Date(i.domain()[0]))+" - "+strftime("%b %e %Y",new Date(i.domain()[1])));var s=d3.svg.axis().scale(i).orient("bottom").ticks(d3.time.days,1).tickFormat(d3.time.format("%d")).tickSize(0).tickPadding(8),m=d3.select("body").append("div").attr("class","graph-tooltip"),v=d3.select("#graphContainer").insert("svg","#usage_stats").attr("class","chart").attr("width",t).attr("height",e).append("g").attr("transform","translate("+a.left+","+a.top+")").attr("id","graph");d(n,v,i,c,m,s,r,o),toolTipMouseOver(m),$("ul#time_scale li, #metric_select").on("click change",function(){$(this).hasClass("time-period")&&($("#time_scale li").removeClass("current"),$(this).addClass("current"));var t=$("ul#time_scale li.current").text(),e=$("#metric_select option:selected").attr("value").split(" ");e=e[0]+" "+e[1],u(v,i,c,s,m,t,e)})})}function u(t,e,a,o,r,n,i){var u="Update",s=c(n,i);s.success(function(c){if(c=l(c),c=convertToMilliseconds(c),"Weeks"==n||"Months"==n)for(var s=0;s<c.length;s++)c[s].load_volume=c[s].total_load_volume;updateXDomain(c,e,n),updateYDomain(c,a,n),updateTickFormat(o,e,n),d3.select("#date-period").html(""+strftime("%b %e %Y",new Date(e.domain()[0]))+" - "+strftime("%b %e %Y",new Date(e.domain()[1]))),d(c,t,e,a,r,o,n,i,u),toolTipMouseOver(r)})}function d(t,n,l,i,u,d,c,v,f){console.log(t);var _=n.selectAll("rect").data(t,function(t){return t.date}),p=n.selectAll("text").data(t,function(t){return t.date}),x=n.selectAll("circle").data(t,function(t){return t.date}),h="#eee",g="rgba(65,131,196,0.4)",y="rgba(220,131,65,0.6)",b="rgba(196,131,65,0.0)";"Update"==f&&(_.transition().duration(m).delay(s).attr("x",function(t){return l(t.date)}).attr("y",function(t){return 0==t.load_volume?i(t.load_volume)-30:i(t.load_volume)}).attr("height",function(t){return 0==t.load_volume?30:e-a.top-a.bottom-i(t.load_volume)}).style("fill",function(t){return 0==t.load_volume?h:g}),p.transition().duration(m).delay(s).attr("x",function(t){return l(new Date(t.date))+o/2}).attr("y",function(t){return i(t.load_volume)+20}).text(function(t){return 0==t.load_volume?null:format(t.load_volume,v)}),x.transition().duration(m).delay(s).attr("cx",function(t){return l(new Date(t.date))+o/2}).attr("cy",function(t){return i(t.load_volume)+20})),_.enter().append("rect").attr("x",function(t){return l(t.date)}).attr("y",function(t){return 0==t.load_volume?i(t.load_volume)-30:i(t.load_volume)}).attr("height",function(t){return 0==t.load_volume?30:e-a.top-a.bottom-i(t.load_volume)}).attr("width",o).attr("class","bar").style("fill",function(t){return 0==t.load_volume?h:g}).on("mouseover",function(t,e){return barMouseOver(t,e,l,i,_,u,r,$("ul#time_scale li.current").text(),$("#metric_select option:selected").attr("value"),o)}).on("mouseout",function(t,e){return barMouseOut(t,e,_,u)}),p.enter().append("text").attr("x",function(t){return l(new Date(t.date))+o/2}).attr("y",function(e){return i(e.load_volume)>.125*d3.max(t,function(t){return t.load_volume})?i(e.load_volume)+20:i(e.load_volume)+20}).attr("text-anchor","middle").text(function(t){return 0==t.load_volume?null:format(t.load_volume)}),"Days"==c&&x.enter().append("circle").attr("cx",function(t){return l(t.date)}).attr("cy",function(t){return 0==t.load_volume?i(t.load_volume)-30:i(t.load_volume)}).attr("r",8).attr("class","circle").style("fill",function(t){return 0==t.load_volume?b:y}),n.append("g").attr("class","x axis").attr("transform","translate("+padding+","+(e-a.bottom-a.top)+")").call(d).selectAll("text").attr("dx",function(){return"Days"==c?"0.5em":"Weeks"==c?"1.5em":"1.05em"}),"Update"==f&&(_.exit().remove(),p.exit().remove(),x.exit().remove()),x.exit().remove()}function c(t,e){return $.ajax({url:"/rain_barrel/get_history.json",data:{metric:e,time:t},dataType:"json"})}var s=function(t,e){return 5*e},m=750;e=e-a.top-a.bottom,padding=0,i(n)}