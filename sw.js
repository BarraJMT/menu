// Barra JMT · menú móvil — service worker de limpieza.
// Borra las copias guardadas por el worker anterior y se da de baja. No recarga nada por sí solo.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
  );
});
