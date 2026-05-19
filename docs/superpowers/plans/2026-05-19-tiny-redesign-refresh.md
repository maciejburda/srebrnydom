# Tiny redesign refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the seven-item visual refresh defined in `docs/superpowers/specs/2026-05-19-tiny-redesign-refresh-design.md` across the existing Gatsby site without introducing new fonts, build deps, or major structural changes.

**Architecture:** Each task touches a small set of files for a single user-visible concern, ends with a commit, and is verified by `npm run develop` (browser hot-reload check) plus a `gatsby build` smoke run at the end. No test framework exists in this repo (`package.json: "test": "echo \"Write tests! ...\""`), so verification is manual / visual + the build.

**Tech Stack:** Gatsby v5, MDX 2, styled-components, gatsby-plugin-image / gatsby-remark-* plugins.

**Branch:** `minor-redesign` (already current). Commits land directly; one PR opens after Task 10.

**Reference spec:** `docs/superpowers/specs/2026-05-19-tiny-redesign-refresh-design.md`. Read it first — every task implements a section of that spec.

---

## File Inventory

**Create:**
- `src/components/Icons.js` — inline SVG icon components (Task 6).
- `src/components/ContactInfo.js` — Kontakt-page icon rows (Task 10).

**Rename:**
- `content/pages/contact/contact.md` → `content/pages/contact/contact.mdx` (Task 10).

**Modify:**
- `src/tokens/colors.js` — add `accent` (Task 1).
- `src/components/Footer.js` — replace pink literal (Task 1) and add icons (Task 10).
- `src/components/Pagination.js` — typo + link bug (Task 2).
- `gatsby-config.js` — autolink-headers `icon: false` (Task 3).
- `src/components/Content.js` — drop anchor CSS, drop yellow link shadow, typography refresh (Tasks 3 + 4).
- `src/components/Commons.js` — drop yellow link shadow on `StyledLink` (Task 4).
- `src/components/header.js` — active menu underline (Task 5).
- `src/components/MobileHeader.js` — active menu underline (Task 5).
- `src/templates/blog-list-template.js` — graphql cover field (Task 7).
- `src/templates/tags.js` — graphql cover field (Task 7).
- `src/pages/404.js` — graphql cover field (Task 7).
- `src/components/PostsList.js` — pass `cover` prop down (Task 7).
- `src/components/PostsListItem.js` — thumbnail + meta icons (Task 7).
- `src/components/RelatedPages.js` — pill styling (Task 8).
- `src/components/PrevNextPost.js` — chevrons + eyebrow (Task 9).
- `src/components/FaqList.js` — chevron icon (Task 9).
- `data/siteConfig.js` — add `vatId` / `regon` to `business` (Task 10).

---

## Verification helpers

Throughout the plan you'll be asked to "boot the dev server and check the page." Use this canonical sequence:

```bash
# In one terminal — leave it running across tasks
lsof -i:8000 -t | xargs -r kill -9 2>/dev/null
npm run develop
```

Once it prints `You can now view gatsby-starter-morning-dew in the browser.`, hit `http://localhost:8000/<page>` in a browser and visually confirm the change. Watch the terminal for any new ESLint warnings — the previous task (`Resolve ESLint warnings…` commit 35954e1) landed it at zero, keep it there.

The final task (Task 11) runs `gatsby build` end-to-end.

---

## Task 1: Add `colors.accent` token and use it in the footer-bottom strip

**Files:**
- Modify: `src/tokens/colors.js`
- Modify: `src/components/Footer.js:82`

- [ ] **Step 1: Add the `accent` token**

Edit `src/tokens/colors.js`. Inside the `colorTokens` object (which already has `textLightest`, `primary`, etc.), add an `accent` line right after `primaryLight`:

```js
const colorTokens = {
  ...colors,
  textLightest: colors.white,
  textLightestHover: colors.grey200,
  textLight: '#57595d',
  primary: '#243e50',
  primaryLight: `#eff5fa`,
  accent: '#f6b3cd',
  text: "#243e50",
  // ...rest unchanged
}
```

- [ ] **Step 2: Replace the hard-coded literal in `Footer.js`**

In `src/components/Footer.js`, the `.footer-bottom` rule currently reads:

```js
  .footer-bottom {
    background-color: #f6b3cd;
    padding: 19px;
  }
```

Change `#f6b3cd` to `${colors.accent}`. The `colors` import already exists at the top of the file (`import { colors, media } from '../tokens'`), so no new import needed.

- [ ] **Step 3: Boot the dev server and verify the footer**

```bash
lsof -i:8000 -t | xargs -r kill -9 2>/dev/null
npm run develop
```

Open `http://localhost:8000/` and scroll to the very bottom. The pink "© SREBRNYDOM.PL 2026 — WSZELKIE PRAWA ZASTRZEŻONE" strip must look identical to before.

- [ ] **Step 4: Commit**

