const CACHE_PREFIX = 'docspace-app-';
const CACHE = CACHE_PREFIX + __BUILD_ID__;
const APP_FILES = __APP_FILES__;
const assets = new Set(APP_FILES);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(
    APP_FILES.map(path => new Request(path, { cache: 'reload' }))
  )));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(CACHE_PREFIX) && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(async () => {
      const cache = await caches.open(CACHE);
      const shell = await cache.match('/index.html');
      return shell ?? Response.error();
    }));
    return;
  }

  if (!url.search && assets.has(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      return (await cache.match(url.pathname, { ignoreVary: true })) ?? fetch(request);
    })());
  }
});
