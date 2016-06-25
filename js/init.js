var $ 					= require('jquery');
var browserSniffing 	= require('./modules/browserSniffing');
var serviceWorker 		= require('./modules/serviceWorker.js');
var loadList 			= require('./modules/loadList.js');
var animateFLIP 		= require('./modules/animateFLIP.js');
var pushNotification 	= require('./modules/pushNotification.js');

var init = function() {
    // Add class to indicate JS is working
    $('body').addClass('js-active'); 

    var link = $("a[rel='external']");
    link.attr("target", "_blank");

    browserSniffing();
    loadList();
    animateFLIP();
    pushNotification();

}

serviceWorker();

$(document).ready(function($) { init(); });



