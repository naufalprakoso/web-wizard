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
