## ADDED Requirements

### Requirement: Web app manifest file
The system SHALL generate a `manifest.json` file linked from `index.html` that declares the portfolio as an installable web application.

#### Scenario: Manifest linked in HTML
- **WHEN** the browser loads `index.html`
- **THEN** it SHALL find a `<link rel="manifest">` tag pointing to the generated manifest file

#### Scenario: Manifest contains required PWA fields
- **WHEN** the browser reads the manifest
- **THEN** it SHALL contain `name`, `short_name`, `start_url`, `display`, `background_color`, and `theme_color` fields

### Requirement: PWA icons
The system SHALL provide icon images at 192x192 and 512x512 pixel sizes in the manifest for installability.

#### Scenario: Icons available for install prompt
- **WHEN** the browser evaluates PWA installability criteria
- **THEN** the manifest SHALL list icon entries for both 192x192 and 512x512 sizes with `image/png` type

### Requirement: Standalone display mode
The manifest SHALL set `display` to `standalone` so the portfolio opens without browser UI chrome when installed.

#### Scenario: App launches without browser chrome
- **WHEN** a user launches the installed portfolio from their home screen or app drawer
- **THEN** the application SHALL render in standalone mode without an address bar or browser navigation

### Requirement: Theme color and background color
The manifest SHALL declare `theme_color` as `#0F172A` and `background_color` as `#0F172A` matching the existing site theme.

#### Scenario: Splash screen uses correct colors
- **WHEN** the installed app launches on Android
- **THEN** the splash screen SHALL display with the dark background color `#0F172A`
