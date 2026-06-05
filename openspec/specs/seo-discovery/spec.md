# seo-discovery Specification

## Purpose
Define the site's SEO discovery behavior for page titles, descriptions, social previews, structured data, crawler guidance, and keyword/author hints.
## Requirements
### Requirement: Pages expose concise titles and descriptions
The system SHALL generate concise, page-specific `<title>` and meta description values for every indexed page.

#### Scenario: Rendering the homepage
- **WHEN** the homepage is generated
- **THEN** the title identifies Di Zhang and the research focus without embedding the full site description

#### Scenario: Rendering an inner page
- **WHEN** a non-homepage page is generated
- **THEN** the title combines the page title with the site title

### Requirement: Pages expose social preview metadata
The system SHALL emit Open Graph and Twitter card metadata for generated pages using page-specific values when available, the first post image when no explicit page image is configured, and site defaults otherwise.

#### Scenario: Rendering a blog post with a front matter image
- **WHEN** a post defines a page image
- **THEN** Open Graph and Twitter image metadata use that image

#### Scenario: Rendering a blog post with body images but no front matter image
- **WHEN** a post omits page image front matter and contains an image in the rendered body
- **THEN** Open Graph and Twitter image metadata use the first body image

#### Scenario: Rendering a page without an available page or body image
- **WHEN** a page does not define an image and no body image can be derived
- **THEN** Open Graph and Twitter image metadata fall back to the configured author avatar

### Requirement: Pages expose structured data
The system SHALL emit valid schema.org JSON-LD matching the page type and SHALL also expose site and breadcrumb context for indexed pages.

#### Scenario: Rendering the homepage
- **WHEN** the homepage is generated
- **THEN** JSON-LD describes the author as a Person with profile links and includes WebSite context

#### Scenario: Rendering a blog post
- **WHEN** a post is generated
- **THEN** JSON-LD describes it as a BlogPosting with publication date, modification date, author, publisher, and breadcrumb context

#### Scenario: Rendering a non-homepage index page
- **WHEN** a non-homepage index page is generated
- **THEN** JSON-LD includes WebPage and breadcrumb context

### Requirement: Crawlers receive sitemap guidance
The system SHALL provide crawler guidance that permits indexing of public content, points crawlers to the generated sitemap, and excludes internal engineering artifacts from public output.

#### Scenario: Fetching robots.txt
- **WHEN** a crawler requests `/robots.txt`
- **THEN** the response allows crawlers and declares the sitemap URL

#### Scenario: Building the site
- **WHEN** the site is generated
- **THEN** internal OpenSpec source and archived change documents are not present in the generated public site

### Requirement: Pages expose keyword and author hints
The system SHALL emit author and keyword meta tags from page front matter or site defaults.

#### Scenario: Rendering a page without page keywords
- **WHEN** a page omits keyword front matter
- **THEN** the page uses configured site keywords as meta keywords

### Requirement: LLM crawlers receive site guidance
The system SHALL publish an `/llms.txt` Markdown file that summarizes the site and links to key pages useful for inference-time LLM and agent use.

#### Scenario: Fetching llms.txt
- **WHEN** an LLM crawler or agent requests `/llms.txt`
- **THEN** the response begins with a Markdown H1 title, includes a blockquote summary, and lists key site resources by section

### Requirement: Pages expose alternate language hints
The system SHALL expose an alternate link for the canonical English version of generated pages.

#### Scenario: Rendering the document head
- **WHEN** any page is generated
- **THEN** the head includes an `hreflang="en"` alternate link pointing to the canonical page URL
