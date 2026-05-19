# SEO/SEM Phase 2 — Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make srebrnydom.pl competitive on its priority Polish keywords, hit Lighthouse ≥90 mobile, and ship a focused English landing page for the Polish diaspora.

**Architecture:** Three layers — (1) research outputs (keyword map, content-gap doc) that drive everything else, (2) on-page + IA changes against the page MDX and the existing `SEO` component, (3) performance work targeting font self-hosting and image CLS. The English landing page is a single new MDX with hreflang wiring via the existing `translations` mechanism in `SEO`.

**Tech Stack:** Gatsby 5, MDX, styled-components, gatsby-plugin-image (already configured with `withWebp: true`), gatsby-plugin-google-gtag, schema.org JSON-LD via `src/components/seo.js`.

**Pre-existing inputs (already on this branch):**
- Phase 1 outputs: `docs/seo/baseline-lighthouse.md`, `docs/seo/page-metadata-audit.md`, `docs/seo/gbp-checklist.md`
- Search Console export (last 3 months, exported 2026-05-19) extracted to `docs/seo/raw/`:
  - `Queries.csv` (851 query rows)
  - `Pages.csv` (top URLs)
  - `Countries.csv`, `Devices.csv`, `Chart.csv`, `Search appearance.csv`, `Filters.csv`

**Verification model:** Same as Phase 1 — no automated test suite. Verification is `gatsby build` + grep + Rich Results Test + Lighthouse re-measure where relevant.

---

### Task 1: Commit GSC raw export + write a one-pager summary

**Why:** The raw CSVs are useful but unstructured. A short summary doc captures the headline numbers and what they imply for the keyword map (Task 2).

**Files:**
- Already extracted: `docs/seo/raw/*.csv` (7 files)
- Create: `docs/seo/gsc-summary-2026-05-19.md`

- [ ] **Step 1: Verify the raw export is on disk**

Run: `ls docs/seo/raw/*.csv`
Expected: 7 files — Chart.csv, Countries.csv, Devices.csv, Filters.csv, Pages.csv, Queries.csv, "Search appearance.csv".

- [ ] **Step 2: Compute headline stats**

Run:
```bash
echo "--- queries total ---"
awk -F',' 'NR>1 {c+=$2; i+=$3} END {printf "clicks=%d impressions=%d\n", c, i}' docs/seo/raw/Queries.csv
echo "--- pages count ---"
wc -l docs/seo/raw/Pages.csv docs/seo/raw/Queries.csv
echo "--- top 10 queries by clicks ---"
sort -t',' -k2,2 -nr docs/seo/raw/Queries.csv | head -10
echo "--- top 10 queries by impressions ---"
sort -t',' -k3,3 -nr docs/seo/raw/Queries.csv | head -10
echo "--- zero-click queries above 200 impressions (opportunity) ---"
awk -F',' 'NR>1 && $2==0 && $3>200 {print}' docs/seo/raw/Queries.csv | sort -t',' -k3,3 -nr | head -15
echo "--- top countries ---"
head -8 docs/seo/raw/Countries.csv
echo "--- devices ---"
cat docs/seo/raw/Devices.csv
```

Record the relevant numbers — they go in the summary doc.

- [ ] **Step 3: Create `docs/seo/gsc-summary-2026-05-19.md`**

Write the file with this structure (fill in real numbers from Step 2):

```markdown
# Google Search Console summary — Last 3 months (snapshot 2026-05-19)

Raw export: `docs/seo/raw/`

## Headline

| Metric | Value |
|--------|-------|
| Total clicks | ~150/mo |
| Total impressions | ~12k/mo |
| Avg position | ~10 (page 1-2) |
| Mobile share | 76% of clicks, 70% of impressions |

## Top pages

| Page | Clicks | Impressions | Avg pos |
|------|--------|-------------|---------|
| /cennik/ | 162 (combined http+https) | 22,748 | 8.96–9.62 |
| / (homepage) | 207 (combined) | 10,332 | ~12 |
| /montessori/ | 19 | 506 | 7.36 |
| /galeria/ | 16 | 628 | 7.37 |
| /oferta/ | 14 | 792 | 9.64 |
| /kontakt/ | 8 | 545 | 6.65 |
| /o-nas/ | 6 | 371 | 9.07 |
| /patron/ | 1 | 335 | 10.11 |
| /blog/o-starosci-myslmy-dobrze/ | 0 | 108 | 12.41 |
| /blog/o-otwartosci/ | 0 | 66 | 10.08 |

**Implication:** `/cennik/` and `/` together drive ~94% of clicks. Optimization effort that touches those two pages has the highest yield.

## Top earning queries

| Query | Clicks | Impressions | Avg pos | Type |
|-------|--------|-------------|---------|------|
| srebrny dom swornegacie | 39 | 103 | 1.67 | Brand |
| prywatne domy opieki - cennik | 12 | 2,337 | 9.56 | Commercial |
| srebrny dom | 9 | 33 | 2.03 | Brand |
| dom seniora pomorskie | 6 | 661 | 10.03 | **Priority** |
| luksusowy dom seniora pomorskie | 6 | 361 | 6.52 | **Priority** |
| dom spokojnej starości cena | 4 | 738 | 9.90 | Commercial |
| dom seniora cennik | 3 | 419 | 9.15 | Commercial |
| dom seniora | 3 | 151 | 23 | Generic, rank too low |
| ile kosztuje dom opieki | 2 | 708 | 7.42 | Commercial |
| domy seniora pomorskie | 2 | 315 | 13.84 | Priority |

## Zero-click but ranking — Phase 2 priority list

These already rank on pages 1–2 with significant impressions but receive zero clicks. They're the most efficient queries to optimize for next: small position bumps move them into click range.

| Query | Impressions | Avg pos | Implied target page |
|-------|-------------|---------|---------------------|
| ile kosztuje pobyt w domu opieki | 763 | 6.73 | /cennik/ |
| ile kosztuje dom opieki dla seniora | 808 | 8.95 | /cennik/ |
| ile kosztuje dom starców | 686 | 7.36 | /cennik/ |
| dom opieki pomorskie | 515 | 13.02 | / or /oferta/ |
| dom spokojnej starości pomorskie | 414 | 11.89 | / or /oferta/ |
| prywatne domy opieki cennik | 398 | 9.46 | /cennik/ |
| dom spokojnej starości ceny | 398 | 9.90 | /cennik/ |
| ile kosztuje pobyt w domu seniora | 358 | 7.13 | /cennik/ |
| prywatny dom opieki pomorskie | 337 | 12.21 | / |
| domy opieki pomorskie | 302 | 14.33 | / |
| prywatny dom seniora pomorskie | 242 | 11.82 | / |
| dom spokojnej starości kaszuby | 221 | 12.52 | / |

## Geography

| Country | Clicks | Impressions | Implication |
|---------|--------|-------------|-------------|
| Poland | 357 | 29,568 | Primary market — pomorskie focus right |
| Germany | 18 | 1,011 | Diaspora — strongest signal |
| United Kingdom | 8 | 344 | Diaspora |
| Netherlands | 2 | 108 | Diaspora |
| Ireland | 2 | 66 | Diaspora |
| Belgium / Switzerland / Norway | 1 each | 30–52 | Long-tail diaspora |

**Implication:** EN landing page (Task 14) is justified — total non-PL impressions ~3,000 in 3 months.

## Devices

| Device | Clicks | Impressions | Notes |
|--------|--------|-------------|-------|
| Mobile | 304 | 19,699 | 76% of clicks. Mobile Performance 61 is the priority. |
| Desktop | 91 | 12,512 | 23% of clicks. |
| Tablet | 3 | 329 | Marginal. |

## Read into the plan

- Task 2 keyword map: drive priorities from this data, not abstract intuition.
- Task 4 on-page rewrite: `/cennik/`, `/`, `/oferta/`, `/montessori/` get first pass.
- Task 10 (font self-host) + Task 11 (image CLS): justified by mobile share + current LCP 5.8s / CLS 0.20.
- Task 14 EN landing page: justified by diaspora impressions.
```

