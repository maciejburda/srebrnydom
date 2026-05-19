# Keyword map — 2026-05-19

Data source: `docs/seo/gsc-summary-2026-05-19.md` and `docs/seo/raw/Queries.csv` (Google Search Console 3-month export).

## Page → keyword assignments

### `/` (homepage)

- **Priority:** dom seniora pomorskie (pos 10.03, 661 imp/3mo)
- **Supporting:**
  - luksusowy dom seniora pomorskie (pos 6.52, 361 imp/3mo)
  - domy opieki swornegacie (pos 10.34, 199 imp/3mo)
  - całodobowy dom seniora pomorskie (pos 9.31, 147 imp/3mo)
- **Intent:** transactional (families searching for a private care home in Pomerania)
- **Current pos / target:** ~10 / top 5

---

### `/cennik/`

- **Priority:** prywatne domy opieki - cennik (pos 9.56, 2 337 imp/3mo)
- **Supporting:**
  - ile kosztuje dom opieki dla seniora (pos 8.95, 808 imp/3mo)
  - ile kosztuje pobyt w domu opieki (pos 6.73, 763 imp/3mo)
  - dom spokojnej starości cena (pos 9.90, 738 imp/3mo)
  - dom seniora cennik (pos 9.15, 419 imp/3mo)
- **Intent:** commercial-investigation (price research before contacting)
- **Current pos / target:** ~9–10 / top 5

---

### `/oferta/`

- **Priority:** dom opieki pomorskie (pos 13.02, 515 imp/3mo)
- **Supporting:**
  - dom spokojnej starości pomorskie (pos 11.89, 414 imp/3mo)
  - prywatny dom opieki pomorskie (pos 12.21, 337 imp/3mo)
  - dom spokojnej starości kaszuby (pos 12.52, 221 imp/3mo)
- **Intent:** transactional (regional care-home search, evaluating options)
- **Current pos / target:** ~12–13 / top 7

---

### `/montessori/`

- **Priority:** montessori dla seniorów (pos 8.02, 49 imp/3mo)
- **Supporting:**
  - ćwiczenia montessori dla seniorów (pos 2.18, 17 imp/3mo)
  - metody montessori (pos 38.31, 16 imp/3mo) — low-volume; worth targeting only if blog post created
- **Intent:** informational-differentiator (families researching care philosophy/methodology)
- **Current pos / target:** ~8 / top 5
- **Note:** Low absolute impression volume; the page's main value is trust-building and conversion support, not primary traffic. Position 2.18 for "ćwiczenia montessori dla seniorów" is already very strong — protect it.

---

### `/galeria/`

- **Priority:** (no clear high-impression query) — GSC shows no gallery-specific queries with meaningful impressions; generic "zdjęcia" variants all have ≤8 impressions/3mo
- **Intent:** informational + visual reassurance
- **Note:** Phase 2 does not push this page hard. The page earns 16 clicks at avg pos 7.37, driven by users already in-funnel. Retain page speed and image quality; do not invest in keyword copy rewrites here.

---

### `/o-nas/`

- **Priority:** srebrny dom swornegacie (pos 1.67, 103 imp/3mo) — brand query, already near-perfect
- **Supporting:**
  - srebrny dom (pos 2.03, 33 imp/3mo)
  - dom seniora swornegacie (pos 1.00, 5 imp/3mo)
- **Intent:** brand / navigational
- **Current pos / target:** ~1–2 / **hold** — brand position is already dominant; no rewrite needed
- **Note:** Hold current optimisation. Protect structured data (LocalBusiness schema) so the knowledge panel remains stable.

---

### `/kontakt/`

- **Priority:** srebrny dom swornegacie (pos 1.67, 103 imp/3mo) — shared brand signal; navigational users also land here
- **Supporting:**
  - dom swornegacie (pos 6.86, 36 imp/3mo)
- **Intent:** navigational / brand
- **Current pos / target:** avg pos 6.65 — **hold**
- **Note:** Contact page earns 8 clicks from 545 impressions. Position reflects mixed-intent queries. No copy optimisation required in Phase 2; ensure click-to-call markup and NAP consistency.

---

### `/patron/`

