# Gallery split by year

## Goal

Split the `/galeria/` page from a single grid into year-grouped sections, with the newest year at the top. No new pages, routes, or data files — purely a presentation change inside `src/components/Gallery.js`.

## Scope

In scope:
- Grouping the existing gallery images into year buckets based on filename.
- Rendering each bucket as its own section with a header above its grid.
- Preserving the existing lightbox/modal navigation across all images.

Out of scope:
- Storing year metadata in image filenames, frontmatter, or any data file.
- Pagination, filtering, or per-year landing pages.
- Changes to image processing, sharp settings, or the GraphQL query shape.

## Source data

Images live in `content/gallery/` and are surfaced via the existing static query in `src/components/Gallery.js`:

```graphql
allFile(
  filter: { sourceInstanceName: { eq: "gallery" } }
  sort: { name: ASC }
)
```

As of writing, there are 46 images:

- `image_a1.jpg` … `image_t20.jpg` — 20 images
- `image_w24.JPG` … `image_x23.jpg` — 26 images

Sort is by `name` (case-insensitive in practice for this dataset since the case differences sit in the extension), giving the alphabetical order shown above.

## Year mapping

Two buckets, fixed by filename boundary:

| Year | Range (inclusive) |
| ---- | ----------------- |
| 2020 | names < `image_w` |
| 2019 | names ≥ `image_w` |

Implemented as a small helper at the top of `Gallery.js`:

```js
// Year boundaries are baked into filenames:
// image_a*..image_t* were taken in 2020,
// image_w* onward were taken in 2019.
const imageYear = name => (name >= 'image_w' ? 2019 : 2020)
```

The helper takes the GraphQL `name` field (no extension). When a future batch is added, extend this helper with one more boundary; nothing else needs to change.

## Grouping

After fetching `images` (filtered to those with `childImageSharp`, as today), build an ordered list of year groups:

```js
const groups = images.reduce((acc, image) => {
  const year = imageYear(image.name)
  const bucket = acc.find(g => g.year === year)
  if (bucket) bucket.images.push(image)
  else acc.push({ year, images: [image] })
  return acc
}, []).sort((a, b) => b.year - a.year)
```

Because the input is already sorted ASC by name and our year mapping is monotonic in name, this yields:

1. `{ year: 2020, images: [a1, b2, …, t20] }`
2. `{ year: 2019, images: [w24, …, x23] }`

The flat `images` array is still kept (in the same order) and used as the source of truth for the lightbox.

## Rendering

Replace the single `<Grid>` with a list of year sections:

```
<YearSections>
  {groups.map(group => (
    <YearSection key={group.year}>
      <YearEyebrow>Rok</YearEyebrow>
      <YearHeading>{group.year}</YearHeading>
      <Grid>
        {group.images.map(image => {
          const flatIndex = images.indexOf(image)
          return <Tile … onClick={() => setOpenIndex(flatIndex)} … />
        })}
      </Grid>
    </YearSection>
  ))}
</YearSections>
```

Each tile's `onClick` uses the image's index in the flat `images` array so existing prev/next lightbox logic keeps working unchanged across year boundaries.

`indexOf` is fine here — 46 images, 2 groups; the linear lookup runs once per render. No optimization needed.

## Styling

New styled components in `Gallery.js`, scoped to the gallery and reusing existing tokens from `src/tokens`:

- `YearSection` — block with `margin-bottom: 2.5rem` (and `0` on the last child) so the rhythm between sections is visible but not excessive. No background; the page already has structure.
- `YearEyebrow` — mirrors the `Eyebrow` in `gallery-template.js`: `font-size: 0.78em; font-weight: 800; text-transform: uppercase; letter-spacing: 0.22em; color: ${colors.textLight}; margin-bottom: 6px;`. Text: `Rok`.
- `YearHeading` — Nunito, similar weight/color to the page `Title` but smaller (around `1.5em`) so it reads as a section heading rather than competing with the page title. `margin: 0 0 0.75rem;`.

Both eyebrow and heading are left-aligned (page title is centered; section headings should align with the grid below them).

Existing `Grid` and `Tile` styles are unchanged.

## Lightbox behaviour

Unchanged from today:

- A single flat `images` array drives `openIndex`, `goPrev`, `goNext`.
- `ArrowLeft` / `ArrowRight` wrap around the entire list, so navigating past the last 2020 image lands on the first 2019 image and vice versa.
- Escape closes; backdrop click closes.

No year label is added inside the modal — keeping the lightbox visually unchanged is intentional.

## Accessibility

- Each `YearSection` uses a real `<h2>` for the year so screen readers can navigate sections.
- `YearEyebrow` is a decorative `<div>`; the heading carries the semantic weight.
- Existing tile `aria-label` (`Pokaż zdjęcie: …`) is unchanged.

## Testing

Manual verification only (consistent with the rest of this Gatsby site, which has no component-test setup):

- `gatsby develop`, open `/galeria/`.
- Confirm two sections render with the right counts (20 for 2020, 26 for 2019), newest on top.
- Click a tile in 2020, arrow-right past the last 2020 image, confirm the lightbox shows the first 2019 image.
- Arrow-left from the first 2020 image; confirm it wraps to the last 2019 image.
- Escape and backdrop click still close.
- Run `gatsby build` to confirm SSR/static generation handles the new component without warnings.

## Risks / non-issues

- **Future years**: adding a 2021 batch means one new line in `imageYear` and nothing else. Acceptable cost.
- **Sort stability**: GraphQL `sort: { name: ASC }` already orders consistently across builds; nothing relies on filesystem order.
- **Empty groups**: not a concern — if a year has no images, it simply doesn't appear in `groups`.
