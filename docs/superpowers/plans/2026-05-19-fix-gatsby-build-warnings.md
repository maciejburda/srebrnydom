# Fix gatsby build warnings and errors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate the three classes of noise in `gatsby build` output: the spurious `ERROR UNKNOWN` lines from a Node deprecation warning, the `gatsby-plugin-mdx` unknown-option warning, and the non-page-component GraphQL query warning.

**Architecture:** Each issue gets a small, isolated change. (1) Remove the invalid `"main": "n/a"` field from `package.json` so Node stops emitting `DEP0128`. (2) Delete the obsolete `defaultLayouts` option from the `gatsby-plugin-mdx` config — it was removed in v3+ and the site already wires MDX through `createPage` with `?__contentFilePath=…`. (3) Move `blog-post-share-image.js` out of `src/templates/` (where Gatsby scans for queries) into `scripts/templates/` (where it isn't scanned), and update the `require.resolve` path in `gatsby-node.js`. The template is only registered as a page during `gatsby develop` for screenshotting via `scripts/generatePostPreviewImages.js`, so it doesn't need to live under `src/`.

**Tech Stack:** Gatsby 5, gatsby-plugin-mdx 5, Node 22.

**Verification model:** This repo has no automated test suite (`npm test` is a placeholder echo). The "test" for each task is rerunning `npx gatsby build` and confirming the specific warning/error line is gone from the output.

---

### Task 1: Remove invalid `"main"` field from package.json

**Why:** Every Gatsby worker process boots Node, Node sees `"main": "n/a"` in this site's `package.json` (which points to a non-existent file), and emits `DEP0128 DeprecationWarning: Invalid 'main' field`. Gatsby's worker-output handling surfaces each warning as an `ERROR  UNKNOWN` line — about a dozen times per build. This site is a Gatsby application, not a publishable package, so it has no legitimate `main` entry point.

**Files:**
- Modify: `package.json` (remove the `"main"` line)

- [ ] **Step 1: Capture current `ERROR UNKNOWN` count as baseline**

Run: `npx gatsby build 2>&1 | grep -c "ERROR  UNKNOWN"`
Expected: a non-zero count (around 12–14 on a clean build).

- [ ] **Step 2: Remove the `"main"` line from `package.json`**

In `package.json`, delete this line:

```json
  "main": "n/a",
```

The surrounding context after the edit should look like:

```json
  "author": "Maxence Poutord <maxence.poutord@gmail.com>",
  "license": "MIT",
  "scripts": {
```

Do not reorder or touch any other field.

- [ ] **Step 3: Rerun the build and verify the warning is gone**

Run: `npx gatsby build 2>&1 | grep -c "ERROR  UNKNOWN"`
Expected: `0`

Also run: `npx gatsby build 2>&1 | grep -c "DEP0128"`
Expected: `0`

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "Remove invalid \"main\" field from package.json

Node was emitting DEP0128 from every Gatsby worker because
\"main\": \"n/a\" points at no real file. The site is an app,
not a publishable package, so the field is unnecessary."
```

---

### Task 2: Remove obsolete `defaultLayouts` option from gatsby-plugin-mdx

**Why:** `defaultLayouts` was removed from `gatsby-plugin-mdx` in v3 (we're on v5). The plugin now warns "there are unknown plugin options for \"gatsby-plugin-mdx\": defaultLayouts" once per worker. The option is also dead code here — `src/pages/` contains only `.js` files, and every MDX page is created in `gatsby-node.js` via `createPage` with `component: \`${Template}?__contentFilePath=${contentFilePath}\``, which already wraps the MDX content in the chosen template. No replacement is needed.

**Files:**
- Modify: `gatsby-config.js` (delete the `defaultLayouts` block from the `gatsby-plugin-mdx` options)

- [ ] **Step 1: Capture the current warning count as baseline**

Run: `npx gatsby build 2>&1 | grep -c "unknown plugin options for \"gatsby-plugin-mdx\""`
Expected: a non-zero count.

- [ ] **Step 2: Delete the `defaultLayouts` block in `gatsby-config.js`**

Find the `gatsby-plugin-mdx` entry near the top of `plugins` (currently around lines 41–66). The `options` block contains:

```javascript
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/templates/page.js'),
        },
        gatsbyRemarkPlugins: [
          ...
        ],
      },
```

Remove the three `defaultLayouts` lines so it reads:

```javascript
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          ...
        ],
      },
```

Do not touch any other plugin or option.

- [ ] **Step 3: Rerun the build and verify the warning is gone**

Run: `npx gatsby build 2>&1 | grep -c "unknown plugin options for \"gatsby-plugin-mdx\""`
Expected: `0`

- [ ] **Step 4: Smoke-check that MDX pages still render**

Run: `ls public/blog/`
Expected: a directory for each post slug (e.g. `opowiesc-czesc-1/`), each containing `index.html`.

Run: `grep -l "<article" public/blog/*/index.html | head -1 | xargs grep -c "<p>"`
Expected: a non-zero count of `<p>` tags (i.e. the MDX body rendered, the template wasn't bypassed).

- [ ] **Step 5: Commit**

```bash
git add gatsby-config.js
git commit -m "Drop obsolete defaultLayouts option from gatsby-plugin-mdx

The option was removed in gatsby-plugin-mdx v3+. It's also dead
config here: src/pages/ has no .mdx files, and every MDX page is
created in gatsby-node.js via createPage with the
?__contentFilePath= template-wrapping syntax."
```

---

### Task 3: Move `blog-post-share-image.js` out of `src/` so Gatsby's query extractor stops scanning it

**Why:** Gatsby's query extractor walks every file under `src/` looking for tagged `graphql` template literals. `src/templates/blog-post-share-image.js` exports `pageQuery`, but it's only registered as a page during `gatsby develop` (see `gatsby-node.js:122-133`, gated by `process.env.gatsby_executing_command.includes('develop')`). During `gatsby build` the extractor sees the query but no matching page registration, so it warns: "The GraphQL query in the non-page component ... will not be run."

The template is only used at dev time by `scripts/generatePostPreviewImages.js`, which screenshots `${baseUrl}${slug}/image_share` via Puppeteer. Moving the file into `scripts/templates/` (a sibling of the script that consumes it) takes it out of Gatsby's scan path while keeping the dev workflow intact. We only need to update the one `require.resolve` in `gatsby-node.js` that points at it.

We can't simply convert `pageQuery` to `useStaticQuery` because the query takes a `$slug` variable; `useStaticQuery` doesn't accept variables. We also don't want to always register the page during builds, since that would ship dev-only screenshot pages to production.

**Files:**
- Create: `scripts/templates/blog-post-share-image.js` (move target — identical contents)
- Delete: `src/templates/blog-post-share-image.js`
- Modify: `gatsby-node.js:21-23` (update the `require.resolve` path)

- [ ] **Step 1: Capture the current warning count as baseline**

Run: `npx gatsby build 2>&1 | grep -c "non-page component"`
Expected: `1` (one warning, mentioning `blog-post-share-image.js`).

- [ ] **Step 2: Create the new directory and move the file**

Run:

```bash
mkdir -p scripts/templates
git mv src/templates/blog-post-share-image.js scripts/templates/blog-post-share-image.js
```

`git mv` preserves blame/history. Do not modify the file contents.

- [ ] **Step 3: Update the `require.resolve` path in `gatsby-node.js`**

In `gatsby-node.js`, find lines 21–23:

```javascript
  const BlogPostShareImage = require.resolve(
    './src/templates/blog-post-share-image.js'
  )
```

Change the path to:

```javascript
  const BlogPostShareImage = require.resolve(
    './scripts/templates/blog-post-share-image.js'
  )
```

Leave the rest of the variable declaration and surrounding code untouched.

- [ ] **Step 4: Rerun the build and verify the warning is gone**

Run: `npx gatsby build 2>&1 | grep -c "non-page component"`
Expected: `0`

Also confirm the build still succeeds end-to-end:

Run: `npx gatsby build 2>&1 | tail -5 | grep -c "Done building"`
Expected: `1`

- [ ] **Step 5: Smoke-check that dev-mode share-image generation still wires up**

Run: `grep -n "blog-post-share-image" gatsby-node.js`
Expected: a single match pointing at `./scripts/templates/blog-post-share-image.js`.

Run: `ls scripts/templates/blog-post-share-image.js src/templates/blog-post-share-image.js 2>&1`
Expected: the `scripts/templates/` path exists; the `src/templates/` path errors with "No such file".

(Running the actual Puppeteer screenshot flow requires `npm run generatePostPreviewImages` against a running dev server; out of scope for this verification step. The require.resolve call would crash at `gatsby develop` boot if the path were wrong, so the wiring check above is sufficient.)

- [ ] **Step 6: Commit**

```bash
git add gatsby-node.js scripts/templates/blog-post-share-image.js
git commit -m "Move dev-only share-image template out of src/

Gatsby's query extractor scans every file under src/ and warned
that blog-post-share-image.js exports a pageQuery without being
registered as a page. The template is only registered as a page
during \`gatsby develop\` for screenshot generation, so moving it
to scripts/templates/ (next to the script that consumes it) keeps
the dev workflow intact and removes the warning."
```

---

### Task 4: Final verification — clean build output

**Why:** Confirm the three fixes compose correctly and the build output is clean.

**Files:** None modified. This is a verification-only task.

- [ ] **Step 1: Run a clean build**

Run: `rm -rf .cache public && npx gatsby build 2>&1 | tee /tmp/gatsby-build.log`
Expected: exits 0, ends with "Done building in N seconds".

- [ ] **Step 2: Confirm none of the three issue signatures appear**

Run: `grep -cE "ERROR  UNKNOWN|DEP0128|unknown plugin options for \"gatsby-plugin-mdx\"|non-page component" /tmp/gatsby-build.log`
Expected: `0`

- [ ] **Step 3: Confirm the page set is unchanged**

Run: `grep -c "blog/" /tmp/gatsby-build.log`
Expected: a non-zero count (the page table at the end still lists `/blog/` routes).

If any of the three signatures reappears, return to the corresponding task (1 → DEP0128, 2 → gatsby-plugin-mdx, 3 → non-page component) and debug.