- **Priority:** (no clear high-impression query) — patron-related queries total <5 imp/3mo ("patronka artystów malarzy" pos 38.5, 2 imp; "patron malarzy" pos 95, 1 imp)
- **Intent:** brand / informational (story of the patron saint; trust signal for premium positioning)
- **Current pos / target:** avg pos 10.11 — **hold**
- **Note:** Phase 2 does not target this page for organic growth. Value is brand narrative, not search acquisition.

---

### `/blog/` (listing)

- **Priority:** see individual posts
- **Note:** Per-post keyword assignments are out of scope for Phase 2; covered in Phase 3 content calendar. The blog listing page itself has no significant GSC impression volume. Informational queries such as "demencja starcza", "alzheimer objawy", "jak wybrać dom seniora" are candidate targets for Phase 3 blog articles.

---

### `/en/` (NEW — to be created in Task 14)

- **Priority:** polish nursing home pomerania — **estimated**, not in CSV (no English-language queries appear with meaningful volume in the 3-month export)
- **Supporting:**
  - private care home poland (estimated)
  - senior care pomerania (estimated)
  - luxury care home poland (estimated)
- **Intent:** transactional, diaspora (German-based Polish diaspora is primary — 1 011 impressions / 18 clicks in 3 months; UK and US secondary)
- **Current pos / target:** new page, no current ranking — target top 10 within 3 months of publication
- **Note:** The two English queries that appear in the CSV ("retirement communities near me", pos 5.22, 9 imp; "elderly care home", pos 5.00, 1 imp) suggest Google is already occasionally serving the site to English speakers. These are too generic to use as primary targets but confirm the EN page is worth creating.

---

## Negative keywords (for Phase 3 Google Ads)

Confirm none of the pages target these — they bring the wrong intent:

- `praca dom seniora` / `praca dom opieki` — job seekers, not families; CSV shows 1 impression, 0 clicks — already not targeted
- `DPS` / `dom pomocy społecznej` — public/state sector; different market, different funding model; do not conflate with private offering
- `NFZ dom opieki` / `NFZ refundacja` — publicly funded care; our facility is fully private; appearing for these queries risks wasted ad spend and confused leads
- `darmowy dom opieki` / `bezpłatny dom seniora` — intent incompatible with premium private positioning

---

## Source data observations

- **The "ile kosztuje…" cluster is the single biggest untapped opportunity.** Five query variants ("ile kosztuje pobyt w domu opieki", "ile kosztuje dom opieki dla seniora", "ile kosztuje dom opieki", "ile kosztuje dom starców", "ile kosztuje dom starości cena") total 3 703 impressions over 3 months at avg position 7–9 with near-zero clicks. A transparent pricing page rewrite (Task 4) targeting these queries is the fastest path to incremental click volume.
- **`/cennik/` dominates impressions but wastes them.** The page accumulates 22 748 combined impressions across URL variants (trailing-slash and no-slash) but converts only ~0.71% to clicks — well below what a page-1 result at position 9 should yield. This points to a title/meta-description mismatch with user intent rather than a ranking problem.
- **Regional modifiers have room to move from page 2 to page 1.** "dom opieki pomorskie" (pos 13.02), "dom spokojnej starości pomorskie" (pos 11.89), "prywatny dom opieki pomorskie" (pos 12.21) all sit just off page 1. These are the highest-leverage targets for `/oferta/` on-page edits since modest position gains (from 12→7) at this impression volume (~500–1 000 imp/3mo each) would meaningfully increase clicks.
- **Brand queries are already dominant and stable.** "srebrny dom swornegacie" at pos 1.67 with 37.86% CTR confirms that in-market users who know the brand find it immediately. Brand protection (schema, GBP, canonical URLs) should be maintained but brand queries require no copy investment in Phase 2.
- **Diaspora signal justifies the `/en/` page.** Non-Polish impressions total ~2 972 over 3 months (~990/mo), with Germany alone producing 1 011 impressions and 18 clicks — a CTR (1.78%) already higher than the Polish desktop average. A dedicated EN landing page (Task 14) could capture this traffic with minimal content investment since the competition for English-language Polish care-home queries is low.
