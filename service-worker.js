---
layout: null
permalink: /service-worker.js
sitemap: false
---

const CACHE_VERSION = "{{ site.time | date: '%Y%m%d%H%M%S' }}";
const STATIC_CACHE = `dz-static-${CACHE_VERSION}`;
const PAGE_CACHE = `dz-pages-${CACHE_VERSION}`;
const DATA_CACHE = `dz-data-${CACHE_VERSION}`;
const ASSET_VERSION = "?v={{ site.time | date: '%Y%m%d%H%M%S' }}";
const HOME_URL = "{{ '/' | relative_url }}";
const STATIC_MAX_ENTRIES = 140;
const PAGE_MAX_ENTRIES = 30;
const DATA_MAX_ENTRIES = 20;

const PRECACHE_URLS = [
  HOME_URL,
  "{{ '/assets/css/main.css' | relative_url }}" + ASSET_VERSION,
  "{{ '/assets/js/site.min.js' | relative_url }}" + ASSET_VERSION
];

const NETWORK_FIRST_PATHS = new Set([
  "{{ '/updates.xml' | relative_url }}",
  "{{ '/sitemap.xml' | relative_url }}",
  "{{ '/robots.txt' | relative_url }}",
  "{{ '/llms.txt' | relative_url }}"
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("dz-") && ![STATIC_CACHE, PAGE_CACHE, DATA_CACHE].includes(key))
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || request.headers.has("range")) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname === "{{ '/service-worker.js' | relative_url }}") return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, PAGE_CACHE, PAGE_MAX_ENTRIES));
    return;
  }

  if (NETWORK_FIRST_PATHS.has(url.pathname) || url.pathname.startsWith("{{ '/google-scholar-stats/' | relative_url }}")) {
    event.respondWith(networkFirst(request, DATA_CACHE, DATA_MAX_ENTRIES));
    return;
  }

  if (isStaticAsset(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE, STATIC_MAX_ENTRIES));
  }
});

function isStaticAsset(pathname) {
  return pathname.startsWith("{{ '/assets/' | relative_url }}") ||
    pathname.startsWith("{{ '/images/' | relative_url }}") ||
    pathname.startsWith("{{ '/files/' | relative_url }}");
}

async function networkFirst(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    await putCacheResponse(cache, request, response, maxEntries);
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") {
      const home = await cache.match(HOME_URL) || await caches.match(HOME_URL);
      if (home) return home;
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request)
    .then((response) => {
      putCacheResponse(cache, request, response, maxEntries);
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

async function putCacheResponse(cache, request, response, maxEntries) {
  if (!response || !response.ok || response.type === "opaque") return;
  try {
    await cache.put(request, response.clone());
    await trimCache(cache, maxEntries);
  } catch (error) {}
}

async function trimCache(cache, maxEntries) {
  if (!maxEntries) return;
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  await Promise.all(keys.slice(0, keys.length - maxEntries).map((key) => cache.delete(key)));
}
