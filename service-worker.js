// service-worker.js
self.addEventListener('install', function(event) {
  const cacheName = 'coreyCache';
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/assets/css/style.css',
          '/assets/fonts/Rockwell-Regular-Font.ttf',
          '/assets/fonts/Rockwell-Regular-Font.woff',
          '/assets/fonts/Rockwell-Regular-Font.woff2',
          '/assets/fonts/unicodefuturab.ttf',
          '/assets/fonts/unicodefuturab.woff',
          '/assets/fonts/unicodefuturab.woff2',
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
  // Hard coded
  caches.match('/assets/css/style.css').then(function(response) {
    console.log(response);
    if (!response) throw Error("No data");
    return response.json();
  }).then(function(data) {
    // don't overwrite newer network data
    if (!networkDataReceived) {
      updatePage(data);
    }
  }).catch(function() {
    // we didn't get cached data, the network is our last hope:
    return networkUpdate;
  }).catch(showErrorMessage).then(stopSpinner());

});

