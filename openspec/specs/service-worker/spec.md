### Requirement: Service worker registration
The system SHALL register a service worker on the client side that activates after the first page load.

#### Scenario: Service worker registers on first visit
- **WHEN** a user visits the portfolio for the first time
- **THEN** the browser SHALL register a service worker and begin caching assets

#### Scenario: Service worker activates on subsequent visits
- **WHEN** a user revisits the portfolio
- **THEN** the service worker SHALL be active and serve cached assets immediately

### Requirement: Static asset precaching
The service worker SHALL precache all build artifacts (JS bundles, CSS, HTML, and images referenced in the build) during installation.

#### Scenario: Build assets cached on install
- **WHEN** the service worker installs
- **THEN** it SHALL cache all Vite build output files (hashed JS, CSS, HTML entry point, and public directory assets)

#### Scenario: Cached assets served without network
- **WHEN** the user is offline and navigates to the portfolio
- **THEN** all precached static assets SHALL be served from the cache

### Requirement: Runtime caching for external fonts
The service worker SHALL use a cache-first strategy for Google Fonts CSS and font file requests.

#### Scenario: Fonts cached on first load
- **WHEN** the browser requests Google Fonts resources
- **THEN** the service worker SHALL cache the responses and serve them from cache on subsequent requests

#### Scenario: Fonts available offline
- **WHEN** the user is offline
- **THEN** previously loaded fonts SHALL be served from the cache

### Requirement: Auto-update on new deployment
The service worker SHALL automatically check for updates and activate the new version when a new build is deployed.

#### Scenario: New build triggers service worker update
- **WHEN** the site is redeployed with new build assets
- **THEN** the service worker SHALL detect the updated precache manifest and activate the new version automatically

### Requirement: Graceful degradation without service worker
The portfolio SHALL function normally in browsers that do not support service workers.

#### Scenario: Non-PWA browser loads the site
- **WHEN** a browser without service worker support visits the portfolio
- **THEN** the site SHALL load and function identically to the current behavior without any errors
