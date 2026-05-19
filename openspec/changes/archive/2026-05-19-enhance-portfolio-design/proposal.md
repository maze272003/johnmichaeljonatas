## Why

The portfolio currently uses a functional but visually flat design that lacks the polish and spatial depth expected of a professional developer portfolio. The UI relies on basic color fills with minimal layering, no glass-morphism or depth effects, inconsistent hover feedback, and typography that doesn't differentiate the brand. The design system recommendations from ui-ux-pro-max (Archivo + Space Grotesk typography, monochrome + blue accent palette, bold hover effects, large section spacing) are not yet applied. This change elevates the entire visual identity to feel modern, intentional, and recruiter-ready.

## What Changes

- Replace Inter/Fira Code font stack with **Archivo** (headings) + **Space Grotesk** (body) for a distinctive, modern portfolio identity
- Introduce **glass-morphism card surfaces** with `backdrop-filter: blur()` and translucent backgrounds for all card components (projects, certificates, education)
- Refine the color palette: darken dark-mode primary to `#0F172A`, accent to `#22C55E` (green), and ensure light mode uses proper contrast ratios (slate-900 text, slate-600 muted)
- Add **depth through layered shadows and borders** — multi-layer box-shadows on cards, subtle border gradients on hover states
- Implement **bold hover interactions** — color-shift transitions (200-300ms), elevated shadow states, subtle scale on interactive elements
- Increase section spacing to **48px+ gaps** for breathing room and visual hierarchy
- Enhance the hero section with larger type (`clamp(48px, 10vw, 96px)`) and a subtle animated gradient background
- Add **scroll-triggered reveal animations** using framer-motion with staggered entry patterns across all sections
- Improve the floating navbar with a frosted glass effect and smoother scroll detection
- Standardize all card components (project, certificate, education) with consistent border-radius (12px), padding, and shadow tokens

## Capabilities

### New Capabilities
- `design-tokens`: Centralized CSS custom properties for colors, spacing, shadows, border-radius, and typography that all components consume
- `glass-surfaces`: Translucent card surfaces with backdrop-filter blur, layered borders, and depth shadows for project cards, certificate cards, education boxes, and contact section
- `typography-system`: Archivo + Space Grotesk font pairing with weight/size scale for headings, body, mono, and accent text
- `micro-interactions`: Hover color-shift transitions, elevated shadow states, subtle scale transforms, and staggered scroll-reveal animations across all interactive elements
- `hero-enhancement`: Larger hero typography, animated gradient background accent, improved CTA button styling with depth

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **CSS**: `App.css` — significant changes to variables, card styles, section spacing, hover states, and light/dark theme overrides
- **Components**: All section components (`Hero.jsx`, `About.jsx`, `Skills.jsx`, `Education.jsx`, `Certificates.jsx`, `Projects.jsx`, `Contact.jsx`, `Header.jsx`) — typography class updates, animation prop adjustments
- **Dependencies**: No new npm packages required — all effects use existing `framer-motion`, `lucide-react`, and native CSS
- **Performance**: Glass-morphism (`backdrop-filter`) may impact low-end devices; mitigated by `prefers-reduced-motion` already in place
- **Accessibility**: All changes maintain WCAG AA contrast ratios; reduced-motion users already served
