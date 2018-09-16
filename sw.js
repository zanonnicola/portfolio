var cacheEls = [
  './',
  './index.html',
  './css/global.css',
  './js/build/bundle.js',
  './fonts/bt_mono-Bold_gdi.svg',
  './fonts/bt_mono-Regular_gdi.svg',
  './fonts/bt_mono-Bold_gdi.woff',
  './fonts/bt_mono-Regular_gdi.woff',
  './img/icons/icon-2015.svg'
];

var CACHE_VERSION = 'v7a';


self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      return cache.addAll(cacheEls).catch(function (error) {
        console.error('Error in install handler:', error);
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  var cacheWhitelist = ['v7a'];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        // Loop through all of the caches in the service worker and deleting any caches which aren't defined in the cache whitelist.
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function () {
      console.log('[ServiceWorker] Claiming clients for version', CACHE_VERSION);
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have 2 stream.
            var responseToCache = response.clone();

            caches.open(CACHE_VERSION)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
