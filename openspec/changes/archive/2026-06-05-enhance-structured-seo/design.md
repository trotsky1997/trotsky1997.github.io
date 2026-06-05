## Context

The site is a Jekyll-generated academic homepage. `_includes/seo.html` already owns titles, descriptions, canonical URLs, Open Graph, Twitter cards, JSON-LD, verification tags, and crawler hints. Existing SEO specs require Person, BlogPosting, WebPage, WebSite, BreadcrumbList, robots.txt, sitemap, and llms.txt coverage.

The remaining opportunity is semantic precision: collection pages are currently generic `WebPage` records, post JSON-LD lacks some article-level fields, and same-as links are partly hard-coded.

## Goals / Non-Goals

**Goals:**

- Keep `_includes/seo.html` as the single metadata rendering path.
- Generate richer JSON-LD while preserving the existing meta tags and visual output.
- Use configured author links instead of hard-coded profile URLs where possible.
- Add page-type-specific structured data for homepage, blog, projects, talks, and posts.
- Keep output valid JSON and compatible with GitHub Pages/Jekyll.

**Non-Goals:**

- No new JavaScript, analytics, tracking, or external SEO service dependency.
- No URL, permalink, sitemap, robots.txt, or visual layout changes.
- No attempt to game ranking signals with hidden content or keyword stuffing.

## Decisions

- Build a reusable `seo_same_as` array in Liquid and reuse it across Person, BlogPosting author, publisher, and WebSite publisher contexts.
  - Alternative: keep hard-coded links inline. Rejected because it drifts from `_config.yml`.
- Keep a primary JSON-LD object plus a secondary `@graph`.
  - Alternative: merge all JSON-LD into one large graph. Rejected to minimize churn against the currently working output.
- Detect collection page types from stable page URLs (`/blog/`, `/projects/`, `/talks/`) and emit `Blog` or `CollectionPage`.
  - Alternative: add front matter to every page. Rejected because URL-based detection is sufficient for the current small site.
- Derive collection entries from existing site data where reliable: posts from `site.posts`, projects/talks from rendered page links as a lightweight ItemList only when safe.
  - Alternative: build a full data model for projects/talks. Rejected as unnecessary for a static personal site.

## Risks / Trade-offs

- [Risk] Liquid-generated JSON-LD can become invalid if comma handling is careless.
  Mitigation: validate generated `<script type="application/ld+json">` blocks with `JSON.parse`.

- [Risk] Overly broad structured data may misrepresent page content.
  Mitigation: restrict richer entity types to homepage, blog index, projects, talks, and posts.

- [Risk] More JSON-LD slightly increases HTML size.
  Mitigation: keep fields concise and avoid duplicating full post bodies.

## Migration Plan

1. Update `_includes/seo.html`.
2. Add any minimal page front matter needed for clearer collection metadata.
3. Build the site in production mode.
4. Validate JSON-LD parseability, key meta tags, sitemap/robots/llms output, and a browser smoke test.
5. Archive the OpenSpec change after validation.
