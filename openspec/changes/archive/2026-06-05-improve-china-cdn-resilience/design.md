## Context

This is a GitHub Pages Jekyll site. CSS, icons, images, and most JavaScript are already local, but three runtime paths still depend on foreign remote origins:

- Google Scholar citation JSON is requested from jsDelivr first and raw.githubusercontent.com second.
- MathJax is loaded from jsDelivr.
- CV links point directly to raw.githubusercontent.com.

For visitors in mainland China, raw.githubusercontent.com is frequently blocked or unstable and jsDelivr can also be unreliable depending on network path. The site should therefore make core rendering independent of both origins.

## Goals / Non-Goals

**Goals:**

- Serve the CV PDF from the site itself.
- Serve MathJax from a local asset path.
- Make citation stats local-first and avoid fetching them when no citation placeholders exist on the page.
- Keep external profile links as normal user-initiated links.
- Keep Jekyll/GitHub Pages deployment simple.

**Non-Goals:**

- Mirror all external publication, Google Scholar, HuggingFace, GitHub, LinkedIn, X, or WeChat links.
- Add a mainland China hosting provider, ICP filing, service worker cache, or custom CDN.
- Guarantee access to GitHub Pages itself from every Chinese network.

## Decisions

1. Use site-relative URLs for critical static resources.
   - CV becomes `/files/FDU-ZhangDi-CV-2026.pdf`.
   - MathJax becomes `/assets/js/mathjax/tex-chtml.js`.
   - Citation stats become `/google-scholar-stats/gs_data.json`.
   - Rationale: all three are then served through the same GitHub Pages origin as the page, removing raw GitHub/jsDelivr from the normal render path.

2. Keep remote citation URLs as optional fallbacks only.
   - The citation loader will try the local JSON first, then optional CDN/raw URLs.
   - It will skip all fetches when the page has no citation targets.
   - Rationale: citation counts are enhancement data, not a reason to slow every page.

3. Update the crawler workflow to write generated JSON into `main`.
   - Rationale: the current branch-push design requires a separate `google-scholar-stats` branch and then a CDN/raw fetch. Keeping the JSON under `google-scholar-stats/` on `main` allows GitHub Pages to serve it locally.

4. Remove normal render hints for jsDelivr and raw.githubusercontent.com.
   - Rationale: connection hints should reflect the resources that are actually needed during page rendering.

## Risks / Trade-offs

- Local MathJax can become stale compared with the CDN version. Mitigation: pin the copied version and treat updates as explicit asset refreshes.
- The CV PDF in this repo may drift from the separate profile repo copy. Mitigation: this site should treat the local PDF as the published homepage copy.
- Google Scholar crawler failures can leave stale local citation JSON. Mitigation: stale local stats are preferable to failed runtime requests, and the page should degrade silently.
