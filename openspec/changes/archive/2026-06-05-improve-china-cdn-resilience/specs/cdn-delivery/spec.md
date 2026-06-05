## ADDED Requirements

### Requirement: Critical resources are served locally
The system SHALL serve critical resources needed for core page rendering or profile access from site-relative URLs instead of depending on jsDelivr or raw.githubusercontent.com during normal page rendering.

#### Scenario: Rendering the document head
- **WHEN** any page is generated
- **THEN** formula rendering scripts referenced by the head use a site-relative asset URL

#### Scenario: Rendering CV links
- **WHEN** a page or navigation item links to the CV
- **THEN** the CV URL uses a site-relative PDF path

## MODIFIED Requirements

### Requirement: Pages advertise remote resource origins
The system SHALL emit resource hints only for remote origins used during normal page rendering so browsers can establish connections before dependent resources are requested.

#### Scenario: Rendering the document head
- **WHEN** any page is generated
- **THEN** the head includes preconnect or DNS prefetch hints for remote origins still used during normal page rendering
- **AND** the head does not advertise jsDelivr or raw.githubusercontent.com when those origins are no longer used for normal rendering

### Requirement: Citation data uses local source with optional fallback
The system SHALL fetch Google Scholar citation JSON from a site-relative URL first and MAY retry through remote CDN or GitHub origins only as an enhancement fallback when local data is unavailable.

#### Scenario: Local citation data exists
- **WHEN** citation placeholders are present on the page
- **THEN** the client requests the site-relative Google Scholar citation JSON before any remote citation JSON URL

#### Scenario: Page has no citation placeholders
- **WHEN** the generated page has no citation count targets
- **THEN** the client does not request citation JSON

#### Scenario: Local citation request fails
- **WHEN** the site-relative citation JSON request returns an error or unavailable response
- **THEN** the client may retry the same JSON path through a remote fallback URL without blocking page rendering

## RENAMED Requirements

- FROM: `### Requirement: Citation data uses CDN with origin fallback`
- TO: `### Requirement: Citation data uses local source with optional fallback`
