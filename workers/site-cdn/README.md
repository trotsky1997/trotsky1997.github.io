# Site CDN Worker

Free Cloudflare Worker CDN front for the GitHub Pages site.

The Worker proxies `https://trotsky1997.github.io` and applies explicit cache policy:

- `service-worker.js`: no-store so browser updates are not held by the CDN.
- `updates.xml`, `sitemap.xml`, `robots.txt`, `llms.txt`, `google-scholar-stats/*`: short 60 second edge/browser cache.
- HTML: five minute Cloudflare edge cache, browser revalidates every view.
- Query-versioned assets and vendor/fonts: one year immutable cache.
- Images and ordinary static assets: 30 day edge cache, seven day browser cache.
- PDFs/files: one day edge cache, one hour browser cache.

Deploy:

```powershell
wrangler deploy
```

Smoke check:

```powershell
Invoke-WebRequest https://dz-site-cdn.qq893371906.workers.dev/.cdn-status -UseBasicParsing
```
