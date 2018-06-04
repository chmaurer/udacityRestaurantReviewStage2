/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
self.addEventListener('fetch', function (event) {
    event.respondWith(
            caches.match(event.request).then(function (response) {
        if (response)
            return response;
        /*   fetch(event.request).then(function (response)
         {
         caches.open('reviews').then(function (cache) {
         cache.put(event.request, response);
         });
         */     return fetch(event.request);
        //   });
    }).catch(function (error) {
        console.log(error);
    })
            )
});


self.addEventListener('install', function (event) {
    event.waitUntil(
            caches.open('reviews').then(function (cache) {
        return cache.addAll([
            '/',
            'data/restaurants.json',
            'js/dbhelper.js',
            'js/main.js',
            'js/restaurant_info.js',
            'css/styles.css',
            'index.html',
            'restaurant.html',
            'img/1.jpg',
            'img/2.jpg',
            'img/3.jpg',
            'img/4.jpg',
            'img/5.jpg',
            'img/6.jpg',
            'img/7.jpg',
            'img/8.jpg',
            'img/9.jpg',
            'img/10.jpg'
        ]);
    })

            );
});