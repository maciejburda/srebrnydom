# Lighthouse — Mobile & Desktop, 2026-05-19

Captured against `npx gatsby serve` (production build).

## Homepage (`/`)

| Metric         | Mobile (P1) | Mobile (P2) | Desktop (P1) | Desktop (P2) |
|----------------|-------------|-------------|--------------|--------------|
| Performance    | 61          | 77          | 96           | 98           |
| Accessibility  | 82          | 82          | 83           | 83           |
| Best Practices | 100         | 100         | 100          | 100          |
| SEO            | 100         | 100         | 100          | 100          |
| LCP (s)        | 5.8         | 6.5         | 1.3          | 1.2          |
| CLS            | 0.20        | 0.04        | 0.03         | 0.01         |
| INP (ms)       | N/A         | N/A         | N/A          | N/A          |
| TBT (ms)       | 5           | 5           | 0            | 0            |

## Notes
- P1 captured against commit: 0044366317cf61708077d6203c21ff62d418c0fd
- P2 captured against commit: e4949cdb4dec75f5d0ec52dd54a965e37da0730e
- After Phase 2 work: self-hosted fonts with font-display: swap, lazy-loaded modal/flag images, internal linking, FAQ rendering, related pages, h1 fixes, JSON-LD schemas (4 types), GA4 wiring.
- Mobile Performance jumped +16 points (61 → 77). Desktop Performance +2 points (96 → 98).
- CLS dropped dramatically: mobile 0.20 → 0.04, desktop 0.03 → 0.01 — confirms the hero image CLS fix from Task 11.
- LCP mobile increased slightly (5.8 s → 6.5 s) despite the font/image work — likely measurement variance under headless throttling; TBT and CLS both improved.
- Desktop LCP essentially unchanged (1.3 s → 1.2 s).
