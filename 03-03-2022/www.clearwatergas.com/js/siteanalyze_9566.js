if(_sz&&_sz.core&&_sz.core._isloaded!=null){if(_sz.core.warn){_sz.core.warn("Script requested to load and execute again, this is not desirable and will be blocked")}}else{var _sz=_sz||[];_sz.push(["accountid",9566]);_sz.push(["region","r1"]);_sz.push(["endpoint","global"]);_sz.push(["custom",function(){if(window.location.href.indexOf("?q=")>-1&&window.jQuery){var b=jQuery(".gsc-input").val()===undefined?jQuery(".gsc-input").text():jQuery(".gsc-input").val();var a=jQuery(".gsc-result").length;_sz.push(["sw",b]);_sz.push(["hits",a])}},"collectSearchStats"]);_sz.push(["heatmap",{matches:{permanent:["https://www.clearwatergas.com","https://www.clearwaterpolice.org/home","https://www.myclearwater.com","https://www.myclearwater.com/government/city-departments/engineering/cleveland-street-streetscape","https://www.myclearwater.com/government/city-departments/sustainability-resiliency","https://www.myclearwater.com/news-info/covid-19-information-city-updates","https://www.myclearwaterevents.com/home","https://www.myclearwaterlibrary.com/home","https://www.myclearwaterparks.com/athletics/volunteering","https://www.myclearwaterparks.com/home"],include:[],exclude:[]}}]);var _sz=_sz||[];(function(l,b,h,j){var a={curr:window.location.href,ref:b.referrer,esc:function(d){return encodeURIComponent(new String(d).replace(/(\r?\n)+/g," ").replace(/\s+/g," ").replace(/^\s+|\s+$/,""))},empty:function(d){return(d==j||d==null||d=="")},tag:function(d){return(b.getElementsByTagName)?b.getElementsByTagName(d):[]},id:function(d){return(b.getElementById)?b.getElementById(d):false},clone:function(p){var m={};for(var d in p){if(p.hasOwnProperty(d)){m[d]=p[d]}}return m},rnd:function(){return Math.floor(Math.random()*100000)},txt:function(d){return(d.textContent)?d.textContent:d.innerText},uuid:function(){var d=function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)};return(d()+d()+"-"+d()+"-"+d()+"-"+d()+"-"+d()+d()+d())},navtime:function(){var d=l.performance||l.webkitPerformance||l.mozPerformance||l.msPerformance;return !d||!d.timing||d.timing.navigationStart<1?null:(new Date).getTime()-d.timing.navigationStart},_isready:false,_readyhandlers:[],register:function(m,d){d.base=this.actions[m];this.actions[m]=d},actions:{},action:function(m,d){this.actions[m].apply(this.actions,d)},data:[],ready:function(d){if(d===j){return this._isready||a.done()}else{this.when(this.ready,d)}},queueready:function(d){this._isready&&a.done()?d():this._readyhandlers.push(d)},done:function(){return(this._isloaded&&b&&b.body!=null&&(b.readyState=="interactive"||b.readyState=="complete"))},_isloaded:false,_whenTimer:null,when:function(d,n){var m=this.uuid();if(d()){n()}else{setTimeout(function(){a.when(d,n)},50)}},fmt:function(){var d=Array.prototype.slice.call(arguments);var p=d[0];var m=d.slice(1);for(var n=0;n<m.length;n++){var o=new RegExp("\\{"+n+"\\}","gm");p=p.replace(o,m[n])}return p},listen:function(d,m){if(d.addEventListener){d.addEventListener("mousedown",m,false)}else{if(d.attachEvent){d.attachEvent("onmousedown",m)}}},load:function(m){var n=b.createElement("script");n.type="text/javascript";n.async=true;n.src=m;var d=b.getElementsByTagName("script")[0];d.parentNode.insertBefore(n,d)},global:function(d){return(l[d]!==j&&l[d]!==null)?l[d]:null},_images:[],_idx:0,requesturl:function(n,m){var q=[];m.rnd=h.core.rnd();for(d in m){if(this.empty(m[d])){continue}q.push(d+"="+this.esc(m[d]))}var d=this._idx++,r=n+"?"+q.join("&");return r},request:function(m,d){var n=this.requesturl(m,d);this._images[e]=new Image();this._images[e].src="https://"+n;this.log("Requesting {0}",n)},_logqueue:[],_logshown:false,log:function(){this._logqueue.push({type:"msg",msg:Array.prototype.slice.call(arguments)});if(this._logshown){this.showlog()}},warn:function(){this._logqueue.push({type:"warn",msg:Array.prototype.slice.call(arguments)});if(this._logshown){this.showlog()}},showlog:function(){this._logshown=true;var n=b.getElementById("szdebugarea");if(n){n.parentNode.removeChild(n)}a.cookie("szngdebug",1);var r="";for(var p=0;p<this._logqueue.length;p++){var q=this._logqueue[p];r+='<p style="padding:8px;margin:0;margin-bottom:8px;background:#'+(q.type=="msg"?"FFF7C9":"ca0000;color:white")+';">'+((q.type=="warn")?"<b>Warning:</b> ":"")+decodeURIComponent(new String(this.fmt.apply(this,q.msg)).replace(/(&[a-z_]+=|\?)/g,"<br />&nbsp;&nbsp;&nbsp;$1"))+"</p>"}var m,d;d=b.createElement("a");d.href="#";d.innerHTML="\u00D7 Close";d.style.cssText="display:block;float:right;color:black;text-decoration:none;";d.onclick=function(o){m.parentNode.removeChild(m);a._logshown=false;a.cookie("szngdebug",null);return false};m=b.createElement("div");m.style.cssText="position:fixed;top:10px;right:10px;background:white;border:1px #ccc solid;width:800px;padding:20px;padding-bottom:10px;font-size:12px;font-family:Arial;line-height:135%;max-height:90%;overflow-y:auto;text-align:left;z-index:999";m.innerHTML=r;m.id="szdebugarea";m.appendChild(d);b.body.appendChild(m)},cookie:function(u,A,w){if(typeof A!="undefined"){w=w||{path:"/"};if(A===null){A="";w.expires=-1}var s="";if(w.expires&&(typeof w.expires=="number"||w.expires.toUTCString)){var q;if(typeof w.expires=="number"){q=new Date();q.setTime(q.getTime()+(w.expires*24*60*60*1000))}else{q=w.expires}s="; expires="+q.toUTCString()}var x=w.path?"; path="+(w.path):"; path=/";var r=w.domain?"; domain="+(w.domain):"";var z=w.secure?"; secure":"";var y=w.sameSite?"; samesite="+(w.samesite):"; samesite=lax";b.cookie=[u,"=",encodeURIComponent(A),s,x,r,z,y].join("")}else{var p=null;if(b.cookie&&b.cookie!==""){var m=b.cookie.split(";");for(var t=0;t<m.length;t++){var d=m[t].replace(/^\s+|\s+$/g,"");if(d.substring(0,u.length+1)==(u+"=")){p=decodeURIComponent(d.substring(u.length+1));break}}}return p}}};a.register("set",function(m,p){var n=m.split("."),o=h,d;while(n.length>0){d=n.shift();if(o[d]===j){o=0;break}if(n.length==0){break}o=o[d]}(o&&d)?o[d]=p:a.warn("No property named {0}",m)});a.register("register",function(d){a.register(d[0],d[1])});a.register("custom",function(m,o){var n="Running custom function";if(o&&o!=""){n+=": <strong>"+o+"</strong>"}a.log(n);try{m()}catch(d){a.warn("Custom function failed! "+d.message)}});a.register("setcurr",function(d){a.curr=d});a.register("setref",function(d){a.ref=d});a.register("loaded",function(){a._isloaded=true});a.register("showlog",function(){a.showlog()});function g(d){var m=d[0];if(a.actions[m]===j){a.action("set",d)}else{a.action(m,d.slice(1))}}var c=[];var f=[];for(var e=0;e<h.length;e++){c[e]=h[e];f[e]=h[e]}a.data=c;a.ready(function(){for(var d=0;d<f.length;d++){g(f[d])}while(a._readyhandlers.length>0){a._readyhandlers.shift().call()}a._isready=true});h.push=function(d){a.data.push(d);a.ready()?g(d):a.data.push(d)};h.core=a})(window,document,_sz);(function(q,a,n,p){var h={url:q.location.href,ref:a.referrer,title:a.title,res:q.screen.width+"x"+q.screen.height,accountid:9566,groups:null,path:null,hits:null,sw:null,ct:null,uid:null,cid:null,cvid:null,rt:n.core.navtime(),prev:null,ourl:null,luid:n.core.uuid(),feedbackid:null,addcid:null,dnt:null};var b=function(){n.push(["invoketracking"])};var o=b;var f=function(){var d=/[-\w]+\.(?:[-\w]+\.xn--[-\w]+|[-\w]{3,}|[-\w]+\.[-\w]{2})$/i;var r=d.exec(a.domain);return(r&&r.length==1?r[0]:document.domain).replace(/^www\./i,"")};n.analytics={config:{cantrack:true,noonclick:false,ready:true,onClickKey:"szaocHandled"+n.core.rnd(),},cookie:{name:"nmstat",domain:f(),expires:1000,secure:false},endpoint:{configured:false,host:"9566.global",domain:"siteimproveanalytics.io",path:"image.aspx",fullpath:function(d,r){n.analytics.endpoint.configure();if(!r){r=d;d=this.host}return(d||this.host)+"."+this.domain+"/"+(r||this.path)},configure:function(){if(!n.analytics.endpoint.configured){n.analytics.endpoint.host=n.analytics.endpoint.host.replace("{ACCOUNT_ID}",h.accountid||"shared");n.core.log("Configured host: {0}.{1}",n.analytics.endpoint.host,n.analytics.endpoint.domain);n.analytics.endpoint.configured=true}}},state:{requested:false,requestTime:new Date(),tracked:false,onclickattached:false},region:"",getRootDomain:f,replaceTracker:function(d){o=typeof d==="function"?d:b},opts:function(d){return h[d]},getsessid:function(){if(n.analytics.config.cantrack){var d=n.core.cookie(n.analytics.cookie.name);if(!d){d=n.core.uuid();n.core.cookie(n.analytics.cookie.name,d,{expires:n.analytics.cookie.expires,domain:n.analytics.cookie.domain,secure:n.analytics.cookie.secure})}return d}else{return""}}};function l(r,d){d.prev=n.analytics.getsessid();d.rt=d.rt!==null?n.core.navtime():null;n.core.request(r,d)}function m(r,d){d.prev=n.analytics.getsessid();return n.core.requesturl(r,d)}function j(t){if(!n.analytics.config.cantrack||n.analytics.state.onclickattached){return}var u=function(x){try{if(x.href==null||x.href==""||x.href.toLowerCase().indexOf("javascript:")==0||x.href.indexOf("#")==0||x.href.charAt(x.href.length-1)=="#"||x.href==q.location.href||x.href.indexOf(q.location.href+"#")==0||x[n.analytics.config.onClickKey]===true){return true}if(!(t instanceof Array)){return false}for(var w=0;w<t.length;w++){if(x.href.indexOf(t[w])!==-1){return true}}return false}catch(v){return true}};var d=n.core.tag("a");var r=n.core.tag("area");var s=function(x){for(var v=0;v<x.length;v++){var w=x[v];if(u(w)){continue}(function(y){n.core.listen(y,function(){n.push(["request",{ourl:y.href,ref:q.location.href,autoonclick:1,rt:null}])});w[n.analytics.config.onClickKey]=true})(w)}};n.core.log("Attaching onclick handlers");s(d);s(r);n.analytics.state.onclickattached=true}var c=0;function e(r,d,s){return{aid:h.accountid,url:h.url,luid:h.luid,c:r,a:d,l:s,cid:h.cid,cvid:h.cvid,o:++c,d:Math.round((new Date()-n.analytics.state.requestTime)/1000)}}function g(){var d=window.doNotTrack||navigator.doNotTrack||navigator.msDoNotTrack;return d=="yes"||d=="1"||(window.external&&window.external.msTrackingProtectionEnabled&&window.external.msTrackingProtectionEnabled())}n.core.register("endpoint",function(d){if(d){if(d.indexOf("{ACCOUNT_ID}")<0){n.analytics.endpoint.host="{ACCOUNT_ID}."+d}else{n.analytics.endpoint.host=d}n.analytics.endpoint.configured=false;n.analytics.endpoint.configure()}else{n.core.warn("Could not reconfigure endpoint host.")}});n.core.register("region",function(d){if(d){n.core.log("Setting analytics region to: {0}",d);n.analytics.region=d}else{n.core.warn("Could not configure analytics region.")}});n.core.register("eventurl",function(s,d,t,r){if(!r){n.core.warn("You must provide a callback function");return}if(!s||!d){n.core.warn("Category and action must be provided for event.");return}else{if(!n.analytics.config.cantrack){return}}var u=m(n.analytics.endpoint.fullpath("event.aspx"),e(s,d,t));r(u)});n.core.register("event",function(r,d,s){if(!r||!d){n.core.warn("Category and action must be provided for event.");return}else{if(!n.analytics.config.cantrack){return}}l(n.analytics.endpoint.fullpath("event.aspx"),e(r,d,s))});n.core.register("dump",function(){console.debug(n.analytics);console.debug(h)});n.core.register("noonclick",function(d){n.analytics.config.noonclick=d});n.core.register("set",function(d,r){if(h.hasOwnProperty(d)){h[d]=r}else{this.set.base(d,r)}});n.core.register("breadcrumbs",function(r){if(!r||!a.querySelector){return}var d=a.querySelector(r);if(d){h.path=n.core.txt(d)}});n.core.register("groupselector",function(u){if(!u||!a.querySelectorAll){return}var s=a.querySelectorAll(u),d=[];if(h.groups){d.push(h.groups)}for(var r=0;r<s.length;r++){var v=n.core.txt(s[r]);if(v!=null){d.push(v)}}if(d.length>0){h.groups=d.join(",");n.core.log("Groups set: {0}",d.join(", "))}});n.core.register("metagroupname",function(t){var s=n.core.tag("meta"),d=[];if(h.groups){d.push(h.groups)}for(var r=0;r<s.length;r++){if(s[r].name==t){n.core.log("Metagroup pushing group: {0}",s[r].content);d.push(s[r].content)}}if(d.length>0){h.groups=d.join(",");n.core.log("Metagroup set: {0}",d.join(", "))}});n.core.register("param",function(d,r){if(typeof d=="object"){for(i in d){if(d.hasOwnProperty(i)){n.push(["param",i,d[i]])}}}else{n.core.log("Param {0} = {1}",d,r);h["grk_"+d]=r}});n.core.register("request",function(d){if(d.accountid===p){d.accountid=h.accountid}l(n.analytics.endpoint.fullpath(),d)});n.core.register("trackpageview",function(){var d=n.analytics;if(!d.state.tracked&&d.config.cantrack&&d.config.ready){l(d.endpoint.fullpath(),h);d.state.tracked=true;d.state.requestTime=new Date()}else{if(d.state.tracked){n.core.log("Already tracked...")}}});n.core.register("notrack",function(d){if(d===p){d=true}if(d){n.core.cookie("sz_notrack","true",{expires:1825})}else{n.core.cookie("sz_notrack",null)}n.analytics.config.cantrack=!d});n.tracking=function(){return n.analytics.config.cantrack};n.donottrack=function(){return h.dnt===true&&!!g()};n.core.register("trackdynamic",function(s){var d=h.url;h.url=q.location.href;h.ref=d;h.title=a.title;h.luid=n.core.uuid();h.rt=null;h.ourl=null;h.groups=null;h.path=null;h.hits=null;h.sw=null;n.analytics.state.tracked=false;n.analytics.state.onclickattached=false;if(s){if(typeof s=="object"&&!(s instanceof Array)){for(k in s){if(s.hasOwnProperty(k)){n.push([k,s[k]])}}}else{if(s.length>0){for(var r=0;r<s.length;r++){n.push(s[r])}}}}if(!h.ourl){h.ourl=h.url}n.push(["invoketracking"])});n.core.register("invoketracking",function(){if(!!n.analytics.config.cantrack&&n.donottrack()){n.core.log("Do not track enabled");n.analytics.config.cantrack=false}if(!n.analytics.config.cantrack){n.core.log("Tracking not enabled, skipping invocation");return}n.push(["trackpageview"]);if(n.analytics.config.noonclick!==true){j(n.analytics.config.noonclick)}});n.core.ready(function(){n.core.log("Running ready at {0}",new Date().getTime());if(n.core.cookie("sz_notrack")!==null){n.push(["notrack"])}o()})})(window,document,_sz);(function(q,c,o,p){var a={scrollDelay:350,resizeDelay:350};var n={running:false,initViewPort:null,supportQuerySelector:true,clickCount:0,scrollHandle:null,lastViewPort:{l:0,t:0},scrollCount:0};o.analytics.heatmap={config:a,state:n};var b={hostnameRx:/^([\w@:.-]+)$/i,pathnameRx:/((?:\/\w+)*\/[-\w.]+[^#&?\s]*)$/i,maxSrcLen:50,boundingElements:{A:true,AREA:true,ARTICLE:false,BODY:false,BUTTON:true,DIV:false,FOOTER:false,FRAME:false,IFRAME:false,H1:false,H2:false,H3:false,H4:false,H5:false,H6:false,HEADER:false,HTML:false,IMG:true,INPUT:true,LABEL:false,LI:false,MAIN:false,SECTION:false,SELECT:true,SPAN:false,TABLE:false,TD:false,TH:false,TEXTAREA:true}};var f={on:function(s,t,r){var d=t.split(" "),u=d.length;while(u--){if(s.addEventListener){s.addEventListener(d[u],r,false)}else{if(s.attachEvent){s.attachEvent("on"+d[u],r)}}}},off:function(s,t,r){var d=t.split(" "),u=d.length;while(u--){if(s.removeEventListener){s.removeEventListener(d[u],r,false)}else{if(s.detachEvent){s.detachEvent("on"+d[u],r)}}}},stop:function(d){if(d.stopPropagation){d.stopPropagation()}else{if(d.cancelBubble!=null){d.cancelBubble=true}}},sourceElement:function(d){return d.srcElement||d.target},map:function(d,r){var t=[];for(var s=0;s<d.length;s++){t.push(r(d[s],s))}return t},cssEscape:function(s){var d=s.charAt(0),r="";if(/^-+$/.test(s)){return"\\-"+s.slice(1)}if(/\d/.test(d)){r="\\3"+d+" ";s=s.slice(1)}r+=f.map(s.split(""),(function(t){if(/[\t\n\v\f]/.test(t)){return"\\"+t.charCodeAt().toString(16)+" "}return(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^_`{|}~]/.test(t)?"\\":"")+t})).join("");return r},isUniqueSelector:function(s,d){if(!n.supportQuerySelector||!s){return false}var r=c.querySelectorAll(s);return r.length===1&&r[0]===d},trim:function(d){return String.prototype.trim?d.trim():d.replace(/^\s+|\s+$/g,"")},pathFromSrc:function(s){var d=c.createElement("a");d.href=s;var r=d.pathname;d=null;return r||""},parent:function(d){var r=d.parentNode;return r.nodeType==1&&!(/\b(html|body|head)\b/i.test(r.tagName))?r:null},childSelector:function(d,w){if(!d.parentNode){return null}var u=d.parentNode.children,v=u.length,s=0,x=true;for(var r=0;r<v;r++){var t=u[r];if(t===d){s=r+1}else{if(t.tagName.toLowerCase()==w){x=false;if(s!==0){break}}}}if(x){return null}if(s===1){return":first-child"}if(s===v){return":last-child"}return":nth-child("+s+")"},pathSelector:function(r){var t=r.tagName.toLowerCase(),s=f.parent(r),d=f.childSelector(r,t);return(s?f.pathSelector(s)+">":"")+t+(d||"")},cssSelector:function(v){var E=v,I="",H="",w="",F="";do{if(!v.tagName){return""}var J=v.tagName.toLowerCase();if(/\b(html|body|head)\b/i.test(J)){return J+I}var A=v.id,t=f.trim(v.className),r=v.classList||t.split(/\s+/);if(typeof(A)!=="string"){A=null}if(A){A=f.cssEscape(A);H="#"+A+I;if(f.isUniqueSelector(H,E)){return H}H=J+"[id='"+A.replace("'","\\'")+"']"+I;if(f.isUniqueSelector(H,E)){return H}}var K="";if(t&&c.getElementsByClassName){var L=Infinity;for(var z=0,B=r.length;z<B;z++){var d=r[z],u=c.getElementsByClassName(d).length;if(u<L){L=u;K=f.cssEscape(d)}}H=J+"."+K+I;if(f.isUniqueSelector(H,E)){return H}if(A){H=J+"[id='"+A.replace("'","\\'")+"']."+K+I;if(f.isUniqueSelector(H,E)){return H}}}switch(J){case"a":var x=v.hash;if(x){H=J+"[href='"+x.replace("'","\\'")+"']"+I;if(f.isUniqueSelector(H,E)){return H}}F=((v.pathname||"").match(b.pathnameRx)||["",""])[1];if(F&&F.length<=b.maxSrcLen){H=J+"[href*='"+F.replace("'","\\'")+"']"+I;if(f.isUniqueSelector(H,E)){return H}}var y=((v.hostname||"").match(b.hostnameRx)||["",""])[1];if(y&&y.length<=b.maxSrcLen){H=J+"[href*='"+y.replace("'","\\'")+"']"+I;if(f.isUniqueSelector(H,E)){return H}}break;case"img":F=f.pathFromSrc(v.src);w=(F.match(b.pathnameRx)||["",""])[1];if(w&&F.length<=b.maxSrcLen){H=J+"[src*='"+w.replace("'","\\'")+"']"+I;if(f.isUniqueSelector(H,E)){return H}}break;case"input":case"button":case"select":case"textarea":var D=v.getAttribute("name");if(D){H=J+"[name='"+D.replace("'","\\'")+"']"+I;if(f.isUniqueSelector(H,E)){return H}}break;case"label":var C=v.getAttribute("for");if(C){H=J+"[for='"+C.replace("'","\\'")+"']"+I;if(f.isUniqueSelector(H,E)){return H}}break}var G=f.childSelector(v,J);if(G){I=J+G+I;if(f.isUniqueSelector(I,E)){return I}}else{if(A){I=J+"[id='"+A.replace("'","\\'")+"']"+I}else{if(K){I=J+"."+K+I}else{I=J+I;if(f.isUniqueSelector(I,E)){return I}}}}}while((v=v.parentNode)&&(I=">"+I));return I},viewPort:function(){return{l:Math.round((q.pageXOffset||c.documentElement.scrollLeft)-(c.documentElement.clientLeft||0)),t:Math.round((q.pageYOffset||c.documentElement.scrollTop)-(c.documentElement.clientTop||0)),w:Math.round(q.innerWidth||c.documentElement.clientWidth||q.screen.width),h:Math.round(q.innerHeight||c.documentElement.clientHeight||q.screen.height)}},elementPoint:function(r,d){r=r||q.event;var s=f.pagePoint(r);var t=d.getBoundingClientRect();var v=c.documentElement.scrollTop?c.documentElement.scrollTop:c.body.scrollTop;var u=c.documentElement.scrollLeft?c.documentElement.scrollLeft:c.body.scrollLeft;return{x:Math.round(s.x-(t.left+u)),y:Math.round(s.y-(t.top+v))}},pagePoint:function(d){d=d||q.event;var r=d.pageX;var s=d.pageY;if(r===p){r=d.clientX+c.body.scrollLeft+c.documentElement.scrollLeft;s=d.clientY+c.body.scrollTop+c.documentElement.scrollTop}return{x:r,y:s}},preEventHandler:function(d){if(n.scrollCount<1&&n.clickCount<1){e({pos:n.initViewPort,type:"scroll"})}}};var j={click:function(r){if(r.szbHandled===true){return}f.preEventHandler(r);n.clickCount++;var u=f.sourceElement(r);var d=u;while(d!=null&&b.boundingElements[d.tagName]==null){d=d.parentNode}if(d==null){return}var t=f.cssSelector(d);if(!t||t=="html"){return}var s={path:t,point:f.elementPoint(r,d),type:"click"};e(s);r.szbHandled=true},scroll:function(d){if(n.scrollHandle!=null){clearTimeout(n.scrollHandle)}n.scrollHandle=setTimeout(function(){f.preEventHandler(d);n.scrollCount++;var r=f.viewPort();if(r.t!=n.lastViewPort.t||r.h!=n.lastViewPort.h){e({pos:r,type:"scroll"});n.lastViewPort=r}},a.scrollDelay)},resize:function(r){var d=f.viewPort();if(!n.scrollCount||d.h!=n.lastViewPort.h){j.scroll()}}};function h(){if(n.supportQuerySelector){o.core.log("Attaching behaviour map mousedown handlers");f.on(c,"mousedown",j.click);for(var r in b.boundingElements){if(b.boundingElements.hasOwnProperty(r)&&b.boundingElements[r]==true){var d=o.core.tag(r);for(var s in d){f.on(d[s],"mousedown",j.click)}}}}o.core.log("Attaching behaviour map scroll + resize handlers");f.on(q,"scroll",j.scroll);f.on(q,"resize",j.resize)}function e(d){if(!d){return}var t;switch(d.type){case"click":t="c|"+d.point.x+"|"+d.point.y+"|"+d.path;break;case"scroll":t="s|"+d.pos.l+"|"+d.pos.t;break;default:return}var r=m(t);var s=o.analytics.endpoint.fullpath("heat.aspx");o.core.request(s,r)}var g=0;function m(d){var r=f.viewPort();return{aid:o.analytics.opts("accountid"),url:o.analytics.opts("url"),luid:o.analytics.opts("luid"),p:d,ww:r.w,wh:r.h,cid:o.analytics.opts("cid"),cvid:o.analytics.opts("cvid"),o:++g,d:Math.round((new Date()-o.analytics.state.requestTime)/1000),prev:o.analytics.getsessid()}}var l={keys:Object.keys?Object.keys:function(r){if(r!==Object(r)){throw new TypeError("Object.keys called on a non-object")}var d=[];for(var s in r){if(Object.prototype.hasOwnProperty.call(r,s)){d.push(s)}}return d},extract:function(d){var u={};for(var r=0;r<d.length;r++){var t=d[r].split("=");if(t.length>1){var s=t.shift();var w=t.join("=");if(w.length>0){u[s]=w}}}return u},decompose:function(t){t=encodeURI(decodeURI(f.trim(t||"").replace(/^.*?:\/\//g,"").split("#")[0]));var s=t.split("?");var d=s.shift().replace(/^www\./,"").replace(/\/+$/,"");var r=this.extract(s.join("?").split("&"));return{resource:d,params:r}},check_url:function(d,u){if(d.resource===u.resource){var t=this.keys(u.params);for(var r=0;r<t.length;r++){var s=t[r];if(d.params[s]==p||d.params[s]!==u.params[s]){return false}}return true}return false},check_list:function(r,t,d){t=t||[];for(var s=0;s<t.length;s++){if(t[s]!=p&&this.check_url(r,this.decompose(t[s].toLowerCase()))){if(d){d(t[s])}return true}}return false},enable:function(){var d=this.decompose(this.cur_url());var s,r;var t=d.resource&&this.check_list(d,this.matches.permanent.concat(this.matches.include),function(u){s=u})&&!this.check_list(d,this.matches.exclude,function(u){r=u});o.core.log('Behaviour map tracking match:<br/>include = "{0}"<br/>exclude = "{1}"',encodeURI(s||""),encodeURI(r||""));return t},matches:{permanent:[],include:[],exclude:[]},add_matches:function(d){if(d!=null){if(this.is_array(d.permanent)){this.matches.permanent=this.matches.permanent.concat(d.permanent)}if(this.is_array(d.include)){this.matches.include=this.matches.include.concat(d.include)}if(this.is_array(d.exclude)){this.matches.exclude=this.matches.exclude.concat(d.exclude)}}},replacements:[],add_replacement:function(d){if(this.is_function(d)){this.replacements.push(d)}},is_function:function(d){return d!=null&&(typeof d==="function")&&(d instanceof Function)},is_array:function(d){return d!=null&&(d instanceof Array)&&(d.concat!=p)&&(d.length!=p)},cur_url:function(){var r=((o.analytics&&o.analytics.opts?o.analytics.opts("url"):"")||o.core.curr).toLowerCase();if(this.replacements&&this.replacements.length>0){for(var d=0;d<this.replacements.length;d++){r=this.replacements[d](r)}}return r}};o.core.register("heatmapreplacement",function(d){l.add_replacement(d)});o.core.register("heatmap",function(d){l.add_matches(d.matches)});o.core.register("heatmapinit",function(){if(!o.analytics.config.cantrack||o.donottrack()){return}if(n.running){o.core.log("Behaviour map tracking already running");return}try{if(!l.enable()){o.core.log("Skipping behaviour map tracking");return}}catch(d){o.core.log("Skipping behaviour map tracking due to: {0}",d);return}try{n.supportQuerySelector=!!c.querySelectorAll&&c.querySelectorAll("body > *:nth-child(1)").length===1}catch(d){n.supportQuerySelector=false}o.core.log("Enabling behaviour map tracking");n.running=true;n.lastViewPort=f.viewPort();n.initViewPort=f.viewPort();h()});o.core.ready(function(){o.core.log("Running behaviour map ready at {0}",new Date().getTime());o.push(["heatmapinit"])})})(window,document,_sz);_sz.core._isloaded=true};