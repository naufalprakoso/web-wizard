# Web Wizard Open-Source Quality Review

## Summary of current project state

Web Wizard is a small TypeScript CLI that generates Next.js App Router projects from a shared base template plus app-type overlays. The current MVP has a coherent Product Catalog implementation with public pages, admin CMS screens, Firebase client integration, Firebase Storage uploads, Firestore/Storage rules, theme settings, and generated setup documentation.

The strongest path is to keep Next.js + Firebase Storage as the only fully supported MVP lane and make that lane reliable, documented, and polished.

## What already works

- CLI can generate Product Catalog, Landing Page, and Company Profile projects with explicit supported flags.
- Product Catalog, Landing Page, and Company Profile generated projects install, typecheck, and build.
- Product Catalog routes exist for `/`, `/products`, `/products/[slug]`, `/about`, `/contact`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, and `/admin/settings`.
- Firebase config has a no-env fallback, so public pages render without `.env.local`.
- Product Catalog has useful sample products, categories, search/filter/sort UI, product detail pages, related products, admin CMS tabs, image upload fields, contact form, and theme settings.
- Landing Page now has a more complete conversion structure: hero, proof points, problem/audience section, outcome section, benefits, steps, testimonials, FAQ, final CTA, and contact.
- Company Profile now has stronger first-screen positioning plus structured services, sectors, stats, work patterns, team bios, values, and contact.
- Generated projects now include local non-branded visual assets, `robots.txt`, `sitemap.xml`, and a dependency-free `qa:routes` smoke script.
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
- Resolved: Public header no longer exposes the Admin link by default. It can be enabled with `NEXT_PUBLIC_SHOW_ADMIN_LINK=true` for internal demos.
- Resolved: Contact forms now provide selectable inquiry subjects and response expectation copy.
- Resolved: Landing Page FAQ is interactive instead of a static card grid.

## Template architecture issues

- Resolved: Generator now only merges the existing Firestore rules module; shared features are explicitly treated as base-template features.
- Resolved: Header/footer app-type branching no longer causes non-catalog TypeScript failures.
- App-type CMS forms share patterns but duplicate field helpers; this is P2 maintainability polish.
- Resolved: Product Catalog fallback visuals use product-card-like panels instead of decorative abstract placeholders.

## Generated project issues

- Resolved: Landing Page and Company Profile generated projects typecheck and build after fixes.
- Resolved: Generated `.env.example` and README now warn that admin env and deployed rules must stay in sync.
- Resolved: Landing Page and Company Profile no longer depend on external stock hero images by default.
- Resolved: Generated landing pages use richer app-type-specific content instead of looking like lightly re-skinned variants of one page.
- Resolved: Landing Page and Company Profile CMS array fields use add/reorder/remove controls instead of manual pipe-delimited text editing.
- Resolved: Product Catalog listing has result counts, active filters, clear filters, and stronger no-results recovery.

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

- Product Catalog, Landing Page, and Company Profile layouts were checked at desktop and 390px mobile widths.
- Admin tabs and nav are mobile-friendly enough, but dense product forms can become long on mobile.
- Resolved: Product placeholder visuals were simplified to product-card-like panels without decorative blur shapes.
- Resolved: Mobile hero overflow/clipped heading issue on all three landing-page templates by constraining hero grid children and reducing mobile heading scale.

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
- Resolved: Improve Landing Page and Company Profile landing quality so all supported MVP templates have distinct, credible homepages.
- Resolved: Add basic SEO routes, route QA script, mobile nav accessibility, CMS repeater fields, and local default visuals.

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
