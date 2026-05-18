# Web Template Wizard

Web Template Wizard is an open-source CLI for building responsive website templates with CMS, admin dashboard, Firebase, and theme settings.

```bash
npx web-template-wizard create my-website
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
- Contact form
- Firestore and Storage rules
- `.env.example`
- Setup README

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
npm run dev -- create company-site -- --app-type company-profile --frontend next --storage firebase-storage
npm run dev -- create catalog-site -- --app-type product-catalog --frontend next --storage firebase-storage
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
npm run dev -- create acme-site -- --app-type company-profile
npm run dev -- create catalog-site -- --app-type product-catalog --frontend next --storage firebase-storage
```

The published command target is:

```bash
npx web-template-wizard create my-website
```

Package builds expose the executable as:

```bash
web-template-wizard create my-website
```

## Supported App Types

- Landing Page
- Company Profile
- Product Catalog Website

## Frontend

- Next.js App Router only

Passing any other frontend to `--frontend` exits with a clear error.

## Storage

- Firebase Storage only

Passing any other storage adapter to `--storage` exits with a clear error.

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

The generator starts from `templates/next/base`, merges one of the three supported app types from `templates/next/app-types/*`, then merges required Firebase/CMS/admin/theme/contact/SEO modules from `templates/next/modules/*`.

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

products/
  {productId}

categories/
  {categoryId}

messages/
  {messageId}
```

## Security Model

Projects created by the CLI use one role: admin. Public visitors can read published content and submit contact messages. Admin users can write CMS content, manage theme settings, and upload safe images.

Admin access is based on an email allowlist for this release. The project README and security rules explain how to create the first admin safely and how to migrate to custom claims later.

## Roadmap

- Optional Firebase custom claims script
- Sitemap and robots generation
- Additional app types and adapters can be added later through the same modular template boundary, but they are not exposed by the CLI today.

## Contributing

Keep changes modular:

- Shared behavior belongs in the frontend base template or modules.
- App-specific public UI, CMS schema, default content, and admin form belong in the app type template.
- Avoid duplicating Firebase, theme, auth, or CRUD logic across app types.
- Keep generated projects runnable with `npm install` and `npm run dev`.
