# SEO/SEM Phase 1 — Measure & Quick Wins Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up GA4 + conversion events, emit structured data, tighten robots/canonical/noindex, audit per-page metadata, and prepare a Google Business Profile checklist — so every Phase 2 and Phase 3 decision can be measured.

**Architecture:** All structured data is emitted through the existing `SEO` component (`src/components/seo.js`), which already lives in each page's `Head` export. A new `gatsby-browser.js` intercepts `tel:`/`mailto:` clicks site-wide to fire GA4 + Google Ads conversion events without rewriting every MDX page. The Google Ads tag is already installed; we only add a GA4 measurement ID to the existing `gatsby-plugin-google-gtag` `trackingIds` array.

**Tech Stack:** Gatsby 5, `gatsby-plugin-google-gtag`, JSON-LD via `<script type="application/ld+json">`, styled-components, MDX.

**Verification model:** This repo has no automated test suite. The "test" for each task is one of: (a) rerun `npx gatsby build`, then grep the generated HTML in `public/`, (b) `npx gatsby develop` and view-source on `http://localhost:8000/<path>/`, (c) paste output into Google's Rich Results Test (`https://search.google.com/test/rich-results`).

**Pre-requisite (one-time, before Task 2):** Create a GA4 property at `https://analytics.google.com/`, copy its Measurement ID (looks like `G-XXXXXXXXXX`). The plan refers to this as `<GA4_MEASUREMENT_ID>` — substitute the real ID when implementing.

---

### Task 1: Capture Lighthouse baseline

**Why:** Without baseline numbers we can't say whether Phase 2's performance work moved the needle.

**Files:**
- Create: `docs/seo/baseline-lighthouse.md`

- [ ] **Step 1: Run a production build**

