## ADDED Requirements

### Requirement: Archivo font for headings
All headings (h1, h2, h3) SHALL use the Archivo font family with weights 600-700.

#### Scenario: Heading font applied
- **WHEN** any heading element renders
- **THEN** it SHALL use `font-family: 'Archivo', sans-serif` with `font-weight: 700` for h1/h2 and `font-weight: 600` for h3

### Requirement: Space Grotesk font for body text
All body text, paragraphs, and descriptions SHALL use the Space Grotesk font family.

#### Scenario: Body font applied
- **WHEN** any paragraph or body text element renders
- **THEN** it SHALL use `font-family: 'Space Grotesk', sans-serif`

### Requirement: Fira Code retained for monospace accents
Monospace elements (section numbers, tech pills, code-style labels) SHALL continue using Fira Code.

#### Scenario: Monospace font for accents
- **WHEN** a section number, tech pill, or code-style label renders
- **THEN** it SHALL use `font-family: 'Fira Code', monospace`

### Requirement: Google Fonts loaded with display swap
The Archivo and Space Grotesk fonts SHALL be loaded from Google Fonts with `display=swap` to prevent FOUT.

#### Scenario: Font loading strategy
- **WHEN** the page loads
- **THEN** the Google Fonts CSS SHALL include `&display=swap` parameter, and fallback fonts SHALL render immediately while web fonts load

### Requirement: Font preloading
The index.html SHALL include `<link rel="preload">` tags for the critical font files (Archivo 700, Space Grotesk 400/500).

#### Scenario: Font preloading in HTML
- **WHEN** the HTML document loads
- **THEN** it SHALL contain preload hints for the primary font weights to minimize FOUT duration
