## ADDED Requirements

### Requirement: Color token system
The system SHALL define CSS custom properties for all colors in `:root`, organized as: `--color-primary`, `--color-secondary`, `--color-cta`, `--color-bg`, `--color-text-primary`, `--color-text-secondary`, `--color-border`. Dark mode values SHALL be `#0F172A` (bg), `#1E293B` (secondary), `#22C55E` (CTA), `#F8FAFC` (text). Light mode values SHALL maintain WCAG AA contrast (4.5:1 minimum for body text).

#### Scenario: Dark mode color tokens applied
- **WHEN** the page loads with dark theme (default)
- **THEN** all components SHALL use the dark mode color custom properties

#### Scenario: Light mode color tokens applied
- **WHEN** the user toggles to light theme
- **THEN** `[data-theme="light"]` SHALL override all color tokens with light mode values maintaining WCAG AA contrast

### Requirement: Spacing token system
The system SHALL define CSS custom properties for spacing: `--space-xs` (4px), `--space-sm` (8px), `--space-md` (16px), `--space-lg` (24px), `--space-xl` (48px), `--space-2xl` (64px). Section gaps SHALL use `--space-xl` minimum.

#### Scenario: Sections use consistent spacing
- **WHEN** the portfolio renders all sections
- **THEN** vertical spacing between sections SHALL use `--space-xl` (48px) or greater

### Requirement: Shadow token system
The system SHALL define CSS custom properties for shadows: `--shadow-sm` (subtle), `--shadow-md` (elevated), `--shadow-lg` (prominent). All shadow tokens SHALL include both dark and light mode variants.

#### Scenario: Cards apply shadow tokens
- **WHEN** a card component renders
- **THEN** it SHALL use `--shadow-sm` at rest and `--shadow-md` or `--shadow-lg` on hover

### Requirement: Border radius tokens
The system SHALL define CSS custom properties for border-radius: `--radius-sm` (6px), `--radius-md` (12px), `--radius-lg` (16px), `--radius-full` (9999px).

#### Scenario: Consistent border radius on cards
- **WHEN** any card component renders (project, certificate, education)
- **THEN** it SHALL use `--radius-md` (12px) for border-radius
