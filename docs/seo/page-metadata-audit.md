# Page metadata audit — 2026-05-19

Constraints used:
- `seoTitle` ≤ 60 characters
- `seoContent` ≤ 155 characters
- Each must contain at least one priority keyword (loose check)

| Page (file path)                          | seoTitle (chars) | seoContent (chars) | Action       |
|-------------------------------------------|------------------|--------------------|--------------|
| about/about.md                            | 48               | 95                 | OK           |
| contact/contact.md                        | 37               | 63                 | OK           |
| covid/covid.md                            | 52               | 61                 | OK           |
| montessori/montessori.md                  | 46               | 128                | OK           |
| offer-description/offer-desc.md           | 53               | 101                | OK           |
| offer/offer.md                            | 60               | 103                | OK           |
| patron/patron.md                          | 42               | 88                 | OK           |
| terms/terms.md                            | 34               | 75                 | OK           |

## Notes

- **contact/contact.md**: Original `seoContent` ended with a question mark (`?`) instead of a period. Fixed to a declarative sentence.
- **covid/covid.md**: Original `seoTitle` was 68 chars (over limit) and ended with a period rather than `- Srebrny Dom`. Fixed to 52 chars with correct suffix.
- **montessori/montessori.md**: Original `seoTitle` was 58 chars (within limit but ended with a period and lacked the `- Srebrny Dom` suffix). Fixed to 46 chars with correct suffix and priority keyword.
- **offer-description/offer-desc.md**: Original `seoTitle` was 62 chars (over limit) and `seoContent` was 175 chars (over limit). Both rewritten; new content adds priority keyword "Kaszuby".
- **offer/offer.md**: `seoTitle` was exactly 60 chars (OK). `seoContent` was 160 chars (over 155 limit). Rewritten to 103 chars with "dom opieki" and "pomorskim" keywords.
- **patron/patron.md**: Original `seoTitle` was 62 chars (over limit). `seoContent` ended with a question mark. Both fixed; new content naturally includes "Kaszuby" and "dom seniora".
- **terms/terms.md**: `seoContent` had a non-breaking space (`\xa0`) and no terminal period. Rewritten to a proper sentence.
- No duplicate `seoContent` values detected across pages.
- The `covid-19` page slug is noteworthy — it contains a hyphen which is fine but worth remembering when linking.

## FAQ schema check

No pages currently contain FAQ-shaped headings (markdown `## Question?` or `### Question?`).
`FAQPage` JSON-LD schema is correctly deferred to Phase 2.2, which will add FAQ sections to `oferta`, `cennik`, and `montessori`.
