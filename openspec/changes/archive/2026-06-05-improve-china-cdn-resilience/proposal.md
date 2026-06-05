## Why

The site currently depends on jsDelivr and raw.githubusercontent.com for runtime resources such as citation JSON, MathJax, and the CV PDF. Those origins can be slow or unavailable for visitors in mainland China, so critical rendering should not depend on them.

## What Changes

- Serve critical runtime resources from the GitHub Pages site itself.
- Make local citation JSON the primary source and only use remote CDN/GitHub URLs as optional fallbacks.
- Serve MathJax from a local asset path so formulas can render without jsDelivr.
- Point CV links to a local PDF path instead of raw.githubusercontent.com.
- Remove resource hints for origins that are no longer part of normal page rendering.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `cdn-delivery`: change the delivery contract from CDN-first to local-first for resources that affect rendering or core profile access.

## Impact

- Affected templates: `_includes/head.html`, `_includes/head/custom.html`, `_includes/fetch_google_scholar_stats.html`, `_pages/about.md`, `_data/navigation.yml`, `_config.yml`.
- Affected static assets: local CV PDF, local MathJax script, optional local Google Scholar stats JSON.
- Affected workflow: Google Scholar crawler output should be usable from the generated site instead of relying on a separate CDN branch.