```bash
git add src/tokens/colors.js src/components/Footer.js
git commit -m "$(cat <<'EOF'
Add accent colour token and use it in footer-bottom

Introduces colors.accent (#f6b3cd, rgb 246 179 205) — the pink already
informally present in the footer-bottom strip — as a proper token so the
upcoming icon and FAQ changes can refer to it.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Fix Pagination typo and broken "Nowsze posty" link

**Files:**
- Modify: `src/components/Pagination.js:91,96`

- [ ] **Step 1: Fix the link target and the copy**

In `src/components/Pagination.js`, the current implementation has two bugs:

```js
const previousUrl = currentPage === 2 ? '/' : `/pages/${currentPage - 1}/`
// ...
<PreviousBtn to={previousUrl}>‹ Nowsze posts</PreviousBtn>
```

Change to:

```js
const previousUrl = currentPage === 2 ? '/blog/' : `/pages/${currentPage - 1}/`
// ...
<PreviousBtn to={previousUrl}>‹ Nowsze posty</PreviousBtn>
```

Why `/blog/` and not `/`: blog page 1 is created at path `/blog` in `gatsby-node.js:95` (`path: i === 0 ? '/blog' : '/pages/${i + 1}'`). `/` is the homepage.

- [ ] **Step 2: Verify in the dev server**

```bash
# Dev server should already be running from Task 1; if not, restart it.
```

Visit `http://localhost:8000/pages/2/`. The left-hand pagination button should read "‹ Nowsze posty" and clicking it should land you at `/blog/` (which shows blog page 1), not the homepage.

- [ ] **Step 3: Commit**

```bash
git add src/components/Pagination.js
git commit -m "$(cat <<'EOF'
Fix pagination: 'Nowsze posty' label and link target

Two bugs in one line each: the previous-page label said 'Nowsze posts'
(English plural inside an otherwise-Polish UI), and from page 2 it linked
to '/' (the homepage) instead of '/blog/' (blog page 1). Blog page 1 is
created at /blog in gatsby-node.js.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Drop the autolink-headers icon

**Files:**
- Modify: `gatsby-config.js:57`
- Modify: `src/components/Content.js` (remove `.anchor svg` blocks)

- [ ] **Step 1: Configure the plugin to omit the icon**

In `gatsby-config.js`, change line 57 from:

```js
{ resolve: 'gatsby-remark-autolink-headers' },
```

to:

```js
{ resolve: 'gatsby-remark-autolink-headers', options: { icon: false } },
```

This keeps the slugified `id` on each heading (deep links still work) but stops the plugin from rendering the `<a class="anchor"><svg>…</svg></a>` wrapper.

- [ ] **Step 2: Remove the now-orphan anchor CSS in `Content.js`**

Open `src/components/Content.js`. Delete both of these CSS blocks from the `ContentBody` template literal:

```js
  h1 .anchor svg,
  h2 .anchor svg,
  h3 .anchor svg,
  h4 .anchor svg,
  h5 .anchor svg,
  h6 .anchor svg {
    visibility: hidden;
    margin-left: -16px;
  }

  h1:hover .anchor svg,
  h2:hover .anchor svg,
  h3:hover .anchor svg,
  h4:hover .anchor svg,
  h5:hover .anchor svg,
  h6:hover .anchor svg,
  h1 .anchor:focus svg,
  h2 .anchor:focus svg,
  h3 .anchor:focus svg,
  h4 .anchor:focus svg,
  h5 .anchor:focus svg,
  h6 .anchor:focus svg {
    visibility: visible;
  }
```

Also delete the special-case in the `& a { … }` block:

```js
    &.anchor,
    &.gatsby-resp-image-link {
      box-shadow: none;
    }
```

Replace it with the more focused:

```js
    &.gatsby-resp-image-link {
      box-shadow: none;
    }
```

(The `.gatsby-resp-image-link` carve-out still matters — it suppresses link-styling on responsive image links.)

- [ ] **Step 3: Restart dev server (config change) and verify**

The dev server must restart because `gatsby-config.js` changed:

```bash
lsof -i:8000 -t | xargs -r kill -9 2>/dev/null
npm run develop
```

Visit any blog post (e.g. `http://localhost:8000/blog/dzien-z-montessori/`). Hover over a heading. The little link icon that used to appear to the left of the heading on hover should be gone. Anchor-style URLs (`/blog/dzien-z-montessori/#some-heading-id`) should still scroll to the heading.

- [ ] **Step 4: Commit**

```bash
git add gatsby-config.js src/components/Content.js
git commit -m "$(cat <<'EOF'
Drop the autolink-headers icon

The hover anchor icon left of headings was visually distracting (and
slightly misaligned on some headings). Set icon: false on the plugin so
heading IDs are still produced — deep links keep working — but no SVG is
rendered. Removes the paired .anchor svg CSS that's now dead.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Content typography refresh

**Files:**
- Modify: `src/components/Content.js`
- Modify: `src/components/Commons.js:113-119`

- [ ] **Step 1: Refresh body / h2 / h3 inside `ContentBody`**

In `src/components/Content.js`, update the `ContentBody` styled-component template literal.

Replace the leading rules:

```js
const ContentBody = styled.div`
  line-height: 1.6;
  text-align: justify;

  & > h2 {
    padding-top: 3rem;
    margin-top: 3rem;
    border-top: 1px solid #ececec;
  }

  & > h3 {
    padding-top: 3rem;
  }

  & > p {
    margin: 1em 0 0 0;
  }
```

with:

```js
const ContentBody = styled.div`
  line-height: 1.65;
  text-align: left;

  & > h2 {
    padding-top: 3rem;
    margin-top: 3rem;
    border-top: 1px solid #ececec;
    font-weight: 800;
    line-height: 1.2;
    font-size: 1.7em;
  }

  & > h3 {
    margin-top: 2em;
    margin-bottom: 0.5em;
    font-size: 0.85em;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${colors.textLight};
  }

  & > p {
    margin: 1em 0 0 0;
    font-size: 1.02em;
  }
```

- [ ] **Step 2: Drop the yellow link box-shadow in `Content.js`**

Still in `src/components/Content.js`, the `& a` rule currently reads:

```js
  & a {
    box-shadow: 0 2px 0 0 ${colors.links};

    &:hover {
      filter: brightness(150%);
      box-shadow: none;
    }

    &.gatsby-resp-image-link {
      box-shadow: none;
    }
  }
```

Replace with:

```js
  & a {
    &:hover {
      text-decoration: underline;
    }

    &.gatsby-resp-image-link:hover {
      text-decoration: none;
    }
  }
```

- [ ] **Step 3: Drop the yellow `StyledLink` box-shadow in `Commons.js`**

`src/components/Commons.js:112-119` defines a `StyledLink` with the same yellow underline. Replace:

```js
export const StyledLink = styled(Link)`
  box-shadow: 0 2px 0 0 ${colors.links};

  &:hover {
    filter: brightness(150%);
    box-shadow: none;
  }
`
```

with:

```js
export const StyledLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`
```

- [ ] **Step 4: Verify on the dev server**

```bash
# Dev server still running from Task 3. If you restarted between tasks, re-launch with npm run develop.
```

Visit `http://localhost:8000/o-nas/` (any page that uses `<Content>` / Article). Confirm:
- Body text is left-aligned (no more justify rivers).
- `h2` headings are noticeably heavier and larger.
- `h3` reads as a small uppercase eyebrow above its paragraph.
- Inline `<a>` links no longer have the yellow underline; hover shows a plain underline instead.

- [ ] **Step 5: Commit**

```bash
git add src/components/Content.js src/components/Commons.js
git commit -m "$(cat <<'EOF'
Refresh content typography: eyebrow h3, heavier h2, left-aligned body

Drops the text-align: justify that produced rivers in narrow columns,
bumps h2 weight/size, restyles h3 as a small uppercase eyebrow, and
retires the dormant yellow link box-shadow (colors.links was barely
visible on the live site) in favour of a plain hover underline.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Active menu underline (desktop + mobile)

**Files:**
- Modify: `src/components/header.js:66-72`
- Modify: `src/components/MobileHeader.js:95-101`

- [ ] **Step 1: Replace bold-active with underline on desktop**

In `src/components/header.js`, the current `HeaderLink` is:

```js
const HeaderLink = styled(Link)`
  &.active {
    ${StyledText} {
      font-weight: ${typography.weights.bold};
    }
  }
`
```

Replace with:

```js
const HeaderLink = styled(Link)`
  position: relative;
  padding-bottom: 4px;

  &.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: ${colors.primary};
    border-radius: 2px;
  }
`
```

Note: `colors` is already imported at the top of the file. The `${StyledText}` reference (and thus the `StyledText` import from `./Text`) is no longer used — leave the import alone for now; an unused-import lint warning would have surfaced in Task 0 of the earlier ESLint-fixes commit if it were flagged. If lint complains in the verification step, remove `StyledText` from the import in `header.js`.

- [ ] **Step 2: Underline + bold on mobile**

In `src/components/MobileHeader.js`, the current `HeaderLink` is:

```js
const HeaderLink = styled(Link)`
  &.active {
    ${StyledText} {
      font-weight: ${typography.weights.bold};
    }
  }
`
```

Replace with:

```js
const HeaderLink = styled(Link)`
  position: relative;
  padding-bottom: 4px;

  &.active {
    ${StyledText} {
      font-weight: ${typography.weights.bold};
    }
  }

  &.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: ${colors.textLightest};
    border-radius: 2px;
  }
`
```

`colors` is already imported. Mobile keeps boldness because white-on-navy needs the extra weight to read.

- [ ] **Step 3: Verify on desktop and mobile**

```bash
# Dev server still running.
```

- Desktop: navigate to `http://localhost:8000/oferta/`. "Oferta" in the top nav should show a 2px navy underline beneath the text and no longer be bolded.
- Mobile: open Chrome devtools, toggle device toolbar, choose any narrow viewport. Click the burger, then click "Oferta". After the page loads, re-open the burger menu — "Oferta" should be bold and underlined in white.

- [ ] **Step 4: Commit**

```bash
git add src/components/header.js src/components/MobileHeader.js
git commit -m "$(cat <<'EOF'
Underline the active menu item instead of just bolding it

Bold-only is easy to miss. Adds a 2px underline under the active link in
the desktop nav (navy on light-blue) and under the active link in the
mobile overlay (white on navy, kept bold for contrast).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Create the inline SVG icon set

**Files:**
- Create: `src/components/Icons.js`

- [ ] **Step 1: Write `src/components/Icons.js` with the full icon set**

Create `src/components/Icons.js`:

```js
import React from 'react'

const baseProps = (size = 24, extra = {}) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
  ...extra,
})

