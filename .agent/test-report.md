# Web Wizard Test Report

## Initial commands executed

- `PATH=/opt/homebrew/bin:/usr/local/bin:$PATH npm run build`
- `node dist/index.js create ww-product --app-type product-catalog --frontend next --storage firebase-storage`
- `node dist/index.js create ww-landing --app-type landing-page --frontend next --storage firebase-storage`
- `node dist/index.js create ww-company --app-type company-profile --frontend next --storage firebase-storage`
- `npm install` in each generated project
- `npm run typecheck && npm run build` in each generated project
- `node dist/index.js create unsupported-react --app-type product-catalog --frontend react --storage bunny`
- Final cycle:
  - `node dist/index.js create final-product --app-type product-catalog --frontend next --storage firebase-storage`
  - `node dist/index.js create final-landing --app-type landing-page --frontend next --storage firebase-storage`
  - `node dist/index.js create final-company --app-type company-profile --frontend next --storage firebase-storage`
  - `npm install` in each final generated project
  - `npm run typecheck && npm run build` in each final generated project
  - `npm run dev -- --port 3211` for final Product Catalog
- Follow-up loop after report cleanup and default CTA fix:
  - `node dist/index.js create loop-product --app-type product-catalog --frontend next --storage firebase-storage`
  - `npm install`
  - `npm run typecheck`
  - `npm run build`
  - `npm run dev -- --port 3212`

## Generated project names

- `/tmp/web-wizard-review/product/ww-product`
- `/tmp/web-wizard-review/landing/ww-landing`
- `/tmp/web-wizard-review/company/ww-company`

## Baseline findings before fixes

- Product Catalog installed, typechecked, and built.
- Landing Page and Company Profile exposed TS2367 in shared header/footer app-type branching.

## Final build results

- Product Catalog: install succeeded, typecheck succeeded, build succeeded.
- Landing Page: install succeeded, typecheck succeeded, build succeeded.
- Company Profile: install succeeded, typecheck succeeded, build succeeded.
- Root CLI: `npm run build` succeeded after changes.
- Follow-up Product Catalog: install succeeded, typecheck succeeded, build succeeded.

## Runtime results

- Product Catalog dev server started on `http://localhost:3211`.
- `/` rendered the catalog homepage with no console errors.
- `/products` rendered the searchable catalog with no console errors.
- `/products/modular-oak-desk` rendered the detail page with no console errors.
- `/about` and `/contact` rendered with no console errors.
- `/admin/login` rendered the login form.
- `/admin/dashboard`, `/admin/cms`, and `/admin/settings` redirect to `/admin/login` when Firebase/admin auth is not configured.
- Contact form submission with missing Firebase config now shows `Firestore is not configured.` instead of a generic bad-input message.
- Product search interaction worked: entering `lamp` reduced results to `Ceramic Task Lamp` and hid `Modular Oak Desk`.
- Follow-up Product Catalog route smoke on `http://localhost:3212` rendered `/`, `/products`, `/products/modular-oak-desk`, `/about`, `/contact`, and `/admin/login` with no console errors.
- Follow-up homepage showed `Contact us` and no default `wa.me` links.

## Routes checked

Product Catalog build output includes:

- `/`
- `/_not-found`
- `/about`
- `/admin/cms`
- `/admin/dashboard`
- `/admin/login`
- `/admin/settings`
- `/contact`
- `/products`
- `/products/[slug]`

## Bugs fixed in this cycle

- Landing Page TS2367 in `components/layout/PublicHeader.tsx` and `components/layout/PublicFooter.tsx`.
- Company Profile TS2367 in `components/layout/PublicHeader.tsx` and `components/layout/PublicFooter.tsx`.
- Public collection reads needed published-only queries to comply with Firestore rules.
- Admin-created product/category docs needed `createdAt` on first save because admin list queries sort by `createdAt`.
- Fixed non-catalog TS2367 by typing the placeholder app type as `string`.
- Added published-only CMS/collection helpers for public pages.
- Preserved demo content only when Firebase is not configured.
- Added `createdAt` on first `saveCollectionItem`.
- Removed misleading include-options prompt.
- Made non-interactive unsupported frontend/storage options warn and fall back to stable defaults.
- Improved generated `.env.example`, README troubleshooting, and CLI next-step output.
- Added clearer admin/contact error states.
- Removed the fake default WhatsApp URL; generated catalogs route inquiry CTAs to `/contact` until a real WhatsApp URL is configured.

