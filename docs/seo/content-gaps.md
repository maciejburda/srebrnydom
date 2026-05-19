# Content gap analysis — 2026-05-19

## Methodology

Cross-reference of (a) zero-click high-impression queries from `docs/seo/gsc-summary-2026-05-19.md`, (b) competitor topic coverage observed by WebFetch on 3–5 sites, (c) existing blog topics in `content/posts/`.

## Our existing content (8 posts)

| Slug | Title | Theme |
|------|-------|-------|
| `invisible-post` | *(placeholder — never published)* | Ghost / GraphQL field filler; not real content |
| `opowiesc-czesc-1` | Opowieść cz. 1 | Narrative fiction — grandmother–grandchild story; no practical care info |
| `dzien-z-montessori` | Dzień z Montessori | Explains Montessori philosophy applied to seniors; supports `/montessori/` |
| `opowiesc-czesc-2` | Opowieść cz. 2 | Continuation of narrative fiction |
| `o-otwartosci` | O otwartości | Essay on openness and acceptance of old age; philosophical/reflective |
| `opowiesc-czesc-3` | Opowieść cz. 3 | Continuation of narrative fiction |
| `o-starosci-myslmy-dobrze` | O starości myślmy dobrze | Essay on positive attitudes toward old age; reflective/philosophical |
| `opowiesc-czesc-4` | Opowieść cz. 4 | Continuation of narrative fiction |

**Summary of coverage:** 4 of 7 real posts are narrative-fiction installments of one story. One post covers Montessori philosophy. Two posts are reflective essays on old age. No post covers pricing, how to choose a care home, what families should prepare, specific health conditions, respite care, regional care context, or practical decision-making. This leaves the vast majority of high-impression informational queries completely unaddressed in the blog.

## Competitors inspected

| Site | Fetch status | Themes observed |
|------|-------------|-----------------|
| `http://www.domyseniora.pl/` | Success | Care facility categories (private homes, DPS, ZOL, sanatoriums, senior apartments); facility search by region; pension/benefits guides ("400+ dla seniora"); social assistance programs; senior diet and health; family inquiry flows for dementia/Alzheimer's/post-stroke; featured Pomorskie facilities |
| `https://domyopieki.pl/` | Success (main + /artykuly/) | Free advisory center for families; in-home caregiver matching; health condition articles (Alzheimer's, Parkinson's, dementia, osteoporosis, diabetes); caregiver career content; rehabilitation equipment; reviews and inspection reports; ageism and senior loneliness; industry events |
| `https://www.villasenior.pl/` | Success | Professional care philosophy; palliative care; rehabilitation and occupational therapy; 1/2/3-person rooms with amenities; own kitchen/meals; garden and outdoor space; proximity to Tri-City; care home licensing details |
| `https://www.medi-system.pl/` | Failed (ECONNREFUSED) | (no fetchable content) |
| `https://senioralna.com.pl/` | Failed (ECONNREFUSED) | (no fetchable content) |
| `https://www.angelus.pl/` | Failed (TLS cert invalid) | (no fetchable content) |

## Topics we don't cover but should

Priority order. Each is a Phase 3 content-calendar candidate.

### Tier 1 — informational, high impressions, clear keyword target

1. **Ile kosztuje pobyt w domu opieki — przejrzysty przewodnik po cenach**
   Justification: The "ile kosztuje…" cluster totals 3,703 impressions over 3 months at avg position 7–9 with near-zero clicks — the single largest CTR opportunity in the GSC export. Both domyseniora.pl and domyopieki.pl provide pricing context and advisory content; we expose only raw price points on `/cennik/` with no informational framing. A dedicated guide post bridging search intent to our transparent pricing would capture this demand and support Task 4's `/cennik/` rewrite.

2. **Jak wybrać dom seniora — na co zwrócić uwagę**
   Justification: domyopieki.pl runs a free "Centrum Doradztwa" advisory service and domyseniora.pl surfaces facility-comparison tools — both signal that families search for decision guidance before committing. The query "dom seniora pomorskie" (661 imp, pos 10.03) and "dom opieki pomorskie" (515 imp, pos 13.02) attract mid-funnel users who are evaluating options, not yet decided. A step-by-step "how to choose" guide with internal links to `/oferta/` and `/cennik/` could accelerate that decision toward our facility.

