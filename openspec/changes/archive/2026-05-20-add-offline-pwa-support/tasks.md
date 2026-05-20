## 1. Install and Configure PWA Plugin

- [x] 1.1 Install `vite-plugin-pwa` as a dev dependency (`npm install -D vite-plugin-pwa`)
- [x] 1.2 Configure `vite.config.js` — import `VitePWA` plugin and add it to the plugins array with base settings: `registerType: 'autoUpdate'`, `includeAssets` for favicon/SVGs, and `manifest` object with `name`, `short_name`, `description`, `theme_color: '#0F172A'`, `background_color: '#0F172A'`, `display: 'standalone'`, `start_url: '/'`, and icon entries

## 2. Generate PWA Icons

- [x] 2.1 Create a 192x192 PNG icon derived from `src/assets/jm.jpg` and place it at `public/pwa-192x192.png`
- [x] 2.2 Create a 512x512 PNG icon derived from `src/assets/jm.jpg` and place it at `public/pwa-512x512.png`
- [x] 2.3 Verify icon paths match the `icons` array in the VitePWA manifest config

## 3. Update index.html for PWA Metadata

- [x] 3.1 Add `<link rel="manifest" href="/manifest.webmanifest">` to `<head>` (or rely on plugin auto-injection — verify)
- [x] 3.2 Add `<meta name="apple-mobile-web-app-capable" content="yes">` and `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">` to `<head>` for iOS PWA support
- [x] 3.3 Add `<link rel="apple-touch-icon" href="/pwa-192x192.png">` for iOS home screen icon

## 4. Configure Runtime Caching

- [x] 4.1 Add a `workbox.runtimeCaching` entry in the VitePWA config for Google Fonts CSS with cache-first strategy, matching `urlPattern: /^https:\/\/fonts\.googleapis\.com/`
- [x] 4.2 Add a runtime caching entry for Google Fonts files with cache-first strategy, matching `urlPattern: /^https:\/\/fonts\.gstatic\.com/`
- [x] 4.3 Set `expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }` for both font cache entries

## 5. Build and Verify

- [x] 5.1 Run `npm run build` and verify no errors — confirm `manifest.webmanifest` is generated in `dist/`
- [ ] 5.2 Run `npm run preview` and verify service worker registers in browser DevTools (Application > Service Workers)
- [ ] 5.3 Test offline behavior — use DevTools Network "Offline" mode, reload page, confirm the site renders from cache
- [ ] 5.4 Run Lighthouse PWA audit and confirm installability criteria pass
