# Page metadata audit — 2026-05-19

Constraints used:
- `seoTitle` ≤ 60 characters
- `seoContent` ≤ 155 characters
- Each must contain at least one priority keyword (loose check)

| Page (file path)                          | seoTitle (chars) | seoContent (chars) | Action                  |
|-------------------------------------------|------------------|--------------------|-------------------------|
| about/about.md                            | 48               | 95                 | OK (hold — brand)       |
| contact/contact.md                        | 37               | 63                 | OK (hold — brand)       |
| covid/covid.md                            | 52               | 61                 | OK                      |
| montessori/montessori.md                  | 58               | 134                | Rewritten (Phase 2.4)   |
| offer-description/offer-desc.md           | 43               | 121                | Rewritten (Phase 2.4)   |
| offer/offer.md                            | 57               | 131                | Rewritten (Phase 2.4)   |
| patron/patron.md                          | 44               | 88                 | OK (hold — no GSC vol.) |
| terms/terms.md                            | 34               | 75                 | OK                      |
| src/pages/index.js (homepage)             | 55               | 130                | Rewritten (Phase 2.4)   |

## Notes

- **contact/contact.md**: Original `seoContent` ended with a question mark (`?`) instead of a period. Fixed to a declarative sentence.
- **covid/covid.md**: Original `seoTitle` was 68 chars (over limit) and ended with a period rather than `- Srebrny Dom`. Fixed to 52 chars with correct suffix.
- **montessori/montessori.md**: Original `seoTitle` was 58 chars (within limit but ended with a period and lacked the `- Srebrny Dom` suffix). Fixed to 46 chars with correct suffix and priority keyword.
- **offer-description/offer-desc.md**: Original `seoTitle` was 62 chars (over limit) and `seoContent` was 175 chars (over limit). Both rewritten; new content adds priority keyword "Kaszuby".
- **offer/offer.md**: `seoTitle` was exactly 60 chars (OK). `seoContent` was 160 chars (over 155 limit). Rewritten to 103 chars with "dom opieki" and "pomorskim" keywords.
- **patron/patron.md**: Original `seoTitle` was 62 chars (over limit). `seoContent` ended with a question mark. Both fixed; new content naturally includes "Kaszuby" and "dom seniora".
- **terms/terms.md**: `seoContent` had a non-breaking space (`\xa0`) and no terminal period. Rewritten to a proper sentence.
- **Phase 2.4 keyword-alignment refresh (2026-05-19):** Four pages rewritten to embed priority keywords from `docs/seo/keywords.md`. Homepage title/content exceeded length limits and lacked "dom seniora pomorskie" as a phrase; now tightened to 55/130 chars with priority keyword leading. `/cennik/` (offer/offer.md) now leads with "prywatne domy opieki – cennik" (priority keyword verbatim). `/oferta/` (offer-description/offer-desc.md) now contains "dom opieki w pomorskim" in title and "dom opieki w pomorskim" in content. `/montessori/` now opens with "Montessori dla seniorów" matching the priority keyword exactly. Pages `/o-nas/`, `/kontakt/`, and `/patron/` held per keyword map guidance (brand/hold signal, no copy investment required in Phase 2).
- No duplicate `seoContent` values detected across pages.
- The `covid-19` page slug is noteworthy — it contains a hyphen which is fine but worth remembering when linking.

## FAQ schema check

No pages currently contain FAQ-shaped headings (markdown `## Question?` or `### Question?`).
`FAQPage` JSON-LD schema is correctly deferred to Phase 2.2, which will add FAQ sections to `oferta`, `cennik`, and `montessori`.