## Screenshots note

- Captured Browser screenshots for `/products` at desktop and mobile widths during final QA:
  - `/tmp/web-wizard-review/screenshots/product-desktop.png`
  - `/tmp/web-wizard-review/screenshots/product-mobile.png`

## Remaining issues

- Field-level form validation remains a polish item.
- Category rename drift remains a future CMS modeling improvement; current MVP keeps category names simple to avoid a larger migration.
- Admin email allowlist must be kept in sync manually between env and rules; documented as an MVP tradeoff.

## Current unresolved P0/P1 status

- P0: none.
- P1: none unresolved. Admin allowlist sync and category rename behavior are documented MVP/future-work tradeoffs.

## Landing page improvement cycle - 2026-06-01

### Commands executed

- `npm run build`
- `node dist/index.js create product-final2 --app-type product-catalog --frontend next --storage firebase-storage`
- `node dist/index.js create landing-final2 --app-type landing-page --frontend next --storage firebase-storage`
- `node dist/index.js create company-final2 --app-type company-profile --frontend next --storage firebase-storage`
- `npm install` in each generated `final2` project
- `npm run typecheck && npm run build` in each generated `final2` project
- Playwright/Chrome runtime QA from `/tmp/web-wizard-qa-runner`

### Generated project names

- `/tmp/web-wizard-landing-final2/product/product-final2`
- `/tmp/web-wizard-landing-final2/landing/landing-final2`
- `/tmp/web-wizard-landing-final2/company/company-final2`

### Build results

- Root CLI build passed.
- Product Catalog `final2`: install passed, typecheck passed, build passed.
- Landing Page `final2`: install passed, typecheck passed, build passed.
- Company Profile `final2`: install passed, typecheck passed, build passed.

### Runtime results

- Product Catalog route smoke passed for `/`, `/products`, `/products/ceramic-task-lamp`, `/about`, `/contact`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, and `/admin/settings`.
- Admin protected routes returned 200 and redirected/rendered the login gate as expected when admin auth is not configured.
- Product search/filter passed: searching `lamp` and selecting category `Home` updated the URL to `/products?q=lamp&category=Home` and showed only `Ceramic Task Lamp`.
- Landing Page homepage rendered with the improved campaign sections and no external branded/default image dependency.
- Company Profile homepage rendered with the improved services, sectors, work patterns, team, values, and contact sections.
- Mobile layout QA passed for all three templates: Playwright measured `scrollWidth=390` at a 390px viewport and found no overflowing elements.

### Screenshots

- `/tmp/web-wizard-landing-final2/screenshots/product-desktop.png`
- `/tmp/web-wizard-landing-final2/screenshots/product-mobile-playwright.png`
- `/tmp/web-wizard-landing-final2/screenshots/landing-desktop.png`
- `/tmp/web-wizard-landing-final2/screenshots/landing-mobile-playwright.png`
- `/tmp/web-wizard-landing-final2/screenshots/company-desktop.png`
- `/tmp/web-wizard-landing-final2/screenshots/company-mobile-playwright.png`

### Remaining issues

- P0: none.
- P1: none unresolved from this landing-page pass.
- P2: admin form validation can still become more granular in a later pass.

## Landing page improvement cycle - pass 3

### Commands executed

- `npm run build`
- `node dist/index.js create product-pass3 --app-type product-catalog --frontend next --storage firebase-storage`
- `node dist/index.js create landing-pass3 --app-type landing-page --frontend next --storage firebase-storage`
- `node dist/index.js create company-pass3 --app-type company-profile --frontend next --storage firebase-storage`
- `npm install` in each generated pass3 project
- `npm run typecheck && npm run build` in each generated pass3 project
- Runtime QA with Chrome/Playwright fallback from `/tmp/web-wizard-qa-runner`
- `QA_BASE_URL=http://localhost:<port> npm run qa:routes` in each generated pass3 project

### Generated project names

