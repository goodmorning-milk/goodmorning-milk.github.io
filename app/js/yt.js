'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, YT, TweenMax , window*/
app.partial.yt = function(){
	// 2. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.

	var playing = null;

	window.onYouTubeIframeAPIReady = function () {

		var players = [];
		
		// console.log(1);
		// $('.otv iframe').attr('id', 'otv');
		var pl = new YT.Player('otv', {
			height: '1920',
			width: '1080',
			videoId: 'wEvR4P6jSEo',

			playerVars: {
				autoplay: 0,
				controls: 0
			},
			events: {
				'onReady': () =>{},
				'onStateChange': () =>{}
			}
		});
		pl.pe = $('.otv');


		init(pl);

		window.otv = pl;

	};

	var idleTimeout = 0;
	$('.otv .player').addClass('idle');
	$('.otv .poster').on('mousemove', function(e){
		// console.log('mousemove')
		clearTimeout(idleTimeout);
		$('.otv .player').removeClass('idle');
		idleTimeout = setTimeout(function(){
			$('.otv .player').addClass('idle');
		}, 1500);
	});

	function init(pl){


		$(window).on('resize', function(){


			var w = $(window).width(),
				h = $(window).innerHeight() || $(window).height(),
				ratio = 16 / 9;
			// w /= 3;
			// h /= 2;

			var iframeX = 0,
				iframeY = 0,
				iframeW = w,
				iframeH = h;

		}).trigger('resize');

		$('.otv .poster .play').one('click', function(){
			pl.seekTo(18);
		}).on('click', function(){
			var playing = $('.otv .poster').hasClass('fade in');
			if(!playing){
				$('.otv .poster').css('background-image', 'none');
				$('.otv .poster').addClass('fade in');
				pl.pauseVideo();				
			}else{
				$('.otv .poster').addClass('fade').removeClass('in');
				TweenMax.to('html, body', 0.5, {
					scrollTop: $('.otv').offset().top
				});
				pl.playVideo();

				var fragTick = 0;
				var totalTime = pl.getDuration();

				clearInterval(fragTick);
				fragTick = setInterval(function(){
					var fragPercent = pl.getVideoLoadedFraction() * 100;
					var currentTime = pl.getCurrentTime();
					var played = currentTime/totalTime * 100;
					$('.duration .played', $('.otv .player')).width(played + '%');

					if(fragPercent < 100){
						$('.duration .downloaded', $('.player')).width(fragPercent + '%');
					}
				}, 25);
			}
		});
		var sk = 0;
		$('.videos .video a').on('click', (e) => {
			// console.log(e.target);
			if(window.otv.pauseVideo){
				window.otv.pauseVideo();
			}
			
			var vid = $(e.target).attr('data-vid');
			// console.log($(e.target).attr('data-vid'));
			$('.lightbox .player').html('').append(`<div id='player'></div>`);
			window.player = new YT.Player('player', {
				height: '1920',
				width: '1080',
				videoId: vid,

				playerVars: {
					autoplay: 1,
					controls: 0,
					loop: 1,
					playlist: vid
				},
				events: {
					'onReady': () =>{
						$('.lightbox').addClass('in');
						window.player.playVideo();

						clearInterval(sk);
						sk = setInterval(function(){
							// console.log(player.getDuration);
							var totalTime = window.player.getDuration();
							// console.log(player.getCurrentTime);
							var currentTime = window.player.getCurrentTime();
							var played = currentTime/totalTime * 100;
							// console.log(played);
							if(played>95){
								window.player.seekTo(0);
							}
						}, 25);
					},
					'onStateChange': () =>{

					}
				}
			});
			// var src = $('#player').attr('src').replace(/https[:]\/\//, '//');
			// $('#player').attr('src', src);
		});
	}




};	


