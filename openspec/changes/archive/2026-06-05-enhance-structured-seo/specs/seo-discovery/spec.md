## ADDED Requirements

### Requirement: Pages expose entity-specific structured data
The system SHALL emit schema.org JSON-LD that identifies the semantic role of profile, post, and collection pages using page-specific values and configuration-driven profile links.

#### Scenario: Rendering the homepage profile
- **WHEN** the homepage is generated
- **THEN** JSON-LD identifies Di Zhang as a `Person`
- **AND** the profile includes configured same-as links for Google Scholar, GitHub, HuggingFace, Medium, LinkedIn, and X/Twitter when configured
- **AND** the profile includes research interest hints relevant to LLM reasoning, scientific intelligence, and agentic learning

#### Scenario: Rendering the blog index
- **WHEN** the blog index page is generated
- **THEN** JSON-LD identifies the page as a `Blog` or collection-style page
- **AND** the structured data lists recent blog posts as related entries when posts are available

#### Scenario: Rendering projects or talks pages
- **WHEN** a public collection page such as `/projects/` or `/talks/` is generated
- **THEN** JSON-LD identifies the page as a `CollectionPage`
- **AND** the structured data lists visible collection entries when they can be derived from the rendered page

#### Scenario: Rendering a blog post
- **WHEN** a blog post is generated
- **THEN** JSON-LD identifies the page as a `BlogPosting`
- **AND** the post includes language, keyword, word count, author, publisher, publication date, modification date, image, and canonical page references when those values are available
