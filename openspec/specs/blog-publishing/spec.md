# blog-publishing Specification

## Purpose
TBD - created by archiving change publish-agent-own-loop-harness-post. Update Purpose after archive.
## Requirements
### Requirement: Post Metadata
The system SHALL publish blog posts with front matter that provides a stable
layout, title, date, category, tags, and excerpt.

#### Scenario: Metadata is present
- **WHEN** a new blog post is added under `_posts/`
- **THEN** the post front matter includes `layout`, `title`, `date`, `categories`, `tags`, and `excerpt`

### Requirement: Post Content
The system SHALL publish blog posts whose body communicates the intended thesis
and uses valid Markdown/HTML supported by the existing Jekyll layouts.

#### Scenario: Thesis is represented
- **WHEN** a post is created from an author-supplied concept note
- **THEN** the post body preserves the key terminology, contrast, and conclusion from the note

### Requirement: Build Compatibility
The system SHALL keep new blog posts compatible with the site's static build.

#### Scenario: Site builds after publishing
- **WHEN** the site is built after adding a post
- **THEN** Jekyll produces the post page without syntax or rendering errors
