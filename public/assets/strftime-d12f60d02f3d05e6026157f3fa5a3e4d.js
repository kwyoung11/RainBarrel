!function(){function e(e,a){h[e]||("undefined"!=typeof console&&"function"==typeof console.warn&&console.warn("[WARNING] "+e+" is deprecated and will be removed in version 1.0. Instead, use `"+a+"`."),h[e]=!0)}function a(e){e.localize=k.localize.bind(k),e.timezone=k.timezone.bind(k),e.utc=k.utc.bind(k)}function t(a,t,r){t&&t.days&&(r=t,t=void 0),r&&e("`"+y+"(format, [date], [locale])`","var s = "+y+".localize(locale); s(format, [date])");var o=r?k.localize(r):k;return o(a,t)}function r(a,t,r){r?e("`"+y+".strftime(format, [date], [locale])`","var s = "+y+".localize(locale); s(format, [date])"):e("`"+y+".strftime(format, [date])`",y+"(format, [date])");var o=r?k.localize(r):k;return o(a,t)}function o(a,t,r,o){"number"!=typeof r&&"string"!=typeof r||null!=o||(o=r,r=void 0),r?e("`"+y+".strftimeTZ(format, date, locale, tz)`","var s = "+y+".localize(locale).timezone(tz); s(format, [date])` or `var s = "+y+".localize(locale); s.timezone(tz)(format, [date])"):e("`"+y+".strftimeTZ(format, date, tz)`","var s = "+y+".timezone(tz); s(format, [date])` or `"+y+".timezone(tz)(format, [date])");var n=(r?k.localize(r):k).timezone(o);return n(a,t)}function n(a,t,r){r?e("`"+y+".strftimeUTC(format, date, locale)`","var s = "+y+".localize(locale).utc(); s(format, [date])"):e("`"+y+".strftimeUTC(format, [date])`","var s = "+y+".utc(); s(format, [date])");var o=r?M.localize(r):M;return o(a,t)}function s(a){return e("`"+y+".localizedStrftime(locale)`",y+".localize(locale)"),k.localize(a)}function c(e,a,t){function r(e,a){var t;if(a)t=a.getTime(),k&&(a=new Date(a.getTime()+d(a)+b));else{var r=Date.now();r>v&&(v=r,n=new Date(v),t=v,k&&(n=new Date(v+d(n)+b))),a=n}return o(e,a,s,t)}function o(e,a,t,r){for(var n="",s=null,c=!1,d=e.length,g=!1,v=0;d>v;v++){var y=e.charCodeAt(v);if(c!==!0)37!==y?n+=e[v]:c=!0;else{if(45===y){s="";continue}if(95===y){s=" ";continue}if(48===y){s="0";continue}if(58===y){g&&"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn("[WARNING] detected use of unsupported %:: or %::: modifiers to strftime"),g=!0;continue}switch(y){case 65:n+=t.days[a.getDay()];break;case 66:n+=t.months[a.getMonth()];break;case 67:n+=i(Math.floor(a.getFullYear()/100),s);break;case 68:n+=o(t.formats.D,a,t,r);break;case 70:n+=o(t.formats.F,a,t,r);break;case 72:n+=i(a.getHours(),s);break;case 73:n+=i(u(a.getHours()),s);break;case 76:n+=l(Math.floor(r%1e3));break;case 77:n+=i(a.getMinutes(),s);break;case 80:n+=a.getHours()<12?t.am:t.pm;break;case 82:n+=o(t.formats.R,a,t,r);break;case 83:n+=i(a.getSeconds(),s);break;case 84:n+=o(t.formats.T,a,t,r);break;case 85:n+=i(f(a,"sunday"),s);break;case 87:n+=i(f(a,"monday"),s);break;case 88:n+=o(t.formats.X,a,t,r);break;case 89:n+=a.getFullYear();break;case 90:if(k&&0===b)n+="GMT";else{var h=a.toString().match(/\(([\w\s]+)\)/);n+=h&&h[1]||""}break;case 97:n+=t.shortDays[a.getDay()];break;case 98:n+=t.shortMonths[a.getMonth()];break;case 99:n+=o(t.formats.c,a,t,r);break;case 100:n+=i(a.getDate(),s);break;case 101:n+=i(a.getDate(),null==s?" ":s);break;case 104:n+=t.shortMonths[a.getMonth()];break;case 106:var M=new Date(a.getFullYear(),0,1),z=Math.ceil((a.getTime()-M.getTime())/864e5);n+=l(z);break;case 107:n+=i(a.getHours(),null==s?" ":s);break;case 108:n+=i(u(a.getHours()),null==s?" ":s);break;case 109:n+=i(a.getMonth()+1,s);break;case 110:n+="\n";break;case 111:n+=String(a.getDate())+m(a.getDate());break;case 112:n+=a.getHours()<12?t.AM:t.PM;break;case 114:n+=o(t.formats.r,a,t,r);break;case 115:n+=Math.floor(r/1e3);break;case 116:n+="	";break;case 117:var z=a.getDay();n+=0===z?7:z;break;case 118:n+=o(t.formats.v,a,t,r);break;case 119:n+=a.getDay();break;case 120:n+=o(t.formats.x,a,t,r);break;case 121:n+=(""+a.getFullYear()).slice(2);break;case 122:if(k&&0===b)n+=g?"+00:00":"+0000";else{var D;D=0!==b?b/6e4:-a.getTimezoneOffset();var p=0>D?"-":"+",T=g?":":"",w=Math.floor(Math.abs(D/60)),S=Math.abs(D%60);n+=p+i(w)+T+i(S)}break;default:n+=e[v]}s=null,c=!1}}return n}var n,s=e||g,b=a||0,k=t||!1,v=0,y=r;return y.localize=function(e){return new c(e||s,b,k)},y.timezone=function(e){var a=b,t=k,r=typeof e;if("number"===r||"string"===r)if(t=!0,"string"===r){var o="-"===e[0]?-1:1,n=parseInt(e.slice(1,3),10),i=parseInt(e.slice(3,5),10);a=o*(60*n+i)*60*1e3}else"number"===r&&(a=60*e*1e3);return new c(s,a,t)},y.utc=function(){return new c(s,b,!0)},y}function i(e,a){return""===a||e>9?e:(null==a&&(a="0"),a+e)}function l(e){return e>99?e:e>9?"0"+e:"00"+e}function u(e){return 0===e?12:e>12?e-12:e}function f(e,a){a=a||"sunday";var t=e.getDay();"monday"===a&&(0===t?t=6:t--);var r=Date.UTC(e.getFullYear(),0,1),o=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()),n=Math.floor((o-r)/864e5),s=(n+7-t)/7;return Math.floor(s)}function m(e){var a=e%10,t=e%100;if(t>=11&&13>=t||0===a||a>=4)return"th";switch(a){case 1:return"st";case 2:return"nd";case 3:return"rd"}}function d(e){return 6e4*(e.getTimezoneOffset()||0)}var b,g={days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],AM:"AM",PM:"PM",am:"am",pm:"pm",formats:{D:"%m/%d/%y",F:"%Y-%m-%d",R:"%H:%M",T:"%H:%M:%S",X:"%T",c:"%a %b %d %X %Y",r:"%I:%M:%S %p",v:"%e-%b-%Y",x:"%D"}},k=new c(g,0,!1),v="undefined"!=typeof module;v?(b=module.exports=t,b.strftime=r):(b=function(){return this||(1,eval)("this")}(),b.strftime=t);var y=v?"require('strftime')":"strftime",h={};b.strftimeTZ=o,b.strftimeUTC=n,b.localizedStrftime=s,a(t),a(r);var M=k.utc();"function"!=typeof Date.now&&(Date.now=function(){return+new Date})}();