const brandProps = (size = 24, extra = {}) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: false,
  ...extra,
})

export const MapPin = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const Phone = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.9.36 1.77.7 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.27a2 2 0 0 1 2.11-.45c.84.34 1.71.57 2.61.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const Mail = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
)

export const Clock = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export const Tag = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

export const ChevronLeft = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

export const ChevronRight = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export const ChevronDown = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export const Facebook = ({ size, ...rest }) => (
  <svg {...brandProps(size, rest)}>
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
  </svg>
)

export const Linkedin = ({ size, ...rest }) => (
  <svg {...brandProps(size, rest)}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export const Twitter = ({ size, ...rest }) => (
  <svg {...brandProps(size, rest)}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export const Instagram = ({ size, ...rest }) => (
  <svg {...brandProps(size, rest)}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)
```

- [ ] **Step 2: Verify the icon module imports cleanly**

```bash
# Dev server still running.
```

In a separate shell, run an interactive sanity check by adding a temporary `<MapPin />` somewhere visible (e.g. inside `<Wrapper>` of `src/pages/index.js`), saving, and confirming the icon renders in the browser. Remove the temporary insertion afterwards. This guards against typos in the SVG paths.

Alternatively, skip the temporary insertion — Task 7 immediately uses two of these icons (`Clock`, `Tag`) in `PostsListItem.js`, so any breakage would surface there.

- [ ] **Step 3: Commit**

```bash
git add src/components/Icons.js
git commit -m "$(cat <<'EOF'
Add inline SVG icon set

Centralised, dependency-free icon module. Line icons (MapPin, Phone,
Mail, Clock, Tag, Chevron*) inherit colour via stroke=currentColor;
brand glyphs (Facebook, Linkedin, Twitter, Instagram) inherit via fill.
Paths sourced from Lucide and Simple Icons.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Blog list thumbnails + post-meta icons

**Files:**
- Modify: `src/templates/blog-list-template.js`
- Modify: `src/templates/tags.js`
- Modify: `src/pages/404.js`
- Modify: `src/components/PostsList.js`
- Modify: `src/components/PostsListItem.js`

- [ ] **Step 1: Add `cover` to the three GraphQL queries**

In `src/templates/blog-list-template.js`, the existing `pageQuery` selects:

```graphql
        node {
          excerpt
          fields {
            timeToRead
          }
          frontmatter {
            title
            tags
            language
            slug
          }
        }
```

Add a `cover` field with `gatsbyImageData` so the image data ships with the page. The full updated `node` block:

```graphql
        node {
          excerpt
          fields {
            timeToRead
          }
          frontmatter {
            title
            tags
            language
            slug
            cover {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 280, placeholder: BLURRED)
              }
            }
          }
        }
```

Make the same change in `src/templates/tags.js` (its `PostsByTag` query) and `src/pages/404.js` (its query, currently `query { posts: allMdx(...) }`).

- [ ] **Step 2: Forward the cover prop in `PostsList.js`**

Update `src/components/PostsList.js`:

```js
import React, { Fragment } from 'react'

import PostsListItem from './PostsListItem'
import useSiteMetadata from '../hooks/use-site-config'

const PostsList = ({ posts }) => {
  const { defaultLang } = useSiteMetadata()

  return (
    <Fragment>
      {posts.map(post => {
        const props = {
          title: post.node.frontmatter.title,
          excerpt: post.node.excerpt,
          slug: post.node.frontmatter.slug,
          timeToRead: post.node.fields && post.node.fields.timeToRead,
          language: post.node.frontmatter.language || defaultLang,
          tags: post.node.frontmatter.tags || [],
          cover: post.node.frontmatter.cover,
        }
        return <PostsListItem key={props.slug} {...props} />
      })}
    </Fragment>
  )
}
export default PostsList
```

- [ ] **Step 3: Rewrite `PostsListItem.js` with thumbnail layout + meta icons**

Replace the body of `src/components/PostsListItem.js` with:

```js
import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Flag from './Flag/Flag'
import TagList from './TagList'
import useSiteMetadata from '../hooks/use-site-config'
import styled from 'styled-components'
import { colors } from '../tokens'
import { Bull, ReadingTime } from './Commons'
import { Clock, Tag } from './Icons'

const Post = styled.article`
  border-bottom: 1px solid rgba(214, 209, 230, 0.5);
  padding-bottom: 1.25rem;

  display: grid;
  grid-template-columns: 140px 1fr;
  grid-template-areas:
    "thumb header"
    "thumb body"
    "thumb footer";
  gap: 1.25em;
  align-items: start;
  padding-top: 1.25rem;

  @media (max-width: 564px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "thumb"
      "header"
      "body"
      "footer";
    gap: 0.75em;
  }
`

const Thumb = styled.div`
  grid-area: thumb;
  width: 140px;
  height: 105px;
  border-radius: 6px;
  overflow: hidden;
  background: ${colors.primaryLight};

  & .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 564px) {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
`

const PostHeader = styled.header`
  grid-area: header;
  padding: 0;
`

const Excerpt = styled.p`
  line-height: 1.45;
  padding-bottom: 0.5em;
  grid-area: body;
  margin: 0;
`

const PostTitleLink = styled(Link)`
  color: ${colors.primary};
  &:hover {
    text-decoration: underline;
  }
`

const FooterArea = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const FooterLine = styled.div`
  color: ${colors.textLight};
  font-size: 0.8em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4em;
`

const MetaIcon = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${colors.textLight};
  margin-right: 0.25em;
`

const ReadPost = styled(Link)`
  display: inline-block;
  font-size: 0.75rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 2;
  color: ${colors.primary};
  padding: 0 0.25em;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
  }
`

const PostsListItem = props => {
  const { title, excerpt, slug, language, tags, timeToRead, cover } = props
  const { defaultLang } = useSiteMetadata()
  const image = cover && cover.childImageSharp && getImage(cover.childImageSharp)

  return (
    <Post>
      <Link to={`/blog/${slug}/`} aria-label={`View ${title} article`}>
        <Thumb>
          {image && <GatsbyImage image={image} alt={title} />}
        </Thumb>
      </Link>

      <PostHeader>
        <h2 style={{ margin: 0 }}>
          <PostTitleLink to={`/blog/${slug}/`}>
            {defaultLang !== language && <Flag language={language} />}
            {title}
          </PostTitleLink>
        </h2>
      </PostHeader>

      <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />

      <FooterArea>
        <FooterLine>
          {timeToRead != null && (
            <>
              <MetaIcon><Clock size={14} /></MetaIcon>
              <ReadingTime min={timeToRead} />
            </>
          )}
          {Array.isArray(tags) && tags.length > 0 && (
            <>
              <Bull />
              <MetaIcon><Tag size={14} /></MetaIcon>
              <TagList tags={tags} />
            </>
          )}
        </FooterLine>
        <ReadPost to={`/blog/${slug}/`} aria-label={`View ${title} article`}>
          Przeczytaj Post ›
        </ReadPost>
      </FooterArea>
    </Post>
  )
}
export default PostsListItem
```

Two things to note:
- The wrapping `<Link>` around `<Thumb>` makes the image clickable to the post.
- If a post somehow has no cover, the `Thumb` div remains and shows the `colors.primaryLight` placeholder background.

- [ ] **Step 4: Verify on the dev server**

```bash
# Restart dev server because the GraphQL schema changed
lsof -i:8000 -t | xargs -r kill -9 2>/dev/null
npm run develop
```

Visit `http://localhost:8000/blog/`. Each post should now have a 140×105 thumbnail on the left and the title/excerpt/meta on the right. The meta line should show a small clock icon before the reading time and a small tag icon before the tag list.

Visit `http://localhost:8000/pages/2/` (and `http://localhost:8000/tagi/<some-tag>/` if any tags exist) to confirm the same layout applies. Visit `http://localhost:8000/no-such-page/` to confirm the 404 page's `RelatedPosts` query still resolves (RelatedPosts is a different component but uses the same posts shape — verify nothing crashes).

Then resize the window narrower than 564px and confirm the layout stacks vertically.

- [ ] **Step 5: Commit**

```bash
git add src/templates/blog-list-template.js src/templates/tags.js src/pages/404.js src/components/PostsList.js src/components/PostsListItem.js
git commit -m "$(cat <<'EOF'
Add cover thumbnails and meta icons to blog post list items

Each post on the blog index, tag pages, and the 404 page's recent-posts
block now shows a 140x105 cover thumbnail to the left of the title and
excerpt, stacking vertically below 564px. The meta line gets a small
clock icon before reading time and a tag icon before the tag list.
GraphQL queries for blog-list, tags, and 404 grow a cover/gatsbyImageData
field.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: "Sprawdź też" pills

**Files:**
- Modify: `src/components/RelatedPages.js`

- [ ] **Step 1: Replace the flat list with pill links**

Replace the body of `src/components/RelatedPages.js` with:

```js
import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { colors } from '../tokens'
import config from '../../data/siteConfig'

const Wrapper = styled.section`
  margin: 3em 0 1em;
  padding-top: 1.5em;
  border-top: 1px solid #ececec;
`

const Heading = styled.h2`
  margin: 0 0 0.9em 0;
  font-size: 0.85em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.textLight};
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6em;
`

const Pill = styled(Link)`
  background: ${colors.primaryLight};
  color: ${colors.primary};
  padding: 0.5em 1em;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.92em;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: #fff;
    border-color: ${colors.primary};
  }
`

const RelatedPages = ({ slug }) => {
  const items = (config.relatedPages && config.relatedPages[slug]) || []
  if (items.length === 0) return null
  return (
    <Wrapper>
      <Heading>Sprawdź też</Heading>
      <List>
        {items.map(item => (
          <li key={item.url}>
            <Pill to={item.url}>{item.label}</Pill>
          </li>
        ))}
      </List>
    </Wrapper>
  )
}

export default RelatedPages
```

- [ ] **Step 2: Verify on a page that uses RelatedPages**

```bash
# Dev server still running.
```

Visit `http://localhost:8000/o-nas/`. Scroll to the bottom of the article. The "Sprawdź też" block should show pill-shaped links on a light-blue background. Hovering should switch the background to white and add a navy border.

Also check `http://localhost:8000/galeria/` (uses RelatedPages too).

- [ ] **Step 3: Commit**

```bash
git add src/components/RelatedPages.js
git commit -m "$(cat <<'EOF'
Restyle 'Sprawdź też' as horizontal pill links

Replaces the flat list with light-blue pill-shaped links that hover to a
white background with a navy outline. The heading is restyled as a small
uppercase eyebrow so it reads as a section label rather than competing
with article h2s.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: PrevNextPost chevrons and FaqList chevron

**Files:**
- Modify: `src/components/PrevNextPost.js`
- Modify: `src/components/FaqList.js`

- [ ] **Step 1: Add chevron eyebrow to `PrevNextPost`**

In `src/components/PrevNextPost.js`, add the imports at the top:

```js
import { ChevronLeft, ChevronRight } from './Icons'
```

Add a new styled-component near the other styled-components in the file:

```js
const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.textLight};
  padding: 0 0 0.5em 0;

  &.next {
    justify-content: flex-end;
  }
`
```

Inside the `articles.map(...)` block, just before `<header>`, insert the eyebrow. The `i === 0` slot is the previous post, `i === 1` is the next post (because `articles` is built from `[previous, next].filter(...)` and there can be 0, 1, or 2 entries — so we use `article.node === next` to decide the direction). Rewrite the relevant chunk like so:

```js
{articles.map((article, i) => {
  const { excerpt } = article.node
  const timeToRead = article.node.fields && article.node.fields.timeToRead
  const {
    tags,
    cover,
    title,
    slug,
    language,
  } = article.node.frontmatter
  const heroImg = (cover && cover.publicURL) || fluid.src
  const isNext = next && article.node === next

  return (
    <Preview key={`prev-next-${i}`}>
      <Link to={`/blog/${slug}/`} aria-label={`View ${title} article`}>
        <PreviewCover style={{ backgroundImage: `url("${heroImg}")` }} />
        <PreviewContent>
          <Eyebrow className={isNext ? 'next' : ''}>
            {isNext ? (
              <>Następny post <ChevronRight size={14} /></>
            ) : (
              <><ChevronLeft size={14} /> Poprzedni post</>
            )}
          </Eyebrow>
          <header>
            <h2>
              {defaultLang !== language && <Flag language={language} />}
              {title}
            </h2>
          </header>
          <section>
            <p>{excerpt}</p>
          </section>
          <footer>
            <ReadingTime min={timeToRead} />
            {Array.isArray(tags) && (
              <>
                <Bull />
                <TagList tags={tags} noLink={true} />
              </>
            )}
          </footer>
        </PreviewContent>
      </Link>
    </Preview>
  )
})}
```

- [ ] **Step 2: Pink-circle chevron next to each FAQ question**

In `src/components/FaqList.js`, replace the existing file with:

```js
import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'
import { ChevronDown } from './Icons'

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
  display: flex;
  align-items: center;
  gap: 0.6em;
`

const QuestionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: ${colors.accent};
  border-radius: 50%;
  color: ${colors.primary};
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
          <Question>
            <QuestionBadge>
              <ChevronDown size={14} />
            </QuestionBadge>
            {item.q}
          </Question>
          <Answer>{item.a}</Answer>
        </Item>
      ))}
    </Wrapper>
  )
}

