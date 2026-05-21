# Web Wizard Open-Source Quality Review

## Summary of current project state

Web Wizard is a small TypeScript CLI that generates Next.js App Router projects from a shared base template plus app-type overlays. The current MVP has a coherent Product Catalog implementation with public pages, admin CMS screens, Firebase client integration, Firebase Storage uploads, Firestore/Storage rules, theme settings, and generated setup documentation.

The strongest path is to keep Next.js + Firebase Storage as the only fully supported MVP lane and make that lane reliable, documented, and polished.

## What already works

- CLI can generate Product Catalog, Landing Page, and Company Profile projects with explicit supported flags.
- Product Catalog generated project installs, typechecks, and builds.
- Product Catalog routes exist for `/`, `/products`, `/products/[slug]`, `/about`, `/contact`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, and `/admin/settings`.
- Firebase config has a no-env fallback, so public pages render without `.env.local`.
- Product Catalog has useful sample products, categories, search/filter/sort UI, product detail pages, related products, admin CMS tabs, image upload fields, contact form, and theme settings.
- Firestore and Storage rules are generated.
- Root README and generated README explain the main flow.

## Bugs found

### P0

- Resolved: Landing Page and Company Profile failed TypeScript after generation. Shared `PublicHeader` and `PublicFooter` compared a placeholder-replaced literal app type against `"product-catalog"`, producing TS2367 for non-catalog app types.
- Resolved: Public catalog collection reads did not constrain `published == true`, which would fail Firestore rules once drafts existed.

### P1

- Resolved: Unsupported `--frontend react|nuxt` and `--storage bunny|none` options could trigger interactive confirmation even in scripted CLI usage.
- Resolved: Include-options prompt suggested optional modules, but the MVP always generated every module.
- Resolved: `requiredModules` listed many module directories that do not exist and were silently skipped.
- Documented: Admin allowlist exists in both `NEXT_PUBLIC_ADMIN_EMAILS` and generated rules. This remains an MVP tradeoff because the project must keep admin roles simple and must not add an onboarding wizard.

## UX issues found

- Resolved: CLI next steps now omit `npm install` when `--install` already ran.
- Resolved: CLI output now states selected template, Next.js, and Firebase Storage.
- Resolved: Unsupported options fall back predictably in non-interactive use.
- Public header exposes Admin link on marketing/product pages; useful for generated projects, but it makes the default public site feel less production-polished.

## Template architecture issues

- Resolved: Generator now only merges the existing Firestore rules module; shared features are explicitly treated as base-template features.
- Resolved: Header/footer app-type branching no longer causes non-catalog TypeScript failures.
- App-type CMS forms share patterns but duplicate field helpers; this is P2 maintainability polish.
- Resolved: Product Catalog fallback visuals use product-card-like panels instead of decorative abstract placeholders.

## Generated project issues

- Resolved: Landing Page and Company Profile generated projects typecheck and build after fixes.
- Resolved: Generated `.env.example` and README now warn that admin env and deployed rules must stay in sync.

## Security concerns

- Firestore/Storage admin checks are safe enough for MVP but depend on replacing `admin@example.com` before deploy.
- Public collection queries now use published-only helpers, matching Firestore rule behavior.
- Public contact message create rules should keep strict field and size validation.
- No public admin registration exists, which matches MVP constraints.
- No Firebase Admin SDK secrets are exposed to browser code.

## CMS/admin gaps

- Product Catalog CMS has overview/products/categories, but dashboard metrics are static.
- Contact inbox is read-only but now has error handling.
- Forms still show mostly generic validation messages; field-level validation remains P2.
- Admin routes are client-protected; unauthenticated users see a loading gate then redirect.

## Responsive design issues

- Product Catalog layout is generally responsive.
- Admin tabs and nav are mobile-friendly enough, but dense product forms can become long on mobile.
- Resolved: Product placeholder visuals were simplified to product-card-like panels without decorative blur shapes.

## Documentation gaps

- Resolved: Added clearer non-interactive CLI behavior.
- Resolved: Added generated troubleshooting for Firebase env missing vs rules allowlist mismatch.
- Resolved: Updated template architecture notes to match actual base/app-type/module layout.
- Add roadmap items as documentation only, not broken placeholders.

## Priority list

### P0 critical

- Resolved: Fix non-catalog TypeScript failures.
- Resolved: Keep generated Product Catalog build/runtime stable.
- Resolved: Avoid broken routes, imports, and placeholder crashes.

### P1 important

- Resolved: Clarify/fix unsupported option handling.
- Resolved: Remove misleading include-options prompt.
- Resolved: Improve generated README and Firebase admin/rules setup guidance.
- Resolved: Improve Product Catalog fallback visuals and responsive polish.

Current unresolved P1: none. Admin allowlist sync remains documented as an MVP tradeoff rather than a generator feature because this release intentionally avoids onboarding flow and complex roles.

### P2 polish

- Improve CLI output and next steps.
- Improve admin validation/status copy.
- Add stronger empty/loading/error states.
- Improve sample content where it feels too generic.
- Resolved: Remove dummy external contact URLs from default Product Catalog content.

### P3 future roadmap

- Custom claims setup script.
- Sitemap/robots generation.
- React/Nuxt adapters.
- Bunny.net/no-storage adapters.
- Additional templates after MVP stability.
