## Context

The site is a GitHub Pages Jekyll site. Critical CSS is generated locally and should remain local to avoid adding a CDN dependency for first paint. The site also reads Google Scholar citation JSON from a branch through jsDelivr, loads MathJax for formulas, and links to GitHub/HuggingFace/LinkedIn/X/WeChat resources.

## Goals / Non-Goals

**Goals:**
- Improve connection setup for remote resources already used by the site.
- Keep JavaScript non-render-blocking.
- Make citation JSON resilient when jsDelivr has stale cache, propagation lag, or transient errors.
- Preserve GitHub Pages compatibility and avoid new build dependencies.

**Non-Goals:**
- Move all site-owned CSS/JS onto an external CDN.
- Introduce asset fingerprinting outside the current GitHub Pages build.
- Replace Jekyll or the existing theme pipeline.

## Decisions

- Keep `main.css` local because it is critical render CSS generated from Sass during the Pages build. Remote-hosting it would add another availability dependency and complicate cache invalidation.
- Use preconnect/dns-prefetch hints for jsDelivr, raw GitHub, GitHub, HuggingFace, and WeChat because those origins are used by normal navigation, images, citation data, or linked talk content.
- Load MathJax asynchronously and site JavaScript with `defer`, preserving formula rendering while keeping parsing responsive.
- Replace the citation fetch with a small fallback helper that tries jsDelivr first and raw GitHub second, keeping the existing DOM update behavior unchanged.

## Risks / Trade-offs

- Extra preconnects can be wasteful on pages that do not use every origin. Mitigation: keep the list short and limited to recurring site resources.
- jsDelivr branch URLs can lag after citation workflow updates. Mitigation: raw GitHub fallback is used when the CDN request fails.
- Client-side lazy loading runs after DOMContentLoaded rather than being present in source HTML. Mitigation: it is a progressive enhancement and preserves explicit image attributes if already set.
