## Why

The site already uses a few external assets, but CDN loading is inconsistent and some resources still lack explicit fallbacks, cache hints, or low-impact loading behavior. Tightening this now improves first-load performance, resilience for citation data, and sharing/search presentation without changing the site's content model.

## What Changes

- Add a documented CDN delivery capability for static asset loading and external data retrieval.
- Prefer CDN-backed URLs for cacheable third-party resources where appropriate.
- Keep site-owned critical CSS local while adding resource hints and preload/preconnect entries for remote domains used during normal page rendering.
- Add resilient fallback behavior for Google Scholar citation JSON when the jsDelivr CDN misses or lags.
- Keep JavaScript non-render-blocking and ensure external links/images are enhanced after DOM load.

## Capabilities

### New Capabilities
- `cdn-delivery`: Site pages expose optimized resource hints, defer non-critical JavaScript, and retrieve CDN-hosted dynamic JSON with a raw GitHub fallback.

### Modified Capabilities

## Impact

- Affected templates: `_includes/head.html`, `_includes/head/custom.html`, `_includes/scripts.html`, `_includes/fetch_google_scholar_stats.html`.
- Affected generated pages: all Jekyll pages and posts.
- No new runtime dependency is required; the change stays compatible with GitHub Pages.
