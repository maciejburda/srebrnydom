# Gallery Year Groups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the `/galeria/` page from one flat grid into year-grouped sections (newest year on top), without changing the lightbox behavior or the underlying GraphQL query.

**Architecture:** All changes live inside `src/components/Gallery.js`. A small `imageYear()` helper maps GraphQL `name` fields to a year via a filename boundary. Images are grouped into `{ year, images }` buckets sorted newest-first, each bucket rendered as its own section with an eyebrow + year heading above a reused grid. The existing flat `images` array still drives the lightbox so arrow-key navigation continues to work across year boundaries.

**Tech Stack:** Gatsby, React (function components + hooks), styled-components, `gatsby-plugin-image`.

**Spec:** `docs/superpowers/specs/2026-05-21-gallery-years-design.md`

---

## File Structure

Only one file is modified. No new files.

- Modify: `src/components/Gallery.js`
  - Add `imageYear()` helper near the top.
  - Add `YearSection`, `YearEyebrow`, `YearHeading` styled components.
  - Replace the single `<Grid>` block in the JSX with a list of year sections.
  - Keep the flat `images` array, `openIndex` state, and lightbox JSX unchanged.

The project has no automated test setup for React components — verification is manual via `gatsby develop` and `gatsby build`. Tasks reflect that.

---

### Task 1: Add the `imageYear()` helper

**Files:**
- Modify: `src/components/Gallery.js`

- [ ] **Step 1: Insert the helper just below the `imageAlt` function (around line 101)**

Open `src/components/Gallery.js`. Find the `imageAlt` helper. Immediately after its closing brace, add:

```js
// Year boundaries are baked into filenames:
// image_a*..image_t* were taken in 2020,
// image_w* onward were taken in 2019.
const imageYear = name => (name >= 'image_w' ? 2019 : 2020)
```

- [ ] **Step 2: Sanity check the boundary in a Node REPL**

Run:

```bash
node -e "
const f = n => (n >= 'image_w' ? 2019 : 2020);
console.log('a1   ->', f('image_a1'));
console.log('t20  ->', f('image_t20'));
console.log('w24  ->', f('image_w24'));
console.log('x23  ->', f('image_x23'));
"
```

Expected output:

```
a1   -> 2020
t20  -> 2020
w24  -> 2019
x23  -> 2019
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Gallery.js
git commit -m "Add imageYear helper to Gallery component"
```

---

### Task 2: Add styled components for year sections

**Files:**
- Modify: `src/components/Gallery.js`

- [ ] **Step 1: Add three new styled components below the existing `Grid` styled component**

Find the `const Grid = styled.div\`...\`` block near the top of the file (around lines 6-12). Immediately below it (before `const Tile = ...`), add:

```js
const YearSection = styled.section`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const YearEyebrow = styled.div`
  font-size: 0.78em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: ${colors.textLight};
  margin: 0 0 6px;
`

const YearHeading = styled.h2`
  font-family: 'Nunito', sans-serif;
  font-size: 1.5em;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0 0 0.75rem;
  line-height: 1.15;
`
```

- [ ] **Step 2: Add the `colors` import at the top of the file**

`Gallery.js` does not currently import from `../tokens`. Add this import near the existing imports (after the styled-components import):

```js
import { colors } from '../tokens'
```

- [ ] **Step 3: Verify the file still parses by running gatsby develop**

Run in one terminal:

```bash
npx gatsby develop
```

Wait for `You can now view ... in the browser.` Confirm no compile error from the new imports/styled components. Then `Ctrl-C` to stop.

- [ ] **Step 4: Commit**

```bash
git add src/components/Gallery.js
git commit -m "Add styled components for gallery year sections"
```

---

### Task 3: Group images by year and render year sections

**Files:**
- Modify: `src/components/Gallery.js`

- [ ] **Step 1: Build the grouped list inside the `Gallery` component**

In the `Gallery` function component, find this line (currently around line 126):

```js
const images = data.allFile.nodes.filter(n => n.childImageSharp)
```

Immediately after it, add:

```js
const groups = images
  .reduce((acc, image) => {
    const year = imageYear(image.name)
    const bucket = acc.find(g => g.year === year)
    if (bucket) bucket.images.push(image)
    else acc.push({ year, images: [image] })
    return acc
  }, [])
  .sort((a, b) => b.year - a.year)