Run: `npx gatsby build`
Expected: Build completes with no fatal errors. (Warnings about `ERROR UNKNOWN` may exist — that's the previous Gatsby-warnings plan.)

- [ ] **Step 2: Serve the production build**

Run: `npx gatsby serve` (in a separate terminal)
Expected: Output `You can now view ... at http://localhost:9000`

- [ ] **Step 3: Run Lighthouse on the homepage (mobile)**

Run: `npx lighthouse http://localhost:9000/ --preset=desktop --output=html --output-path=./lighthouse-desktop-home.html --quiet --chrome-flags="--headless"`
Then: `npx lighthouse http://localhost:9000/ --output=html --output-path=./lighthouse-mobile-home.html --quiet --chrome-flags="--headless"`
Expected: Two HTML reports generated in the repo root.

- [ ] **Step 4: Record numbers in a baseline doc**

Open both HTML reports, copy Performance / Accessibility / Best Practices / SEO scores plus LCP, CLS, INP, TBT.

Create `docs/seo/baseline-lighthouse.md` with this content (replace the placeholder numbers with your readings):

```markdown
# Lighthouse Baseline — 2026-05-19

Captured against `npx gatsby serve` (production build).

## Homepage (`/`)

| Metric         | Mobile | Desktop |
|----------------|--------|---------|
| Performance    | 00     | 00      |
| Accessibility  | 00     | 00      |
| Best Practices | 00     | 00      |
| SEO            | 00     | 00      |
| LCP (s)        | 0.0    | 0.0     |
| CLS            | 0.00   | 0.00    |
| INP (ms)       | 000    | 000     |
| TBT (ms)       | 000    | 000     |

## Notes
- Captured against commit: <git rev-parse HEAD>
- Re-run after Phase 2.4 to measure improvement.
```

- [ ] **Step 5: Clean up generated HTML reports and commit**

Run: `rm lighthouse-desktop-home.html lighthouse-mobile-home.html`
Run: `git add docs/seo/baseline-lighthouse.md && git commit -m "Capture Lighthouse baseline before SEO Phase 1"`

---

### Task 2: Add GA4 measurement ID to gatsby-plugin-google-gtag

**Why:** The site already has Google Ads (`AW-994571338`) wired through `gatsby-plugin-google-gtag`. GA4 is the analytics property — once added to the same `trackingIds` array, every page view is recorded in GA4, and the same gtag instance can dispatch conversion events to both Ads and GA4 in Task 3.

**Files:**
- Modify: `gatsby-config.js` (lines 78-98)

- [ ] **Step 1: Verify the GA4 measurement ID exists**

You should have copied a `G-XXXXXXXXXX` value from the GA4 admin. If you don't have one, create the GA4 property first.

- [ ] **Step 2: Add GA4 to `trackingIds`**

In `gatsby-config.js`, change:

```js
trackingIds: [
  "AW-994571338", // Google Ads / Adwords / AW
],
```

To:

```js
trackingIds: [
  "AW-994571338", // Google Ads / Adwords / AW
  "<GA4_MEASUREMENT_ID>", // GA4 (e.g. G-XXXXXXXXXX)
],
```

- [ ] **Step 3: Rebuild and verify the tag fires**

Run: `npx gatsby clean && npx gatsby develop`
Open: `http://localhost:8000/` in a browser, open DevTools → Network, filter on `collect`.
Expected: Requests to `https://www.google-analytics.com/g/collect?...` AND `https://www.googletagmanager.com/gtag/js?id=AW-994571338`.

- [ ] **Step 4: Verify in GA4 Realtime**

In GA4 admin → Reports → Realtime. Reload the local site a few times.
Expected: 1 active user shown in Realtime within 60s. (If you're behind a VPN or have an ad blocker, disable it for `localhost:8000` first.)

- [ ] **Step 5: Commit**

```bash
git add gatsby-config.js
git commit -m "Add GA4 measurement ID alongside Google Ads tag"
```

---

### Task 3: Add click-delegate for `tel:` and `mailto:` conversion events

**Why:** The conversion events we want — phone-call clicks and email clicks — happen on links rendered from MDX (`content/pages/contact/contact.md`), siteConfig footer entries, and other places. Rewriting every link site-wide is fragile. Instead, install one global `click` listener in `gatsby-browser.js` that catches any anchor whose `href` starts with `tel:` or `mailto:` and dispatches an event to gtag.

The same event fires for both GA4 (for reporting) and Google Ads (for conversions and Smart Bidding eligibility later).

**Files:**
- Create: `gatsby-browser.js`

- [ ] **Step 1: Confirm the file does not yet exist**

Run: `ls gatsby-browser.js 2>&1`
Expected: `ls: gatsby-browser.js: No such file or directory`

- [ ] **Step 2: Create `gatsby-browser.js` with a global click delegate**

Create the file with:

```js
// gatsby-browser.js
// Global click delegate that turns tel: and mailto: clicks into
// GA4 events and Google Ads conversion events. Mounted once per
// page load; no per-component wiring needed.

const fireGtagEvent = (eventName, params) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }
  window.gtag('event', eventName, params)
}

const handleClick = event => {
  // Walk up to find the nearest <a> — handles clicks on children
  // of the anchor (e.g. inline <strong> inside the link text).
  let node = event.target
  while (node && node !== document.body && node.tagName !== 'A') {
    node = node.parentNode
  }
  if (!node || node.tagName !== 'A') return

  const href = node.getAttribute('href') || ''
  const linkText = (node.textContent || '').trim().slice(0, 100)

  if (href.startsWith('tel:')) {
    fireGtagEvent('phone_click', {
      phone_number: href.replace('tel:', ''),
      link_text: linkText,
      event_category: 'engagement',
    })
  } else if (href.startsWith('mailto:')) {
    fireGtagEvent('email_click', {
      email: href.replace('mailto:', '').split('?')[0],
      link_text: linkText,
      event_category: 'engagement',
    })
  }
}

export const onClientEntry = () => {
  if (typeof document === 'undefined') return
  document.addEventListener('click', handleClick, { capture: true })
}
```

- [ ] **Step 3: Restart dev server**

Run: `npx gatsby clean && npx gatsby develop`
Expected: Server boots without errors.

- [ ] **Step 4: Verify in browser DevTools**

Open: `http://localhost:8000/kontakt/`
Open DevTools → Network → filter on `collect`.
Click one of the `tel:` links and one `mailto:` link.

Expected: Two `collect` requests appear with `en=phone_click` and `en=email_click` in their query strings (GA4) and a corresponding event on the Ads property.

If you don't see the event, open Console and run `window.gtag` — it should be a function. If it's undefined, the gtag plugin isn't initializing; revisit Task 2.

- [ ] **Step 5: Mark events as conversions in GA4**

Manual step (no code): In GA4 Admin → Events, wait for `phone_click` and `email_click` to appear (can take 24h to propagate), then toggle "Mark as conversion" on both. Note this in `docs/seo/baseline-lighthouse.md` so we remember.

- [ ] **Step 6: Commit**

```bash
git add gatsby-browser.js
git commit -m "Track tel: and mailto: clicks as GA4/Ads conversion events"
```

---

### Task 4: Emit `LocalBusiness` / `NursingHome` JSON-LD via the SEO component

**Why:** Google uses structured data to populate Knowledge Panel, local-pack listings, and Maps results. Without it, Google has to infer the business type from text alone, and the right rich results (phone number, hours, address) don't appear. `NursingHome` is the schema.org type that matches the business exactly.

**Files:**
- Modify: `src/components/seo.js` (currently ends at line 62)
- Modify: `data/siteConfig.js` (add a `business` block we can read in the SEO component)
- Modify: `src/hooks/use-site-config.js` (expose the new fields via the GraphQL query)

- [ ] **Step 1: Add a `business` block to `data/siteConfig.js`**

Open `data/siteConfig.js`. Inside `module.exports = { ... }`, add (before `headerLinks`):

```js
business: {
  legalName: 'Srebrny Dom Usługi Rehabilitacyjne i Opiekuńcze',
  streetAddress: 'ul. Jałowcowa 8',
  postalCode: '89-608',
  addressLocality: 'Swornegacie',
  addressRegion: 'pomorskie',
  addressCountry: 'PL',
  latitude: 53.8691161,
  longitude: 17.494753,
  telephone: '+48692407428',
  secondaryTelephone: '+48880615812',
  email: 'kontakt@srebrnydom.pl',
  priceRange: '$$$',
  foundingDate: '2019',
  openingHours: 'Mo-Su 00:00-23:59', // 24h care
  bookingHours: 'Mo-Su 09:00-17:00',  // when the reservation phone is answered
  licenseNumber: '114',
  licenseAuthority: 'Wojewoda Pomorski',
  sameAs: [
    'https://www.facebook.com/SrebrnyDomSwornegacie/',
    'https://www.linkedin.com/company/74240750',
    'https://twitter.com/DomSrebrny',
    'https://www.instagram.com/srebrnydomswornegacie',
  ],
  areaServed: [
    { name: 'pomorskie', type: 'AdministrativeArea' },
    { name: 'kujawsko-pomorskie', type: 'AdministrativeArea' },
  ],
},
```

- [ ] **Step 2: Expose `business` in `use-site-config`**

In `src/hooks/use-site-config.js`, add `business { ... }` to the GraphQL query (after `defaultLang`):

```js
business {
  legalName
  streetAddress
  postalCode
  addressLocality
  addressRegion
  addressCountry
  latitude
  longitude
  telephone
  secondaryTelephone
  email
  priceRange
  foundingDate
  openingHours
  bookingHours
  licenseNumber
  licenseAuthority
  sameAs
  areaServed {
    name
    type
  }
}
```

Note: Gatsby's automatic schema inference will pick these up because `siteConfig` is spread into `siteMetadata` in `gatsby-config.js`. If the build errors with "Cannot query field 'business' on type 'SiteSiteMetadata'", run `npx gatsby clean` and rebuild — inference is cached. If the error persists, the fallback is to define an explicit type in `gatsby-node.js` via `createTypes`, but in practice clean + rebuild resolves it.

- [ ] **Step 3: Add JSON-LD emission to `src/components/seo.js`**

At the top of `src/components/seo.js`, after the existing imports, add a helper:

```js
const buildLocalBusinessSchema = (business, siteUrl, siteTitle, imageUrl) => {
  if (!business) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'NursingHome',
    '@id': `${siteUrl}#nursinghome`,
    name: siteTitle,
    legalName: business.legalName,
    url: siteUrl,
    image: imageUrl,
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    foundingDate: business.foundingDate,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.streetAddress,
      postalCode: business.postalCode,
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      addressCountry: business.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.latitude,
      longitude: business.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: business.sameAs,
    areaServed: (business.areaServed || []).map(a => ({
      '@type': a.type,
      name: a.name,
    })),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      identifier: business.licenseNumber,
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: business.licenseAuthority,
      },
    },
  }
}

