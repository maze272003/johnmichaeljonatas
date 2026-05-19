## ADDED Requirements

### Requirement: Glass card surface effect
All card components (project cards, certificate cards, education boxes, contact link items) SHALL have a glass-morphism surface with `backdrop-filter: blur(12px)`, a semi-transparent background, and a subtle border.

#### Scenario: Dark mode glass card
- **WHEN** a card renders in dark mode
- **THEN** the card background SHALL be `rgba(15, 23, 42, 0.7)` with `backdrop-filter: blur(12px)` and a `1px solid rgba(255, 255, 255, 0.08)` border

#### Scenario: Light mode glass card
- **WHEN** a card renders in light mode
- **THEN** the card background SHALL be `rgba(255, 255, 255, 0.8)` with `backdrop-filter: blur(12px)` and a `1px solid rgba(0, 0, 0, 0.06)` border

### Requirement: Glass navbar on scroll
The floating navbar SHALL apply a glass surface when scrolled (`.scrolled` state), with frosted background and subtle border.

#### Scenario: Navbar glass effect when scrolled
- **WHEN** the user scrolls past the top of the page
- **THEN** the navbar SHALL have `backdrop-filter: blur(12px)`, semi-transparent background, rounded corners, and a subtle border

### Requirement: Reduced motion fallback for glass effects
When `prefers-reduced-motion: reduce` is active, glass surfaces SHALL fall back to solid opaque backgrounds.

#### Scenario: Glass fallback for reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** glass card surfaces SHALL use solid opaque backgrounds without `backdrop-filter`
