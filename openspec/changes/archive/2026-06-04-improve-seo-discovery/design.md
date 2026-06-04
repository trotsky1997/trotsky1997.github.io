## Context

The Jekyll site already has a custom SEO include with canonical URLs, Open Graph metadata, Twitter cards, and JSON-LD. The remaining issues are quality and completeness: page descriptions are inconsistent, the homepage title is too long, metadata lacks keyword/author hints, and crawlers do not have an explicit `robots.txt` entry that points to the sitemap.

## Goals / Non-Goals

**Goals:**
- Keep SEO metadata generated from a single include.
- Make homepage, index pages, and posts produce concise titles and useful snippets.
- Add crawler guidance through `robots.txt`.
- Improve JSON-LD without introducing new plugins.

**Non-Goals:**
- Add paid analytics, Search Console verification tokens, or third-party SEO scripts.
- Rewrite blog content for keyword stuffing.
- Replace `jekyll-sitemap` or existing feed generation.

## Decisions

- Add `tagline` and `keywords` to `_config.yml` so site-wide SEO defaults are explicit and reusable.
- Keep page-specific `excerpt`/`description` as the highest priority for snippets, then fall back to site description.
- Emit `Person`, `BlogPosting`, or `WebPage` JSON-LD from the existing include rather than adding separate templates.
- Add `robots.txt` as a static Jekyll-rendered file using `absolute_url` so local and production builds remain consistent.

## Risks / Trade-offs

- Meta keywords are low-value for major search engines. Mitigation: include them as harmless hints for smaller crawlers and internal tooling, while relying primarily on descriptions and structured data.
- JSON-LD can become invalid if Liquid emits unsafe strings. Mitigation: use `jsonify` for string values and verify generated HTML.