const buildOrganizationSchema = (business, siteUrl, siteTitle, imageUrl) => {
  if (!business) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: business.legalName || siteTitle,
    url: siteUrl,
    logo: imageUrl,
    foundingDate: business.foundingDate,
    sameAs: business.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.telephone,
      contactType: 'reservations',
      email: business.email,
      availableLanguage: ['pl', 'en'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday',
        ],
        opens: '09:00',
        closes: '17:00',
      },
    },
  }
}
```

Then update the SEO component to render these. Add `business` to the destructured siteMetadata, and inside the returned `<>...</>`, just before the closing fragment, add:

```jsx
{business && (
  <script type="application/ld+json">
    {JSON.stringify(buildLocalBusinessSchema(business, formatedSiteUrl, siteTitle, image))}
  </script>
)}
{business && (
  <script type="application/ld+json">
    {JSON.stringify(buildOrganizationSchema(business, formatedSiteUrl, siteTitle, image))}
  </script>
)}
```

Also add `business` to the destructured `useSiteMetadata()` call:

```js
const {
  siteTitle,
  siteUrl,
  siteCover,
  siteDescription,
  twitterUsername,
  business,
} = useSiteMetadata()
```

- [ ] **Step 4: Build and verify the JSON-LD appears in the HTML**

Run: `npx gatsby clean && npx gatsby build`
Run: `grep -c '"@type":"NursingHome"' public/index.html`
Expected: `1`

Run: `grep -c '"@type":"Organization"' public/index.html`
Expected: `1`

- [ ] **Step 5: Validate with Google's Rich Results Test**

Run: `npx gatsby serve`
Open: `https://search.google.com/test/rich-results` and paste this URL: `http://localhost:9000/`. (For local URLs, use the "Code" tab and paste `public/index.html`'s `<head>` content instead.)

Alternative: open `https://validator.schema.org/`, paste the contents of one `<script type="application/ld+json">` block from `public/index.html`.

Expected: Both schemas validate with no errors. Warnings about optional fields are fine.

- [ ] **Step 6: Commit**

```bash
git add data/siteConfig.js src/hooks/use-site-config.js src/components/seo.js
git commit -m "Emit NursingHome and Organization JSON-LD on every page"
```

---

### Task 5: Emit `BreadcrumbList` JSON-LD

**Why:** Google uses breadcrumb structured data to render the URL path as a breadcrumb trail in search results (instead of the raw URL). It improves click-through rate.

**Files:**
- Modify: `src/components/seo.js`

- [ ] **Step 1: Add a `buildBreadcrumbSchema` helper to `src/components/seo.js`**

