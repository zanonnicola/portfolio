var $ = require('jquery');

'use strict';

var loadList = function() {

	var els = $(".hidden");
	var listSize = els.length;
	var loadMore = $("#loadMore");
	var counter = 3;
	var elHeight = $(".list-wrapper li")[0].getBoundingClientRect().height;

	loadMore.on('click', function(event) {
		event.preventDefault();

		if (counter < els.length + 3) {
			// Show the next 3 elements
			$('.hidden:lt(' + counter + ')').fadeIn(400, function() {

				$('body, html').animate({
	              scrollTop: elPosition
	            }, 400);

			});
			counter = counter + 3;

			// Find the last visible element
			var lastVisibileElm = els.filter(":visible").last();
			var elPosition = lastVisibileElm.offset().top - (elHeight * 2);


		} else {
			loadMore.fadeOut();
		}
	});

}

module.exports = loadList;