- `/tmp/web-wizard-landing-pass3/product/product-pass3`
- `/tmp/web-wizard-landing-pass3/landing/landing-pass3`
- `/tmp/web-wizard-landing-pass3/company/company-pass3`

### Build results

- Root CLI build passed.
- Product Catalog pass3: install passed, typecheck passed, build passed.
- Landing Page pass3: install passed, typecheck passed, build passed.
- Company Profile pass3: install passed, typecheck passed, build passed.
- Generated build output includes `robots.txt` and `sitemap.xml`.

### Runtime results

- Product Catalog routes passed: `/`, `/products`, `/products/ceramic-task-lamp`, `/about`, `/contact`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, `/admin/settings`, `/robots.txt`, `/sitemap.xml`.
- Landing Page routes passed: `/`, `/admin/login`, `/robots.txt`, `/sitemap.xml`.
- Company Profile routes passed: `/`, `/admin/login`, `/robots.txt`, `/sitemap.xml`.
- Product search/filter still works: searching `lamp` and choosing `Home` produces `/products?q=lamp&category=Home` and shows only `Ceramic Task Lamp`.
- Generated `qa:routes` script passed in Product Catalog, Landing Page, and Company Profile.
- Mobile overflow check passed at 390px for all three templates: `scrollWidth=390`, no overflowing elements.

### Screenshots

- `/tmp/web-wizard-landing-pass3/screenshots/product-desktop.png`
- `/tmp/web-wizard-landing-pass3/screenshots/product-mobile.png`
- `/tmp/web-wizard-landing-pass3/screenshots/landing-desktop.png`
- `/tmp/web-wizard-landing-pass3/screenshots/landing-mobile.png`
- `/tmp/web-wizard-landing-pass3/screenshots/company-desktop.png`
- `/tmp/web-wizard-landing-pass3/screenshots/company-mobile.png`

### Bugs and UX issues fixed in pass 3

- Added local non-branded SVG visual assets for generated Landing Page and Company Profile hero fallbacks.
- Added generated `robots.txt`, `sitemap.xml`, and `qa:routes`.
- Added skip link and improved mobile navigation accessibility.
- Added subject chips and response expectation copy to contact forms.
- Replaced pipe-delimited CMS array editing in Landing Page and Company Profile with add/reorder/remove repeater fields.
- Added CMS preview panels and more specific schema error messages.
- Added Landing Page content variants and FAQ accordion.
- Added Company Profile capability matrix, case-study challenge/approach/result structure, team initials, and contact blocks.
- Added Product Catalog result count, active filter chips, clear filters, stronger empty state, richer cards, category visual rails, and sticky product-detail inquiry panel.

### Remaining issues

- P0: none.
- P1: none unresolved.
- P2: generated QA script is route-focused; screenshot/overflow QA remains an agent/developer workflow rather than a dependency-free npm script.

## New template addition cycle - Portfolio and Service Business

### Commands executed

- `npm run build`
- `node /Users/naufal.prakoso/web-wizard/dist/index.js create portfolio-check --app-type portfolio --frontend next --storage firebase-storage`
- `node /Users/naufal.prakoso/web-wizard/dist/index.js create service-check --app-type service-business --frontend next --storage firebase-storage`
- `npm install` in each generated project
- `npm run typecheck && npm run build` in each generated project
- `npm run dev -- --port 4311` for Portfolio
- `npm run dev -- --port 4312` for Service Business
- `QA_BASE_URL=http://localhost:4311 npm run qa:routes`
- `QA_BASE_URL=http://localhost:4312 npm run qa:routes`
- Chrome/Playwright runtime QA from `/tmp/web-wizard-qa-runner`

### Generated project names

- `/tmp/web-wizard-new-templates/portfolio-check`
- `/tmp/web-wizard-new-templates/service-check`

### Build results

- Root CLI build passed.
- Portfolio: install passed, typecheck passed, build passed.
- Service Business: install passed, typecheck passed, build passed.
- Both generated build outputs include `/`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, `/admin/settings`, `/robots.txt`, and `/sitemap.xml`.

### Runtime results