Below the two existing schema helpers, add:

```js
const buildBreadcrumbSchema = (path, siteUrl, siteTitle) => {
  // Build a trail from path segments. Skip empty segments and the
  // root itself. For `/blog/foo/` → [Home, Blog, Foo].
  const segments = path.split('/').filter(Boolean)
  if (segments.length === 0) return null

  const humanize = slug =>
    slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: siteTitle,
      item: siteUrl,
    },
    ...segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: humanize(segment),
      item: `${siteUrl}/${segments.slice(0, index + 1).join('/')}/`,
    })),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}
```

- [ ] **Step 2: Render the breadcrumb schema in the SEO component**

Inside the returned fragment in `src/components/seo.js`, just below the Organization script, add:

```jsx
{normalizedPath !== '/' && (
  <script type="application/ld+json">
    {JSON.stringify(buildBreadcrumbSchema(normalizedPath, formatedSiteUrl, siteTitle))}
  </script>
)}
```

- [ ] **Step 3: Verify breadcrumb JSON-LD on a non-root page**

Run: `npx gatsby clean && npx gatsby build`
Run: `grep -c '"@type":"BreadcrumbList"' public/o-nas/index.html`
Expected: `1`

Run: `grep -c '"@type":"BreadcrumbList"' public/index.html`
Expected: `0` (homepage is just `/`, no breadcrumb)

- [ ] **Step 4: Validate**

Paste the contents of one breadcrumb `<script>` block from `public/o-nas/index.html` into `https://validator.schema.org/`. Expected: validates with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/seo.js
git commit -m "Emit BreadcrumbList JSON-LD on all non-root pages"
```

---

### Task 6: Emit `Article` JSON-LD on blog posts

**Why:** Marks blog posts as articles in Google's eyes, eligible for article-style rich results.

**Files:**
- Modify: `src/components/seo.js` (accept an `isBlogPost` + extra metadata)
- Modify: `src/templates/blog-post.js` (already passes `isBlogPost` — verify and extend)

- [ ] **Step 1: Read the current `blog-post.js` Head export**

Open `src/templates/blog-post.js`. Confirm the `Head` export already passes `isBlogPost`, `cover`, and `lang`. We will extend it to also pass article date and author.

- [ ] **Step 2: Extend the GraphQL query in `blog-post.js`**

In the `pageQuery` block in `src/templates/blog-post.js`, add `dateModified` and ensure `date` is exposed (it already is). Change the `frontmatter { ... }` block to include:

```graphql
frontmatter {
  title
  date
  slug
  language
  tags
  cover {
    publicURL
  }
  imageShare {
    publicURL
  }
  translations {
    language
    link
    hreflang
  }
}
```

(`date` is already there; no real change unless you also want `dateModified`. For Phase 1, `date` alone is fine. Skip the `dateModified` field for now.)

- [ ] **Step 3: Pass article metadata to SEO**

In the same file, update the `Head` export to pass `articleDate` and `articleTags`:

```jsx
export const Head = ({ data }) => {
  const post = data.post
  return (
    <SEO
      title={post.frontmatter.title}
      description={post.excerpt}
      cover={post.frontmatter.cover && post.frontmatter.cover.publicURL}
      imageShare={
        post.frontmatter.imageShare && post.frontmatter.imageShare.publicURL
      }
      lang={post.frontmatter.language}
      translations={post.frontmatter.translations}
      path={`/blog/${post.frontmatter.slug}/`}
      isBlogPost
      articleDate={post.frontmatter.date}
      articleTags={post.frontmatter.tags || []}
    />
  )
}
```

- [ ] **Step 4: Add an `Article` schema helper to `seo.js`**

In `src/components/seo.js`, below `buildBreadcrumbSchema`, add:

```js
const buildArticleSchema = ({
  title,
  description,
  imageUrl,
  url,
  datePublished,
  tags,
  business,
  siteUrl,
  siteTitle,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image: imageUrl,
  url,
  datePublished,
  author: {
    '@type': 'Organization',
    name: business?.legalName || siteTitle,
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: business?.legalName || siteTitle,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: imageUrl,
    },
  },
  keywords: (tags || []).join(', '),
  inLanguage: 'pl',
})
```

- [ ] **Step 5: Render the article schema in SEO**

In `src/components/seo.js`, accept `articleDate` and `articleTags` from props:

```js
const {
  isBlogPost,
  path = '',
  lang = 'pl',
  articleDate,
  articleTags,
} = props
```

Inside the returned fragment, after the BreadcrumbList block, add:

```jsx
{isBlogPost && articleDate && (
  <script type="application/ld+json">
    {JSON.stringify(buildArticleSchema({
      title,
      description,
      imageUrl: image,
      url: formatedSiteUrl + withPrefix(normalizedPath),
      datePublished: articleDate,
      tags: articleTags,
      business,
      siteUrl: formatedSiteUrl,
      siteTitle,
    }))}
  </script>
)}
```

- [ ] **Step 6: Build and verify**

Run: `npx gatsby clean && npx gatsby build`
Run: `find public/blog -name index.html | head -1 | xargs grep -l '"@type":"Article"'`
Expected: one or more blog post HTML files printed.

Run: `find public/blog -name index.html | head -1 | xargs grep -o '"@type":"Article"' | wc -l`
Expected: `1` per blog post.

- [ ] **Step 7: Validate one article schema**

Run: `find public/blog -name index.html | head -1` to get a blog post path. Open the file, locate the `<script type="application/ld+json">` containing `"Article"`, paste into `https://validator.schema.org/`.
Expected: validates clean.

