## Why

The site has baseline metadata, but some pages still produce weak search snippets, the homepage title is too long, and crawlers do not get an explicit robots/sitemap entry point. Improving these signals makes the academic homepage, publications, projects, talks, and blog posts easier to discover and share.

## What Changes

- Add a formal SEO discovery capability for metadata, structured data, and crawler guidance.
- Improve generated titles so the homepage and inner pages have concise, page-specific titles.
- Emit author, keywords, article, and JSON-LD fields consistently from Jekyll front matter and site defaults.
- Add `robots.txt` pointing crawlers to the generated sitemap.
- Fill weak page descriptions for the homepage and blog index.

## Capabilities

### New Capabilities
- `seo-discovery`: Site pages expose concise metadata, crawl guidance, social preview data, and schema.org JSON-LD for search engines and link previews.

### Modified Capabilities

## Impact

- Affected templates: `_includes/seo.html`.
- Affected content/config: `_config.yml`, `_pages/about.md`, `_pages/blog.md`, post front matter if needed, and `robots.txt`.
- Affected generated output: all pages and posts.
- No new runtime or build dependencies are required.