- Portfolio dev server ran on `http://localhost:4311`.
- Service Business dev server ran on `http://localhost:4312`.
- Generated `qa:routes` passed for both projects.
- Runtime route checks passed for `/`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, `/admin/settings`, `/robots.txt`, and `/sitemap.xml`.
- Portfolio homepage rendered expected content: `Selected work`, `A compact skill set`, `Work with Ari`, and `Project inquiry`.
- Service Business homepage rendered expected content: `Simple package comparison`, `Common service questions`, `Contact Clearpath Studio`, and `Service inquiry`.
- Mobile overflow check passed at 390px for both templates.
- No fatal browser console errors were detected.

### Screenshots

- `/tmp/web-wizard-new-templates/screenshots-final/portfolio-desktop.png`
- `/tmp/web-wizard-new-templates/screenshots-final/portfolio-mobile.png`
- `/tmp/web-wizard-new-templates/screenshots-final/service-desktop.png`
- `/tmp/web-wizard-new-templates/screenshots-final/service-mobile.png`

### Bugs and UX issues fixed in this cycle

- Added `portfolio` and `service-business` to supported CLI app types, aliases, prompt choices, validation, and command help.
- Added Portfolio public page, CMS schema/default content/admin form, and theme preset.
- Added Service Business public page, CMS schema/default content/admin form, and theme preset.
- Updated public header/footer navigation and generated README copy for the two new templates.
- Made shared contact subject chips app-type-specific so Portfolio and Service Business no longer show Product Catalog inquiry labels.

### Remaining issues

- P0: none.
- P1: none unresolved for these two new templates.
- P2: deeper field-level validation and richer admin preview states remain future polish.

## Template-specific CMS collection cycle

### Commands executed

- `npm run build`
- `node /Users/naufal.prakoso/web-wizard/dist/index.js create portfolio-cms --app-type portfolio --frontend next --storage firebase-storage`
- `node /Users/naufal.prakoso/web-wizard/dist/index.js create service-cms --app-type service-business --frontend next --storage firebase-storage`
- `node /Users/naufal.prakoso/web-wizard/dist/index.js create company-cms --app-type company-profile --frontend next --storage firebase-storage`
- `npm install` in each generated project
- `npm run typecheck && npm run build` in each generated project
- `npm run dev -- --port 4321` for Portfolio
- `npm run dev -- --port 4322` for Service Business
- `npm run dev -- --port 4323` for Company Profile
- `QA_BASE_URL=http://localhost:<port> npm run qa:routes` in each generated project
- Chrome/Playwright runtime QA from `/tmp/web-wizard-qa-runner`

### Generated project names

- `/tmp/web-wizard-template-cms/portfolio-cms`
- `/tmp/web-wizard-template-cms/service-cms`
- `/tmp/web-wizard-template-cms/company-cms`

### Build results

- Root CLI build passed.
- Portfolio CMS project: install passed, typecheck passed, build passed.
- Service Business CMS project: install passed, typecheck passed, build passed.
- Company Profile CMS project: install passed, typecheck passed, build passed.

### Runtime results

- Portfolio route smoke passed for `/`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, `/admin/settings`, `/robots.txt`, and `/sitemap.xml`.
- Service Business route smoke passed for `/`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, `/admin/settings`, `/robots.txt`, and `/sitemap.xml`.
- Company Profile route smoke passed for `/`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, `/admin/settings`, `/robots.txt`, and `/sitemap.xml`.
- Mobile overflow check passed at 390px for Portfolio, Service Business, and Company Profile.
- Public pages rendered fallback collection content correctly when Firebase was not configured.

### Screenshots

- `/tmp/web-wizard-template-cms/screenshots/portfolio-desktop.png`
- `/tmp/web-wizard-template-cms/screenshots/portfolio-mobile.png`
- `/tmp/web-wizard-template-cms/screenshots/service-desktop.png`
- `/tmp/web-wizard-template-cms/screenshots/service-mobile.png`
- `/tmp/web-wizard-template-cms/screenshots/company-desktop.png`
- `/tmp/web-wizard-template-cms/screenshots/company-mobile.png`

### Bugs and UX issues fixed in this cycle

