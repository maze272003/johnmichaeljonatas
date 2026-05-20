## Why

Visitors to the portfolio currently need an active internet connection to load every page visit. Adding Progressive Web App (PWA) support with a service worker will cache the site shell and assets on the first visit, making the portfolio fully accessible offline — providing a faster, app-like experience and ensuring the site works even when connectivity drops.

## What Changes

- Add a web app manifest (`manifest.json`) with app name, icons, theme color, and display mode for PWA registration
- Register a service worker that caches all static assets (HTML, JS, CSS, images, fonts) using a cache-first strategy
- Generate PWA icons (192x192 and 512x512) from the existing profile image
- Add `<link rel="manifest">` and related meta tags to `index.html`
- Configure Vite with `vite-plugin-pwa` for automatic service worker generation during build

## Capabilities

### New Capabilities
- `pwa-manifest`: Web app manifest file with icons, theme, and display configuration for installability
- `service-worker`: Service worker setup with caching strategy for offline asset serving

### Modified Capabilities
<!-- No existing capabilities are being modified -->

## Impact

- **Build tooling**: New dev dependency `vite-plugin-pwa` added to `vite.config.js`
- **Static assets**: New PWA icons added to `public/` directory
- **index.html**: Additional `<link>` and `<meta>` tags for manifest and PWA metadata
- **No runtime API changes**: This is purely a client-side caching layer; all existing components remain unchanged