```

- [ ] **Step 2: Replace the single `<Grid>` block in the return statement with grouped sections**

Find the JSX block that currently renders the grid (around lines 150-162):

```jsx
<Grid>
  {images.map((image, index) => (
    <Tile
      key={image.id}
      type="button"
      onClick={() => setOpenIndex(index)}
      aria-label={`Pokaż zdjęcie: ${imageAlt(image.name)}`}
    >
      <GatsbyImage image={getImage(image)} alt={imageAlt(image.name)} />
    </Tile>
  ))}
</Grid>
```

Replace it with:

```jsx
{groups.map(group => (
  <YearSection key={group.year}>
    <YearEyebrow>Rok</YearEyebrow>
    <YearHeading>{group.year}</YearHeading>
    <Grid>
      {group.images.map(image => {
        const flatIndex = images.indexOf(image)
        return (
          <Tile
            key={image.id}
            type="button"
            onClick={() => setOpenIndex(flatIndex)}
            aria-label={`Pokaż zdjęcie: ${imageAlt(image.name)}`}
          >
            <GatsbyImage image={getImage(image)} alt={imageAlt(image.name)} />
          </Tile>
        )
      })}
    </Grid>
  </YearSection>
))}
```

Leave the lightbox `<Overlay>` block (`openIndex !== null && ...`) untouched.

- [ ] **Step 3: Start the dev server and visually verify**

Run:

```bash
npx gatsby develop
```

Open `http://localhost:8000/galeria/` and check:

- Two sections render in this order: **2020** on top, then **2019** below.
- 2020 section contains 20 images (a1…t20).
- 2019 section contains 26 images (w24…w48 + x23).
- Each section shows the eyebrow `ROK` above the year heading.
- Hover/lift effect on tiles still works.

Leave the server running for the next step.

- [ ] **Step 4: Verify lightbox navigation across year boundaries**

Still in the browser at `/galeria/`:

1. Click the **last** image of the 2020 section (the `t20` tile).
2. Press **ArrowRight** once.
3. Confirm the lightbox now shows the first 2019 image (`w24`).
4. Press **ArrowLeft** once to go back to `t20`.
5. Click the first 2020 image (`a1`), press **ArrowLeft**.
6. Confirm wrap-around: the last 2019 image (`x23`) is shown.
7. Press **Escape** — modal closes.

If any of these fail, the issue is the `flatIndex` lookup. Re-check that `images` is the flat array (line ~126) and `indexOf` is run against it, not against `group.images`.

Stop the dev server with Ctrl-C.

- [ ] **Step 5: Run a production build to make sure SSR is clean**

Run:

```bash
npx gatsby build
```

Expected: build completes with no errors related to `Gallery.js`. Warnings unrelated to the gallery are acceptable.

- [ ] **Step 6: Commit**

```bash
git add src/components/Gallery.js
git commit -m "Group gallery images into year sections, newest first"
```

---

## Self-Review

Spec coverage:

- Year mapping helper — Task 1.
- Grouping logic and sort — Task 3 step 1.
- `YearSection`, `YearEyebrow`, `YearHeading` styled components — Task 2 step 1.
- Eyebrow text "Rok" and section ordering — Task 3 step 2.
- Flat `images` array preserved for the lightbox; `indexOf` used per tile — Task 3 step 2 and verified in step 4.
- Existing lightbox/overlay JSX untouched — explicit instruction in Task 3 step 2.
- Manual testing (dev + build) — Task 3 steps 3-5.

No placeholders, every code change shows the full code to insert, every command has its expected output or what to look for. Types/names are consistent: `imageYear`, `groups`, `YearSection`, `YearEyebrow`, `YearHeading`, `flatIndex` used the same way across tasks.
