## 1. Design Tokens Foundation

- [x] 1.1 Define CSS custom properties for colors in `:root` — `--color-primary` (#0F172A dark), `--color-secondary` (#1E293B), `--color-cta` (#22C55E), `--color-bg`, `--color-text-primary` (#F8FAFC), `--color-text-secondary`, `--color-border`
- [x] 1.2 Define light mode color overrides in `[data-theme="light"]` with WCAG AA contrast values (slate-900 for text, slate-600 for muted)
- [x] 1.3 Define spacing tokens: `--space-xs` (4px), `--space-sm` (8px), `--space-md` (16px), `--space-lg` (24px), `--space-xl` (48px), `--space-2xl` (64px)
- [x] 1.4 Define shadow tokens: `--shadow-sm`, `--shadow-md`, `--shadow-lg` with dark and light mode variants
- [x] 1.5 Define border-radius tokens: `--radius-sm` (6px), `--radius-md` (12px), `--radius-lg` (16px), `--radius-full` (9999px)
- [x] 1.6 Replace all hardcoded color/spacing/shadow/radius values in App.css with token references

## 2. Typography System

- [x] 2.1 Add Archivo and Space Grotesk Google Fonts import with `display=swap` to App.css (replacing Inter import)
- [x] 2.2 Add `<link rel="preload">` tags for Archivo 700 and Space Grotesk 400/500 in index.html
- [x] 2.3 Update body font-family to `'Space Grotesk', sans-serif`
- [x] 2.4 Update all h1, h2, h3 to use `'Archivo', sans-serif`
- [x] 2.5 Keep Fira Code for monospace elements (section numbers, tech pills, code labels)
- [x] 2.6 Update font-family references in Header, Contact, and Footer components

## 3. Glass Surfaces

- [x] 3.1 Create `.glass-card` utility class with `backdrop-filter: blur(12px)`, semi-transparent bg, subtle border
- [x] 3.2 Apply glass surface to project cards with dark mode: `rgba(15, 23, 42, 0.7)` bg + `rgba(255,255,255,0.08)` border
- [x] 3.3 Apply glass surface to certificate cards
- [x] 3.4 Apply glass surface to education boxes
- [x] 3.5 Apply glass surface to contact link items
- [x] 3.6 Apply glass surface to floating navbar in scrolled state
- [x] 3.7 Create light mode glass variants: `rgba(255,255,255,0.8)` bg + `rgba(0,0,0,0.06)` border
- [x] 3.8 Add reduced-motion fallback: solid opaque backgrounds when `prefers-reduced-motion: reduce`

## 4. Micro-Interactions

- [x] 4.1 Update all card hover states to use color-shift transition (border-color to accent) + shadow elevation (shadow-sm to shadow-md) at 200ms cubic-bezier(0.4, 0, 0.2, 1)
- [x] 4.2 Remove any `transform: scale()` from card hover states to prevent layout shift
- [x] 4.3 Add staggered scroll-reveal animations (framer-motion: opacity 0→1, y 30→0, stagger 80ms) to Projects grid cards
- [x] 4.4 Add staggered scroll-reveal to Certificates section
- [x] 4.5 Add staggered scroll-reveal to Education section
- [x] 4.6 Add CTA button glow effect on hover: `box-shadow: 0 0 20px rgba(accent, 0.2)`
- [x] 4.7 Ensure `prefers-reduced-motion` disables all new transitions and animations

## 5. Hero Enhancement

- [x] 5.1 Update hero h1 font-size to `clamp(48px, 10vw, 96px)`
- [x] 5.2 Update hero subtitle font-size to `clamp(40px, 8vw, 72px)`
- [x] 5.3 Add animated radial gradient background behind hero text using CSS @keyframes (accent color at 5-10% opacity, 8-12s cycle)
- [x] 5.4 Add gradient reduced-motion fallback (static position)
- [x] 5.5 Update hero CTA button resting state with `box-shadow: 0 2px 8px rgba(accent, 0.1)`
- [x] 5.6 Update hero CTA hover state with `box-shadow: 0 8px 24px rgba(accent, 0.2)` and 200ms transition

## 6. Final Polish & Verification

- [x] 6.1 Verify all responsive breakpoints (375px, 768px, 1024px, 1440px) render correctly
- [x] 6.2 Test both dark and light modes for contrast and visual consistency
- [x] 6.3 Run `npm run build` to verify no compilation errors
- [x] 6.4 Run `npm run lint` and fix any new issues