- [ ] **Step 8: Commit**

```bash
git add src/templates/blog-post.js src/components/seo.js
git commit -m "Emit Article JSON-LD on blog posts"
```

---

### Task 7: Update `robots.txt` to reference the sitemap

**Why:** The current `robots.txt` (`User-agent: *  Disallow:`) is permissive but doesn't tell crawlers where to find the sitemap. `gatsby-plugin-sitemap` generates `/sitemap-index.xml` at build time, but crawlers won't discover it as fast unless robots.txt points to it.

**Files:**
- Modify: `static/robots.txt`

- [ ] **Step 1: Verify current sitemap output path**

Run: `npx gatsby clean && npx gatsby build`
Run: `ls public/sitemap-*.xml`
Expected: `public/sitemap-0.xml  public/sitemap-index.xml` (the index references the per-batch files).

- [ ] **Step 2: Replace robots.txt**

Overwrite `static/robots.txt` with:

```
User-agent: *
Allow: /

Sitemap: https://www.srebrnydom.pl/sitemap-index.xml
```

- [ ] **Step 3: Rebuild and verify**

Run: `npx gatsby clean && npx gatsby build`
Run: `cat public/robots.txt`
Expected: the three-line content above.

- [ ] **Step 4: Commit**

```bash
git add static/robots.txt
git commit -m "Point robots.txt to the generated sitemap"
```

---

### Task 8: Fix canonical URL on paginated blog list pages

**Why:** `src/templates/blog-list-template.js` renders the SEO component without a `path`, so canonical URLs default to `/` on every paginated page (`/pages/2/`, `/pages/3/`, …). Google may treat these as duplicates of the homepage.

**Files:**
- Modify: `src/templates/blog-list-template.js` (line 32)

- [ ] **Step 1: Confirm the bug exists**

Run: `npx gatsby clean && npx gatsby build`
Run: `find public/pages -name index.html | head -1 | xargs grep -o 'rel="canonical"[^>]*'`
Expected (the bug): `rel="canonical" href="https://www.srebrnydom.pl/"` — wrong, should be `https://www.srebrnydom.pl/pages/2/`.

- [ ] **Step 2: Pass `path` from page context to SEO**

In `src/templates/blog-list-template.js`, change:

```jsx
export const Head = () => <SEO />
```

To:

```jsx
export const Head = ({ pageContext }) => {
  const path = pageContext.currentPage === 1
    ? '/'
    : `/pages/${pageContext.currentPage}/`
  return <SEO path={path} />
}
```

- [ ] **Step 3: Rebuild and verify**

Run: `npx gatsby clean && npx gatsby build`
Run: `grep -o 'rel="canonical"[^>]*' public/pages/2/index.html`
Expected: `rel="canonical" href="https://www.srebrnydom.pl/pages/2/"`

- [ ] **Step 4: Commit**

```bash
git add src/templates/blog-list-template.js
git commit -m "Pass per-page path to SEO so paginated blog lists get correct canonical"
```

---

### Task 9: Add `noindex` to the 404 page

**Why:** Soft 404s (a working URL that returns "page not found" content but a 200 status) confuse Google. Marking the 404 page `noindex` prevents it from ever appearing in search results.

**Files:**
- Modify: `src/pages/404.js` (line 82)
- Modify: `src/components/seo.js` (add a `noindex` prop)

- [ ] **Step 1: Add a `noindex` prop to SEO**

In `src/components/seo.js`, destructure a `noindex` prop:

```js
const {
  isBlogPost,
  path = '',
  lang = 'pl',
  articleDate,
  articleTags,
  noindex = false,
} = props
```

Inside the returned fragment, just under the `<title>` element, add:

```jsx
{noindex && <meta name="robots" content="noindex,nofollow" />}
```

- [ ] **Step 2: Use it on the 404 page**

In `src/pages/404.js`, change line 82:

```jsx
export const Head = () => <SEO title="Page Not Found" />
```

To:

```jsx
export const Head = () => <SEO title="Page Not Found" noindex />
```

- [ ] **Step 3: Rebuild and verify**

Run: `npx gatsby clean && npx gatsby build`
Run: `grep 'name="robots"' public/404.html`
Expected: `<meta name="robots" content="noindex,nofollow"/>`

- [ ] **Step 4: Confirm normal pages did not regress**

Run: `grep -c 'name="robots"' public/index.html`
Expected: `0` (the homepage should NOT have a robots noindex tag).

- [ ] **Step 5: Commit**

```bash
git add src/components/seo.js src/pages/404.js
git commit -m "Mark 404 page noindex,nofollow"
```

---

### Task 10: Audit per-page `seoTitle` and `seoContent`

