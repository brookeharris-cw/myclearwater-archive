if(typeof(Wcag)=="undefined"){Wcag={}}Wcag.constructModalDialog=function(b,c){b=$(b);c=$(c);var d=function(){return Wcag.getAllFocusable(b)};var a=function(f){if(f.keyCode!==9){return}var h=d();var g=$(h[0]);var e=$(h[h.length-1]);if($(f.target).is(e)&&!f.shiftKey){g.focus();f.preventDefault();return false}else{if($(f.target).is(g)&&f.shiftKey){e.focus();f.preventDefault();return false}}};b.on("keydown",a);$(d()[0]).focus();return function(){b.off("keydown",a);c.focus()}};Wcag.getAllFocusable=function(a){a=$(a);return a.find("select:enabled:visible, input:enabled:visible, button:enabled:visible, textarea:enabled:visible, [tabindex], video:visible, audio:visible")};var MediaDisplay=function(L,t,r,G,e,x,q,j,J,v,A,B){var s=this;var z=$("#"+L);var M=$("#"+t);var m=$("#"+r);var N=$("#"+G);var C=$("#"+e);var d=$("#"+x);var D=$("#"+q);var h=$("#"+j);var n=$("#"+J);var a=$("#"+v);var b=$("#"+A);var f=$("#"+B);var c=d[0];var o;var K;var y;var I=function(){var R=d.prop("videoWidth");var O=d.prop("videoHeight");if(R==0&&O==0){d.attr({width:"",height:""});R=d.width();O=d.height()}var T=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;var S=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;var Q=R/T;var P=O/S;if(P>Q){d.attr({width:"",height:P>1?S:(O>0?O:"")})}else{d.attr({width:Q>1?T:(R>0?R:""),height:""})}C.css({position:"absolute",top:((S-d.height())/2)+"px",left:((T-d.width())/2)+"px",width:d.width()+"px"});if(M.width()<320){M.addClass("overflow")}else{M.removeClass("overflow")}setTimeout(function(){if(b.css("direction")=="rtl"){b.css({right:(M.outerWidth()-(h.position().left+h.outerWidth()))+"px"})}else{b.css({left:h.position().left+"px"})}},0)};var u=function(){b.removeClass("show");h.removeClass("on")};var k=function(){if(b.is(":visible")){u()}else{b.addClass("show");h.addClass("on");f.val(o);setTimeout(function(){f.select()},0)}};h.click(k);n.click(function(){if(K){window.open(K)}});a.click(function(){s.hideVideo()});this.showVideo=function(U,P,O,T,Q,S,R){z.addClass("show");z.on("keydown",function(V){var W=V.keyCode||V.charCode;switch(W){case 27:s.hideVideo();V.preventDefault();break;default:break}});N.text(P);D.prop("type",Q);D.prop("src",T);d.prop("src",T);if(/^audio\//i.test(Q)){d.attr("poster","images/audio.png");m.addClass("audio");m.removeClass("video")}else{d.attr("poster","");m.addClass("video");m.removeClass("audio")}c.load();I();$(window).on("resize",I);$("body").css({overflow:"hidden"});K=$.format("{0}/doc/{2}/Electronic.aspx?{1}",S,U,O);R=R?R:"browse.aspx?"+U;o=$.format("{0}{1}{2}{3}&mediaid={4}",S,R,R.indexOf("?")<0?"?":"&",U,O);y=Wcag.constructModalDialog(z,$(":focus"));setTimeout(function(){d.focus()},0);z.on("click",function(V){var W=Wcag.getAllFocusable(z);if(!W.is(V.target)){d.focus()}});C.css({width:""})};this.hideVideo=function(){z.removeClass("show");z.off("keydown");z.off("click");c.pause();$(window).off("resize",I);$("body").css({overflow:"initial"});K=null;if(y){y();y=null}u()};c.onloadedmetadata=function(){I()};var E=function(){if(c.paused){c.play()}else{c.pause()}};var l=function(){c.muted=true};var F=function(){c.muted=false};var H=function(O){c.volume=Math.max(0,Math.min(1,c.volume+(O?0.1:-0.1)))};var p=function(O){c.currentTime+=(O?15:-15)};var w=function(O){c.currentTime+=((O?0.1:-0.1)*c.duration)};var g=function(){c.currentTime=0};var i=function(){c.currentTime=c.duration};d.keydown(function(O){var P=O.keyCode||O.charCode;switch(P){case 32:E();O.preventDefault();break;case 38:if(O.ctrlKey){F()}else{H(true)}O.preventDefault();break;case 40:if(O.ctrlKey){l()}else{H(false)}O.preventDefault();break;case 39:if(O.ctrlKey){w(true)}else{p(true)}O.preventDefault();break;case 37:if(O.ctrlKey){w(false)}else{p(false)}O.preventDefault();break;case 36:g();O.preventDefault();break;case 35:i();O.preventDefault();break;case 122:if(O.ctrlKey){if(c.requestFullscreen){c.requestFullscreen()}else{if(c.webkitRequestFullscreen){c.webkitRequestFullscreen()}else{if(c.mozRequestFullScreen){c.mozRequestFullScreen()}else{if(c.msRequestFullscreen){c.msRequestFullscreen()}}}}O.preventDefault()}break;default:break}})};