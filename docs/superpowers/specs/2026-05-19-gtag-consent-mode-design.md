# Google Consent Mode v2 — design

**Date**: 2026-05-19
**Status**: approved
**Branch**: seo-phase-2

## Goal

Wire the existing `cookie-though` banner to Google Consent Mode v2 (advanced)
so that gtag's `ad_storage`, `ad_user_data`, `ad_personalization`, and
`analytics_storage` signals reflect the visitor's actual choice. Today the
banner exists but never communicates with gtag.

## Decisions

| Question | Decision |
|---|---|
| Number of toggles | One combined toggle ("Analityka i marketing") flipping all four signals together |
| Consent tier | Advanced (cookieless pings before consent, modeled conversions if declined) |
| Default state | All four signals `denied` with `wait_for_update: 500` |
| Advanced-mode extras | `ads_data_redaction: true`, `url_passthrough: true` |
| Re-open UX | "Aktualizuj ciasteczka" text link in the site-wide footer (side-by-side with the copyright) |
| Region scoping | Global (Polish-only audience makes EEA scoping unnecessary) |
| Existing gtag plugin | Keep `gatsby-plugin-google-gtag`; layer consent on top |
| Language | Polish throughout |

## Files changed

| File | Change |
|---|---|
| `gatsby-ssr.js` | New `onPreRenderHTML` prepends inline consent-default script to `<head>` |
| `src/components/CookieConsent.js` | Policy category `essential` → non-essential (`statistics`); rename id to `analytics-marketing`; push `gtag('consent','update',...)` on init (returning visitors) and on every `onPreferencesChanged` event |
| `src/components/Footer.js` | Add "Aktualizuj ciasteczka" button in `.footer-bottom`, side-by-side with the copyright. Click dynamic-imports `cookie-though` and calls `show()` |

## Architecture

### Consent default script (in `<head>`, before gtag loader)

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);
</script>
```

Injected via `onPreRenderHTML` (not `onRenderBody`) so we can reorder and
guarantee this script is the **first** element in `<head>`, ahead of the
`gatsby-plugin-google-gtag` loader.

### Cookie banner integration

`cookie-though` exposes `init`, `getPreferences`, `onPreferencesChanged`, and
`show`. The component:

1. Dynamically imports `cookie-though` in `useEffect` (browser-only).
2. Calls `mod.init(cookieConfig)`.
3. Reads `mod.getPreferences()` and pushes a `gtag('consent','update',...)` —
   this carries returning visitors' prior choice forward immediately.
4. Subscribes via `mod.onPreferencesChanged(pushUpdate)`.

`pushUpdate` maps the single `analytics-marketing` policy to all four
consent signals: enabled → `granted`, disabled → `denied`.

### Manage-cookies link

A small text-style `<button class="footer-cookie-link">` lives in the
footer-bottom strip, side-by-side with the copyright. On click it
dynamic-imports `cookie-though` and calls `mod.show()`. Site-wide because
`Footer` is rendered by `Layout` on every page.

## Data flow

**First-time visitor**:

1. Inline `<head>` script → `consent default = all denied`.
2. `gatsby-plugin-google-gtag` loads gtag.js → consent state read from queue.
3. Tags fire in cookieless-ping mode.
4. React hydrates → cookie-though loads → banner appears.
5. User clicks Akceptuj/Odmów → `onPreferencesChanged` → `consent update`.

**Returning visitor**:

1. Same default-denied bootstrap as above (cookieless pings while gtag waits).
2. cookie-though loads → `getPreferences()` → immediate `consent update`
   matching prior choice. No banner shown.

**Re-open from footer**:

1. Click "Aktualizuj ciasteczka" in the footer → dynamic-import → `mod.show()`.
2. User changes choice → `consent update` fires.

## Edge cases

- **DNT enabled**: `gatsby-plugin-google-gtag` already respects DNT
  (`respectDNT: true`). gtag.js never loads; `pushUpdate` no-ops on
  `typeof window.gtag !== 'function'`.
- **gtag.js fails / adblocked**: Same as DNT — `pushUpdate` no-ops.
- **cookie-though fails to load**: Banner never appears, consent stays
  default-denied. Privacy-safe failure mode.
- **Multiple changes in one session**: Each change triggers a fresh
  `consent update`. Idempotent.
- **SSR**: All `window.*` access is guarded. MDXProvider is server-safe.

## Out of scope

- Separate analytics-vs-marketing toggles (decided against: single toggle).
- Dedicated privacy-policy-page button (replaced by site-wide footer link).
- Region-specific consent defaults (decided against: global, Polish audience).
- Replacing `gatsby-plugin-google-gtag` with a hand-rolled loader.
- Migrating to GTM.

## Verification

- `gatsby build` succeeds.
- `gatsby develop` — load home page, confirm in DevTools:
  - Inline consent script is the first `<script>` in `<head>`.
  - `dataLayer` contains `['consent','default',{...all denied...}]`
    before any `config` entry.
- Banner shows on first visit; clicking Akceptuj pushes
  `['consent','update',{...all granted...}]` to dataLayer.
- Reload — banner doesn't re-appear; `consent update` matching prior choice
  still pushed.
- On any page, click "Aktualizuj ciasteczka" in the footer — banner re-opens.
