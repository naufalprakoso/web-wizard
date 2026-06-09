# Web Wizard Implementation Decisions

## MVP support lane

Next.js and Firebase Storage remain the only fully supported MVP lane. React.js, Nuxt.js, Bunny.net, and no-storage modes should be documented as planned and must not produce broken projects.

## Firebase fallback

Public pages should render with default CMS/theme content when Firebase environment variables are missing. Once Firebase is configured, public pages should read only published CMS/catalog records. If the configured Firestore denies a public read because content is missing or unpublished, the page should not leak demo content.

Admin writes, contact submission, image upload, CMS saves, and theme saves should fail with clear messages when Firebase is not configured.

## Admin model

The project keeps one simple admin role. Admin access is based on email allowlists in the client app and generated Firebase rules for this MVP. Public users can read only published public content and create contact messages; they cannot write CMS/catalog/theme/storage data.

The admin email must be edited in both `.env.local` and the generated rules. A generated prompt for admin email was not added because the current MVP avoids an onboarding wizard and keeps generation deterministic.

## Routes

Product Catalog keeps dedicated `/products`, `/products/[slug]`, `/about`, and `/contact` routes because the public navigation links to them and they make the template feel complete.

## Public Firestore reads

Public catalog collection reads use `where("published", "==", true)` and client-side sorting. This avoids relying on Firestore rules as filters and avoids requiring composite indexes for the MVP.

## Unsupported options

React.js, Nuxt.js, Bunny.net, and no-storage modes remain planned. Interactive users get a confirmation before falling back. Non-interactive/scripted users get a warning and the stable Next.js/Firebase Storage project so CI or automation does not hang.

## Module architecture

Shared Next.js, Firebase, CMS, admin, theme, contact, SEO, and UI code lives in the base template. The only current module overlay is generated Firebase rules. App-type overlays own app-specific public pages, CMS schema/default content/forms, sections, and theme presets.

## Public admin link

The public header hides the Admin link by default and exposes it only when `NEXT_PUBLIC_SHOW_ADMIN_LINK=true`. This keeps generated public sites production-presentable while still allowing maintainers to enable a shortcut for demos or internal testing.

## Landing page visuals

Landing Page and Company Profile templates use CSS-generated fallback visuals when no CMS image is configured. This avoids copyrighted or branded default assets, avoids external stock-image dependencies, and keeps generated projects useful before Firebase Storage is configured.

The fallback visuals are intentionally app-type-specific: Landing Page gets a campaign/offer panel, Company Profile gets an operating-summary panel, and Product Catalog keeps product-card-like visuals from the catalog data.

## Landing page content model

Landing Page content was expanded around conversion structure: proof points, problem statement, audience segments, outcome copy, final CTA, and role-aware testimonials. Company Profile content was expanded around company credibility: structured services, sectors, stats, work patterns, team bios, and values.

These additions improve supported MVP templates without adding new product surfaces like onboarding, subscription, tenant mode, owner dashboard, or complex roles.

## Mobile layout constraints

Hero text containers and visual columns use `min-w-0` and smaller mobile heading scales. The goal is to prevent CSS grid children from forcing horizontal overflow while preserving large editorial type on desktop.

## Generated SEO routes

Generated projects include `robots.txt` and `sitemap.xml` through Next.js metadata routes. `NEXT_PUBLIC_SITE_URL` controls the production URL. Admin routes are disallowed in `robots.txt`; Product Catalog adds the main catalog routes to the sitemap without trying to enumerate CMS products at build time.

## Dependency-free QA script

Generated projects include `npm run qa:routes`, which checks critical routes with built-in Node `fetch`. Screenshot and overflow QA are intentionally kept out of the generated dependency graph to avoid adding Playwright or browser binaries to every generated project.

## CMS repeater fields

Landing Page and Company Profile admin forms use reusable repeater fields for array content. This removes manual pipe-delimited editing while keeping the MVP simple and dependency-free. Rich drag-and-drop was rejected because it would add dependency and interaction complexity before the core template is stabilized.

## Contact subjects

Contact messages now include a simple subject selected from three chips. This improves admin inbox context without introducing complex lead routing, roles, or CRM-style workflow.

## Portfolio and Service Business templates

Portfolio and Service Business were added as the next supported app types because they are broadly useful, fit the existing CMS/admin/theme architecture, and can be generated without adding payments, tenant mode, booking workflow, subscriptions, owner dashboards, or complex roles.

Portfolio focuses on project credibility: selected work, skills, services, testimonials, notes, and a project inquiry path. Service Business focuses on qualified inquiry: services, package comparison, process steps, case studies, FAQ, and request-a-quote copy.

Both templates reuse the shared base app, Firebase client, admin CMS shell, theme system, contact service, generated rules, and SEO routes. App-specific code stays inside `templates/next/app-types/*` so future templates do not fork the base app.

## App-type-specific contact subjects

The shared contact section derives its three subject chips from the generated app type. This keeps the base component reusable while preventing mismatched Product Catalog labels from leaking into Portfolio, Service Business, Landing Page, or Company Profile sites.

## Template-specific CMS collections

The CMS should stay different per template instead of becoming a generic one-size-fits-all editor. The shared base owns auth, admin shell, Firestore CRUD helpers, upload handling, theme settings, contact messages, and rules. Each app type owns the schema, form tabs, public query behavior, and collection names that match that template's real content model.

Product Catalog keeps `products` and `categories`. Portfolio now uses `portfolioProjects`, `portfolioServices`, `portfolioTestimonials`, and `portfolioNotes`. Service Business now uses `serviceBusinessServices`, `serviceBusinessPackages`, `serviceBusinessProcess`, `serviceBusinessCaseStudies`, and `serviceBusinessFaqs`. Company Profile now uses `companyServices`, `companyCaseStudies`, and `companyTeamMembers`.

Repeated records use `published` flags and public pages read them through published-only collection helpers. Top-level hero, SEO, and page-level copy remain in the `cms/{templateId}` document. This keeps the MVP simple while giving each generated admin dashboard a CMS shape that feels native to the selected template.

## Product Catalog fashion storefront direction

The Product Catalog homepage now follows a fashion/lifestyle storefront composition instead of the previous generic catalog composition. The reference target used a campaign hero, visual category shelves, repeated product rails, promo panels, trust/service strips, and a dark footer; those patterns were adopted without copying brand names, logos, or source images.

A generated bitmap hero image is bundled at `/template-visuals/product-fashion-hero.png` so the generated project has a strong first viewport without depending on external stock URLs. Product cards still use CSS-generated neutral visuals from CMS product data to keep package size controlled and avoid shipping a large image library before the MVP needs it.

The template remains inquiry-led, not checkout-led. Product cards use ecommerce-like metadata, sale/original price treatment, and direct availability CTAs, but no cart or payment flow was added because subscriptions, checkout, and broader commerce infrastructure are outside the current MVP scope.
