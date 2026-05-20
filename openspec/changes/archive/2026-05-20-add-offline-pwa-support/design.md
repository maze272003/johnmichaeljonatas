## Context

The portfolio is a single-page React application built with Vite and deployed as static files. It uses Tailwind CSS for styling, Framer Motion/GSAP for animations, and includes game components with canvas rendering. Currently, every visit requires a full network fetch for all assets — HTML, JS bundles, CSS, images, and external fonts.

The site is hosted as static files (served via `serve -s dist`), making it an ideal candidate for PWA caching with no server-side rendering or dynamic API calls to complicate the caching strategy.

## Goals / Non-Goals

**Goals:**
- Enable full offline access to the portfolio after the first successful visit
- Achieve Lighthouse PWA installability criteria
- Cache all static assets (JS, CSS, images, fonts) with a cache-first strategy
- Support PWA install prompt on supported browsers

**Non-Goals:**
- Offline form submission for the contact form (requires network for EmailJS API)
- Background sync or push notifications
- Custom offline fallback page with interactive content
- Cache versioning strategy beyond what vite-plugin-pwa provides out of the box

## Decisions

### Use `vite-plugin-pwa` with Workbox

**Decision**: Use `vite-plugin-pwa` (which wraps Workbox) to auto-generate the service worker at build time.

**Rationale**: Manually writing a service worker is error-prone and requires careful cache management. `vite-plugin-pwa` integrates directly with Vite's build pipeline, generates a precache manifest automatically, and handles versioning. Alternatives considered:
- *Manual service worker*: More control but higher maintenance burden; unnecessary for a static portfolio
- *Next.js PWA*: Not applicable — this is a Vite/React app
- *Create React App PWA template*: Deprecated; doesn't apply to Vite projects

### Cache-First Strategy with Precaching

**Decision**: Use Workbox precaching for all build assets (hashed JS/CSS) and cache-first for runtime assets (fonts, images).

**Rationale**: Build assets have content hashes in filenames, making them safe to cache aggressively. Fonts and images don't change frequently. The `registerType: 'autoUpdate'` option ensures users get fresh content on new deployments without manual intervention.

### Manifest Configuration

**Decision**: Generate `manifest.json` via the Vite plugin config with `display: standalone`, using the existing profile image (`jm.jpg`) as the source for PWA icons.

**Rationale**: Standalone display provides the most app-like experience. Using the existing profile image avoids creating new artwork. The plugin can auto-generate icon sizes from a source image using `sharp` or we provide manual icon sizes.

## Risks / Trade-offs

- **[Stale content on updates]** → Mitigated by `registerType: 'autoUpdate'` which forces an update check and activates new service workers automatically
- **[Contact form fails offline]** → Acceptable trade-off; the form requires the EmailJS API. The cached UI will still render, and the form will simply fail gracefully with a network error message
- **[External Google Fonts may not cache]** → Mitigated by adding font URLs to the runtime cache configuration in the plugin
- **[Increased build complexity]** → Minimal; single plugin addition with ~30 lines of config
- **[Icon generation dependency]** → If using auto-generation, requires `sharp` as a peer dependency; alternatively, provide pre-made icon files in `public/`
