## ADDED Requirements

### Requirement: Pages advertise remote resource origins
The system SHALL emit resource hints for remote origins used during normal page rendering so browsers can establish connections before dependent resources are requested.

#### Scenario: Rendering the document head
- **WHEN** any page is generated
- **THEN** the head includes preconnect or DNS prefetch hints for CDN and remote asset origins used by the page

### Requirement: Third-party scripts load without blocking page parsing
The system SHALL load third-party or non-critical JavaScript in a way that does not block parsing of the document.

#### Scenario: Rendering JavaScript includes
- **WHEN** a page includes site scripts or third-party rendering scripts
- **THEN** those scripts are emitted with async or defer loading semantics where execution order permits

### Requirement: Citation data uses CDN with origin fallback
The system SHALL fetch Google Scholar citation JSON from a CDN-backed URL first and SHALL retry through the raw GitHub origin if the CDN request fails.

#### Scenario: CDN citation request fails
- **WHEN** the jsDelivr citation JSON request returns an error or unavailable response
- **THEN** the client retries the same JSON path from raw.githubusercontent.com

### Requirement: Static media avoids unnecessary main-thread work
The system SHALL enhance page images with lazy loading and asynchronous decoding unless an image explicitly defines a different loading strategy.

#### Scenario: Page contains ordinary images
- **WHEN** the DOM is ready
- **THEN** images without explicit loading or decoding attributes receive lazy loading and async decoding defaults
