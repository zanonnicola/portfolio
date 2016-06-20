var $ = require('jquery');

'use strict';

var browserSniffing = function() {
	var isSafari = /constructor/i.test(window.HTMLElement);
		if(isSafari) {
		$("html").addClass("safari");
	};
		var isFF = !!navigator.userAgent.match(/firefox/i);
		if(isFF) {
		$("html").addClass("firefox");
	};
	function is_touch_device() {
  		return 'ontouchstart' in window  || navigator.maxTouchPoints; 
	};
	if (is_touch_device()) {
		$("html").addClass("touch");
	};
}

module.exports = browserSniffing;