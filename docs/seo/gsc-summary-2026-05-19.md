# Google Search Console summary — Last 3 months (snapshot 2026-05-19)

Raw export: `docs/seo/raw/`

## Headline

| Metric | Value |
|--------|-------|
| Total clicks | ~133/mo (398 over 90 days) |
| Total impressions | ~10,847/mo (32,540 over 90 days) |
| Avg position | ~11.0 (page 1-2) |
| Mobile share | 76% of clicks, 61% of impressions |

## Top pages

| Page | Clicks | Impressions | Avg pos |
|------|--------|-------------|---------|
| /cennik (no trailing slash) | 141 | 18,547 | 8.96 |
| / (https) | 135 | 7,938 | 13.94 |
| / (http — redirect) | 72 | 2,394 | 8.05 |
| /cennik/ (trailing slash) | 21 | 4,201 | 9.62 |
| /montessori/ | 19 | 506 | 7.36 |
| /galeria/ | 16 | 628 | 7.37 |
| /oferta/ | 14 | 792 | 9.64 |
| /kontakt/ | 8 | 545 | 6.65 |
| /o-nas/ | 6 | 371 | 9.07 |
| /patron/ | 1 | 335 | 10.11 |

**Implication:** `/cennik/` and `/` together drive ~84% of all clicks (369 of 438, counting http/https and slash/no-slash variants). Optimization effort that touches those two pages has the highest yield. Note: GSC counts `http://` and trailing-slash vs no-trailing-slash as separate URLs — canonical consolidation should unify these signals.

## Top earning queries

| Query | Clicks | Impressions | Avg pos | Type |
|-------|--------|-------------|---------|------|
| srebrny dom swornegacie | 39 | 103 | 1.67 | Brand |
| prywatne domy opieki - cennik | 12 | 2,337 | 9.56 | Commercial |
| srebrny dom | 9 | 33 | 2.03 | Brand |
| luksusowy dom seniora pomorskie | 6 | 361 | 6.52 | Priority |
| dom seniora pomorskie | 6 | 661 | 10.03 | Priority |
| dom spokojnej starości cena | 4 | 738 | 9.90 | Commercial |
| dom opieki brzeg dolny cennik | 4 | 66 | 4.47 | Commercial |
| dom seniora cennik | 3 | 419 | 9.15 | Commercial |
| dom opieki alwernia cennik | 3 | 56 | 4.09 | Commercial |
| dom seniora | 3 | 151 | 23.00 | Generic |

## Zero-click but ranking — Phase 2 priority list

| Query | Impressions | Avg pos | Implied target page |
|-------|-------------|---------|---------------------|
| ile kosztuje pobyt w domu opieki | 763 | 6.73 | /cennik/ |
| dom spokojnej starości cena | 738 | 9.90 | /cennik/ |
| ile kosztuje dom opieki dla seniora | 808 | 8.95 | /cennik/ |
| ile kosztuje dom opieki | 708 | 7.42 | /cennik/ |
| ile kosztuje dom starców | 686 | 7.36 | /cennik/ |
| dom seniora pomorskie | 661 | 10.03 | / or /oferta/ |
| dom opieki pomorskie | 515 | 13.02 | /oferta/ |
| dom spokojnej starości pomorskie | 414 | 11.89 | /oferta/ |
| dom seniora cennik | 419 | 9.15 | /cennik/ |
| prywatny dom opieki pomorskie | 337 | 12.21 | /oferta/ |
| dom spokojnej starości kaszuby | 221 | 12.52 | /oferta/ |
| dom starców cennik | 218 | 7.89 | /cennik/ |

**Note:** The top 5 "ile kosztuje…" queries total 3,703 impressions at avg position 7–9 with zero clicks — these are the highest-leverage CTR targets for `/cennik/` rewrites (Task 4).

## Geography

| Country | Clicks | Impressions | Implication |
|---------|--------|-------------|-------------|
| Poland | 357 | 29,568 | Core market, 90% of clicks |
| Germany | 18 | 1,011 | Largest diaspora segment — EN/DE page candidate |
| United Kingdom | 8 | 344 | Diaspora |
| United States | 1 | 355 | Diaspora |
| Netherlands | 2 | 108 | Diaspora |
| Ireland | 2 | 66 | Diaspora |
| Vietnam | 1 | 113 | Unclear — possibly Polish diaspora in VN |

**Implication:** EN landing page (Task 14) is justified — total non-PL impressions ~2,972 in 3 months (~990/mo). Germany alone accounts for 1,011 impressions and 18 clicks, making it the primary non-PL market.

## Devices

| Device | Clicks | Impressions | CTR | Avg pos |
|--------|--------|-------------|-----|---------|
| Mobile | 304 | 19,699 | 1.54% | 7.88 |
| Desktop | 91 | 12,512 | 0.73% | 14.31 |
| Tablet | 3 | 329 | 0.91% | 11.81 |

## Read into the plan

- **Task 2 keyword map:** drive priorities from this data, not abstract intuition. The "ile kosztuje…" cluster (3,703 impressions, 0 clicks, pos 7–9) is the single biggest CTR opportunity.
- **Task 4 on-page rewrite:** `/cennik/`, `/`, `/oferta/`, `/montessori/` get first pass. `/cennik/` alone has 22,748 impressions (two URL variants combined) with 162 clicks — CTR of 0.71% is well below potential.
- **Task 10 (font self-host) + Task 11 (image CLS):** justified by 76% mobile click share and known LCP 5.8s / CLS 0.20 baseline. Mobile CTR (1.54%) is already double desktop (0.73%), meaning any mobile speed gain directly amplifies revenue.
- **Task 14 EN landing page:** justified by diaspora impressions (~2,972 non-PL over 3 months). Germany is the clear primary non-PL market with 1,011 impressions and 18 clicks.
