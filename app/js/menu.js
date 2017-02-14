'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, TweenMax */
app.partial.menu = function(){
	$('header a.burger').on('click', function(){
		if( !$('header nav').hasClass('on') ){
			$('header nav').addClass('on');
		}else{
			$('header nav').removeClass('on');
		}
	});

	$('header nav a').on('click', function(){
		$('.lightbox').removeClass('in');
		if(window.player.pauseVideo){
			window.player.pauseVideo();
		}
		if(window.otv.pauseVideo){
			window.otv.pauseVideo();
			$('.otv .poster').addClass('fade').removeClass('in');
		}
		$('header nav').removeClass('on');
	});
	$('header nav a:eq(0)').on('click', function(){
		TweenMax.to('html, body', 0.5, {
			scrollTop: 0
		});
	});

	$('header nav a:eq(1)').on('click', function(){
		TweenMax.to('html, body', 0.5, {
			scrollTop: $('.videos .video:eq(0)').offset().top - 44
		});
	});

	var videoNav = $('.nav-container');
	videoNav.find('a:eq(0), a:eq(1)').on('click', function() {
		if($(window).width() <= 768 || $('html.ios,html.mobile,html.tablet').length){
			$('.videos .video').eq($(this).index()).trigger('click');
			return;
		}
		TweenMax.to('html, body', 0.5, {
			scrollTop: $('.videos .video:eq(0)').offset().top - 44
		});
	});
	videoNav.find('a:eq(2), a:eq(3)').on('click', function() {
		if($(window).width() <= 768 || $('html.ios,html.mobile,html.tablet').length){
			$('.videos .video').eq($(this).index()).trigger('click');
			return;
		}
		TweenMax.to('html, body', 0.5, {
			scrollTop: $('.videos .video:eq(2)').offset().top - 44
		});
	});
	videoNav.find('a:eq(4), a:eq(5)').on('click', function() {
		if($(window).width() <= 768 || $('html.ios,html.mobile,html.tablet').length){
			$('.videos .video').eq($(this).index()).trigger('click');
			return;
		}
		TweenMax.to('html, body', 0.5, {
			scrollTop: $('.videos .video:eq(4)').offset().top - 44
		});
	});


};
