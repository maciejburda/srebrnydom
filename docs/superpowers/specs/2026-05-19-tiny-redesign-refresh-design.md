# Tiny redesign refresh — design

Date: 2026-05-19
Branch: `minor-redesign`

## Goal

Small, conservative visual refresh covering seven concrete items the user identified. Reuse the existing palette and add one secondary accent that's already (informally) present in the footer-bottom strip.

## Tokens (`src/tokens/colors.js`)

Add:

```js
accent: '#f6b3cd', // rgb(246, 179, 205) — already used informally for .footer-bottom
```

Retire dormant yellow as a brand colour:
- Stop using `colors.links` as the inline-link underline in `Content.js`. The box-shadow rule on `& a` is removed.
- Leave `colors.yellow` itself in the file — `colors.backgroundSelection` still references it for text-selection. Don't churn unrelated usages.

The hard-coded `#f6b3cd` literal in `Footer.js` (`.footer-bottom`) is replaced with `${colors.accent}`.

## 1. Active menu indicator

Files: `src/components/header.js`, `src/components/MobileHeader.js`.

Desktop nav (`header.js`):
- `HeaderLink.&.active` no longer applies bold. Instead, a 2px solid `${colors.primary}` underline drawn as a `::after` pseudo-element under the link text.
- Hover on inactive links: optional 2px underline at 40% opacity (or omit hover treatment — leave it as the current default if doing so simplifies the work).

Mobile nav (`MobileHeader.js`, overlay on navy):
- `HeaderLink.&.active` keeps boldness (white text on navy needs the extra weight to read well) AND gets a 2px white underline via `::after`.

## 2. Blog list thumbnails

Files: `src/components/PostsListItem.js`, `src/components/PostsList.js`, plus the three GraphQL queries that feed PostsList — `src/templates/blog-list-template.js`, `src/templates/tags.js`, `src/pages/404.js`.

GraphQL: add `cover { childImageSharp { gatsbyImageData(layout: CONSTRAINED, width: 280, placeholder: BLURRED) } }` to each query's post node.

`PostsList.js`: pass the new `cover` (the gatsbyImageData object) down to `PostsListItem`.

`PostsListItem.js`:
- New layout: CSS grid `grid-template-columns: 140px 1fr; gap: 1.25em; align-items: start`.
- Left column: `<GatsbyImage>` rendering the cover, sized 140×105 (constrained, `object-fit: cover`, rounded 6px).
- Right column: existing title / excerpt / meta block, unchanged structure.
- Below 564px: switch to single column (image full width, ~16:9, then text). `@media (max-width: 564px)` block on the wrapping grid.
- If a post has no cover (defensive): render a light-blue placeholder div the same size.

Pre-existing keep: the `<Post>` border-bottom divider, the `ReadPost` "Przeczytaj Post ›" link, tag list, reading time.

## 3. Pagination bugs

File: `src/components/Pagination.js`.

- Line 96: `"‹ Nowsze posts"` → `"‹ Nowsze posty"` (Polish grammar).
- Line 91: `previousUrl = currentPage === 2 ? '/' : ...` → `previousUrl = currentPage === 2 ? '/blog/' : ...`. Blog page 1 lives at `/blog/` (see `gatsby-node.js:95`), not `/`.

## 4. Content typography

File: `src/components/Content.js`.

Inside `ContentBody`:
- `line-height: 1.6` → `1.65`; add `text-align: left` (replaces the current `text-align: justify`).
- `& > p { margin: 1em 0 0 0; font-size: 1.02em }` — slight font-size bump.
- `& > h2`: keep border-top + padding-top, add `font-weight: 800; line-height: 1.2; font-size: 1.7em`.
- `& > h3`: replace current styling with eyebrow treatment — `font-size: 0.85em; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${colors.textLight}; margin: 2em 0 0.5em`.
- Remove `& a { box-shadow: 0 2px 0 0 ${colors.links}; ... }` block. Keep the hover `filter: brightness(150%)` only if it still looks right with no shadow; otherwise drop the hover too — default link colour is fine.
- Remove the entire `h*:hover .anchor svg` and base `.anchor svg` CSS blocks (paired with item 5 below).

## 5. Drop the anchor-link icon

File: `gatsby-config.js`.

Change the plugin entry on line 57:
```js
{ resolve: 'gatsby-remark-autolink-headers' },
```
to:
```js
{ resolve: 'gatsby-remark-autolink-headers', options: { icon: false } },
```

This keeps the heading `id` slugs (deep links still work) but renders no SVG icon. Pair with removing the now-orphan `.anchor svg` rules from `Content.js` (item 4).

## 6. "Sprawdź też" pills

File: `src/components/RelatedPages.js`.

- `Heading`: keep `h2`, restyle to match Content `h3` eyebrow (small uppercase) so it reads as a section label rather than a heading.
- `List`: flex-wrap with `gap: 0.6em`.
- `Item` → render `<Link>` directly with pill styling:
  - `background: ${colors.primaryLight}; color: ${colors.primary}; padding: 0.5em 1em; border-radius: 999px; font-weight: 600; font-size: 0.92em; text-decoration: none; border: 1px solid transparent;`
  - Hover: `background: #fff; border-color: ${colors.primary};`