- Added shared `CollectionCrudField` for template-specific admin collection CRUD.
- Portfolio CMS now has separate CRUD records for projects, services, testimonials, and notes.
- Service Business CMS now has separate CRUD records for services, packages, process steps, case studies, and FAQ.
- Company Profile CMS now has separate CRUD records for services, case studies, and team members.
- Public pages now read published template-specific collections and fall back to template content when Firebase or records are unavailable.
- Firestore rules now include admin-only writes and published-only public reads for the new template-specific collections.

### Remaining issues

- P0: none.
- P1: none unresolved from the CMS collection pass.
- P2: collection item ordering is currently timestamp-based; explicit ordering fields can be added later if authors need manual ordering after records are saved.

## Product Catalog fashion storefront redesign cycle

### Commands executed

- `npm run typecheck`
- `npm run build`
- `node /Users/naufal.prakoso/web-wizard/dist/index.js create web-wizard-fashion-product --app-type product-catalog --frontend next --storage firebase-storage`
- `npm install --prefer-offline` in `/tmp/web-wizard-fashion-product`
- `npm run typecheck` in `/tmp/web-wizard-fashion-product`
- `npm run build` in `/tmp/web-wizard-fashion-product`
- `npm run dev -- --hostname 127.0.0.1 --port 4851` in `/tmp/web-wizard-fashion-product`
- Browser QA on `http://127.0.0.1:4851/`
- Node `fetch` route smoke checks because `curl` is not available in this environment

### Generated project names

- `/tmp/web-wizard-fashion-product`

### Build results

- Root CLI typecheck passed.
- Root CLI build passed.
- Generated Product Catalog install passed with 0 npm vulnerabilities.
- Generated Product Catalog typecheck passed.
- Generated Product Catalog production build passed.

### Runtime results

- Generated Product Catalog dev server ran on `http://127.0.0.1:4851`.
- Browser opened `/` successfully with title `Modern Fashion Product Catalog`.
- Hero image loaded from `/template-visuals/product-fashion-hero.png`.
- Browser console check returned 0 errors and 0 warnings for the checked pages.
- Desktop overflow check passed.
- Mobile 390px overflow check passed.
- Category filter interaction passed: selecting `Sneakers` changed the finder to `Showing 1 of 7 products` with `Daily Canvas Sneaker`.
- Search interaction passed: entering `lip` after resetting category changed the finder to `Showing 1 of 7 products` with `Matte Lip Set`.

### Routes checked

- `200 /`
- `200 /products`
- `200 /products/linen-resort-shirt`
- `200 /about`
- `200 /contact`
- `200 /admin/login`
- `200 /admin/dashboard`
- `200 /admin/cms`
- `200 /admin/settings`
- `404 /missing-route`

### Bugs and UX issues fixed in this cycle

- Product Catalog homepage no longer uses the generic dark catalog layout that felt visually disconnected from fashion ecommerce references.
- Added a generated, non-branded hero campaign image to the generated project assets.
- Reworked Product Catalog default content into fashion/lifestyle categories and products.
- Replaced the old comparison-table-heavy homepage with a storefront flow: campaign hero, promo cards, category shelves, product rails, promo tiles, interactive style finder, trust section, brand strip, service strip, and contact section.
- Reworked product cards to look like ecommerce cards with taller visuals, status pills, rating/sold metadata, sale/original price treatment, and direct inquiry CTA.
- Updated Product Catalog theme preset to a cleaner fashion storefront palette.
- Avoided recognizable brand names and external image dependencies in default content.

### Screenshots

- Desktop and mobile screenshots were captured during QA and removed from the repository after inspection because they were temporary artifacts.

### Remaining issues

- P0: none.
- P1: none from this redesign cycle.
- P2: none from this redesign cycle. Product cards now use bundled local WebP
  photography with source and license records.

## Website name CLI prompt cycle

### Commands executed

- `npm run typecheck`
- `npm run build`
- `node dist/index.js create --help`
- `node dist/index.js create web-wizard-site-name --site-name "Northstar Market" --app-type product-catalog --frontend next --storage firebase-storage`
- `node dist/index.js create web-wizard-site-fallback --app-type landing-page --frontend next --storage firebase-storage`
- Interactive PTY check of the `Website name` prompt
- `npm install --prefer-offline`
- `npm run typecheck`
- `npm run build`

### Results

