# Implementation Decisions

## Product Catalog template polish

- The Product Catalog template remains a catalog and inquiry website, not a checkout-oriented ecommerce starter. Public CTAs point users toward contact or WhatsApp-style inquiries.
- Product data now uses neutral, non-branded sample products and generated gradient product visuals. This avoids trademarked logos, mismatched product imagery, and brittle external image dependencies.
- Public product URLs use stable slugs under `/products/[slug]`. Product IDs in the seed data intentionally match slugs so Firestore documents can map cleanly to public routes later.
- Search, category filtering, and sorting run on the client over typed product data. This keeps the default generated project fast and static-friendly while preserving a data shape that can later be backed by Firestore.

## CMS readiness

- Product and category management are modeled as first-class CMS collections instead of being embedded directly inside a page component.
- Shared CMS service helpers handle collection item writes. Page and form code should keep using these helpers instead of duplicating Firebase calls in every route.
- The generated admin experience keeps one role only: `admin`. Owner dashboards, tenant modes, subscriptions, and complex role systems are intentionally out of scope.
- Zod schemas stay close to CMS forms so generated projects have validation for product, category, SEO, and theme content without adding a heavier form stack.

## Theme customization

- Product Catalog UI consumes CSS variables for primary, secondary, accent, background, text, and radius values.
- The theme preset provides safe defaults so generated projects render well even when Firebase is not configured yet.
- Admin theme settings are designed to persist into Firestore when Firebase is configured, but public pages must continue to render using fallback defaults.

## CLI generator flow

- The create flow now asks for project name, app type, frontend, storage, and include options to feel like a real generator experience.
- Next.js and Firebase Storage are the supported MVP defaults.
- React.js, Nuxt.js, Bunny.net, and No Storage are shown as planned options. If selected, the CLI asks whether to continue with the supported default instead of generating an incomplete project.

## Build and release boundaries

- Generated Next.js projects set `turbopack.root` to `process.cwd()` so Turbopack does not infer a parent workspace from unrelated lockfiles.
- Package version mismatch and npm release publishing were intentionally skipped for this implementation pass because the task explicitly excluded CLI package version mismatch work.
