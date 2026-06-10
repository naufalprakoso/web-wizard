# Web Template Wizard

Web Template Wizard is an open-source CLI for building responsive website templates with CMS, admin dashboard, Firebase, and theme settings.

Product Catalog demo photography is bundled locally as optimized WebP files.
Generated sites do not require an image API or image API key; source and
license details are included in the generated `THIRD_PARTY_ASSETS.md`.

```bash
npx web-template-wizard create my-website
```

The interactive CLI asks for both:

- **Project folder name**, used for the folder and npm package name
- **Website name**, shown in the generated header, footer, README, and SEO metadata

For scripts or CI, provide the website name directly:

```bash
npx web-template-wizard create my-website --site-name "Northstar Studio"
```

For local development:

```bash
npm run dev -- create my-website
```

## What It Generates

- Public responsive website
- Admin login and dashboard
- CMS-backed content
- Firebase Auth
- Firestore
- Firebase Storage
- Theme color settings
- SEO metadata setup
- Custom 404 page
- Contact form
- Firestore and Storage rules
- `.env.example`
- Setup README
- Product search/filter UI for Product Catalog websites
- Product/category CMS structure for Product Catalog websites
- Product Catalog homepage CMS for hero banners, promotions, rail titles, brand/benefit strips, ratings, sold counts, and compare-at prices
- Project, service, package, testimonial, and FAQ CMS structures for the newer Portfolio and Service Business templates

## Installation

```bash
npm install
npm run build
```

## Local Development

Run the CLI locally with:

```bash
npm run dev -- create my-website
```

Generate a specific template:

```bash
npm run dev -- create company-site --app-type company-profile --frontend next --storage firebase-storage
npm run dev -- create catalog-site --site-name "Northstar Market" --app-type product-catalog --frontend next --storage firebase-storage
npm run dev -- create portfolio-site --app-type portfolio --frontend next --storage firebase-storage
npm run dev -- create service-site --app-type service-business --frontend next --storage firebase-storage
```

The generated app then runs with:

```bash
cd my-website
npm install
npm run dev
```

## CLI Examples

```bash
npm run dev -- create my-website
npm run dev -- create acme-site --app-type company-profile
npm run dev -- create catalog-site --app-type product-catalog --frontend next --storage firebase-storage
npm run dev -- create freelancer-site --app-type portfolio
npm run dev -- create studio-site --app-type service-business
```

The published command target is:

```bash
npx web-template-wizard create my-website
```

Package builds expose the executable as:

```bash
web-template-wizard create my-website
```

## Accessing the Generated CMS

After generating a project, start the generated Next.js app:

```bash
cd my-website
npm install
npm run dev
```

Open the CMS login page:

```text
http://localhost:3000/admin/login
```

After signing in as an allowlisted admin, use these admin routes:

```text
/admin/dashboard  - overview and contact messages
/admin/cms        - edit template-specific CMS content
/admin/settings   - edit theme colors and radius
```

Firebase is required for saving CMS changes. Create an Email/Password user in Firebase Authentication, add the same email to `NEXT_PUBLIC_ADMIN_EMAILS`, and replace `admin@example.com` in the generated `firestore.rules` and `storage.rules` before deploying rules.

## Supported App Types

- Landing Page
- Company Profile
- Product Catalog Website
- Portfolio Website
- Service Business Website

## Frontend

- Next.js App Router: fully supported
- React.js: planned
- Nuxt.js: planned

If React.js or Nuxt.js is selected interactively, the CLI explains that it is planned and asks whether to continue with Next.js. In non-interactive/scripted runs, it prints a warning and generates the stable Next.js template instead so automation does not hang.

## Storage

- Firebase Storage: fully supported
- Bunny.net: planned
- No Storage: planned

If Bunny.net or No Storage is selected interactively, the CLI explains that it is planned and asks whether to continue with Firebase Storage. In non-interactive/scripted runs, it prints a warning and generates the stable Firebase Storage template instead.

## Template Architecture

Web Template Wizard uses a modular template system to avoid a separate full project template for every combination:

```text
Core Engine
+ Frontend Base Template
+ App Type Template
+ CMS Schema
+ Admin Pages
+ Theme Preset
+ Storage Adapter
```

The generator starts from `templates/next/base`, merges generated Firebase rules from `templates/next/modules/firestore-rules`, then overlays one of the supported app types from `templates/next/app-types/*`.

The base template owns shared Next.js, Firebase client, admin, CMS services, theme, contact, layout, and UI components. App-type templates own public pages, app-specific CMS schema/defaults/forms, sections, theme presets, and any template-specific CMS collections.

## Firestore Structure

```text
siteSettings/
  theme
  seo
  general

cms/
  landingPage
  companyProfile
  productCatalog
  portfolio
  serviceBusiness

products/
  {productId}

categories/
  {categoryId}

portfolioProjects/
portfolioServices/
portfolioTestimonials/
portfolioNotes/

serviceBusinessServices/
serviceBusinessPackages/
serviceBusinessProcess/
serviceBusinessCaseStudies/
serviceBusinessFaqs/

companyServices/
companyCaseStudies/
companyTeamMembers/

messages/
  {messageId}
```

## Security Model

Projects created by the CLI use one role: admin. Public visitors can read published content and submit contact messages. Admin users can write CMS content, manage theme settings, and upload safe images.

Admin access is based on an email allowlist for this release. The project README and security rules explain how to create the first admin safely and how to migrate to custom claims later.

## Roadmap

- Optional Firebase custom claims script
- React.js and Nuxt.js frontend adapters
- Bunny.net and no-storage modes
- Additional app types through the same modular template boundary

## Contributing

Keep changes modular:

- Shared behavior belongs in the frontend base template or modules.
- App-specific public UI, CMS schema, default content, and admin form belong in the app type template.
- Avoid duplicating Firebase, theme, auth, or CRUD logic across app types.
- Keep generated projects runnable with `npm install` and `npm run dev`.
