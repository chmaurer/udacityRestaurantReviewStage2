/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


self.addEventListener('fetch', function(event) {

  var fetchPromise = fetch(event.request).then(function(response) {
    var openreq = indexedDB.open('reviews', 1);
    openreq.onupgradeneeded = () => {
      openreq.result.createObjectStore('reviewstore');
    };
    openreq.onsuccess = function(e) {
      response.blob().then(function(blob) {
        debugger;
        var db = e.target.result;
        var objectStore = db.transaction("reviewstore", "readwrite").objectStore('reviewstore');
        objectStore.add(blob, event.request.url);
      });
    };
    return response;
  }).catch(function(error) {
    debugger;
    var openreq = indexedDB.open('reviews', 1);
    openreq.onupgradeneeded = () => {
      openreq.result.createObjectStore('reviewstore');
    };
    debugger;
    var objectStore = openreq.transaction("reviewstore").objectStore('reviewstore');
    objectStore.get(event.request.url).onsuccess(function(review) {
      debugger;
      return JSON.parse(review);
    })
  })
})

;

/*
var db;
var openreq = indexedDB.open('reviews', 1);

openreq.onerror = () => {
  reject(openreq.error);
};

openreq.onupgradeneeded = () => {
  openreq.result.createObjectStore('reviewstore');
};

openreq.onsuccess = function(event) {
debugger;
db = event.result;
console.log("success: " + db);
objectStore = db.transaction("reviewstore").objectStore('reviewstore').getAll();

objectStore.get(event.request.url).onsuccess(function(review) {
  return review.result;
}).then(function(data) {
  var fetchPromise = fetch(event.request).then(function(networkResponse) {
    objectStore.add(networkResponse.clone(), event.request.url);
    return networkResponse;
  })
  return data || fetchPromise;
})

};*/
/*
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

  };*/

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