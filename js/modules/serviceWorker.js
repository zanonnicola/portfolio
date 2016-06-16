'use strict';

var serviceWorker = function() {
  if('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname.indexOf('127.') === 0)) {
    navigator.serviceWorker.register('./sw.js').then(function(registration) { 
      // Check to see if there's an updated version of service-worker.js with new files to cache:
      if (typeof registration.update == 'function') {
        registration.update();
      }
          
      registration.onupdatefound = function() {
        // The updatefound event implies that registration.installing is set;
        var installingWorker = registration.installing;
          
        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and the fresh content will
              // have been added to the cache.
              // It's the perfect time to display a "New content is available; please refresh."
              // message in the page's interface.
              console.log('New or updated content is available.');
            } else {
              // At this point, everything has been precached, but the service worker is not
              // controlling the page. The service worker will not take control until the next
              // reload or navigation to a page under the registered scope.
              // It's the perfect time to display a "Content is cached for offline use." message.
              console.log('Content is cached, and will be available for offline use the ' +
                        'next time the page is loaded.')
            }
            break;

            case 'redundant':
              console.error('The installing service worker became redundant.');
            break;
          }
        };
      };
    }).catch(function(err) {
      // registration failed :( buuu
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}

module.exports = serviceWorker;




