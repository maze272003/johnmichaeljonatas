## ADDED Requirements

### Requirement: Hover color-shift transition
All interactive card elements SHALL transition their border-color and box-shadow on hover using a 200ms `cubic-bezier(0.4, 0, 0.2, 1)` transition.

#### Scenario: Card hover effect
- **WHEN** the user hovers over a project card, certificate card, or education box
- **THEN** the card SHALL transition border-color to the accent color and elevate shadow from `--shadow-sm` to `--shadow-md` over 200ms

### Requirement: No scale transforms on hover
Interactive cards SHALL NOT use `transform: scale()` on hover to prevent layout shift.

#### Scenario: Hover without layout shift
- **WHEN** the user hovers over any card element
- **THEN** no CSS scale transform SHALL be applied, ensuring surrounding elements do not shift position

### Requirement: Staggered scroll-reveal animations
All section content SHALL animate into view with a staggered fade-up effect using framer-motion. Each section's children SHALL stagger by 80-100ms intervals.

#### Scenario: Section scroll-reveal
- **WHEN** a section enters the viewport (IntersectionObserver threshold 0.1)
- **THEN** its child elements SHALL animate from `opacity: 0, y: 30` to `opacity: 1, y: 0` with staggered delays of 80ms per child

### Requirement: CTA button hover with glow effect
Primary CTA buttons SHALL show a subtle glow (box-shadow with accent color at 20% opacity) on hover.

#### Scenario: CTA button hover glow
- **WHEN** the user hovers over a CTA button
- **THEN** the button SHALL display `box-shadow: 0 0 20px rgba(accent, 0.2)` in addition to the standard hover state

### Requirement: Reduced motion disables all micro-interactions
When `prefers-reduced-motion: reduce` is active, all hover transitions and scroll-reveal animations SHALL be disabled.

#### Scenario: Reduced motion disables animations
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** all hover transitions SHALL be instant (0ms) and scroll-reveal animations SHALL show elements immediately without fade or movement