export default FaqList
```

- [ ] **Step 3: Verify on the dev server**

```bash
# Dev server still running.
```

- Visit any blog post that has a previous/next (e.g. `http://localhost:8000/blog/dzien-z-montessori/`). At the bottom each prev/next card should have a small uppercase "Poprzedni post" / "Następny post" eyebrow with a chevron beside the title.
- Visit `http://localhost:8000/oferta/` (or any page whose markdown frontmatter contains `faq:` entries — `grep -l '^faq:' content/pages/*/*.md` if unsure). Each FAQ question should now have a pink circle with a small chevron-down to its left.

- [ ] **Step 4: Commit**

```bash
git add src/components/PrevNextPost.js src/components/FaqList.js
git commit -m "$(cat <<'EOF'
Add chevrons to PrevNextPost cards and FAQ questions

PrevNextPost gets a small uppercase eyebrow ('Poprzedni post' /
'Następny post') with a chevron on each card. FAQ questions get a
pink-accent circle holding a chevron-down to the left of the text, so
the list reads as a Q&A rather than a wall of bold paragraphs.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Kontakt icon rows + footer icons + siteConfig NIP/REGON

**Files:**
- Modify: `data/siteConfig.js` (add `vatId`, `regon` to `business`)
- Create: `src/components/ContactInfo.js`
- Rename + edit: `content/pages/contact/contact.md` → `content/pages/contact/contact.mdx`
- Modify: `src/components/Footer.js`

- [ ] **Step 1: Add `vatId` and `regon` to `siteConfig.business`**

In `data/siteConfig.js`, locate the `business: { … }` block (starts at line 66). Just after `licenseAuthority: 'Wojewoda Pomorski',`, add:

```js
    vatId: '5551232594',
    regon: '384334284',
