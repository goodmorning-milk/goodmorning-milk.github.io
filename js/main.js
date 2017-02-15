"use strict";function getParam(t){var e=new RegExp("^.*[?&]"+t+"[=]([^&]+).*$","i");if(!e.test(location.search))return null;var o=location.search.replace(e,"$1");return decodeURIComponent(o)}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},app={};app.partial={};var debug=/localhost[:]9000|nelson119.github.io/.test(location.href);$(function(){app.getParam=getParam,$.each(app.partial,function(t,e){e()}),app.imageReload.init(),app.imageReload.callback=function(){$("html").addClass("loading-done")},app.imageReload.init()}),$.fn.hasAttr=function(t){var e=$(this).attr(t);return"undefined"!==("undefined"==typeof e?"undefined":_typeof(e))&&e!==!1};var share={facebook:function(t,e){t=encodeURIComponent(t||location.href+"?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=camp"),e=encodeURIComponent(e||document.title),window.open("https://www.facebook.com/sharer.php?u="+t+"&amp;t="+e)},googleplus:function(t){t=encodeURIComponent(t||location.href+"?utm_source=g+&utm_medium=googleplus_m&utm_campaign=camp"),window.open("https://plus.google.com/share?url="+t,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600")},email:function(t,e){t=encodeURIComponent(t||location.href+"?utm_source=email&utm_medium=email_m&utm_campaign=camp"),e=encodeURIComponent(e||document.title);var o=encodeURIComponent(""+t+" #"+e);window.open("https://mail.google.com/mail/?view=cm&fs=1&to=&su=與你分享:"+e+"&body="+o+"&bcc=")}};app.partial.preload=function(){function t(t){function e(t){a[t]=!0;var e=!0;$.each(a,function(t,o){e=o&&e}),e&&o()}function o(){"function"==typeof app.imageReload.callback&&app.imageReload.callback()}var a={},n=[],i=$("img[data-src]:visible, figure[data-src]:visible").not("[src],[style]");i.each(function(t,e){$(e).attr("data-src")&&(a[$(e).attr("data-src")]=!1,n.push(e))}),$.each(a,function(t,o){if(/\.svg$/.test(t))$.get(t,function(o){$(n).filter(function(){return t==$(this).attr("data-src")}).each(function(t,e){"img"===e.tagName.toLowerCase()?($("svg",o).clone().insertAfter(e),$(e).remove()):$(e).removeAttr("data-src").html($("svg",o).clone())});e(t)});else{var a=new Image;a.onload=function(){$(n).filter(function(){return t==$(this).attr("data-src")}).each(function(t,e){"img"===e.tagName.toLowerCase()?$(e).attr("src",$(e).attr("data-src")):$(e).css("background-image","url("+$(e).attr("data-src")+")")});e(t)},a.src=t}})}app.dementions={mobile:!1,desktop:!1},app.imageReload={init:function(){$(window).on("resize",function(){$("img[data-src]:visible, figure[data-src]:visible").not("[src],[style]").length&&$(window).width()<=768?t(function(){app.dementions.mobile=!0}):$("img[data-src]:visible, figure[data-src]:visible").not("[src],[style]").length&&$(window).width()>768?t(function(){app.dementions.desktop=!0}):app.imageReload.callback()}).trigger("resize")},refresh:function(){$(window).trigger("resize")},callback:function(){}}},app.partial.spa=function(){function t(t,o,a,i,r){r=r||!1,n.trigger("page:preupdate"),r||location.pathname===t||$("html").removeClass("loading-done"),$.get(t,function(i){var l=l,c="";$(i).each(function(t,e){"og:title"===$(e).attr("property")&&(l=$(e).attr("content")),"main"===$(e).attr("role")&&(c=e)}),r||e({uri:t,name:o,menu:a,title:l},"update content"+t),n.html(c),n.trigger("page:update:"+o,a),n.trigger("page:update",a),app.imageReload.init()})}function e(t,e){t.title=t.title||i,document.title=t.title,history.pushState(t,t.title,t.uri)}var o=(/localhost[:]9000|github.io/.test(location.href),/nelson.works/.test(location.href),/staging/.test(location.href)),a="/";a=o?"/staging/":a;var n=$("#container"),i=document.title;if(app.spa={container:n,title:i},$(window).on("popstate",function(e){var o=e.originalEvent.state;return null===o&&(location.href=a),document.title=o.title,t(o.content,o.category,o.catalog,function(){},!0),!0}),$("a[data-href]").on("click",function(e){$(this).addClass("active").siblings().removeClass("active");var o=$(this).attr("data-href"),a=$(this).text(),n=null;t(o,a,n,function(){console.log(a)})}),app.getParam("path")){var r=decodeURIComponent(app.getParam("path"));$("a[data-href="+r+"]").trigger("click")}n.on("page:update",function(t,e){}),n.trigger("page:update","home")},app.partial.i18n=function(){$(".i18n .to").on("click",function(){return $(this).addClass("active").siblings().removeClass("active"),$("html").attr("lang")!==$(this).attr("data-lang")&&($("html").removeClass("loading-done"),$("html").attr("lang",$(this).attr("data-lang")),void app.imageReload.refresh())});var t=$("html").attr("lang");t&&$(".i18n .to[data-lang="+t+"]").trigger("click")},app.partial.ga=function(){},app.partial.menu=function(){$("header a.burger").on("click",function(){$("header nav").hasClass("on")?$("header nav").removeClass("on"):$("header nav").addClass("on")}),$("header nav a").on("click",function(){$(".lightbox").removeClass("in"),window.player.pauseVideo&&window.player.pauseVideo(),window.otv.pauseVideo&&(window.otv.pauseVideo(),$(".otv .poster").addClass("fade").removeClass("in")),$("header nav").removeClass("on")}),$("header nav a:eq(0)").on("click",function(){TweenMax.to("html, body",.5,{scrollTop:0})}),$("header nav a:eq(1)").on("click",function(){TweenMax.to("html, body",.5,{scrollTop:$(".videos .video:eq(0)").offset().top-44})});var t=$(".nav-container");t.find("a:eq(0), a:eq(1)").on("click",function(){$(window).width()<=768||$("html.ios,html.mobile,html.tablet").length||TweenMax.to("html, body",.5,{scrollTop:$(".videos .video:eq(0)").offset().top-44})}),t.find("a:eq(2), a:eq(3)").on("click",function(){$(window).width()<=768||$("html.ios,html.mobile,html.tablet").length||TweenMax.to("html, body",.5,{scrollTop:$(".videos .video:eq(2)").offset().top-44})}),t.find("a:eq(4), a:eq(5)").on("click",function(){$(window).width()<=768||$("html.ios,html.mobile,html.tablet").length||TweenMax.to("html, body",.5,{scrollTop:$(".videos .video:eq(4)").offset().top-44})}),t.find("a").on("click",function(t){($(window).width()<=768||$("html.ios,html.mobile,html.tablet").length)&&(console.log(this),$(".videos .video").eq($(this).index()).find("a").trigger("click"))})},app.partial.yt=function(){function t(t){$(window).on("resize",function(){$(window).width(),$(window).innerHeight()||$(window).height()}).trigger("resize"),$(".otv .poster .play").one("click",function(){t.seekTo(18)}).on("click",function(){var e=$(".otv .poster").hasClass("fade in");if(e){$(".otv .poster").addClass("fade").removeClass("in"),TweenMax.to("html, body",.5,{scrollTop:$(".otv").offset().top}),t.playVideo();var o=0,a=t.getDuration();clearInterval(o),o=setInterval(function(){var e=100*t.getVideoLoadedFraction(),o=t.getCurrentTime(),n=o/a*100;$(".duration .played",$(".otv .player")).width(n+"%"),e<100&&$(".duration .downloaded",$(".player")).width(e+"%")},25)}else $(".otv .poster").css("background-image","none"),$(".otv .poster").addClass("fade in"),t.pauseVideo()});var e=0;$(".videos .video a").on("click",function(t){window.otv.pauseVideo&&window.otv.pauseVideo();var o=$(t.target).attr("data-vid");$(".lightbox .player").html("").append("<div id='player'></div>"),window.player=new YT.Player("player",{height:"1920",width:"1080",videoId:o,playerVars:{autoplay:1,controls:0,loop:1,playlist:o},events:{onReady:function(){$(".lightbox").addClass("in"),window.player.playVideo(),clearInterval(e),e=setInterval(function(){var t=window.player.getDuration(),e=window.player.getCurrentTime(),o=e/t*100;o>95&&window.player.seekTo(0)},25)},onStateChange:function(){}}})})}var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(e,o);window.onYouTubeIframeAPIReady=function(){var e=new YT.Player("otv",{height:"1920",width:"1080",videoId:"wEvR4P6jSEo",playerVars:{autoplay:0,controls:0},events:{onReady:function(){},onStateChange:function(){}}});e.pe=$(".otv"),t(e),window.otv=e};var a=0;$(".otv .player").addClass("idle"),$(".otv .poster").on("mousemove",function(t){clearTimeout(a),$(".otv .player").removeClass("idle"),a=setTimeout(function(){$(".otv .player").addClass("idle")},1500)})};