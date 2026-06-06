# CDN and Cache Notes

This site is built on GitHub Pages, so the repository cannot directly change GitHub Pages response headers. GitHub currently serves pages and assets with a short `Cache-Control: max-age=600`. The repo-level controls are:

- query-versioned CSS and JS (`?v={{ site.time }}`),
- a service worker with explicit runtime cache buckets,
- the `workers/site-cdn` Cloudflare Worker, which can be used as a free CDN front for the GitHub Pages origin.

## Free Cloudflare Path

Use the Worker at `workers/site-cdn` when the site should be served through Cloudflare without moving the Jekyll build off GitHub Pages.

The Worker uses only Workers `fetch` cache settings and response headers. It does not use Cache Reserve, R2, Argo, Images, or paid outbound services.

Policy:

| Route | Edge TTL | Browser cache | Rationale |
| --- | ---: | --- | --- |
| `/service-worker.js` | 0 | `no-store` | Browser must discover new service worker builds immediately. |
| `/updates.xml`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/google-scholar-stats/*` | 60s | 60s | Update surfaces should not lag behind publications/blog changes. |
| HTML routes | 300s | revalidate | Edge absorbs repeat traffic while browsers still check freshness. |
| `?v=...` assets, `/assets/vendor/*`, `/assets/fonts/*` | 1 year | immutable | Build/versioned or vendor assets are safe to cache aggressively. |
| `/assets/*`, `/images/*` | 30 days | 7 days | Static media gets useful CDN reuse without locking browsers forever. |
| `/files/*` | 1 day | 1 hour | PDFs/CV can change under the same path. |

## If Moving To Cloudflare Pages

Cloudflare Pages can parse a root `_headers` file and apply response headers during static asset serving. Keep that as a future migration option; it is not active on GitHub Pages.

Equivalent header intent:

```text
/service-worker.js
  Cache-Control: no-store, must-revalidate

/updates.xml
  Cache-Control: public, max-age=60, must-revalidate

/assets/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400

/assets/vendor/*
  Cache-Control: public, max-age=31536000, immutable

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/*
  Cache-Control: public, max-age=0, must-revalidate
```