```

- [ ] **Step 2: Create `src/components/ContactInfo.js`**

```js
import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'
import useSiteMetadata from '../hooks/use-site-config'
import { MapPin, Phone, Mail } from './Icons'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  margin: 1.2em 0;
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.9em;
  padding: 0.5em 0;
`

const IconCircle = styled.span`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: ${colors.accent};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  margin-top: 2px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1em;
`

const Label = styled.span`
  color: ${colors.textLight};
  font-size: 0.78em;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

const Value = styled.span`
  font-weight: 600;
  line-height: 1.4;
  color: ${colors.primary};

  a { color: inherit; }
  a:hover { text-decoration: underline; }
`

const ContactInfo = () => {
  const { business } = useSiteMetadata()
  const mapsUrl = `https://www.google.com/maps/place/${business.latitude},${business.longitude}`

  return (
    <Wrapper>
      <Row>
        <IconCircle><MapPin size={16} /></IconCircle>
        <Body>
          <Label>Adres</Label>
          <Value>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {business.streetAddress}<br />
              {business.postalCode} {business.addressLocality}
            </a>
          </Value>
        </Body>
      </Row>

      <Row>
        <IconCircle><Phone size={16} /></IconCircle>
        <Body>
          <Label>Rezerwacja pobytu (9:00–17:00)</Label>
          <Value>
            <a href={`tel:${business.telephone}`}>{business.telephone}</a>
          </Value>
        </Body>
      </Row>

      <Row>
        <IconCircle><Phone size={16} /></IconCircle>
        <Body>
          <Label>Telefon do Srebrnego Domu (9:00–19:00)</Label>
          <Value>
            <a href={`tel:${business.secondaryTelephone}`}>{business.secondaryTelephone}</a>
          </Value>
        </Body>
      </Row>

      <Row>
        <IconCircle><Mail size={16} /></IconCircle>
        <Body>
          <Label>E-mail</Label>
          <Value>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </Value>
        </Body>
      </Row>
    </Wrapper>
  )
}