- Interactive creation now asks `Website name` separately from `Project folder name`.
- `--site-name` is available for scripts and CI.
- The generated npm package kept the safe slug `web-wizard-site-name`.
- Header, footer, generated README, admin login, and SEO metadata used `Northstar Market`.
- A non-interactive command without `--site-name` remained backward compatible and used `Web Wizard Site Fallback`.
- Generated Product Catalog install, typecheck, and production build passed.
- npm audit reported 0 vulnerabilities.

### Remaining issues

- P0: none.
- P1: none.

## Local licensed product image cycle

### Commands executed

- `npm run typecheck`
- `npm run build`
- Generated `web-wizard-local-images` as Product Catalog with website name
  `Northstar Market`
- `npm install`
- `npm run typecheck`
- `npm run build`
- `npm run dev -- --hostname 127.0.0.1 --port 4851`
- `QA_BASE_URL=http://127.0.0.1:4851 npm run qa:routes`
- Browser desktop and 390px mobile QA
- Runtime scans for image-provider CDN URLs and image API environment variables

### Build and runtime results

- Root CLI typecheck and build passed.
- Generated Product Catalog install passed with 0 npm vulnerabilities.
- Generated Product Catalog typecheck passed.
- Generated Product Catalog production build passed.
- Dev server ran at `http://127.0.0.1:4851`.
- All seven product images loaded from local
  `/template-visuals/products/*.webp` paths with non-zero natural dimensions.
- Browser console reported 0 errors and 0 warnings.
- Desktop and 390px mobile horizontal overflow checks passed.
- Mobile navigation expanded and exposed all public links.
- Search interaction with `lip` showed `1 of 7 products` and `Matte Lip Set`.
- Product detail `/products/matte-lip-set` rendered its local image,
  specifications, inquiry CTA, and related-products empty state.

### Routes checked

- `200 /`
- `200 /products`
- `200 /products/linen-resort-shirt`
- `200 /about`
- `200 /contact`
- `200 /admin/login`
- `200 /admin/dashboard`
- `200 /admin/cms`
- `200 /admin/settings`
- `404 /missing-route`

### Asset and security checks

- No runtime Unsplash, Pexels, or Pixabay CDN URL exists in generated source.
- No image API package, image API key, or image-provider environment variable
  was added.
- Source URLs appear only in `THIRD_PARTY_ASSETS.md`.
- A lipstick photo with visible brand text was rejected and replaced with an
  unbranded asset.
- Demo images are optimized WebP files bundled into the generated project.

### Screenshots

- Desktop: `/tmp/web-wizard-local-images-desktop.png`
- Mobile navigation: `/tmp/web-wizard-local-images-mobile.png`

### Remaining issues

- P0: none.
- P1: none.

## Product Catalog homepage CMS cycle

### Commands executed

- `npm run build`
- Generated `web-wizard-cms-homepage` as Product Catalog with website name `Northstar Market`
- `npm install --prefer-offline`
- `npm run typecheck`
- `npm run build`
- `npm run dev -- --hostname 127.0.0.1 --port 4851`
- Browser runtime checks for homepage data and console output
- Temporary generated-content mutation to prove each homepage section reads CMS data instead of hardcoded page literals

### Build results

- Root CLI build passed.
- Generated Product Catalog install passed with 0 npm vulnerabilities.
- Generated Product Catalog typecheck passed.
- Generated Product Catalog production build passed with all public and admin routes.

### Runtime results

- Main banner image loaded from the CMS/default content URL.
- Campaign label and period updated after content mutation.
- Side promotional banner content updated after content mutation.
- Promotional tile content updated after content mutation.
- Product rail title updated after content mutation.
- Brand strip and service benefit strip updated after content mutation.
- Product rating, sold count, and compare-at price updated after product data mutation.
- Browser console reported 0 errors and 0 warnings.
- Desktop horizontal overflow check passed.

### CMS controls verified in generated source

- Homepage tab
- Main banner image upload
- Side promotional banner repeaters with optional image uploads
- Promotional tile repeaters with optional image uploads
- Product rail and finder headings
- Brand strip editor
- Service/benefit strip editor
- Product rating, sold count, and compare-at price fields

### Remaining issues

- P0: none.
- P1: none.
