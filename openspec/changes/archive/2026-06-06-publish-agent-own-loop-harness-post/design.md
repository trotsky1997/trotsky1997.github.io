## Context

The site already publishes long-form agentic AI essays as Markdown posts under
`_posts/`. Existing posts use `layout: post`, a timestamped filename/date,
`categories: [Blog]`, `tags`, and a concise excerpt. This change adds one
article from the author's concept note; it does not require template or style
changes.

## Goals / Non-Goals

**Goals:**

- Add a durable blog post about the "agent-own loop harness" practice.
- Preserve the author's conceptual vocabulary: `agent-own loop harness`,
  `user-own harness`, no-human-in-the-loop execution, autonomous SDD loops, and
  harness/post-training co-design.
- Keep the change limited to content plus OpenSpec artifacts.
- Verify the post through OpenSpec validation and a Jekyll build.

**Non-Goals:**

- No layout, navigation, SEO include, CDN, or asset pipeline changes.
- No external citations or image generation are required for this content-only
  post.
- No Medium import metadata is added because this post is locally authored.

## Decisions

- Publish as an English blog essay to match the site's existing agentic AI post
  style. Alternative considered: publish the original Chinese note verbatim.
  English keeps the post consistent with the current blog archive while still
  preserving the named concepts.
- Use a text-only post without a cover image. Alternative considered: generate
  a new visual asset. The existing post layout supports text-only posts, and the
  request is about sharing an idea rather than shipping a visual design.
- Add a small `blog-publishing` spec rather than modifying `seo-discovery`.
  Alternative considered: treat this as only an implementation detail. A new
  capability gives future content changes a lightweight publishing contract
  without coupling them to SEO behavior.

## Risks / Trade-offs

- Authorial nuance could be lost while translating from a terse Chinese note to
  an English essay. Mitigation: keep the core terms and argument structure
  intact, and avoid adding claims that change the thesis.
- A future preference for bilingual posts is not encoded here. Mitigation:
  leave layouts and data structures untouched so bilingual publishing can be
  specified separately if needed.
