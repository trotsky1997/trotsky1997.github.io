## Why

The site should capture the author's new practice around an agent-owned
spec-driven development loop while the context is fresh. Publishing it as a
first-class blog post turns an ephemeral note into a durable artifact that fits
the existing agentic systems writing on the site.

## What Changes

- Add a new blog post explaining the "agent-own loop harness" practice that
  emerged from using OpenSpec.
- Frame the distinction between human-supervised "user-own harness" operation
  and autonomous "agent-own harness" operation.
- Preserve the core thesis that complex attended agent workflows can collapse
  into agent-maintained loops, and eventually into model intuition through
  harness/post-training co-design.
- Introduce a `blog-publishing` capability to specify the minimum publishing
  requirements for durable posts in this site.

## Capabilities

### New Capabilities

- `blog-publishing`: Requirements for publishing durable blog posts with
  consistent metadata, stable routing, and build-compatible Markdown content.

### Modified Capabilities

- None.

## Impact

- Adds one Markdown file under `_posts/`.
- Adds one OpenSpec delta spec under
  `openspec/changes/publish-agent-own-loop-harness-post/specs/blog-publishing/spec.md`.
- No changes to layouts, includes, shared navigation, generated assets, or
  external dependencies.
