/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


self.addEventListener('fetch', function(event) {

  //  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

  // Open (or create) the database
  var db;
  var openreq = indexedDB.open('reviews', 1);

  openreq.onerror = () => {
    reject(openreq.error);
  };

  openreq.onupgradeneeded = () => {
    // First time setup: create an empty object store
    openreq.result.createObjectStore('reviewstore');
  };

  openreq.onsuccess = () => {
    db = openreq.result;
    var tx = db.transaction("reviewstore", "readwrite");
    var store = tx.objectStore("reviewstore");

    event.respondWith(
      store.get(event.request.url).onsuccess(function(review) {
        return review.result;
      }).then(function(data) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          store.add(networkResponse.clone(), event.request.url);
          return networkResponse;
        })
        return data || fetchPromise;
      })
    );

  };
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