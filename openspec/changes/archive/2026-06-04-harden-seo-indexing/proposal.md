## Why

The site now has baseline metadata, but internal OpenSpec development documents are being emitted into the public site and LLM/agent crawlers do not have a concise site map tailored for inference-time use. Hardening the indexing boundary and adding `/llms.txt` improves both conventional SEO and agent-facing discoverability.

## What Changes

- Prevent internal OpenSpec source and archived change documents from being generated into the public site.
- Add `/llms.txt` following the llms.txt Markdown convention for LLM-friendly site guidance.
- Improve social preview fallback by using the first post image when page front matter does not define an image.
- Add alternate language/canonical hints and richer structured data for site and breadcrumb context.
- Keep all changes compatible with GitHub Pages and the existing Jekyll build.

## Capabilities

### New Capabilities

### Modified Capabilities
- `seo-discovery`: tighten public indexing boundaries, add LLM crawler guidance, and enrich generated SEO metadata.

## Impact

- Affected config: `_config.yml`.
- Affected templates: `_includes/seo.html`, `_includes/head.html`.
- New public file: `llms.txt`.
- Affected generated output: all HTML pages, `sitemap.xml`, `robots.txt`, and `/llms.txt`.
