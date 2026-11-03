// Barra JMT · menú móvil — service worker de limpieza.
// Reemplaza al worker anterior (que servía copias guardadas antes que la red y dejaba páginas viejas o en blanco).
// Borra todas las copias guardadas, se da de baja y recarga la página una vez. Después el sitio carga siempre fresco desde GitHub.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (clients) { clients.forEach(function (c) { c.navigate(c.url); }); })
  );
});
