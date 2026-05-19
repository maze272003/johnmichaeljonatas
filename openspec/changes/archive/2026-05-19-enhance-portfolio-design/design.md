## Context

The portfolio is a single-page React application (Vite + Tailwind v4) with 6 sections: Hero, About, Skills, Education, Certificates, Projects, and Contact. It uses CSS custom properties for theming (dark/light via `data-theme` attribute), framer-motion for animations, and lucide-react for icons. The current design is functional but flat — no depth layers, no glass effects, and the typography (Inter + Fira Code) is generic. The ui-ux-pro-max design system recommends Archivo + Space Grotesk for portfolio identity, monochrome + green accent palette, bold hover effects, and large section spacing.

## Goals / Non-Goals

**Goals:**
- Establish a cohesive design token system (colors, spacing, shadows, typography) as CSS custom properties
- Introduce glass-morphism surfaces across all card components for visual depth
- Replace the font stack with Archivo (headings) + Space Grotesk (body) for brand distinction
- Add polished micro-interactions (hover color-shifts, shadow elevation, scroll-reveal stagger)
- Enhance the hero section with larger type and an animated gradient accent
- Maintain full dark/light mode support with WCAG AA contrast in both modes
- Keep the existing component structure — no new dependencies

**Non-Goals:**
- Adding new sections or pages to the portfolio
- Changing the information architecture or content
- Replacing framer-motion with a different animation library
- Server-side rendering or SEO restructuring
- Adding a CMS or dynamic content management

## Decisions

### 1. CSS Custom Properties as Design Tokens
**Decision**: Define all design tokens as `:root` CSS custom properties, organized by category (color, spacing, shadow, radius, typography).

**Rationale**: The codebase already uses CSS custom properties for theming. Extending them to cover spacing, shadows, and radius keeps the approach consistent and avoids introducing a new token system (like Style Dictionary or Tailwind config tokens) that would require build pipeline changes.

**Alternative considered**: Tailwind theme extension — rejected because the CSS already manages its own variables and the dark/light theme switch uses `data-theme` attribute selectors, which don't map cleanly to Tailwind's dark mode class strategy.

### 2. Glass-morphism via backdrop-filter + Translucent Backgrounds
**Decision**: Use `backdrop-filter: blur(12px)` with semi-transparent backgrounds (`rgba(15, 23, 42, 0.7)` dark / `rgba(255, 255, 255, 0.8)` light) on card surfaces.

**Rationale**: Glass-morphism adds visual depth without adding new UI elements. The blur amount (12px) is enough to create the effect without impacting readability. The `prefers-reduced-motion` media query already disables transforms for accessibility users.

**Alternative considered**: Elevated card shadows only — rejected because shadows alone don't create the modern, layered aesthetic that distinguishes polished portfolios.

### 3. Archivo + Space Grotesk Font Pairing
**Decision**: Replace Inter with Space Grotesk for body text and Fira Code with Archivo for headings. Keep Fira Code only for the monospace code/number accents.

**Rationale**: The ui-ux-pro-max typography search specifically recommends this pairing for "minimal, portfolio, designer, creative, clean" contexts. Archivo's geometric character gives headings personality. Space Grotesk is highly readable for body text while feeling more distinctive than Inter.

**Alternative considered**: Inter Variable + JetBrains Mono — rejected because Inter is too generic for portfolio branding.

### 4. Hover Interactions: Color-Shift + Shadow Elevation
**Decision**: Use color-shift transitions (200ms, `cubic-bezier(0.4, 0, 0.2, 1)`) and shadow elevation (from `shadow-sm` to `shadow-lg`) for hover feedback. Avoid scale transforms on cards to prevent layout shift.

**Rationale**: The ui-ux-pro-max UX guidelines explicitly warn against scale transforms that shift layout. Color-shift + shadow elevation provides clear feedback without destabilizing the layout.

### 5. Hero Gradient Accent via CSS Animation
**Decision**: Add a subtle animated radial gradient behind the hero text that slowly shifts position, implemented purely in CSS with `@keyframes`.

**Rationale**: Adds visual interest without a JavaScript runtime cost or Three.js dependency. The animation is lightweight and respects `prefers-reduced-motion`.

## Risks / Trade-offs

- **[Performance on low-end devices]** `backdrop-filter: blur()` is GPU-intensive on older hardware → Mitigated by the existing `prefers-reduced-motion` rule which disables complex effects. The blur radius is kept at 12px (not 20px+) to limit GPU cost.

- **[Font loading flash]** Two new Google Fonts may cause FOUT (Flash of Unstyled Text) → Mitigated by using `font-display: swap` in the Google Fonts URL and preloading the woff2 files via `<link rel="preload">` in `index.html`.

- **[Light mode glass visibility]** Translucent backgrounds can appear washed out in light mode → Mitigated by using higher opacity in light mode (`bg-white/80` vs `bg-white/10`) per the ui-ux-pro-max common rules.

- **[Bundle size]** No new JS dependencies. CSS grows by ~2-3KB for token definitions and glass utility classes. Font files add ~50KB (compressed) to initial load but are cached after first visit.
