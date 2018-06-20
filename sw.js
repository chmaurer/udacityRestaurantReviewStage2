/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
self.addEventListener('activate', function(event) {
    importScripts('https://unpkg.com/dexie@2.0.3/dist/dexie.js');
    var db=new Dexie("reviews"); db.version(1).stores({
      reviews: 'id,data'
    });
});

self.addEventListener('fetch', function(event) {
  importScripts('https://unpkg.com/dexie@2.0.3/dist/dexie.js');
  var db = new Dexie("reviews");
  event.respondWith(
    db.reviews.get(event.request.url).then(function(review) {
      return review.data;
    }).then(function(data) {
      var fetchPromise = fetch(event.request).then(function(networkResponse) {
        db.reviews.put(networkResponse.clone(), event.request.url);
        return networkResponse;
      })
      return data || fetchPromise;
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