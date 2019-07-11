// service-worker.js
const cacheName = 'coreyCache';
const staticAssets = [
  '/assets/css/style.css',
  '/assets/fonts/Rockwell-Regular-Font.ttf',
  '/assets/fonts/Rockwell-Regular-Font.woff',
  '/assets/fonts/Rockwell-Regular-Font.woff2',
  '/assets/fonts/unicodefuturab.ttf',
  '/assets/fonts/unicodefuturab.woff',
  '/assets/fonts/unicodefuturab.woff2',
  '/images/icon/favicon.png',
  '/images/icon/icon-72x72.png',
  '/images/icon/icon-96x96.png',
  '/images/icon/icon-128x128.png',
  '/images/icon/icon-144x144.png',
  '/images/icon/icon-152x152.png',
  '/images/icon/icon-192x192.png',
  '/images/icon/icon-384x384.png',
  '/images/icon/icon-512x512.png',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(staticAssets);
    })
  );
});
self.addEventListener("activate", event => {
  console.log('Activate!');
});
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  if (staticAssets.indexOf(url.pathname) !== -1) {
    // url.pathname is a string relative to the site's root, 
    event.respondWith(caches.match(event.request)
    .then(response => {
      if (!response) {
        // No match in caches: any falsy response is no good
        // This will cause the chained `catch` to be invoked
        // similar in effect to a rejected `Promise`
        throw new Error(`${event.request} not found in cache`);
      }
      return response; // DO retunr the response if it's OK
    })
    .catch(error => fetch(event.request)) // fetch from network if not in the cache
    );
  }
});
