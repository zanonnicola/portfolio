var $ = require('jquery');

'use strict';

var animateFLIP = function() {

	var body = $('body');
	var content = null;
	var el;
	var banner = $(".banner")[0];

	$('.box__content').on('click', function(event) {

		var elId = $(this).data('id');
		el = $('#' + elId)[0];
		content = $('#' + elId).find('.overlay-content');

		body.addClass('ov-hidden');
		
		animateWithFLIPopen(el);

	});
	$('.close').on('click', function(event) {
		event.preventDefault();
		body.removeClass('ov-hidden');
		
		animateWithFLIPclose(el);

	});

	$("#notify").on('click', function(event) {
		event.preventDefault();
		animateWithFLIPopen(banner);
	});

	var tidyUpAnimations = function() {
		if (el) {
			if (el.style.opacity == 1) {
				content.addClass('overlay-content__visible');
			} else {
				content.removeClass('overlay-content__visible');
			}
		};
	}

	var animateWithFLIPopen = function(el) {
		
		var first = el.getBoundingClientRect();
		el.classList.add('overlay-at-the-end');
		var last = el.getBoundingClientRect();

		// Invert 
		var invert = first.top - last.top;
		el.style.transform = 'translateY(' + invert + 'px)';

		requestAnimationFrame(function() {

			// Switch on animations.
			//el.classList.add('overlay-at-the-end');
			el.style.opacity = 1;
			el.style.transform = '';
		});

		el.addEventListener('transitionend',
    	tidyUpAnimations);

	}
	var animateWithFLIPclose = function(el) {

		requestAnimationFrame(function() {

			// Switch on animations.
			el.classList.remove('overlay-at-the-end');
			el.style.opacity = 0;
			el.style.transform = 'translateY(-100%)';
		});

	}
}

module.exports = animateFLIP;