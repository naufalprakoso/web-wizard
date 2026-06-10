# Product Category Images Design

## Goal

Give Product Catalog category cards real editorial photography while keeping
category images fully manageable through the existing template-specific CMS.
Generated projects must use bundled local assets by default and must not
require an image API, image API key, or runtime hotlink.

## Scope

This change applies only to the Next.js Product Catalog template:

- Category data schema
- Product Catalog default category data
- Product Catalog category admin form
- Product Catalog homepage category cards
- Local default category assets
- Generated asset license documentation
- Generated project tests and reports

It does not introduce a separate media library, a new Firebase collection,
automatic stock-photo search, or changes to other templates.

## Selected Visual Direction

Category cards use the approved **Editorial + color signal** direction:

- A full-bleed editorial image fills the category media area.
- A dark lower overlay protects the category label and title contrast.
- A small category-specific color signal provides faster visual scanning.
- The existing category number, featured/catalog label, title, description,
  and category link remain visible and accessible.
- Cards retain the current responsive four-column desktop and stacked mobile
  behavior.

The image is decorative context for the category card but must still have
meaningful alt text because it communicates the category subject.

## Data Model

Extend `categorySchema` with:

```ts
imageUrl: imageSourceSchema,
imageAlt: z.string()
```

Both fields are required in normalized category objects:

- `imageUrl` accepts an absolute URL, a site-relative path beginning with `/`,
  or an empty string.
- `imageAlt` accepts an empty string for categories without an image.

Default categories receive local site-relative image paths:

```text
/template-visuals/categories/clothing.webp
/template-visuals/categories/accessories.webp
/template-visuals/categories/sneakers.webp
/template-visuals/categories/beauty.webp
```

No category-to-image mapping based on category name will be added. The image
belongs to the category record, so renamed and user-created categories remain
fully manageable.

## CMS Behavior

Each category editor adds:

- Category image URL and Firebase Storage upload control
- Category image alt text field

Uploads use the existing `ImageUploadField` and store files under:

```text
uploads/categories
```

The existing Save and Delete behavior remains unchanged. Category validation
must reject malformed remote URLs but accept bundled local paths and empty
values.

New category records start with empty `imageUrl` and `imageAlt` fields. They
remain valid and use the public fallback presentation until an image is added.

## Public Rendering

When `category.imageUrl` is present:

1. Render a full-size `<img>` with `object-cover`.
2. Apply a subtle image treatment for consistent contrast.
3. Add a lower dark gradient overlay.
4. Add a small color signal derived from a stable category tone function.
5. Render the number badge, shelf label, and category copy above the overlay.

When `category.imageUrl` is empty:

1. Render the existing generated color fallback.
2. Keep all text and links available.
3. Do not show a broken image or reserve unstable dimensions.

The card media container keeps a fixed aspect ratio so image loading cannot
shift the surrounding layout.

## Default Assets

Four free-license category images will be selected from official Unsplash or
Pixabay source pages:

- Clothing
- Accessories
- Sneakers
- Beauty

Selection requirements:

- No recognizable brand marks or logos
- No private user data
- No misleading endorsement context
- Clear relevance to the category
- Suitable crop at desktop and mobile card sizes

The files will be downloaded once during template development, converted to
optimized WebP, and committed under:

```text
templates/next/base/public/template-visuals/categories/
```

Generated projects will serve these local files directly. Source page,
photographer/contributor, license, and download date will be appended to
`THIRD_PARTY_ASSETS.md`.

## Error and Fallback Handling

- Missing `imageUrl`: render the color fallback.
- Invalid URL in CMS: prevent category save with the existing validation
  status flow.
- Runtime image load failure: hide the failed image and reveal the color
  fallback without collapsing the card.
- Missing Firebase configuration: default local category images still render;
  uploads continue to show the existing Firebase configuration error.
- Older Firestore category documents without the new fields: normalize them to
  empty strings before rendering and editing.

## Compatibility

The change must preserve:

- Existing category IDs and product-category relationships
- Existing published and featured behavior
- Public category query parameters
- Firebase rules and admin-only category writes
- Generated projects without Firebase environment values

No data migration script is required because missing fields receive safe
fallback values.

## Verification

### Repository

- Root `npm run typecheck`
- Root `npm run build`
- `git diff --check`
- Secret and image-provider runtime URL scan

### Fresh Generated Product Catalog

- Generate with a custom website name
- `npm install`
- `npm run typecheck`
- `npm run build`
- Run the development server
- Run `npm run qa:routes`

### Browser QA

- Verify all four category images load from local paths.
- Verify no image-provider network dependency exists.
- Verify category cards match the approved Editorial + color signal direction.
- Verify desktop and 390px mobile layouts have no horizontal overflow.
- Verify category links still update the product filter.
- Verify the CMS category form exposes image URL/upload and alt text controls.
- Verify an empty-image category renders the fallback without a broken image.
- Verify console output has no relevant errors or warnings.

## Acceptance Criteria

- Four default category cards use relevant bundled WebP photography.
- Category images and alt text can be changed through the Product Catalog CMS.
- New and legacy categories remain valid without images.
- Public rendering has a stable fallback for missing or failed images.
- Generated projects require no image API or image API key.
- Asset sources and licenses are documented.
- Fresh generated Product Catalog install, typecheck, build, runtime route
  smoke, and responsive browser QA pass.