## 7. Icons

### Inline SVG set

New file: `src/components/Icons.js`.

Exports small functional components, each returning a `<svg>` with `currentColor` stroke (so callers control colour via CSS). Default size 24×24, accept `size` and other props.

Icons needed (line / outline style, stroke-width 1.7, rounded line caps):
- `MapPin`, `Phone`, `Mail`
- `Clock`, `Tag`
- `ChevronLeft`, `ChevronRight`, `ChevronDown`
- `Facebook`, `Linkedin`, `Twitter`, `Instagram` (brand icons — use simple-icons-style filled paths, single colour)

Source: use Lucide reference paths (MIT) hand-copied — no npm dependency.

### Kontakt page

Files: `content/pages/contact/contact.md` → renamed to `contact.mdx`; new `src/components/ContactInfo.js`.

`ContactInfo.js`:
- Reads from `useSiteMetadata().business` (NIP/REGON not in config — keep those rendered from MDX as plain text or add to config; see "Open question").
- Renders rows of `[32px pink circle with line icon] + [uppercase label] + [bold value]`.
- Rows: Adres (MapPin), Rezerwacja pobytu (Phone), Telefon (Phone), E-mail (Mail), plus a "Praca" row that stays as plain text.

`contact.mdx`:
- Keep frontmatter, title, NIP/REGON block, and the iframe map.
- Replace the inline address/phone/email block with `<ContactInfo />`.

The pink-circle styling lives inside `ContactInfo.js`:
```css
.icon-circle { width: 32px; height: 32px; background: ${colors.accent}; border-radius: 50%; ... }
.icon-circle svg { stroke: ${colors.primary}; width: 16px; height: 16px; }
```

### Footer

File: `src/components/Footer.js`.

- Per-item icon resolved by URL or label:
  - `url.startsWith('tel:')` → `Phone`
  - `url.startsWith('mailto:')` → `Mail`
  - `url` contains `google.com/maps` → `MapPin`
  - `label === 'Facebook'` → `Facebook` brand icon; same for Linkedin/Twitter/Instagram
  - else → no icon (graceful)
- Render icon inline before label: `<span class="footer-icon">{icon}</span> {label}` with small left margin. Icon colour stays `colors.textLightest`.
- Replace `#f6b3cd` literal in `.footer-bottom` with `${colors.accent}`.

### Blog post meta

File: `src/components/PostsListItem.js` (combined with item 2 changes).

- `<Clock size={14} />` before `<ReadingTime ... />`.
- `<Tag size={14} />` before `<TagList ... />`.
- Icons inherit `color: ${colors.textLight}` from the existing `FooterLine`.

### PrevNextPost

File: `src/components/PrevNextPost.js`.

- The current cards show cover + title + excerpt. Add a small icon row at the top: previous card gets `<ChevronLeft /> Poprzedni post`, next card gets `Następny post <ChevronRight />` (right-aligned for the next card).
- Visual: 0.75em uppercase eyebrow label above the title, in `${colors.textLight}`.

### FaqList

File: `src/components/FaqList.js`.

- Each `<Question>` prefixed with a small pink-circle `<ChevronDown />` icon (decorative — list is not interactive). Same circle styling as `ContactInfo` but at 24px size.

## Implementation order (commits)

1. **Tokens + footer accent literal**: add `colors.accent`, replace literal in `Footer.js`.
2. **Pagination bug-fix**: typo + link target.
3. **Anchor icon removal**: `gatsby-config.js` option + `Content.js` CSS cleanup.
4. **Content typography**: remaining `Content.js` changes.
5. **Active menu indicator**: `header.js` + `MobileHeader.js`.
6. **Inline icon set**: new `src/components/Icons.js`.
7. **Blog list thumbnails + post meta icons**: GraphQL + `PostsList.js` + `PostsListItem.js`.
8. **RelatedPages pills**.
9. **PrevNextPost chevrons + FaqList chevron**.
10. **ContactInfo component + contact.mdx**: footer icons live here too.

If any step turns out trivial enough to fold into a neighbour, combine — but keep token additions, the pagination fix, and the icon set as their own commits so they're easy to revert in isolation.

## Open question / followup

- `NIP` and `REGON` are not currently in `siteConfig.business`. Two choices: (a) hard-code them in `ContactInfo.js`, (b) add them to `siteConfig.business`. Default: (b) — they belong with the rest of the business metadata and may be used by JSON-LD in the future. Will add `vatId: '5551232594'` and `regon: '384334284'` to `siteConfig.business`.

## Out of scope

- No new fonts.
- No structural changes to Hero, cookie banner, 404 page beyond inherited typography.
- No changes to existing colour tokens other than adding `accent` and removing the dormant link-shadow usage.
- No changes to MDX content of pages other than Kontakt.
