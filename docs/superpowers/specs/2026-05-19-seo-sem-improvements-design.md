# SEO/SEM Improvements — Design Spec

**Date:** 2026-05-19
**Site:** srebrnydom.pl (Dom Seniora "Srebrny Dom", Swornegacie, pomorskie)
**Status:** Approved design, ready for implementation planning

## Context

Polish-language Gatsby v5 site for a private senior care home in Swornegacie (Kaszuby, Pomeranian Voivodeship). The business is licensed (zezwolenie nr 114, Wojewoda Pomorski), operates ~9 rooms, and runs Montessori-method care. The site currently has solid SEO basics (sitemap plugin, `SEO` component handling title/description/canonical/Open Graph/Twitter Card/hreflang) and the Google Ads gtag installed, but lacks structured data, analytics wiring, and conversion tracking.

The plan is a comprehensive SEO + SEM roadmap, executed by the site owner + Claude with no paid services. Execution is sequenced in three phases so each phase ships standalone value.

## Goals

The plan optimizes for one ultimate business outcome: **qualified enquiries from families** (phone calls, email, contact-form submissions) from the 150 km catchment around Swornegacie, plus Polish diaspora in the UK, Germany, Netherlands, Norway, and Ireland.

### Leading indicators (trackable from Phase 1 onward)

- Organic sessions from Polish-speaking users in the catchment + diaspora countries
- Conversion events: `tel:` click, `mailto:` click, contact-form submit
- Google Business Profile views, direction requests, and calls
- Search Console: impressions, clicks, average position for tracked queries

### Lagging indicators (Phase 3+)

- Enquiries → admissions
- Cost per enquiry once Google Ads spend begins
- Organic share-of-voice versus 3–5 named competitors in pomorskie + kujawsko-pomorskie

## Constraints

- **Execution model:** site owner + Claude, no outside specialists, no paid SEO tools.
- **Tooling:** only free tools — Google Search Console, Google Business Profile, GA4, Google Ads, Google Keyword Planner, Bing Webmaster Tools, Lighthouse, Rich Results Test.
- **Languages:** Polish is the primary language. One single English landing page is in scope; full multilingual site is not.
- **Existing assets accessible:** Google Business Profile (claimed/verified), Search Console (verified), GA4 property (not yet wired to the site). No active Google Ads campaigns; only the gtag is installed (`AW-994571338`).
- **No medical content:** stay within `NursingHome` / `LocalBusiness` schema. No medical-condition or treatment schema to avoid YMYL/medical content risk.

## Plan structure

Three sequential phases. Each phase ships standalone value, so work can pause between phases without leaving the site in a broken state.

```
Phase 1: Measure & quick wins   (1–2 weeks)
   │
   ▼
Phase 2: Foundations            (3–6 weeks)
   │
   ▼
Phase 3: Growth                 (ongoing, quarterly cadence)
```

---

## Phase 1 — Measure & quick wins

**Target duration:** 1–2 weeks
**Goal:** Make every subsequent decision measurable, and ship high-leverage technical SEO improvements.

### 1.1 Analytics & conversion tracking

- Add GA4 measurement ID to the existing `gatsby-plugin-google-gtag` `trackingIds` array (alongside the current `AW-994571338`).
- Wire up event tracking in components for:
  - `tel:` link clicks in header, footer, and contact page
  - `mailto:` link clicks
  - Any contact-form submit
- Fire each event as **both** a GA4 event and a Google Ads conversion event, so the data can drive Smart Bidding once enough conversions accrue (≥30 per type).
- Link GA4 ↔ Google Ads ↔ Search Console in GA4 Admin.

### 1.2 Structured data (JSON-LD)

Extend the existing `SEO` component (`src/components/seo.js`) to emit JSON-LD on the appropriate pages:

- **`NursingHome` / `LocalBusiness`** on all pages: `name`, full `address` (street, postal code, locality, region, country PL), `geo` coordinates, `telephone`, `openingHours`, `image`, `url`, `sameAs` (Facebook, LinkedIn, Instagram, Twitter), `priceRange`, `areaServed`.
- **`Organization`** schema with `logo`, `founder`, `foundingDate` — feeds the Knowledge Panel.
- **`BreadcrumbList`** on blog posts and pages.
- **`Article`** schema on blog posts (in addition to the existing Open Graph tags).
- **`FAQPage`** schema on any page that already has Q&A content. (Phase 2.2 adds FAQ sections to `oferta`, `cennik`, `montessori`; at that point those pages also get `FAQPage` schema. Phase 1 only emits this where Q&A already exists.)

Each emitted schema must validate in Google's Rich Results Test.

### 1.3 robots.txt & sitemap

