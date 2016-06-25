var $ = require('jquery');

'use strict';

var pushNotification = function() {

	console.log("In development")
	var banner = $(".banner")[0];

	$('#no').on('click', function(event) {
		event.preventDefault();
		banner.classList.remove('overlay-at-the-end');
		banner.style.opacity = 0;
		banner.style.transform = 'translateY(-100%)';
		
	});
}

module.exports = pushNotification;