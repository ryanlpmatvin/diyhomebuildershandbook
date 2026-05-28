const CACHE = 'handbook-v12';
const ASSETS = [
  './',
  './index.html',
  './privacy.html',
  './app.js',
  './illustrations.js',
  './diagrams.js',
  './config.js',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './fence-paling.png',
  './deck-build.png',
  './weatherboards.png',
  './cutting-trims.png',
  './gibbing.png',
  './plastering.png',
  './hang-door.png',
  './painting.png',
  './tiling-splashback.png',
  './shelves.png',
  './flat-pack.png',
  './plasterboard-patch.png',
  './caulking.png',
  './hanging-pictures.png',
  './curtain-rails.png',
  './sand-finish.png',
  './fence-gate.png',
  './raised-garden-bed.png',
  './sharpen-tools.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => null)
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => null);
          return res;
        })
        .catch(() => cached);
    })
  );
});