export default ContactInfo
```

- [ ] **Step 3: Convert `contact.md` to `contact.mdx` using the component**

```bash
git mv content/pages/contact/contact.md content/pages/contact/contact.mdx
```

Open the new `content/pages/contact/contact.mdx` and replace its body so it imports and uses `ContactInfo`:

```mdx
---
title: "Kontakt"
slug: kontakt
cover: ./contact-cover.jpg
disqus: false
seoTitle: "Kontakt z domem seniora - Srebrny Dom"
seoContent: "Skontaktuj się z naszym domem seniora w województwie pomorskim."
---

import ContactInfo from '../../../src/components/ContactInfo'

### Usługi opiekuńcze i rehabilitacyjne Srebrny Dom

<br/>

**NIP** 555 12 32 594

**REGON** 384334284

<br/>

<ContactInfo />

<br/>

**Szukasz pracy?**

Poszukujemy opiekunów / opiekunek osób starszych.
Prosimy o przesyłanie CV na nasz adres e-mail lub o kontakt telefoniczny.

### Mapa
<br/>
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9410.103678313948!2d17.4946838!3d53.8690776!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf227301449af310d!2sSrebrny%20Dom%20Us%C5%82ugi%20Rehabilitacyjne%20i%20Opieku%C5%84cze!5e0!3m2!1spl!2spl!4v1623739565013!5m2!1spl!2spl" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
```

The import path goes up four levels because the file lives at `content/pages/contact/`.

- [ ] **Step 4: Add icons to the footer**

In `src/components/Footer.js`, add an import at the top of the file:

```js
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, Instagram } from './Icons'
```

Add an `iconFor` helper inside the `Footer` component (above `FooterItem`):

```js
  const iconFor = item => {
    if (item.url.startsWith('tel:')) return <Phone size={14} />
    if (item.url.startsWith('mailto:')) return <Mail size={14} />
    if (item.url.includes('google.com/maps')) return <MapPin size={14} />
    if (item.label === 'Facebook') return <Facebook size={14} />
    if (item.label === 'LinkedIn') return <Linkedin size={14} />
    if (item.label === 'Twitter') return <Twitter size={14} />
    if (item.label === 'Instagram') return <Instagram size={14} />
    return null
  }
```

Update both branches of `FooterItem` so the icon is rendered before the label:

```js
  const FooterItem = ({ item }) => {
    const icon = iconFor(item)
    if (item.url.startsWith('/')) {
      return (
        <span className="footer-item">
          <Link className="footer-link" to={item.url}>
            {icon && <span className="footer-icon">{icon}</span>}
            {item.label}
          </Link>
        </span>
      )
    }
    return (
      <span className="footer-item">
        <a className="footer-link" href={item.url} target="_blank" rel="noreferrer">
          {icon && <span className="footer-icon">{icon}</span>}
          {item.label}
        </a>
      </span>
    )
  }
```

Inside the `FooterWrapper` template literal, add a rule for `.footer-icon` so icons sit on the same line and pick up the white text colour:

```js
  .footer-icon {
    display: inline-flex;
    vertical-align: middle;
    margin-right: 0.45em;
    color: ${colors.textLightest};
  }