**Why:** Every page in `content/pages/*` has frontmatter `seoTitle` and `seoContent` that drives `<title>` and meta description. If any are missing, the page falls back to the global default — which Google may flag as "duplicate description". We audit them all, fix any that are missing/too long/too short.

**Files:**
- Read-only: every `content/pages/*/*.md`
- Possibly modify: each `.md` file's frontmatter
- Create: `docs/seo/page-metadata-audit.md` (record of decisions)

- [ ] **Step 1: List every page and its current SEO fields**

Run: `for f in content/pages/*/*.md; do echo "=== $f ==="; head -10 "$f" | grep -E '^(title|slug|seoTitle|seoContent):'; done`

Expected output: 8 file blocks. For each, note whether `seoTitle` and `seoContent` are present, and roughly count their length.

- [ ] **Step 2: Record findings in an audit document**

Create `docs/seo/page-metadata-audit.md` with this template, filling in real values from Step 1:

```markdown
# Page metadata audit — 2026-05-19

Constraints used:
- `seoTitle` ≤ 60 characters
- `seoContent` ≤ 155 characters
- Each must contain at least one priority keyword (rough check)

| Page                     | seoTitle present | seoTitle len | seoContent present | seoContent len | Action |
|--------------------------|------------------|--------------|--------------------|----------------|--------|
| about/about.md           | yes              | 47           | yes                | 99             | OK     |
| contact/contact.md       | yes              | 36           | yes                | 71             | OK     |
| covid/covid.md           | ?                | ?            | ?                  | ?              | ?      |
| montessori/montessori.md | ?                | ?            | ?                  | ?              | ?      |
| offer/offer.md           | ?                | ?            | ?                  | ?              | ?      |
| offer-description/*.md   | ?                | ?            | ?                  | ?              | ?      |
| patron/patron.md         | ?                | ?            | ?                  | ?              | ?      |
| terms/terms.md           | ?                | ?            | ?                  | ?              | ?      |
```

- [ ] **Step 3: For each page lacking metadata, add it**

For pages with missing or empty `seoTitle`/`seoContent`, edit the frontmatter. Example template (replace with relevant content per page):

```yaml
---
title: "..."
slug: ...
cover: ...
disqus: false
seoTitle: "Krótki tytuł z miastem - Srebrny Dom"
seoContent: "Jednozdaniowy opis tej strony zawierający kluczowy frazę i lokalizację, kończący się zachętą lub konkretną korzyścią."
---
```

