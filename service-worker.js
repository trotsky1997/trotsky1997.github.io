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

const PRECACHE_URLS = [
  "{{ '/' | relative_url }}",
  "{{ '/assets/css/main.css' | relative_url }}" + ASSET_VERSION,
  "{{ '/assets/js/site.min.js' | relative_url }}" + ASSET_VERSION
];

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
    event.respondWith(networkFirst(request, PAGE_CACHE));
    return;
  }

  if (url.pathname.startsWith("{{ '/google-scholar-stats/' | relative_url }}")) {
    event.respondWith(networkFirst(request, DATA_CACHE));
    return;
  }

  if (isStaticAsset(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  }
});

function isStaticAsset(pathname) {
  return pathname.startsWith("{{ '/assets/' | relative_url }}") ||
    pathname.startsWith("{{ '/images/' | relative_url }}") ||
    pathname.startsWith("{{ '/files/' | relative_url }}") ||
    pathname === "{{ '/llms.txt' | relative_url }}" ||
    pathname === "{{ '/robots.txt' | relative_url }}" ||
    pathname === "{{ '/feed.xml' | relative_url }}";
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") {
      const home = await cache.match("{{ '/' | relative_url }}");
      if (home) return home;
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}