```

Put this rule next to the other `.footer-*` selectors. `colors` is already imported.

- [ ] **Step 5: Restart and verify everything Task 10 touched**

```bash
# Restart because MDX file additions/renames can change Gatsby's graph
lsof -i:8000 -t | xargs -r kill -9 2>/dev/null
npm run develop
```

- Visit `http://localhost:8000/kontakt/`. The address/phone/email block should render as icon rows (pink circle on the left, uppercase label, bold value with a tappable phone or email link). The NIP/REGON block above and the iframe map below should still appear.
- Scroll to the footer on any page. Each contact link should show an icon (map pin / phone / mail) before the label. Social-media links should show the matching brand glyph.
- Verify the pink footer-bottom strip is still pink (i.e., Task 1 wasn't regressed).

- [ ] **Step 6: Commit**

```bash
git add data/siteConfig.js src/components/ContactInfo.js content/pages/contact/contact.mdx content/pages/contact/contact.md src/components/Footer.js
git commit -m "$(cat <<'EOF'
Add icons to Kontakt page and footer

Kontakt page switches to MDX so it can use a new ContactInfo component
that renders address/phone/email as icon rows (pink-circle line icon +
uppercase label + bold value), pulling values from siteConfig.business
(now including vatId and regon for future JSON-LD use). The footer gets
the same icon language: phone/mail/map-pin glyphs in front of contact
links, brand glyphs in front of social-media links.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

`git add` includes both the new `.mdx` and the now-deleted `.md` (recorded as a rename when both staged together).

---

## Task 11: Full build smoke check + push branch

**Files:** none modified

- [ ] **Step 1: Run a production build**

```bash
lsof -i:8000 -t | xargs -r kill -9 2>/dev/null
npm run build 2>&1 | tail -80
```

Expected: the build completes with `info Done building in N s` and exits 0. Watch for any warning that wasn't there before — Task 0's zero-warning baseline must still hold.

- [ ] **Step 2: Spot-check the built site**

```bash
npx gatsby serve 2>&1 &
sleep 4
```

Open `http://localhost:9000/` and click through: home → /o-nas/ → /kontakt/ → /blog/ → click any post → /pages/2/ → click "‹ Nowsze posty". Confirm:

- Active menu underline appears on every page.
- Blog list shows thumbnails on left.
- "Nowsze posty" goes to `/blog/`, not `/`.
- Kontakt shows the pink-circle icon rows.
- Footer shows icons for contact links and social media.
- No console errors in the browser devtools.

```bash
lsof -i:9000 -t | xargs -r kill -9 2>/dev/null
```

- [ ] **Step 3: Push the branch and open the PR**

```bash
git push -u origin minor-redesign
gh pr create --title "Tiny redesign refresh: active menu, blog thumbs, icons, typography" --body "$(cat <<'EOF'
## Summary

Implements the spec at `docs/superpowers/specs/2026-05-19-tiny-redesign-refresh-design.md`. Conservative refresh covering seven user-identified items:

- Active menu link: 2px navy underline (desktop) / 2px white underline (mobile, kept bold)
- Blog list: 140x105 cover thumbnails on the left; clock + tag meta icons
- Pagination: 'Nowsze posts' → 'Nowsze posty' and previous-link target fixed (was sending users to '/')
- Content typography: drop justify, heavier h2, h3 as small uppercase eyebrow, retire dormant yellow link underline
- Anchor headers: hide the link icon (deep links still work)
- 'Sprawdź też' renders as pill links
- Inline SVG icon set used on Kontakt (pink-circle icon rows), footer (contact + social), blog meta, PrevNextPost, FaqList

`colors.accent` (#f6b3cd) is introduced as a proper token; it was already in use as a hard-coded literal in the footer-bottom strip.

## Test plan

- [ ] `npm run build` runs cleanly (zero ESLint warnings)
- [ ] Active menu underline shows on every page across all top-nav entries
- [ ] /blog/ shows post thumbnails left of titles; meta line has clock + tag icons
- [ ] Pagination 'Nowsze posty' navigates to /blog/ (not /) from /pages/2/
- [ ] /o-nas/ article shows eyebrow h3, left-aligned body, no yellow link underline
- [ ] /kontakt/ shows pink-circle icon rows; phone numbers and email are tappable links
- [ ] Footer shows phone/mail/map-pin/brand icons in front of every link
- [ ] PrevNextPost cards show 'Poprzedni post' / 'Następny post' eyebrow with chevron
- [ ] FAQ questions show a pink circle with chevron-down to the left
- [ ] Below 564px, blog list items stack vertically (image full-width above text)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Return the PR URL so the user can review.

---

## Self-Review (run after completing the plan)

**Spec coverage:**
- Active menu indicator → Task 5 ✅
- Blog list thumbnails → Task 7 ✅
- Pagination bug → Task 2 ✅
- Content typography → Task 4 ✅
- Drop anchor icon → Task 3 ✅
- "Sprawdź też" pills → Task 8 ✅
- Icons (Kontakt + footer + blog meta + PrevNext + FaqList) → Tasks 6, 7, 9, 10 ✅
- Tokens (`accent`, retire yellow link shadow) → Tasks 1, 4 ✅
- NIP/REGON in `siteConfig.business` (open question in spec, resolved as (b)) → Task 10 ✅
- Bundling: branch `minor-redesign`, multiple small commits → all tasks commit ✅

**Placeholder scan:** None.

**Type consistency:** `colors.accent` used consistently in Tasks 1, 9, 10. Icon component names match between `Icons.js` (Task 6) and consumers (Tasks 7, 9, 10). `cover` prop shape (`{ childImageSharp: { gatsbyImageData } }`) is consistent between the GraphQL fragment, `PostsList.js`, and `PostsListItem.js`.