3. **Opieka wytchnieniowa — czym jest i kiedy z niej skorzystać**
   Justification: Our `/cennik/` page already mentions short-term respite care ("opieka wytchnieniowa, przeznaczona dla rodzin, które potrzebują czasu na urlop") but no blog post or guide explains the concept. The query "dom spokojnej starości cena" (738 imp, pos 9.90) and the broader cost cluster overlap with families researching temporary stays. Neither domyseniora.pl nor domyopieki.pl appears to own this sub-niche specifically for Kaszuby/Pomorskie, giving us a geographic differentiation opportunity.

4. **Co zabrać do domu seniora — lista kontrolna dla rodziny**
   Justification: Observed on domyseniora.pl's family inquiry flow (families researching placements for relatives). No equivalent page exists on our site. This is a bottom-funnel piece: families who are already decided and preparing for admission — exactly the moment we want to capture to confirm the booking. Avg position for "dom seniora" generic queries (~23.00) shows we have room to grow traffic from decision-stage content.

### Tier 2 — trust + differentiation

1. **Dzień z życia pensjonariusza — jak wygląda opieka w Srebrnym Domu**
   Justification: Villa Senior and domyopieki.pl both use video walkthroughs and facility presentations to build trust before first contact. We have a gallery but no narrative "day in the life" content. This supports our Montessori differentiation (already at pos 7.36 on `/montessori/`) and would add a practical, reassurance-focused piece that competitors without a defined care philosophy cannot easily replicate.

2. **Metoda Montessori a demencja — jak podejście sensoryczne wspiera seniorów z zaburzeniami pamięci**
   Justification: domyopieki.pl covers Alzheimer's/dementia in its article list; our existing Montessori content on `/montessori/` and the `dzien-z-montessori` post do not address cognitive decline specifically. The methodology's sensory approach has a documented application to dementia care — a topic both competitors and families researching care for parents with memory loss actively seek. This fills the gap without entering pure YMYL medical territory (it stays grounded in our operational practice).

3. **Srebrny Dom w liczbach — personel, standard opieki i akredytacja**
   Justification: domyseniora.pl and villasenior.pl both prominently display licensing, staff ratios, and accreditation details. Our `/cennik/` mentions "zezwolenie nr 114" in one sentence; no dedicated trust page exists. Families making a high-stakes care decision for a relative compare credentials. An "about our standards" page or post would also reinforce E-E-A-T signals for Google's YMYL evaluation of care-home content.

### Tier 3 — diaspora-specific

1. **Srebrny Dom — luksusowa opieka dla seniorów w Polsce (dla rodzin za granicą)**
   Justification: GSC shows 1,011 impressions and 18 clicks from Germany in 3 months (CTR 1.78% — already higher than domestic desktop). UK and US add another ~700 impressions. This is the primary content seed for Task 14's `/en/` landing page. A Polish-language "bridge" article explaining our offering to diaspora families (before the EN page is live) would serve Polish-speaking family members abroad who research in Polish. Target phrase: "dom seniora dla rodziców zostających w Polsce" and equivalents.

2. **Jak umieścić rodzica w domu opieki z zagranicy — krok po kroku**
   Justification: The diaspora search signal (Germany 1,011 imp, UK 344 imp) strongly suggests families coordinating care remotely. Neither fetched competitor covers this specific scenario in detail. A practical guide covering logistics — power of attorney, CEIDG checks, remote contract signing, video check-ins — would be unique in our space and directly seed `/en/` with linkable, translatable content.

### Out of scope (Phase 2 doesn't act on these)

- Medical-condition-specific content (dementia, Parkinson's care) — YMYL risk, defer to Phase 3 with editorial review. Exception: Tier 2 item #2 above is philosophy-framed, not medical-advice-framed, and is Phase 3 eligible once reviewed.
- Reviews/testimonials format — handled separately via GBP reputation flow.
- Job/career content — negative keyword territory (see `keywords.md` negative list); brings wrong intent.
- DPS/NFZ comparison content — risks conflating our private positioning with state-funded care.

## Phase 2 implication

Task 4 (`/cennik/` on-page rewrite) should front-load the "ile kosztuje…" intent by adding a structured FAQ block drawing directly from Tier 1 items #1 and #3 above — concrete price context plus an explanation of respite vs. long-term care will close the gap between our current 9-position ranking and user click behavior. Task 5 (FAQ frontmatter) on `/oferta/` and `/cennik/` should pull anchor text from the Tier 1 "jak wybrać" and "co zabrać" gap queries, pre-seeding the FAQ schema before the Phase 3 blog posts exist. The Tier 3 diaspora items directly inform Task 14's `/en/` content brief: the key proposition for German-based Polish families is remote-placement logistics and transparent pricing, not just brand introduction.
