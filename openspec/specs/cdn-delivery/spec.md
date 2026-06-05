# cdn-delivery Specification

## Purpose
Define the site's CDN-aware delivery behavior for remote resource hints, non-blocking script loading, citation data fallback, and low-cost media loading.
## Requirements
### Requirement: Pages advertise remote resource origins
The system SHALL emit resource hints only for remote origins used during normal page rendering so browsers can establish connections before dependent resources are requested.

#### Scenario: Rendering the document head
- **WHEN** any page is generated
- **THEN** the head includes preconnect or DNS prefetch hints for remote origins still used during normal page rendering
- **AND** the head does not advertise jsDelivr or raw.githubusercontent.com when those origins are no longer used for normal rendering

### Requirement: Third-party scripts load without blocking page parsing
The system SHALL load third-party or non-critical JavaScript in a way that does not block parsing of the document.

#### Scenario: Rendering JavaScript includes
- **WHEN** a page includes site scripts or third-party rendering scripts
- **THEN** those scripts are emitted with async or defer loading semantics where execution order permits

### Requirement: Static media avoids unnecessary main-thread work
The system SHALL enhance page images with lazy loading and asynchronous decoding unless an image explicitly defines a different loading strategy.

#### Scenario: Page contains ordinary images
- **WHEN** the DOM is ready
- **THEN** images without explicit loading or decoding attributes receive lazy loading and async decoding defaults

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

### Requirement: Critical resources are served locally
The system SHALL serve critical resources needed for core page rendering or profile access from site-relative URLs instead of depending on jsDelivr or raw.githubusercontent.com during normal page rendering.

#### Scenario: Rendering the document head
- **WHEN** any page is generated
- **THEN** formula rendering scripts referenced by the head use a site-relative asset URL

#### Scenario: Rendering CV links
- **WHEN** a page or navigation item links to the CV
- **THEN** the CV URL uses a site-relative PDF path

### Requirement: Client cache keeps static assets reusable without pinning stale pages
The system SHALL provide a client-side cache strategy that reuses same-origin static assets while allowing page HTML and citation data to refresh from the network first.

#### Scenario: Installing the site cache
- **WHEN** a browser supports service workers and loads the production site over HTTPS
- **THEN** the site registers a root service worker
- **AND** the service worker precaches core CSS and JavaScript resources using the current build version

#### Scenario: Activating a new build
- **WHEN** a new service worker activates
- **THEN** cache buckets from earlier build versions are removed

#### Scenario: Loading navigable pages
- **WHEN** a page navigation request is made
- **THEN** the service worker attempts the network response before falling back to a cached page response

#### Scenario: Loading static assets
- **WHEN** a same-origin asset under assets, images, or files is requested
- **THEN** the service worker may serve an existing cached response while revalidating the asset in the background
