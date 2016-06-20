var $ = require('jquery');
var browserSniffing = require('./modules/browserSniffing');
var serviceWorker = require('./modules/serviceWorker.js');

var init = function() {
    // Add class to indicate JS is working
    $('body').addClass('js-active'); 

    var link = $("a[rel='external']");
    link.attr("target", "_blank");

    browserSniffing();

}

serviceWorker();

$(document).ready(function($) { init(); });



