'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, YT */
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
		$('.home .video').each(function(i){

			$('iframe', this).attr('id', 'player' + i);
			var player = new YT.Player('player' + i);

			players.push(player);

			// $(this).on('click', function(){
			// 	player.carouselPlay();
			// });

			player.pe = this;

			// console.log(this);
			$(this).on('mousemove', function(){
				// console.log(player.getPlayerState)
				playing = player;
				$(player.pe).addClass('playing');
				$('.home playing-' + $(player.pe).index());
				player.playVideo();
			});
			$(this).on('mouseout', function(){
				// console.log(player.getPlayerState)
				$(player.pe).removeClass('playing');
				player.pauseVideo();
			});

				// player.playVideo();
				// player.pauseVideo();
			var wait4loop = setInterval(function(){
				if($(window).width() <= 768 || $('html.ios').length){
					clearInterval(wait4loop);
				}
				if(!player.playVideo){
					return;
				}
				player.playVideo();
				setTimeout(function(){					
					player.pauseVideo();
				}, 500);
				clearInterval(wait4loop);
			}, 100);
		});


		init();

	};

	var idleTimeout = 0;
	$('.home').addClass('idle').on('mousemove', function(e){
		// console.log('mousemove')
		clearTimeout(idleTimeout);
		$('.home').removeClass('idle');
		idleTimeout = setTimeout(function(){
			playing.pauseVideo();
			$('.home').addClass('idle');
		}, 5000);
	});

	function init(){


		$(window).on('resize', function(){


			var w = $(window).width(),
				h = $(window).innerHeight() || $(window).height(),
				ratio = 16 / 9;
			w /= 3;
			h /= 2;

			var iframeX = 0,
				iframeY = 0,
				iframeW = w,
				iframeH = h;
			// console.log(w);


			if(w / h >= ratio){
				iframeH = w / ratio;
				iframeW = w;
				iframeY = ((w / ratio - h) / 2 * -1);
				iframeX = 0;
			}else{
				iframeH = h;
				iframeW = h *  ratio + 2;
				iframeY = 0;
				iframeX = ((h *  ratio - w) / 2 * -1);

			}
			$('.home .video .player,.home .video .poster').height(iframeH).width(iframeW)
				.css('margin-top', iframeY)
				.css('margin-left', iframeX);
			// $('.slick-dots').remove();
			// $('.video-background .video-container').slick('reinit');
		}).trigger('resize');
	}




};	


