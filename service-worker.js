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
    console.log(event.request.url);
    event.respondWith(caches.match(event.request));
  }
});

