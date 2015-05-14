function convertToMilliseconds(t){for(i=0;i<t.length;i++)t[i].date=new Date(t[i].date).getTime();return t}function format(t,e){var o=d3.formatPrefix(t,1),a=o.scale(t),n=d3.round(a,1);return"Time"==e?(t/3600).toFixed(1)+"h":n+o.symbol}function chooseToolTipDateFormat(t){return d3.time.format("Days"==t?"%A %b %e":"Weeks"==t?"%b %d":"%B")}function updateXDomain(t,e,o){e.domain("One-Week"==o?[d3.time.day.offset(new Date,-7),d3.time.day.offset(new Date,0)]:"Days"==o?[d3.time.day.offset(new Date,-30),d3.time.day.offset(new Date,-14)]:"Weeks"==o?[d3.time.week.offset(new Date,-22),d3.time.week.offset(new Date,0)]:"Months"==o?[d3.time.month.offset(new Date,-12),d3.time.month.offset(new Date,0)]:[d3.time.day.offset(new Date,-22),d3.time.day.offset(new Date,0)])}function updateYDomain(t,e){console.log("d3.max: "+d3.max(t,function(t){return t.load_volume})),e.domain([0,d3.max(t,function(t){return parseInt(t.load_volume)})])}function setXDomain(t,e,o){return"One-Week"==t?d3.time.scale().domain([d3.time.day.offset(new Date,-7),d3.time.day.offset(new Date,0)]).rangeRound([0,e-o.left-o.right]):"Days"==t?d3.time.scale().domain([d3.time.day.offset(new Date,-30),d3.time.day.offset(new Date,-14)]).rangeRound([0,e-o.left-o.right]):"Weeks"==t?d3.time.scale().domain([d3.time.week.offset(new Date,-22),d3.time.day.offset(new Date,0)]).rangeRound([0,e-o.left-o.right]):"Months"==t?d3.time.scale().domain([d3.time.month.offset(new Date,-12),d3.time.day.offset(new Date,0)]).rangeRound([0,e-o.left-o.right]):d3.time.scale().domain([d3.time.day.offset(new Date,-22),d3.time.day.offset(new Date,0)]).rangeRound([0,e-o.left-o.right])}function setYDomain(t,e,o){return d3.scale.linear().domain([0,d3.max(t,function(t){return t.load_volume})]).range([e-o.top-o.bottom,0])}function updateTickFormat(t,e,o){"One-Week"==o?t.scale(e).ticks(d3.time.days,1).tickFormat(d3.time.format("%d")):"Days"==o?t.scale(e).ticks(d3.time.days,1).tickFormat(d3.time.format("%d")):"Weeks"==o?t.scale(e).ticks(d3.time.weeks,1).tickFormat(d3.time.format("%W")):"Months"==o?t.scale(e).ticks(d3.time.months,1).tickFormat(d3.time.format("%b")):t.scale(e)}function setTickFormat(t,e,o){return d3.scale.linear().domain([0,d3.max(data,function(t){return t.load_volume})]).range("One-Week"==o?[h-margin.top-margin.bottom,0]:"Days"==o?[h-margin.top-margin.bottom,0]:"Weeks"==o?[h-margin.top-margin.bottom,0]:"Months"==o?[h-margin.top-margin.bottom,0]:[h-margin.top-margin.bottom,0])}function barMouseOver(t,e,o,a,n,i,d,m,r){if(0!=t.load_volume){var s=$(".chart").offset();d3.select(n[0][e]).style("fill","rgba(65,131,196,0.8)"),clearTimeout($(".graph-tooltip").attr("d")),setDateFormat(t,m,i);var l=$(".graph-tooltip").width();console.log("xy: "+JSON.stringify(s,null,4)),console.log("tooltip_width: "+l),console.log("x(date): "+o(new Date(t.date)));{$(".graph-tooltip").height()}"Weeks"==m&&(l/=2);var f;f="Weeks"==m||"Months"==m?48:42,i.style("display","block").style("left",o(new Date(t.date))+(s.left-l/2-f)+"px").style("top",a(t.load_volume)-70+s.top+"px").transition().duration(200).style("opacity",.9),$(".graph-tooltip").append(toolTipContents(t,d,r))}}function setDateFormat(t,e,o){var a=d3.time.format("%A %b %e");o.html("Weeks"==e?a(new Date(t.date+864e5))+"-"+a(new Date(t.date+6048e5))+"<br />":a(new Date(t.date+864e5))+"<br />")}function barMouseOut(t,e,o,a){if(0!=t.load_volume){d3.select(o[0][e]).transition().duration(500).style("fill","rgba(65,131,196,0.4)");var n=setTimeout(function(){a.transition().duration(200).style("opacity",0)},350);a.attr("d",n)}}function toolTipMouseOver(t){$(".graph-tooltip").mouseenter(function(){clearTimeout($(".graph-tooltip").attr("d")),t.style("display","block").style("opacity",.9)}).mouseleave(function(){t.transition().duration(200).style("opacity",0),setTimeout(function(){t.style("display","none")},200)})}function toolTipContents(t,e,o){var a=[];return parseInt(+t.load_volume)>0&&a.push(o+": "+t.load_volume),a}