# Product Category Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add free-license local category photography that is editable through the Product Catalog CMS and renders with the approved editorial plus color-signal presentation.

**Architecture:** Category image data stays on each category document through `imageUrl` and `imageAlt`. A dependency-free source-contract test protects the template structure, while the public card keeps a stable generated fallback beneath optional local or uploaded images. Four optimized WebP defaults ship in the base template with source and license records.

**Tech Stack:** TypeScript, Next.js App Router, React, Zod, Firebase Storage, Tailwind CSS, Node.js built-in assertions.

---

### Task 1: Add a failing template contract test

**Files:**
- Create: `scripts/test-product-category-images.mjs`
- Modify: `package.json`

- [x] **Step 1: Write the failing test**

Create a Node.js assertion script that reads the Product Catalog schema,
defaults, admin form, public homepage, and asset manifest. Assert:

```js
assert.match(schema, /imageUrl:\s*imageSourceSchema/);
assert.match(schema, /imageAlt:\s*z\.string\(\)/);
assert.match(defaults, /template-visuals\/categories\/clothing\.webp/);
assert.match(adminForm, /folder="uploads\/categories"/);
assert.match(publicPage, /category\.imageUrl/);
assert.match(publicPage, /category\.imageAlt/);
assert.match(assetManifest, /categories\/clothing\.webp/);
```

Also assert that all four expected WebP files exist and have non-zero size.

- [x] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:category-images
```

Expected: FAIL because category image fields and local category assets do not
exist yet.

- [x] **Step 3: Keep the failing test staged only after implementation**

Do not weaken assertions to match the current implementation.

### Task 2: Extend category schema and CMS normalization

**Files:**
- Modify: `templates/next/app-types/product-catalog/cms/schema.ts`
- Modify: `templates/next/app-types/product-catalog/cms/default-content.ts`
- Modify: `templates/next/app-types/product-catalog/cms/admin-form.tsx`

- [x] **Step 1: Extend `categorySchema`**

Add:

```ts
imageUrl: imageSourceSchema,
imageAlt: z.string()
```

- [x] **Step 2: Add category normalization**

Normalize records loaded from Firestore:

```ts
function normalizeCategory(category: Category): Category {
  return {
    ...category,
    featured: category.featured ?? false,
    imageUrl: category.imageUrl ?? "",
    imageAlt: category.imageAlt ?? ""
  };
}
```

Apply normalization to loaded, updated, saved, and newly created categories.

- [x] **Step 3: Add CMS image controls**

Add:

```tsx
<ImageUploadField
  label="Category image"
  value={category.imageUrl}
  folder="uploads/categories"
  onChange={(imageUrl) => updateCategory(index, { imageUrl })}
/>
<TextField
  label="Image alt text"
  value={category.imageAlt}
  onChange={(imageAlt) => updateCategory(index, { imageAlt })}
/>
```

- [x] **Step 4: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: PASS after all category literals include the new fields.

### Task 3: Add local free-license category assets

**Files:**
- Create: `templates/next/base/public/template-visuals/categories/clothing.webp`
- Create: `templates/next/base/public/template-visuals/categories/accessories.webp`
- Create: `templates/next/base/public/template-visuals/categories/sneakers.webp`
- Create: `templates/next/base/public/template-visuals/categories/beauty.webp`
- Modify: `templates/next/base/THIRD_PARTY_ASSETS.md`
- Modify: `templates/next/app-types/product-catalog/cms/default-content.ts`

- [x] **Step 1: Select license-safe source images**

Use official Unsplash or Pixabay source pages. Reject visible trademarks,
logos, private data, and misleading endorsement context.

- [x] **Step 2: Download and optimize**

Download once during development, then convert each image to a 4:3-friendly
WebP with a maximum source size around 1200px.

- [x] **Step 3: Connect default category records**

Set:

```ts
imageUrl: "/template-visuals/categories/clothing.webp",
imageAlt: "Curated clothing displayed for a fashion collection"
```

Repeat with accurate category-specific values.

- [x] **Step 4: Document sources**

Append local file, contributor, source page, license URL, and June 10, 2026
download date to `THIRD_PARTY_ASSETS.md`.

### Task 4: Render editorial category cards with fallback

**Files:**
- Modify: `templates/next/app-types/product-catalog/public-pages/page.tsx`

- [x] **Step 1: Normalize public category data**

Map missing legacy fields to empty strings before rendering.

- [x] **Step 2: Add stable media rendering**

Keep the current aspect-ratio container and fallback tone. When an image is
present, render:

```tsx
<img
  src={category.imageUrl}
  alt={category.imageAlt || category.name}
  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
/>
```

Use an image error handler component or equivalent client-safe behavior to hide
failed images without removing the fallback layer.

- [x] **Step 3: Apply approved overlay**

Add a lower dark gradient, readable white category copy in the media area, and
a small stable color signal. Keep description and CTA in the lower content
area if required for readability.

- [x] **Step 4: Run the contract test**

Run:

```bash
npm run test:category-images
```

Expected: PASS.

### Task 5: Generate and verify a fresh Product Catalog

**Files:**
- Modify: `.agent/test-report.md`
- Modify: `.agent/decisions.md`
- Modify: `.agent/open-source-readiness.md`

- [x] **Step 1: Verify repository**

Run:

```bash
npm run test:category-images
npm run typecheck
npm run build
git diff --check
```

- [x] **Step 2: Generate fresh output**

Run the built CLI from `/tmp` with Product Catalog, Next.js, Firebase Storage,
and a custom website name.

- [x] **Step 3: Verify generated project**

Run:

```bash
npm install
npm run typecheck
npm run build
```

- [x] **Step 4: Verify runtime**

Run the dev server and `npm run qa:routes`. Check `/`, `/products`,
`/admin/cms`, and a category-filtered product URL.

- [x] **Step 5: Browser QA**

At desktop and 390px mobile:

- Confirm four local category images load with non-zero natural dimensions.
- Confirm no horizontal overflow.
- Confirm no relevant console errors or warnings.
- Confirm category filter navigation works.
- Confirm an empty or failed image preserves the fallback.
- Confirm CMS source contains upload and alt text controls.

- [x] **Step 6: Update reports**

Record commands, results, screenshots, license checks, and any remaining
P0/P1 issues. Do not report completion while a P0 or P1 issue remains.