Stay under 60/155 chars and embed one priority keyword. (Priority keywords for Phase 1 are flexible — Phase 2's keyword research will refine them. For now: "dom seniora", "dom opieki", "pomorskie", "Kaszuby", "Swornegacie", "Montessori", "luksusowy dom seniora".)

- [ ] **Step 4: Verify**

Run: `for f in content/pages/*/*.md; do
  title_len=$(grep '^seoTitle:' "$f" | sed 's/seoTitle://' | tr -d '"' | tr -d \\\' | awk '{$1=$1; print length}')
  content_len=$(grep '^seoContent:' "$f" | sed 's/seoContent://' | tr -d '"' | tr -d \\\' | awk '{$1=$1; print length}')
  echo "$f: seoTitle=$title_len seoContent=$content_len"
done`

Expected: every file reports both lengths, none over 60/155.

- [ ] **Step 5: Build and spot-check one fixed page**

Run: `npx gatsby clean && npx gatsby build`
Run: `grep -E '<title>|name="description"' public/o-nas/index.html`
Expected: both tags present with the values from `about.md` frontmatter.

- [ ] **Step 6: Audit for existing FAQ content (drives Phase 1 FAQPage schema)**

The spec defers FAQ schema work to Phase 2.2 unless a page already has Q&A content today.

Run: `grep -lE '^(##|###)[[:space:]]+(\?|.+\?$)' content/pages/*/*.md content/pages/*/**/*.md 2>/dev/null`

If the command returns nothing: no page currently has FAQ-shaped headings; FAQPage schema is correctly deferred to Phase 2.2. Record this in `docs/seo/page-metadata-audit.md` under a "Notes" section.

If it returns one or more files: open them and inspect. If the file genuinely contains Q&A pairs, add a follow-up task to this plan (or open a small ad-hoc commit) to emit `FAQPage` schema for that specific page using the existing SEO component. The schema helper:

```js
const buildFaqSchema = (faqItems) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
})
```

For Phase 1, only proceed with the helper if FAQ content actually exists. Otherwise this step is a single grep + a note.

- [ ] **Step 7: Commit**

```bash
git add content/pages docs/seo/page-metadata-audit.md
git commit -m "Audit and fix per-page seoTitle and seoContent"
```

---

### Task 11: Improve Gallery image alt text

**Why:** The `Gallery` component currently uses the raw filename as alt text (e.g. `IMG_2473`). Alt text is read by screen readers and indexed by Google Images. Filenames built from camera-default IDs convey nothing.

We make two small improvements:
1. Update the Gallery component to humanize the filename — strip a leading numeric sort prefix (e.g. `01-`), replace dashes with spaces, capitalize.
2. Add a "rename gallery images" task to the owner checklist (Task 13) so the owner replaces opaque filenames with descriptive Polish phrases like `01-salon-z-kominkiem.jpg`.

**Files:**
- Modify: `src/components/Gallery.js` (lines 108, 134, 136, 142)

- [ ] **Step 1: Add an `imageAlt` helper to the Gallery file**

In `src/components/Gallery.js`, just above the `const Gallery = () => {` line, add:

```js
const imageAlt = name => {
  if (!name) return ''
  return name
    .replace(/^\d+[-_]/, '')   // strip leading "01-" sort prefix
    .replace(/[-_]+/g, ' ')     // dashes/underscores → spaces
    .replace(/\.[^.]+$/, '')    // strip extension if present
    .trim()
    .replace(/^(.)/, c => c.toUpperCase())
}
```

- [ ] **Step 2: Use the helper in the three spots where `image.name` is rendered**

In the `Tile` block, change:

```jsx
aria-label={`View image ${image.name}`}
```

to:

```jsx
aria-label={`Pokaż zdjęcie: ${imageAlt(image.name)}`}
```

In the same block, change:

```jsx
<GatsbyImage image={getImage(image)} alt={image.name} />
```

to:

```jsx
<GatsbyImage image={getImage(image)} alt={imageAlt(image.name)} />
```

In the `ModalImg` block, change:

```jsx
<ModalImg src={images[openIndex].publicURL} alt={images[openIndex].name} />
```

to:

```jsx
<ModalImg src={images[openIndex].publicURL} alt={imageAlt(images[openIndex].name)} />
```

- [ ] **Step 3: Build and spot-check**

Run: `npx gatsby clean && npx gatsby build`
Run: `grep -m1 -oE 'alt="[^"]+"' public/galeria/index.html | head -5`
Expected: alt values are humanized (no raw `IMG_NNNN`-style names if files have been renamed; for unchanged filenames you'll still see e.g. `alt="IMG 2473"` — that's a content-side rename, captured in Task 13's checklist).

- [ ] **Step 4: Commit**

```bash
git add src/components/Gallery.js
git commit -m "Humanize Gallery alt text and aria-labels"
```

---

### Task 12: Verify `<h1>` audit (one per page)

**Why:** Search engines weigh `<h1>` heavily for topic understanding. Multiple `<h1>`s dilute the signal; zero `<h1>`s leave Google guessing.

**Files:**
- Read-only spot check via grep against `public/`

- [ ] **Step 1: Build and audit `<h1>` count per page**

Run: `npx gatsby clean && npx gatsby build`
Run: `find public -name index.html -not -path '*/blog/*' -not -path '*/tags/*' | while read f; do count=$(grep -oE '<h1[^>]*>' "$f" | wc -l | tr -d ' '); echo "$count $f"; done | sort -n`

Expected: every page reports `1` as its `<h1>` count. If any report `0` or `2+`, investigate.

- [ ] **Step 2: Fix any page that fails**

Most likely candidates if any fail:
- Homepage (`src/pages/index.js`): the `Hero` component should render an `<h1>` for the page title. If it doesn't, wrap the hero's title text in `<h1>`.
- Blog list (`src/templates/blog-list-template.js`): may have no `<h1>`. If so, add `<h1>Blog</h1>` (or similar) above the `PostsList`.

For each page that fails, make a small structural fix and re-run Step 1 until every page reports `1`.

- [ ] **Step 3: Commit (only if any code changed)**

```bash
git add src/
git commit -m "Ensure every page has exactly one <h1>"
```

If no fixes were needed, skip the commit.

---

### Task 13: Write the Google Business Profile owner checklist

**Why:** GBP is owner-driven work, not code. We capture the to-do as a checklist the owner can work through outside the repo. Phase 1's exit criteria require GBP to be "complete" per Google's checklist.

**Files:**
- Create: `docs/seo/gbp-checklist.md`

- [ ] **Step 1: Create the checklist**

Create `docs/seo/gbp-checklist.md` with:

```markdown
# Google Business Profile — Phase 1 polish checklist

Owner-driven. Work through these in `https://business.google.com/`.

## Identity & NAP

- [ ] **Name** matches the website footer exactly: `Srebrny Dom Usługi Rehabilitacyjne i Opiekuńcze` (no extra location keywords appended — Google can penalize keyword-stuffing).
- [ ] **Address**: `ul. Jałowcowa 8, 89-608 Swornegacie`. Pin location verified on the map.
- [ ] **Phone**: primary `+48 692 407 428`. Add `+48 880 615 812` as a secondary phone.
- [ ] **Website**: `https://www.srebrnydom.pl/`
- [ ] **Hours**: 24-hour care (00:00–23:59 every day). Reservation phone is answered 09:00–17:00 — note this in "Description", not hours.

## Categories & attributes

- [ ] **Primary category**: "Dom opieki" (Nursing home).
- [ ] **Secondary categories**: "Dom seniora", "Ośrodek rehabilitacji" if available.
- [ ] **Attributes**: Wi-Fi, parking, wheelchair accessible (if true), Polish-speaking staff, etc.

## Description

- [ ] **Description (≤ 750 chars)**: rewrite to include top 3 priority keywords naturally:
  - "luksusowy dom seniora"
  - "dom opieki Kaszuby" / "dom seniora pomorskie"
  - "Montessori dla seniorów"

  Example skeleton (replace with your own voice):
  > Srebrny Dom to luksusowy dom seniora położony w sercu Kaszub, w Swornegaciach (woj. pomorskie). Prowadzimy opiekę całodobową w metodyce Montessori, mamy zezwolenie nr 114 Wojewody Pomorskiego. Oferujemy 9 komfortowych pokoi z własnymi łazienkami, salę rehabilitacyjną, kawiarnię, ogród. Telefon do rezerwacji: 9:00–17:00.

## Media

- [ ] **Logo** uploaded (use `content/images/logo.png`).
- [ ] **Cover photo** uploaded (use the homepage cover).
- [ ] **≥ 10 photos** covering: exterior, garden, dining room, library/café, one of the bedrooms (with consent), rehabilitation room, staff (with consent), Montessori activities.
- [ ] **3-5 short videos** of the property if available.

## Services & products

- [ ] Add services: "Opieka całodobowa", "Rehabilitacja", "Opieka medyczna", "Posiłki", "Aktywizacja Montessori".
- [ ] Each service gets a 2-3 sentence description.

## Communications

- [ ] Enable **messaging** so families can chat from Maps results.
- [ ] Set the **booking link** if you have one; otherwise leave default.

## Reputation flow

- [ ] Write a post-placement template message (SMS/email) asking the family for a Google review. Include a direct review link from GBP → "Share review form".
- [ ] Define an internal owner (you or office staff) who responds to every review within 48 hours, in Polish, addressing the family member by first name where appropriate.

## Linkage to Search Console & Analytics

- [ ] Link GBP to Search Console (Insights → Performance).
- [ ] Link GBP to Google Ads (helps location extensions in Phase 3.3).

## Gallery filename hygiene (related to Task 11)

- [ ] Rename gallery image files in `content/gallery/` to descriptive slugs with a sort prefix, e.g.:
  - `01-salon-z-kominkiem.jpg`
  - `02-pokoj-dwuosobowy.jpg`
  - `03-jadalnia.jpg`
  - …

  The Gallery component derives alt text from the filename, so renaming improves accessibility AND Google Image indexing simultaneously.

## Exit criteria

GBP is "complete" per Google's own checklist (the dashboard shows a green status banner), at least one review request has been sent, and the response process is documented.
```

- [ ] **Step 2: Commit**

```bash
git add docs/seo/gbp-checklist.md
git commit -m "Owner checklist for Google Business Profile Phase 1 polish"
```

---

### Task 14: Phase 1 exit verification

**Why:** The spec lists explicit exit criteria. We run through them as a single final task so the phase has a clean "done" boundary.

**Files:**
- Read-only

- [ ] **Step 1: GA4 events flowing**

Open GA4 → Reports → Realtime. From a separate device or incognito window, visit `https://www.srebrnydom.pl/kontakt/` (or local dev), click one `tel:` link and one `mailto:` link.
Expected: `phone_click` and `email_click` events visible in Realtime → Event count.

- [ ] **Step 2: JSON-LD validates**

Run: `npx gatsby clean && npx gatsby build && npx gatsby serve`
Open: `https://search.google.com/test/rich-results`
Test the deployed URL (or paste the homepage's `<head>` markup if testing locally).
Expected: `NursingHome`, `Organization`, and (for non-root URLs) `BreadcrumbList` detected as valid items. Blog post URLs additionally show `Article`.

- [ ] **Step 3: robots.txt and canonicals**

Run: `cat public/robots.txt` → confirm sitemap line.
Run: `grep -o 'rel="canonical"[^>]*' public/pages/2/index.html` → confirm canonical is `/pages/2/`.
Run: `grep 'name="robots"' public/404.html` → confirm `noindex,nofollow`.

- [ ] **Step 4: Per-page metadata audit complete**

Open `docs/seo/page-metadata-audit.md` → every row has Action `OK`.

- [ ] **Step 5: GBP checklist complete**

Open `docs/seo/gbp-checklist.md` and confirm every checkbox is ticked.

- [ ] **Step 6: Lighthouse baseline recorded**

Open `docs/seo/baseline-lighthouse.md`. Confirm the table has real numbers (not placeholders).

- [ ] **Step 7: Tag the Phase 1 completion commit**

Run:

```bash
git tag -a seo-phase-1-complete -m "Phase 1 of the SEO/SEM plan complete"
git push --tags origin seo-sem-update
```

(Skip the push if you'd rather not push the tag yet.)

---

## After Phase 1

Phase 2 (`Foundations`) and Phase 3 (`Growth`) are separate implementation plans, to be written when Phase 1 ships. The Phase 2 plan will cover keyword research, on-page rewrites, internal linking, Core Web Vitals work, the English diaspora landing page, and content gap analysis. The Phase 3 plan will cover the content calendar cadence, local citations, the reputation flow, the Google Ads launch (budget-permitting), and the monthly reporting setup.
