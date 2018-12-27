//
// Implement service worker offline first functionality
//

let initialCacheName = 'restAppCache' + 'v1.0.0';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(initialCacheName).then(function(cache) {
        return cache.addAll([
            '/',
            'index.html',
            'restaurant.html',
            'js/main.js',
            'js/restaurant_info.js',
            'js/dbhelper.js',
            'css/styles.css',
            'data/restaurants.json',
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
    }).catch(function(error) {
      console.error('Failed to install ' + initialCacheName  + ' error = ' + error);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              return cacheName.startsWith('restAppCache') &&
                     cacheName != initialCacheName;
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
       })
    );
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
    })
  );
});