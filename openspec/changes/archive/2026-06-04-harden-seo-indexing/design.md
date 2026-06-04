## Context

The current SEO implementation already emits canonical URLs, Open Graph metadata, Twitter cards, and page-type JSON-LD. Two gaps remain: Jekyll is publishing the `openspec/` directory as public pages, and agent/LLM crawlers do not have a compact `/llms.txt` entry point. There is also room to improve preview image selection and structured data context without changing the site design.

## Goals / Non-Goals

**Goals:**
- Keep internal OpenSpec documents in the repository but out of the generated site.
- Add a concise `/llms.txt` in the Markdown structure described by llmstxt.org.
- Improve post previews by deriving the first body image when explicit front matter is absent.
- Add WebSite and BreadcrumbList JSON-LD alongside existing page-specific JSON-LD.

**Non-Goals:**
- Generate `.md` versions of every HTML page.
- Add external SEO services or JavaScript.
- Rewrite the publication or blog content.

## Decisions

- Add `openspec` to Jekyll `exclude` rather than moving the folder, preserving OpenSpec workflow while keeping public output clean.
- Implement `/llms.txt` as a Jekyll-rendered root file so absolute URLs stay tied to `site.url`.
- Keep the existing page-specific JSON-LD script and add a separate `@graph` script for WebSite and BreadcrumbList context to reduce churn.
- Derive post preview images from rendered content only when front matter image fields are absent.

## Risks / Trade-offs

- Derived first-image previews can use external imported blog images. Mitigation: explicit front matter `image` still overrides this behavior if a local image is preferred later.
- Excluding `openspec` removes internal spec pages from the sitemap. Mitigation: this is intended because the directory is an engineering artifact, not public content.