- Replace the stub `static/robots.txt` (`User-agent: *  Disallow:`) with one that explicitly references the sitemap:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.srebrnydom.pl/sitemap-index.xml
  ```
- Verify `gatsby-plugin-sitemap` output excludes 404 and dev pages (the defaults are correct, but confirm).

### 1.4 Google Business Profile polish

Done by the site owner, not in code:

- Audit GBP — NAP (Name, Address, Phone) must match the website footer exactly: `ul. Jałowcowa 8, 89-608 Swornegacie`, `+48 692 407 428`.
- Verify business category is "Dom opieki" / "Nursing home".
- Add ≥10 high-quality photos: interior, garden, staff, dining, rooms.
- Write a complete "Opis firmy" with the top 3 priority keywords embedded naturally.
- Enable messaging, set hours, add services.
- Establish a process for asking satisfied families for Google reviews (templated message sent after a successful placement, with a deep link to the GBP review form).

### 1.5 On-page SEO audit

- Audit every page in `content/pages/*` — does it have `seoTitle` and `seoContent`? Are they ≤60 and ≤155 characters? Do they contain at least one priority keyword?
- Verify homepage `<title>` length (current: "Dom seniora, opieka, spokojna starość - pomorskie - Srebrny Dom").
- Ensure every image has descriptive alt text — the `Gallery` component needs a sweep.
- `<h1>` audit — exactly one per page, descriptive, includes the page's priority keyword.

### 1.6 Quick technical fixes

- Verify canonical URLs on paginated blog list pages (`/blog/2/`, `/blog/3/`). The current `SEO` component derives canonical from the `path` prop — check the blog list template passes the correct path.
- Ensure the 404 page has `<meta name="robots" content="noindex">`.
- Lighthouse pass on mobile and desktop — capture baseline LCP, CLS, INP scores so Phase 2 has a target.

### Phase 1 exit criteria

- GA4 firing real `tel`, `mailto`, and form-submit events end-to-end.
- All JSON-LD validates in Google's Rich Results Test.
- GBP marked "complete" per Google's checklist; first reviews requested.
- Every page has unique `seoTitle` and `seoContent`.
- Baseline Lighthouse scores recorded.

---

## Phase 2 — Foundations

**Target duration:** 3–6 weeks, after Phase 1 ships
**Goal:** Make the site competitive on the keywords that matter, and lay the technical groundwork that Phase 3's growth work depends on.

### 2.1 Keyword research (Polish + diaspora)

- Seed list from current content: "dom seniora pomorskie", "dom opieki Kaszuby", "luksusowy dom seniora", "opieka nad seniorem Swornegacie", "Montessori dla seniorów", "dom spokojnej starości pomorskie", "prywatny dom opieki Chojnice/Kościerzyna/Bydgoszcz".
- Expand using Search Console queries (Phase 1 data), Google autocomplete, "ludzie pytają też", and 3–5 named competitor sites in pomorskie + kujawsko-pomorskie.
- Categorize by intent:
  - **Informational** — early-funnel blog topics
  - **Commercial-investigative** — "opinie", "ceny", "porównanie"
  - **Transactional** — "dom seniora [miasto]"
- Diaspora variants: Polish queries plus "z zagranicy", "dla emigrantów", "rodzice w Polsce"; English seed list ("Polish nursing home for parents", "elderly care Poland Pomerania").
- **Output:** a keyword map — one priority keyword + 2–3 supporting keywords per page, saved to `docs/seo/keywords.md`.

### 2.2 On-page rewrite using the keyword map

- Rewrite `seoTitle` / `seoContent` for each page (`o-nas`, `cennik`, `oferta`, `galeria`, `montessori`, `patron`, `blog`, `kontakt`) against its mapped keyword.
- Tighten body copy for keyword/synonym density without keyword stuffing — focus on the first 100 words and H2s.
- Each page must have: one `<h1>`, descriptive `<h2>`s, internal links to 2–3 other pages with descriptive anchor text.
- Add an FAQ section to the most relevant pages (`oferta`, `cennik`, `montessori`) — captures long-tail queries and earns `FAQPage` schema slots.

### 2.3 Internal linking & information architecture

- Add contextual links in body copy (not just nav) — blog posts → `/oferta/`, `/o-nas/` → `/montessori/`, etc.
- Add a "Sprawdź też" / related-links section at the bottom of pages.
- Verify breadcrumbs render in the UI AND emit in JSON-LD.

### 2.4 Core Web Vitals & performance pass

- Lighthouse before/after on mobile; target ≥90 Performance and all CWV in the green band.
- Likely wins: AVIF/WebP via `gatsby-plugin-image` for hero images, lazy-load below-fold imagery, audit blocking scripts (gtag is in `<head>` — verify the offline plugin isn't competing), self-host any Google Fonts.

### 2.5 Diaspora hreflang & English landing page

- Create one focused English landing page at `/en/` — **not** a full translation of the site. Frame: "Polish nursing home in Pomerania — Polish-speaking staff, Polish cuisine, EU regulated, video calls for family abroad".
- Wire `hreflang="en"` ↔ `hreflang="pl"` between the homepage and `/en/` using the existing `translations` mechanism in `SEO`.
- Submit both versions in Search Console.

### 2.6 Content gap analysis

- Identify 5–10 high-intent topics competitors rank for but you don't (e.g. "ile kosztuje dom seniora", "kiedy oddać rodzica do domu opieki", "jak wybrać dom opieki").
- These seed Phase 3's content calendar.

### Phase 2 exit criteria

- Search Console shows ranking movement on the priority keyword for each page (movement, not necessarily page 1 yet).
- Lighthouse all green on mobile.
- `/en/` indexed.
- FAQ rich results appearing for `oferta`/`montessori`.

---

## Phase 3 — Growth

**Cadence:** ongoing, quarterly review
**Goal:** Compound organic and paid acquisition over months, with clear reporting.

### 3.1 Content calendar

- 2 blog posts per month, alternating types:
  - 1 **informational/decision-stage** piece sourced from the gap analysis
  - 1 **trust/story** piece — Montessori success, a resident profile (with explicit consent), a day-in-the-life
- Each post: keyword-mapped, `Article` + `FAQPage` schema, internal links to ≥2 service pages, share image, social posts to Facebook, LinkedIn, Instagram, Twitter.
- One post per quarter is expanded into a long-form pillar page.

### 3.2 Local citations & reputation

- Add NAP-consistent listings to: Panorama Firm, pf.pl, Aleo, Yellow Pages PL, regional Pomorskie business directories, niche directories (`domyseniora.pl`, `domyopieki.pl`).
- **Reputation flow:** templated post-placement message (SMS or email) requesting a Google review, with a direct deep link to the GBP review form.
- Respond to **every** review (positive and negative) within 48 hours, in Polish, using the family member's first name when appropriate.

### 3.3 Google Ads launch (when budget is available)

This section is conditional on an actual Ads budget materializing — under the current "no paid services" constraint, it functions as a reference for when that constraint relaxes.

- Single **Search campaign**, manual CPC, two ad groups:
  - "dom seniora pomorskie" + variants (catchment focus)
  - "dom seniora dla rodzica z zagranicy" + English equivalents (diaspora focus)
- Geo: 150 km radius around Swornegacie + Polish-language audiences in UK, DE, NL, NO, IE.
- **Call-only ads** route budget straight to the phone; the Phase 1 conversion events feed Smart Bidding once ≥30 conversions accrue per type.
- Negative keywords: "praca", "zatrudnienie", "DPS", "NFZ", "darmowy".
- Start at 20–30 PLN/day for 2 weeks, evaluate, scale only what converts.

### 3.4 Link building (organic only)

- Local partnerships: senior-care directories, the gmina/Chojnice tourism site, regional senior associations.
- PR: pitch the Montessori-for-seniors angle to regional Pomerania media — unusual hook, newsworthy.
- 1–2 guest posts per quarter on Polish senior-care or family blogs.
- **Forbidden:** paid link networks, link exchanges, anything transactional that Google could flag.

### 3.5 Measurement & reporting

- **Monthly review (30 min):** organic sessions, GBP calls, conversion events, Ads CPL, top 20 ranked keywords. Against a saved Looker Studio dashboard.
- **Quarterly review:** revisit the keyword map and content calendar; decide what to scale, what to cut.

---

## Out of scope (explicit non-goals)

- **Site redesign or rebrand.** The plan adds elements (schema, EN page, blog posts) and tweaks copy only.
- **Paid SEO tools** (Senuto, Ahrefs, Semrush) — excluded per the "no paid services" constraint.
- **Reviews-as-a-service or any form of fake reviews** — Google penalty risk and ethically unacceptable in eldercare.
- **Full multilingual site (DE, EN, …)** — only one targeted EN landing page is in scope.
- **Schema markup for medical conditions or treatments** — kept out to avoid YMYL/medical content risk.
- **Aggressive link-building or outreach campaigns** — only organic local + PR.

## Open questions for implementation

These don't block the spec but should be resolved before/during the implementation plan:

1. Which GA4 measurement ID will be used (need the ID itself from the GA4 admin)?
2. Does the contact page have a form, or only `tel:` / `mailto:` links? (Affects the conversion-events list.)
3. Who owns the GBP review-request template and outreach process — owner or office staff?
4. Is there a budget line item we should reserve for Phase 3.3 Google Ads, even if not active immediately?
