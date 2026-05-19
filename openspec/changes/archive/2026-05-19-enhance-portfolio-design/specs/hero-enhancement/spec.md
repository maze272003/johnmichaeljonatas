## ADDED Requirements

### Requirement: Large hero typography
The hero name (h1) SHALL use `clamp(48px, 10vw, 96px)` for font-size. The hero subtitle (h2) SHALL use `clamp(40px, 8vw, 72px)`.

#### Scenario: Hero name sizing
- **WHEN** the hero section renders
- **THEN** the name heading SHALL scale from 48px (mobile) to 96px (desktop) using `clamp()`

#### Scenario: Hero subtitle sizing
- **WHEN** the hero subtitle renders
- **THEN** it SHALL scale from 40px (mobile) to 72px (desktop) using `clamp()`

### Requirement: Animated gradient background accent
The hero section SHALL display a subtle animated radial gradient behind the hero text that slowly shifts position using CSS keyframes.

#### Scenario: Gradient animation plays
- **WHEN** the hero section renders in the viewport
- **THEN** a radial gradient (using the accent color at 5-10% opacity) SHALL animate its position slowly (8-12s cycle)

#### Scenario: Gradient respects reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** the gradient SHALL render statically without animation

### Requirement: Hero CTA buttons with depth
The hero CTA buttons SHALL have a subtle inner shadow and elevated appearance on hover, using shadow tokens.

#### Scenario: CTA button default state
- **WHEN** a hero CTA button renders
- **THEN** it SHALL have `box-shadow: 0 2px 8px rgba(accent, 0.1)` as a resting state

#### Scenario: CTA button hover state
- **WHEN** the user hovers over a hero CTA button
- **THEN** the shadow SHALL elevate to `box-shadow: 0 8px 24px rgba(accent, 0.2)` with a smooth 200ms transition
