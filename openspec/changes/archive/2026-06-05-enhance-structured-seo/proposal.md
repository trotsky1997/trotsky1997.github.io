## Why

The site already exposes baseline SEO metadata, but its JSON-LD treats most non-homepage pages as generic `WebPage` records and hard-codes some profile links. More precise structured data will help search engines, social crawlers, and LLM agents understand the site as an academic profile with a blog, projects, talks, and research posts.

## What Changes

- Enrich schema.org JSON-LD with reusable, configuration-driven Person profile data.
- Emit more specific page types for blog, projects, talks, and other collection-style pages.
- Add article-level structured data fields such as keywords, word count, language, and blog context.
- Keep generated metadata valid, local-first, and compatible with the existing title, canonical, Open Graph, Twitter, sitemap, robots, and llms.txt behavior.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `seo-discovery`: structured data requirements are extended to distinguish profile, post, and collection pages with richer schema.org fields.

## Impact

- Affected code: `_includes/seo.html`, page front matter where useful, and OpenSpec SEO documentation.
- No runtime dependency changes.
- No breaking changes to URLs, canonical links, sitemap generation, robots.txt, or visual layout.
