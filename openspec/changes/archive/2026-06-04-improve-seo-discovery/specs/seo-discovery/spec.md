## ADDED Requirements

### Requirement: Pages expose concise titles and descriptions
The system SHALL generate concise, page-specific `<title>` and meta description values for every indexed page.

#### Scenario: Rendering the homepage
- **WHEN** the homepage is generated
- **THEN** the title identifies Zhang Di and the research focus without embedding the full site description

#### Scenario: Rendering an inner page
- **WHEN** a non-homepage page is generated
- **THEN** the title combines the page title with the site title

### Requirement: Pages expose social preview metadata
The system SHALL emit Open Graph and Twitter card metadata for generated pages using page-specific values when available and site defaults otherwise.

#### Scenario: Rendering a blog post with a front matter image
- **WHEN** a post defines a page image
- **THEN** Open Graph and Twitter image metadata use that image

#### Scenario: Rendering a page without a front matter image
- **WHEN** a page does not define an image
- **THEN** Open Graph and Twitter image metadata fall back to the configured author avatar

### Requirement: Pages expose structured data
The system SHALL emit valid schema.org JSON-LD matching the page type.

#### Scenario: Rendering the homepage
- **WHEN** the homepage is generated
- **THEN** JSON-LD describes the author as a Person with profile links

#### Scenario: Rendering a blog post
- **WHEN** a post is generated
- **THEN** JSON-LD describes it as a BlogPosting with publication date, modification date, author, and publisher

### Requirement: Crawlers receive sitemap guidance
The system SHALL provide crawler guidance that permits indexing and points crawlers to the generated sitemap.

#### Scenario: Fetching robots.txt
- **WHEN** a crawler requests `/robots.txt`
- **THEN** the response allows crawlers and declares the sitemap URL

### Requirement: Pages expose keyword and author hints
The system SHALL emit author and keyword meta tags from page front matter or site defaults.

#### Scenario: Rendering a page without page keywords
- **WHEN** a page omits keyword front matter
- **THEN** the page uses configured site keywords as meta keywords
