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
}

module.exports = browserSniffing;