- [ ] **Step 4: Commit raw export + summary**

```bash
git add docs/seo/raw docs/seo/gsc-summary-2026-05-19.md
git commit -m "Import GSC 3-month export and summary"
```

---

### Task 2: Compile the keyword map

**Why:** Every on-page change in this phase needs an explicit "this page targets this priority keyword." Without the map, Tasks 4–7 become drive-by guesses.

**Files:**
- Create: `docs/seo/keywords.md`

- [ ] **Step 1: Generate the page-to-keyword map**

Read `docs/seo/gsc-summary-2026-05-19.md` for input. For each main page, identify:
- One priority keyword (the highest-impression query that targets that page's intent)
- 2-3 supporting keywords (variants)
- Intent: `informational` / `commercial-investigative` / `transactional` / `brand`
- Current rank (from Queries.csv, average position of the priority query)
- Target rank (where you'd want to be — usually top 5 if currently 6-15, or top 3 if currently 4-6)

- [ ] **Step 2: Create `docs/seo/keywords.md`**

Use this exact structure, filled with real keywords mapped to real pages:

```markdown
# Keyword map — 2026-05-19

Data source: `docs/seo/gsc-summary-2026-05-19.md` (Google Search Console 3-month export).

## Page → keyword assignments

### `/` (homepage)
- **Priority:** `dom seniora pomorskie` (pos 10.03, 661 imp/3mo)
- **Supporting:** `luksusowy dom seniora pomorskie` (pos 6.52, 361 imp); `dom opieki pomorskie` (pos 13.02, 515 imp); `dom spokojnej starości kaszuby` (pos 12.52, 221 imp)
- **Intent:** transactional
- **Current pos / target:** ~10 / top 5

### `/cennik/`
- **Priority:** `dom seniora cennik` (pos 9.15, 419 imp/3mo)
- **Supporting:** `ile kosztuje pobyt w domu opieki` (pos 6.73, 763 imp — zero-click goldmine); `dom spokojnej starości cena` (pos 9.90, 738 imp); `prywatne domy opieki cennik` (pos 9.46, 398 imp)
- **Intent:** commercial-investigative (price comparison)
- **Current pos / target:** ~9 / top 3

### `/oferta/`
- **Priority:** `prywatny dom opieki pomorskie` (pos 12.21, 337 imp/3mo)
- **Supporting:** `dom opieki kaszuby` (pos 12.05, 153 imp); `prywatny dom seniora pomorskie` (pos 11.82, 242 imp)
- **Intent:** transactional / service-comparison
- **Current pos / target:** ~12 / top 5

### `/montessori/`
- **Priority:** `montessori dla seniorów` (pos 8.02, 49 imp/3mo)
- **Supporting:** `metoda montessori dla seniorów`; `dom seniora montessori`
- **Intent:** informational, niche
- **Current pos / target:** ~8 / top 3

### `/galeria/`
- **Priority:** (no clear high-impression query)
- **Supporting:** `dom seniora zdjęcia`; `dom opieki kaszuby zdjęcia`
- **Intent:** informational + visual reassurance
- **Current pos / target:** Phase 2 doesn't push this page hard.

### `/o-nas/`
- **Priority:** `srebrny dom swornegacie` (pos 1.67, 103 imp/3mo) + brand variants
- **Supporting:** `dom seniora swornegacie`; `o firmie Srebrny Dom`
- **Intent:** brand
- **Current pos / target:** 1.7 / hold

### `/kontakt/`
- **Priority:** brand-driven; navigational
- **Intent:** transactional (call/email)
- **Current pos / target:** hold

### `/patron/`
- **Priority:** brand secondary; `Jan Kosno`
- **Intent:** brand storytelling
- **Current pos / target:** hold

### `/blog/` (listing)
- **Priority:** N/A — index page
- **Supporting:** Per-post keywords listed in individual post frontmatter (out of scope for Phase 2; covered in Phase 3 content calendar).

### `/en/` (NEW — Task 14)
- **Priority:** `polish nursing home pomerania` (search volume estimated; based on Countries.csv diaspora signal)
- **Supporting:** `polish nursing home for parents`; `elderly care poland kaszuby`
- **Intent:** transactional, diaspora
- **Current pos / target:** new page, target top 10 within 3 months

## Negative keywords (for Phase 3 Google Ads)

Confirm none of the pages target these — they bring the wrong intent:
- `praca dom seniora` / `praca dom opieki` (job seekers, not families)
- `DPS` / `dom pomocy społecznej` (public sector — different market)
- `NFZ dom opieki` (refunded care — we're private)
- `darmowy dom opieki`
- `dom seniora bydgoszcz` / `dom opieki gdańsk` etc. — city names we're NOT in (catchment-wise we serve them but we're not located there; bidding on city-name queries needs care)

## Source data observations

- Top-of-funnel "ile kosztuje X" queries account for ~3,500 impressions across the 3 months with our content positioned 6–12. These are the highest-leverage targets — every one points to `/cennik/`.
- The site already ranks #1 for branded `dom seniora swornegacie` and `srebrny dom swornegacie`. Brand work is done.
- `Kaszuby` variants attract real impressions (~370 across 3 months). Worth emphasizing geographic identity.
- Mobile dominates. Anything that hurts mobile UX hurts conversions disproportionately.
```

- [ ] **Step 3: Commit**

```bash
git add docs/seo/keywords.md
git commit -m "Compile Phase 2 keyword map from GSC data"
```

---

### Task 3: Content gap analysis

**Why:** The keyword map shows what we already touch. The gap analysis surfaces what competitors rank for that we don't — that's the seed list for Phase 3's content calendar.

**Files:**
- Create: `docs/seo/content-gaps.md`

- [ ] **Step 1: Identify 3-5 competitor sites**

Polish-language private senior care homes that target pomorskie / diaspora. Candidates to inspect (Claude can fetch their pages):

- `domyseniora.pl` — directory listing
- `nasze-strony.pl/dom-seniora` (search for actual ones in pomorskie)
- One or two specific private homes in the region — search Google for `"dom seniora" "pomorskie"` and pick the top 3 non-directory results

Use WebFetch to read each competitor's primary pages (homepage + offer + cennik or equivalent). Note their content topics.

- [ ] **Step 2: Identify content topics they cover that we don't**

Cross-reference against existing `content/posts/` (we have 8 blog posts: opowieść series, Montessori dzień, o otwartości, o starości). Identify themes we lack.

Likely candidates from the GSC zero-click data:
- "Jak wybrać dom seniora" (how to choose) — informational, top of funnel
- "Ile kosztuje pobyt w domu opieki" (what does it cost) — already partially served by /cennik/ but a deep blog post can capture more queries
- "Kiedy oddać rodzica do domu opieki" (when to place a parent) — emotional/decisional
- "Różnica między domem opieki a DPS" (private vs. public)
- "Co zabrać do domu seniora" (what to bring) — post-decision logistics
- "Montessori dla osób z demencją" (Montessori specifically for dementia)
- Coverage of Polish diaspora-specific topics for the diaspora landing page support

- [ ] **Step 3: Create `docs/seo/content-gaps.md`**

```markdown
# Content gap analysis — 2026-05-19

## Methodology

Cross-reference of (a) zero-click high-impression queries from `docs/seo/gsc-summary-2026-05-19.md`, (b) competitor topic coverage observed by WebFetch on 3–5 sites, (c) existing blog topics in `content/posts/`.

## Competitors inspected

| Site | Topics observed |
|------|----------------|
| (fill in) | (list themes) |
| (fill in) | (list themes) |
| (fill in) | (list themes) |

## Topics we don't cover but should

Priority order. Each is a Phase 3 content-calendar candidate.

### Tier 1 — informational, high impressions, clear keyword target

1. **"Ile kosztuje pobyt w domu opieki dla seniora?"** — deep blog post supporting `/cennik/`. GSC: 763+808+686+358 = ~2,600 impressions in 3 months across cost queries with zero clicks.
2. **"Jak wybrać dom seniora dla rodzica?"** — decision-stage piece; supports `/` and `/oferta/`. No current ranking, opportunity unknown but high-intent.
3. **"Kiedy oddać rodzica do domu opieki?"** — emotional/decisional. Reduces hesitation.

### Tier 2 — trust + differentiation

4. **"Czym jest Montessori dla seniorów? Praktyczny przewodnik"** — supports `/montessori/`, currently positioned 8.02 with limited content depth.
5. **"Życie codzienne w naszym domu seniora — dzień z mieszkańcem"** (with consent) — resident profile, social proof.
6. **"Jak Srebrny Dom dba o bezpieczeństwo seniorów"** — supports trust, embeds license/credentials.

### Tier 3 — diaspora-specific

7. **"Rodzice w Polsce, dzieci za granicą — jak zapewnić im opiekę"** — supports `/en/`'s Polish-language counterpart angle for families abroad with Polish-speaking parents.

### Out of scope (Phase 2 doesn't act on these)

- Medical-condition-specific content (dementia, Parkinson's care) — YMYL risk, defer to Phase 3 with editorial review.
- Reviews/testimonials format — handled separately via GBP reputation flow.

## Phase 2 implication

The keyword map's `/cennik/` priority pages — and the Tier 1 cost content — should heavily inform Task 4 (on-page rewrite) and Task 5 (FAQ sections). Tier 1 topics also become first-draft titles for the Phase 3 content calendar.
```

- [ ] **Step 4: Commit**

```bash
git add docs/seo/content-gaps.md
git commit -m "Map content gaps against competitor coverage and GSC queries"
```

---

### Task 4: Refine `seoTitle` / `seoContent` against the keyword map

**Why:** Phase 1 fixed length issues and added missing keywords broadly. Now we align each page's `seoTitle`/`seoContent` precisely to the priority keyword in `docs/seo/keywords.md`. This is a content delta, not a metadata overhaul.

**Files:**
- Modify: subset of `content/pages/*/*.md` (only the pages whose priority keyword shifted)
- `src/pages/index.js:117-122` (homepage SEO call passes `title` and `description` inline — review and align)

- [ ] **Step 1: Inventory current vs. target**

For each page in `docs/seo/keywords.md`, compare its **current** `seoTitle`/`seoContent` (and homepage's inline title/description) against the **target** priority keyword. Note which pages need a rewrite.

Expected outcome: most pages have priority keyword already present after Phase 1's rewrite. The pages most likely to need refinement:
- `/cennik/` — current SEO unknown to this plan; verify and likely rewrite to emphasize `ile kosztuje pobyt w domu opieki` / `dom seniora cennik`.
- `/oferta/` — needs `prywatny dom opieki pomorskie` more directly.
- Homepage — `src/pages/index.js` line 119-120 currently uses `"Dom seniora, opieka, spokojna starość - pomorskie - Srebrny Dom"`. Verify against priority keyword `dom seniora pomorskie`.

- [ ] **Step 2: Apply rewrites**

For each flagged page, update the frontmatter `seoTitle` / `seoContent` (or in `src/pages/index.js`, the inline strings passed to SEO).

**Constraints:**
- `seoTitle` ≤ 60 chars, `seoContent` ≤ 155 chars (Phase 1 rule).
- Polish only.
- Include the priority keyword in `seoTitle` exactly (or its closest natural-Polish variant).
- Append `- Srebrny Dom` to titles where it fits.
- Do not touch slug, cover, disqus, body content.

Update `docs/seo/page-metadata-audit.md` with new char counts and `Action: OK (Phase 2 refresh)` for each changed row.

- [ ] **Step 3: Build and verify**

```bash
npx gatsby clean && npx gatsby build
grep -E '<title>|name="description"' public/cennik/index.html
grep -E '<title>|name="description"' public/oferta/index.html
grep -E '<title>|name="description"' public/index.html
```

Expected: each page's `<title>` and `<meta name="description">` now reflect the new copy with the priority keyword.

- [ ] **Step 4: Commit**

```bash
git add content/pages src/pages/index.js docs/seo/page-metadata-audit.md
git commit -m "Align page seoTitle/seoContent with Phase 2 keyword map"
```

---

### Task 5: Add FAQ sections to `oferta`, `cennik`, `montessori`

**Why:** FAQ sections (a) capture long-tail "ile kosztuje", "jak wybrać", "czy macie X" queries, (b) keep visitors on-page (reduce bounce), (c) earn FAQPage JSON-LD schema slots that surface rich snippets in SERPs.

The frontmatter-driven design (added in Task 6) means each MDX page can declare its FAQ once and both render it in the page body AND emit `FAQPage` JSON-LD automatically.

**Files:**
- Modify: `content/pages/cennik/cennik.md`
- Modify: `content/pages/offer/offer.md` (URL slug: `/oferta/`)
- Modify: `content/pages/montessori/montessori.md`

- [ ] **Step 1: Add `faq` frontmatter to each of the three pages**

Each page gets 5-7 Q&A pairs in Polish, tightly aligned with its priority keyword from `docs/seo/keywords.md`. Use this frontmatter shape (YAML list):

```yaml
faq:
  - q: "Ile kosztuje pobyt w domu seniora Srebrny Dom?"
    a: "Cennik aktualizujemy regularnie - aktualne stawki znajdują się powyżej. Cena obejmuje całodobową opiekę, posiłki, opiekę medyczną oraz rehabilitację. Skontaktuj się z nami, aby otrzymać szczegółową wycenę dostosowaną do potrzeb."
  - q: "Co jest wliczone w cenę pobytu?"
    a: "..."
```

Suggested topic clusters per page (adapt as you write):

**`cennik.md`** — cost/payment questions:
- Ile kosztuje miesięczny pobyt?
- Co jest wliczone w cenę?
- Czy są pokoje 1- i 2-osobowe? Czym się różni cena?
- Czy NFZ refunduje pobyt?
- Czy są zniżki dla dłuższego pobytu?
- Jak wygląda umowa i okres wypowiedzenia?

**`offer.md`** (renders at `/oferta/`) — service scope:
- Jakie usługi medyczne oferujecie?
- Czy macie rehabilitację?
- Ile osób przebywa w jednym pokoju?
- Czy można przyjechać z własnymi rzeczami?
- Czy macie program aktywizacji?
- Jakie są godziny odwiedzin?

**`montessori.md`** — method-specific:
- Czym jest Metoda Montessori dla seniorów?
- Czy Montessori sprawdza się przy demencji?
- Jak wygląda dzień pensjonariusza w metodyce Montessori?
- Czy personel jest specjalnie przeszkolony?
- Jakie są efekty Montessori dla osób starszych?

- [ ] **Step 2: Do not add a manual MDX section for the FAQ**

Task 6's page template will render the FAQ from frontmatter automatically (via the `FaqList` component placed below the MDX body). So Task 5 is **frontmatter-only** — no `## Najczęściej zadawane pytania` markdown heading needed in the body. This keeps the FAQ data single-sourced.

- [ ] **Step 3: Verify YAML parses**

Run: `npx gatsby clean && npx gatsby build`

If frontmatter YAML is malformed, the build will fail on MDX processing. Fix any indentation / quoting errors. Note that YAML strings with apostrophes or colons must be quoted.

- [ ] **Step 4: Commit**

```bash
git add content/pages/cennik content/pages/offer content/pages/montessori
git commit -m "Add FAQ frontmatter to cennik, oferta, montessori pages"
```

---

### Task 6: Wire FAQPage JSON-LD schema + render FAQ in the page template

**Why:** Frontmatter from Task 5 is inert without (a) a renderer that displays it on the page, and (b) the FAQPage JSON-LD that earns rich results.

**Files:**
- Modify: `src/components/seo.js` (add `buildFaqSchema` helper + render path)
- Modify: `src/templates/page.js` (read `faq` from query, render a `<FaqList>` below body, pass `faq` to `SEO`)
- Create: `src/components/FaqList.js` (small styled component to render Q&A pairs)

- [ ] **Step 1: Add `FaqList` component**

Create `src/components/FaqList.js`:

```js
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 3em 0 1em;
`

const Heading = styled.h2`
  margin-bottom: 1em;
`

const Item = styled.div`
  margin-bottom: 1.5em;
`

const Question = styled.h3`
  font-size: 1.1em;
  margin-bottom: 0.5em;
`

const Answer = styled.p`
  margin: 0;
  line-height: 1.6;
`

const FaqList = ({ items, heading = 'Najczęściej zadawane pytania' }) => {
  if (!items || items.length === 0) return null
  return (
    <Wrapper>
      <Heading>{heading}</Heading>
      {items.map((item, i) => (
        <Item key={i}>
          <Question>{item.q}</Question>
          <Answer>{item.a}</Answer>
        </Item>
      ))}
    </Wrapper>
  )
}

export default FaqList
```

- [ ] **Step 2: Add `buildFaqSchema` helper to `src/components/seo.js`**

Below `buildArticleSchema`, above `const SEO`, add:

```js
const buildFaqSchema = (faq) => {
  if (!faq || faq.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}
```

- [ ] **Step 3: Accept `faq` prop in SEO and render the script**

In `src/components/seo.js`, add `faq` to the props destructuring:

```js
const {
  isBlogPost,
  path = '',
  lang = 'pl',
  articleDate,
  articleTags,
  noindex = false,
  faq,
} = props
```

Inside the JSX, after the Article block, before `</>`, add:

```jsx
{faq && faq.length > 0 && (
  <script type="application/ld+json">
    {JSON.stringify(buildFaqSchema(faq))}
  </script>
)}
```

- [ ] **Step 4: Wire FAQ through the page template**

In `src/templates/page.js`:

(a) Update the `pageQuery` GraphQL block to include `faq { q a }`:

```graphql
query($slug: String!) {
  page: mdx(frontmatter: { slug: { eq: $slug } }) {
    excerpt
    frontmatter {
      title
      seoTitle
      seoContent
      date(formatString: "MMMM DD, YYYY")
      slug
      disqus
      cover {
        publicURL
      }
      faq {
        q
        a
      }
    }
  }
}
```

(b) Import the `FaqList`:

```js
import FaqList from '../components/FaqList'
```

(c) Render the FAQ inside the Wrapper, after the `<Content>` block:

```jsx
<Wrapper>
  <article>
    <Content date={page.frontmatter.date}>{props.children}</Content>
    <FaqList items={page.frontmatter.faq} />
  </article>
</Wrapper>
```

(d) Pass `faq` to SEO in the `Head` export:

```jsx
export const Head = ({ data }) => {
  const page = data.page
  return (
    <SEO
      title={page.frontmatter.seoTitle}
      description={page.frontmatter.seoContent}
      path={`/${page.frontmatter.slug}/`}
      cover={page.frontmatter.cover && page.frontmatter.cover.publicURL}
      faq={page.frontmatter.faq}
    />
  )
}
```

- [ ] **Step 5: Build and verify**

```bash
npx gatsby clean && npx gatsby build
grep -c '"@type":"FAQPage"' public/cennik/index.html
grep -c '"@type":"FAQPage"' public/oferta/index.html
grep -c '"@type":"FAQPage"' public/montessori/index.html
grep -c '"@type":"FAQPage"' public/o-nas/index.html
```

Expected:
- `cennik` → 1
- `oferta` → 1
- `montessori` → 1
- `o-nas` → 0 (no FAQ frontmatter, no schema)

Open one of the three pages in the dev server (`npx gatsby develop`, `http://localhost:8000/cennik/`) and confirm the FAQ section renders visually below the body content.

- [ ] **Step 6: Validate one FAQPage block**

Extract one FAQPage JSON from the built HTML, paste into `https://validator.schema.org/`. Expected: validates with no errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/FaqList.js src/components/seo.js src/templates/page.js
git commit -m "Render FAQ sections and emit FAQPage JSON-LD"
```

---

### Task 7: Add contextual internal links in page body content

**Why:** Internal links pass topical authority and help Google understand site structure. Currently most cross-page links are confined to header/footer navigation — body content rarely links to other pages. Adding 2-3 contextual links per main page builds an internal link graph.

**Files:**
- Modify: subset of `content/pages/*/*.md` and `content/posts/*/*.md`

- [ ] **Step 1: Plan the link graph**

Sketch out which pages should link to which. Suggested minimum cross-linking:

| From | To | Anchor (Polish) |
|------|-----|------|
| `/o-nas/` | `/oferta/` | "naszej oferty opieki nad seniorami" |
| `/o-nas/` | `/montessori/` | "metodyki Montessori" |
| `/oferta/` | `/cennik/` | "cennika" |
| `/oferta/` | `/montessori/` | "Metoda Montessori" |
| `/montessori/` | `/oferta/` | "nasza oferta opieki" |
| `/cennik/` | `/oferta/` | "naszej oferty" |
| `/cennik/` | `/kontakt/` | "skontaktuj się z nami" |
| `/patron/` | `/o-nas/` | "Srebrnym Domu" |
| `/galeria/` | `/oferta/` | "naszych usług" |
| Each blog post | `/oferta/` OR `/montessori/` | natural contextual anchor |

- [ ] **Step 2: Apply edits**

For each row in the link graph, find a sentence in the source page's body content where the anchor text fits naturally. Add the MDX link inline:

```markdown
... zachęcamy do zapoznania się z [naszej oferty opieki nad seniorami](/oferta/). ...
```

Constraints:
- Anchor text must be naturally Polish, not a raw URL or generic "kliknij tutaj".
- Maximum 3 outbound internal links per page in body content (don't over-link — looks spammy).
- Don't touch blog post chronology if it relies on sequential reading (the `opowiesc-czesc-*` series).
- Keep relative paths (`/oferta/` not full URLs).

- [ ] **Step 3: Build and spot-check**

```bash
npx gatsby clean && npx gatsby build
```

Open one of the modified pages in `gatsby serve` and confirm links render and resolve correctly.

- [ ] **Step 4: Commit**

```bash
git add content/pages content/posts
git commit -m "Add contextual internal links across main pages and blog posts"
```

---

### Task 8: Build "Sprawdź też" related-links component

**Why:** Beyond inline body links, each page benefits from a footer-style "related pages" block. It's a low-effort way to increase pages-per-session and surface complementary content.

**Files:**
- Create: `src/components/RelatedPages.js`
- Modify: `src/templates/page.js` (render `<RelatedPages>` below `FaqList`)
- Modify: `data/siteConfig.js` (add a `relatedPages` config mapping slug → array of {label, url})

- [ ] **Step 1: Add config**

In `data/siteConfig.js`, add a top-level `relatedPages` object (place it after the `business` block, before `headerLinks`):

```js
relatedPages: {
  'o-nas': [
    { label: 'Cennik', url: '/cennik/' },
    { label: 'Oferta', url: '/oferta/' },
    { label: 'Montessori', url: '/montessori/' },
  ],
  'cennik': [
    { label: 'Oferta', url: '/oferta/' },
    { label: 'O nas', url: '/o-nas/' },
    { label: 'Kontakt', url: '/kontakt/' },
  ],
  'oferta': [
    { label: 'Cennik', url: '/cennik/' },
    { label: 'Montessori', url: '/montessori/' },
    { label: 'Galeria', url: '/galeria/' },
  ],
  'montessori': [
    { label: 'Oferta', url: '/oferta/' },
    { label: 'Cennik', url: '/cennik/' },
    { label: 'Galeria', url: '/galeria/' },
  ],
  'galeria': [
    { label: 'Oferta', url: '/oferta/' },
    { label: 'O nas', url: '/o-nas/' },
  ],
  'patron': [
    { label: 'O nas', url: '/o-nas/' },
    { label: 'Montessori', url: '/montessori/' },
  ],
  'kontakt': [
    { label: 'Cennik', url: '/cennik/' },
    { label: 'Oferta', url: '/oferta/' },
  ],
  'covid-19': [
    { label: 'Oferta', url: '/oferta/' },
    { label: 'Kontakt', url: '/kontakt/' },
  ],
},
```

**Do NOT expose this via GraphQL.** GraphQL field names can't contain hyphens, and our slugs (`o-nas`, `covid-19`) collide with that rule. Instead, the `RelatedPages` component (Step 2) imports `siteConfig` directly via `require('../../data/siteConfig')` and does its own lookup. The page template passes the page's `slug` as a prop, and `RelatedPages` resolves the related list from config at render time.

- [ ] **Step 2: Create the component**

Create `src/components/RelatedPages.js`:

```js
import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import config from '../../data/siteConfig'

const Wrapper = styled.section`
  margin: 3em 0 1em;
  padding-top: 1.5em;
  border-top: 1px solid #ececec;
`

const Heading = styled.h2`
  margin-bottom: 0.5em;
  font-size: 1.2em;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`

const Item = styled.li`
  margin: 0;
`

const RelatedPages = ({ slug }) => {
  const items = (config.relatedPages && config.relatedPages[slug]) || []
  if (items.length === 0) return null
  return (
    <Wrapper>
      <Heading>Sprawdź też</Heading>
      <List>
        {items.map(item => (
          <Item key={item.url}>
            <Link to={item.url}>{item.label}</Link>
          </Item>
        ))}
      </List>
    </Wrapper>
  )
}

export default RelatedPages
```

- [ ] **Step 3: Render in the page template**

In `src/templates/page.js`, import and render below the `<FaqList>`:

```js
import RelatedPages from '../components/RelatedPages'
```

```jsx
<Wrapper>
  <article>
    <Content date={page.frontmatter.date}>{props.children}</Content>
    <FaqList items={page.frontmatter.faq} />
    <RelatedPages slug={page.frontmatter.slug} />
  </article>
</Wrapper>
```

- [ ] **Step 4: Build and verify**

```bash
npx gatsby clean && npx gatsby build
grep -c 'Sprawdź też' public/o-nas/index.html
grep -c 'Sprawdź też' public/cennik/index.html
grep -c 'Sprawdź też' public/index.html
```

Expected: `o-nas` and `cennik` → 1, homepage → 0 (homepage is React, not MDX — doesn't render this component; deliberate).

- [ ] **Step 5: Commit**

```bash
git add data/siteConfig.js src/components/RelatedPages.js src/templates/page.js
git commit -m "Add 'Sprawdź też' related-pages component to page template"
```

---

### Task 9: Fix tags template double-h1

**Why:** Phase 1 carry-over. `src/templates/tags.js` renders `Hero` (which emits an `<h1>`) AND `PageTitle = styled.h1` for the "Posts tagged as X" heading. Demote `PageTitle` to `<h2>`.

**Files:**
- Modify: `src/templates/tags.js` (line 11)

- [ ] **Step 1: Apply the change**

In `src/templates/tags.js`, change:

```js
const PageTitle = styled.h1`
```

to:

```js
const PageTitle = styled.h2`
```

That's the entire change.

- [ ] **Step 2: Build and verify**

```bash
npx gatsby clean && npx gatsby build
find public/tags -name index.html | while read f; do
  count=$(grep -oE '<h1[^>]*>' "$f" | wc -l | tr -d ' ')
  echo "$count $f"
done
```

Expected: every tags page reports `1`.

- [ ] **Step 3: Commit**

```bash
git add src/templates/tags.js
git commit -m "Demote tag page heading from h1 to h2"
```

---

### Task 10: Self-host Lato + Nunito (Core Web Vitals — LCP and CLS)

**Why:** Baseline mobile Performance = 61 with LCP 5.8s and CLS 0.20. `gatsby-ssr.js` currently loads Lato + Nunito from `fonts.googleapis.com`. Self-hosted woff2 fonts with `font-display: swap` cut a network round-trip and reduce CLS (no FOUC re-layout when the font swaps).

**Files:**
- Modify: `gatsby-ssr.js` (remove the Google Fonts `<link>`)
- Create: `static/fonts/lato-v24-latin-ext-regular.woff2` and `lato-v24-latin-ext-700.woff2`
- Create: `static/fonts/nunito-v25-latin-ext-regular.woff2` and `nunito-v25-latin-ext-700.woff2`
- Modify: `src/components/Commons.js` (add `@font-face` declarations in the GlobalStyle)

- [ ] **Step 1: Download the woff2 files**

Use `google-webfonts-helper` (a free tool that packages Google Fonts for self-hosting). The exact file names and URLs are accessible at:
- `https://gwfh.mranftl.com/api/fonts/lato?subsets=latin-ext&variants=regular,700&formats=woff2`
- `https://gwfh.mranftl.com/api/fonts/nunito?subsets=latin-ext&variants=regular,700&formats=woff2`

If `gwfh` is unavailable, an alternative: use `curl` to fetch the CSS from `fonts.googleapis.com/css?family=Lato:400,700|Nunito:400,700&display=swap&subset=latin-ext` (with a `User-Agent: Mozilla/5.0` header — Google serves woff2 only to modern browsers), then download the `.woff2` URLs from that CSS.

Save the four files into `static/fonts/`. Use the exact filenames listed above (or whatever the helper gives you — adjust the `@font-face` `src:` paths in Step 3 accordingly).

- [ ] **Step 2: Remove the Google Fonts link from `gatsby-ssr.js`**

Current `gatsby-ssr.js`:

```js
const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('link', {
      key: 'lato-nunito-fonts',
      href:
        'https://fonts.googleapis.com/css?family=Lato:400,700|Nunito:400,700&display=swap',
      rel: 'stylesheet',
    }),
  ])
}
```

Replace the file contents entirely with:

```js
const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  // Preload the most-likely-LCP font weights (regular) so the browser
  // starts fetching them before parsing CSS.
  setHeadComponents([
    React.createElement('link', {
      key: 'preload-lato',
      rel: 'preload',
      href: '/fonts/lato-v24-latin-ext-regular.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    }),
    React.createElement('link', {
      key: 'preload-nunito',
      rel: 'preload',
      href: '/fonts/nunito-v25-latin-ext-regular.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    }),
  ])
}
```

(If the actual filenames differ — e.g., `lato-v25-...` — use those instead.)

- [ ] **Step 3: Add `@font-face` declarations**

Read `src/components/Commons.js`. The `GlobalStyle` styled-component holds global CSS. Add `@font-face` blocks at the top of the GlobalStyle template literal:

```js
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/lato-v24-latin-ext-regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/lato-v24-latin-ext-700.woff2') format('woff2');
}
@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/nunito-v25-latin-ext-regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/nunito-v25-latin-ext-700.woff2') format('woff2');
}
```

If `Commons.js` doesn't currently contain a `GlobalStyle` definition (it should — `layout.js` imports it), find the right global stylesheet location. Worst case: add these `@font-face` blocks to `src/styles/global.css` or equivalent. If no global CSS exists, create `src/styles/fonts.css` and import it in `layout.js`.

- [ ] **Step 4: Verify in dev server**

```bash
npx gatsby clean && npx gatsby develop
```

Open `http://localhost:8000/` in a browser, DevTools → Network → filter on `font`. Confirm:
- The four woff2 files load from `/fonts/...` (not from `fonts.googleapis.com` / `fonts.gstatic.com`).
- No 404s on font requests.
- Text renders with Lato/Nunito (not the system fallback).

- [ ] **Step 5: Commit**

```bash
git add gatsby-ssr.js static/fonts src/components/Commons.js
git commit -m "Self-host Lato and Nunito fonts; remove Google Fonts CDN"
```

---

### Task 11: Add explicit dimensions to Hero images (CLS reduction)

**Why:** Lighthouse mobile CLS = 0.20 — well above the green band (≤0.10). Most likely culprit: hero images that don't declare width/height, causing layout shift when they load. Gatsby Image (via `GatsbyImage` / `gatsby-plugin-image`) typically handles this, but `Hero.js` may render a raw `<img>` or a background-image.

**Files:**
- Inspect: `src/components/Hero.js`
- Possibly modify: `src/components/Hero.js`

- [ ] **Step 1: Inspect the current Hero implementation**

Read `src/components/Hero.js`. Identify how the hero image is rendered:
- If it's a raw `<img src="...">`, add `width` / `height` attributes (or a `aspect-ratio` CSS).
- If it's a CSS `background-image`, ensure the container has a fixed aspect ratio (e.g., `aspect-ratio: 16/9`) so it doesn't grow when the image loads.
- If it's already `<GatsbyImage>` from `gatsby-plugin-image`, dimensions are baked in and CLS is unlikely from here — investigate fonts (Task 10) and other components instead.

- [ ] **Step 2: Apply a minimum fix**

The exact diff depends on Step 1's findings. Common patterns:

If raw `<img>`:
```jsx
<img src={heroImg} alt={title} width="1600" height="900" style={{ maxWidth: '100%', height: 'auto' }} />
```

If CSS background-image without aspect-ratio:
```js
const HeroContainer = styled.div`
  background-image: url(${props => props.heroImg});
  aspect-ratio: 16 / 9;
  ...
`
```

If `<GatsbyImage>`: skip Step 2.

- [ ] **Step 3: Re-measure CLS**

```bash
npx gatsby clean && npx gatsby build
npx gatsby serve  # in another shell
npx lighthouse http://localhost:9000/ --output=json --output-path=./lh.json --quiet --chrome-flags="--headless"
node -e "const r=require('./lh.json'); console.log('CLS=', r.audits['cumulative-layout-shift'].numericValue, 'LCP=', r.audits['largest-contentful-paint'].numericValue/1000, 's')"
rm lh.json
```

Expected: CLS should drop materially. Don't assume — measure.

- [ ] **Step 4: Commit (only if Step 2 made changes)**

```bash
git add src/components/Hero.js
git commit -m "Add explicit dimensions to hero image for CLS"
```

If `<GatsbyImage>` already handled it and you made no code change, skip the commit and report this in your summary.

---

### Task 12: Audit `loading="lazy"` on below-fold images

**Why:** Browser-native lazy loading defers off-screen image loads, improving LCP and reducing initial bytes on mobile. `gatsby-plugin-image` adds this automatically — but raw `<img>` in MDX content or in custom components may not.

**Files:**
- Inspect: any raw `<img>` tags in `content/pages/*/*.md` and `content/posts/*/*.md`
- Modify any found

- [ ] **Step 1: Find raw img tags**

```bash
grep -rn '<img ' content/ src/ | grep -v 'gatsby-plugin-image' | grep -v '.test.' | grep -v '.snap'
```

Note any results that don't already have `loading="lazy"`.

- [ ] **Step 2: Add `loading="lazy"`**

For each found `<img>` (that is below the fold — basically any image not used in a Hero), add `loading="lazy"`. Exception: do NOT add `loading="lazy"` to the LCP image (hero/banner), as that delays its load and hurts LCP.

- [ ] **Step 3: Spot-check**

```bash
npx gatsby clean && npx gatsby build
grep -roE '<img[^>]*loading="lazy"' public | wc -l
```

Expected: positive count.

- [ ] **Step 4: Commit (only if changes made)**

```bash
git add content src
git commit -m "Add loading=lazy to below-fold images"
```

If no changes were needed, skip the commit.

---

### Task 13: Re-measure Lighthouse, compare to Phase 1 baseline

**Why:** Confirm Tasks 10/11/12 moved the needle. Update the baseline doc with the post-Phase-2 column.

**Files:**
- Modify: `docs/seo/baseline-lighthouse.md`

- [ ] **Step 1: Run Lighthouse**

```bash
npx gatsby clean && npx gatsby build
npx gatsby serve  # background
# Wait 3s
npx lighthouse http://localhost:9000/ --preset=desktop --output=json --output-path=./lh-desktop.json --quiet --chrome-flags="--headless"
npx lighthouse http://localhost:9000/ --output=json --output-path=./lh-mobile.json --quiet --chrome-flags="--headless"
# Kill gatsby serve
```

- [ ] **Step 2: Parse scores**

```bash
node -e "
const m = require('./lh-mobile.json');
const d = require('./lh-desktop.json');
const f = (j) => ({
  perf: Math.round(j.categories.performance.score * 100),
  a11y: Math.round(j.categories.accessibility.score * 100),
  bp: Math.round(j.categories['best-practices'].score * 100),
  seo: Math.round(j.categories.seo.score * 100),
  lcp: (j.audits['largest-contentful-paint'].numericValue / 1000).toFixed(1),
  cls: j.audits['cumulative-layout-shift'].numericValue.toFixed(2),
  tbt: Math.round(j.audits['total-blocking-time'].numericValue),
});
console.log('Mobile:', f(m));
console.log('Desktop:', f(d));
"
```

- [ ] **Step 3: Update `docs/seo/baseline-lighthouse.md`**

Add a "Post-Phase-2" column to the existing table:

```markdown
| Metric         | Mobile (P1) | Mobile (P2) | Desktop (P1) | Desktop (P2) |
|----------------|-------------|-------------|--------------|--------------|
| Performance    | 61          | XX          | 96           | XX           |
| ...            | ...         | ...         | ...          | ...          |
```

Fill in real numbers from Step 2.

- [ ] **Step 4: Clean up + commit**

```bash
rm lh-mobile.json lh-desktop.json
git add docs/seo/baseline-lighthouse.md
git commit -m "Re-measure Lighthouse after Phase 2 performance work"
```

---

### Task 14: Create `/en/` landing page for Polish diaspora

**Why:** GSC shows ~3,000 non-PL impressions across 3 months (Germany, UK, Netherlands, Ireland). A single focused EN landing — NOT a full translation — captures families abroad searching in English for Polish-speaking eldercare.

**Files:**
- Create: `content/pages/en/en.md`
- (Possibly) Modify: `src/templates/page.js` to support a non-PL language frontmatter field

- [ ] **Step 1: Decide on the URL path**

The existing page template generates pages at `/${slug}/`. For `/en/`, use `slug: en`. The MDX file lives at `content/pages/en/en.md`.

Verify `gatsby-node.js` creates pages from `content/pages/*` based on slug — read it to confirm. If the template generates pages from MDX `slug:` frontmatter regardless of directory, we're fine. If not, this may need a small `gatsby-node` tweak.

- [ ] **Step 2: Write the EN landing copy**

Create `content/pages/en/en.md`. Frontmatter + body example (use real, polished English copy — this is the page that converts diaspora):

```markdown
---
title: "Polish nursing home in Pomerania"
slug: en
cover: ../offer/offer-cover.png
disqus: false
language: en
seoTitle: "Polish Nursing Home in Pomerania - Srebrny Dom"
seoContent: "Family-run Polish-speaking nursing home in the Kashubian forest. EU-regulated 24-hour care, Polish cuisine, video calls for family abroad."
translations:
  - language: pl
    link: /
    hreflang: pl
---

## Polish-speaking care for your parents — in Poland's most beautiful forest

If your parents are in Poland and you live abroad, finding the right care home from a distance is hard. **Srebrny Dom** is a private, family-run nursing home in Pomerania (northern Poland), specifically designed for families like yours.

### What we offer

- **24-hour care** by Polish-speaking medical and rehabilitation staff
- **EU-regulated** — license no. 114 issued by the Pomeranian Voivode
- **Montessori method** — engagement-based care that helps seniors stay active and connected
- **Polish home cuisine** prepared on-site
- **9 private rooms** with en-suite bathrooms
- **Video calls** with family abroad — we'll set up and assist your parent if needed
- **Kashubian National Park** location — quiet forest, fresh air, near Bory Tucholskie

### Common questions from families abroad

- **Can my parent talk to me in Polish, in their dialect?** Yes — all staff are native Polish speakers, many from the Kashubian region.
- **How do I visit?** We're a 1.5h drive from Gdańsk airport. We can help arrange transport from the airport on arrival.
- **What if my parent needs to fly in from abroad?** We can help with the logistics, including airport pickup and the first-week transition.
- **How do I pay from abroad?** We accept SEPA transfers from EU bank accounts.

### Get in touch

- **Phone (Polish or English):** [+48 692 407 428](tel:+48692407428) — 9:00–17:00 CET
- **Email:** [kontakt@srebrnydom.pl](mailto:kontakt@srebrnydom.pl)
- **Address:** ul. Jałowcowa 8, 89-608 Swornegacie, Poland

[See our offer in Polish →](/oferta/)
```

Notes:
- The `language: en` and `translations: [...]` frontmatter wire hreflang via the existing SEO mechanism (Task 15 verifies this works).
- The page deliberately sits at `/en/` (single-page strategy, not a full site translation).
- The page links back to `/oferta/` (the Polish offer page) — diaspora visitors who want depth can read Polish.

- [ ] **Step 3: Build and verify the page exists**

```bash
npx gatsby clean && npx gatsby build
ls public/en/index.html
grep -E '<title>|name="description"' public/en/index.html
grep -E '<html[^>]*lang' public/en/index.html
```

Expected:
- File exists.
- `<title>` and meta description in English.
- `<html lang="en">` (NOT `lang="pl"`).

- [ ] **Step 4: Commit**

```bash
git add content/pages/en
git commit -m "Add /en/ landing page for Polish diaspora"
```

---

### Task 15: Wire hreflang on homepage ↔ /en/ + add x-default

**Why:** Task 14's EN page declares `translations: [{language: 'pl', link: '/', hreflang: 'pl'}]`, so the EN page emits `<link rel="alternate" hreflang="pl" href="/">`. But the homepage doesn't yet declare its EN counterpart — Google won't link the two unless both sides declare each other.

Also: best practice is to emit `hreflang="x-default"` pointing to one of the language versions (typically the most common). For us, `pl` → x-default makes sense.

**Files:**
- Modify: `src/pages/index.js` (homepage Head export — pass `translations`)
- Modify: `src/components/seo.js` (emit `hreflang="x-default"`)

- [ ] **Step 1: Pass `translations` from homepage SEO**

In `src/pages/index.js`, find the `Head` export:

```jsx
export const Head = () => (
  <SEO
    title="Dom seniora, opieka, spokojna starość - pomorskie - Srebrny Dom"
    description="Nasz luksusowy dom spokojnej starości położony jest na malowniczych Kaszubach w województwie pomorskim. Zapewniamy seniorom profesjonalną i całodobową opiekę."
  />
)
```

Add a `translations` prop:

```jsx
export const Head = () => (
  <SEO
    title="Dom seniora, opieka, spokojna starość - pomorskie - Srebrny Dom"
    description="Nasz luksusowy dom spokojnej starości położony jest na malowniczych Kaszubach w województwie pomorskim. Zapewniamy seniorom profesjonalną i całodobową opiekę."
    translations={[{ language: 'en', link: '/en/', hreflang: 'en' }]}
  />
)
```

- [ ] **Step 2: Emit x-default in `seo.js`**

In `src/components/seo.js`, the existing translations rendering is:

```jsx
{internalTranslations.map(translation => (
  <link
    key={translation.hreflang}
    rel="alternate"
    hrefLang={translation.hreflang}
    href={formatedSiteUrl + withPrefix(translation.link)}
  />
))}
```

Below that block, add an x-default emission only for non-EN pages (so the EN page doesn't also emit x-default pointing to itself):

```jsx
{internalTranslations.length > 0 && lang !== 'en' && (
  <link
    rel="alternate"
    hrefLang="x-default"
    href={formatedSiteUrl + withPrefix(normalizedPath)}
  />
)}
```

This emits `<link rel="alternate" hreflang="x-default" href="<current page URL>">` when the page has translations declared AND the current page is the primary (Polish) version.

- [ ] **Step 3: Build and verify**

```bash
npx gatsby clean && npx gatsby build
grep -oE 'rel="alternate"[^>]*hreflang="[^"]+"[^>]*' public/index.html
grep -oE 'rel="alternate"[^>]*hreflang="[^"]+"[^>]*' public/en/index.html
```

Expected:
- Homepage emits `hreflang="en"` link to `/en/` AND `hreflang="x-default"` link to `/`.
- `/en/` emits `hreflang="pl"` link to `/`. (`/en/` should NOT emit x-default; the x-default belongs on the canonical pl page.)

- [ ] **Step 4: Validate**

Paste the relevant `<head>` markup into `https://technicalseo.com/tools/hreflang/` (free hreflang validator) — should report no errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.js src/components/seo.js
git commit -m "Wire bidirectional hreflang and x-default for /en/ ↔ /"
```

---

### Task 16: Phase 2 exit verification + tag

**Why:** Confirm every Phase 2 commit landed correctly, the build is clean, and we're ready to move into Phase 3.

**Files:**
- Read-only verification

- [ ] **Step 1: Build cleanly**

```bash
npx gatsby clean && npx gatsby build
```

Expected: no fatal errors. Pre-existing `ERROR UNKNOWN` lines are accepted as Phase 1 known issue.

- [ ] **Step 2: Verify each Phase 2 deliverable**

- `docs/seo/gsc-summary-2026-05-19.md` exists.
- `docs/seo/keywords.md` exists.
- `docs/seo/content-gaps.md` exists.
- `docs/seo/page-metadata-audit.md` updated with Phase 2 refresh notes.
- `docs/seo/baseline-lighthouse.md` updated with post-Phase-2 column.
- `grep -c '"@type":"FAQPage"' public/cennik/index.html` → 1
- `grep -c '"@type":"FAQPage"' public/oferta/index.html` → 1
- `grep -c '"@type":"FAQPage"' public/montessori/index.html` → 1
- `ls public/en/index.html` → exists
- `grep -oE 'rel="alternate"[^>]*hreflang="(en|x-default)"' public/index.html | wc -l` → 2 (en + x-default both present)
- `ls static/fonts/*.woff2 | wc -l` → 4
- Tag pages h1 count: every `public/tags/*/index.html` reports `1` h1.

- [ ] **Step 3: Tag the completion commit**

```bash
git tag -a seo-phase-2-complete -m "Phase 2 (Foundations) of the SEO/SEM plan complete"
git log --oneline -1
```

Do NOT push the tag (owner pushes manually).

## After Phase 2

Phase 3 (Growth) is a separate plan, written when Phase 2 ships. Phase 3 covers the content calendar, local citations, the GBP reputation flow, the Google Ads launch (budget-permitting), and monthly reporting cadence.

The keyword map from Task 2 and the content gap analysis from Task 3 directly seed the Phase 3 content calendar.
