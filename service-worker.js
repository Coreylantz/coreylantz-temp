// service-worker.js
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          'assets/css/style.css',
          'assets/fonts/Rockwell-Regular-Font.ttf',
          'assets/fonts/Rockwell-Regular-Font.woff',
          'assets/fonts/Rockwell-Regular-Font.woff2',
          'assets/fonts/unicodefuturab.ttf',
          'assets/fonts/unicodefuturab.woff',
          'assets/fonts/unicodefuturab.woff2'
        ]
      );
    })
  );
});
self.addEventListener("activate", event => {
  console.log('Activate!');
});
self.addEventListener('fetch', function(event) {
  // console.log('Fetch!');
});

