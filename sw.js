/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
self.addEventListener('fetch', function(event) {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  //found this smart piece of code here https://stackoverflow.com/questions/41574723/service-worker-get-from-cache-then-update-cache
  event.respondWith(
    caches.open('reviews').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );

});


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('reviews').then(function(cache) {
      return cache.addAll([
        /*   '/',
           'data/restaurants.json',
           'js/dbhelper.js',
           'js/main.js',
           'js/restaurant_info.js',
           'css/styles.css',
           'index.html',
           'restaurant.html',
           'img/1.jpg',
           'img/8.jpg',
           'img/9.jpg',
           'img/10.jpg'*/
      ]);
    })

  );
});