# __PROJECT_NAME__

Created with Web Template Wizard.

## Project Overview

This is a responsive Next.js website generated for `__APP_DISPLAY_NAME__`. It includes a public website, admin login, CMS-ready content, Firebase Auth, Firestore, Firebase Storage, contact messages, SEO defaults, and theme color settings.

Product Catalog projects include:

- Product and category pages
- Search, category filters, and sort UI
- Product detail pages with specifications and inquiry CTA
- Admin CMS forms for products, categories, catalog copy, and SEO
- Contact form and admin message inbox

Portfolio projects include:

- Project cards with stack, impact, and optional links
- Services, testimonials, notes, skills, and contact
- Template-specific CMS collections for projects, services, testimonials, and notes
- CMS fields for profile, skills, SEO, and theme settings

Service Business projects include:

- Services, packages, process steps, case studies, FAQ, and contact
- Template-specific CMS collections for service offers, packages, process steps, case studies, and FAQ
- Contact form and admin message inbox

## Install

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run qa:routes
```

## Configure Firebase

1. Create a Firebase project.
2. Add a Web App in Firebase project settings.
3. Enable Email/Password sign-in in Firebase Auth.
4. Create a Firestore database.
5. Enable Firebase Storage.
6. Copy `.env.example` to `.env.local` and fill in the public Firebase web app values.

## Environment Variables

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com
NEXT_PUBLIC_SHOW_ADMIN_LINK=false
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The website renders with fallback content when Firebase is not configured. Firebase is required for saving CMS content, template-specific collection records, products, categories, theme settings, uploaded images, and contact messages.

`NEXT_PUBLIC_ADMIN_EMAILS` controls the client-side admin gate. It does not update deployed Firestore or Storage rules by itself.

`NEXT_PUBLIC_SHOW_ADMIN_LINK=true` shows an Admin link in the public header. Keep it `false` for a cleaner production public site and use `/admin/login` directly.

`NEXT_PUBLIC_SITE_URL` is used by generated `robots.txt` and `sitemap.xml`. Use your deployed site URL in production.

## QA Smoke Check

Run the app, then check important generated routes:

```bash
npm run dev
QA_BASE_URL=http://localhost:3000 npm run qa:routes
```

The script checks public routes and `/admin/login`. Product Catalog projects also check `/products`, `/about`, and `/contact`.

## First Admin

For this release, create the first admin manually in Firebase Authentication:

1. Open Firebase Console.
2. Go to Authentication -> Users.
3. Add a user with email and password.
4. Add that email to `NEXT_PUBLIC_ADMIN_EMAILS`.
5. Replace `admin@example.com` with the same email in `firestore.rules` and `storage.rules`.

This avoids public admin registration. For stricter production setups, migrate the `isAdmin()` rule to Firebase custom claims.

## Security Rules

Deploy the generated Firestore and Storage rules:

```bash
firebase deploy --only firestore:rules,storage
```

Before deploying, replace `admin@example.com` in both rule files. If the env allowlist and rule allowlist do not match, the admin UI may let you sign in while Firestore or Storage writes are rejected.

## Troubleshooting

- Public site is visible but CMS saves fail: check `.env.local` and confirm Firestore is enabled.
- Admin sign-in works but saves/uploads fail: keep `NEXT_PUBLIC_ADMIN_EMAILS`, `firestore.rules`, and `storage.rules` allowlists in sync.
- Contact form says Firestore is not configured: add Firebase Web App values to `.env.local` and restart `npm run dev`.
- Product detail 404: publish the product and keep its stable slug/ID.
- Template-specific records are missing publicly: publish the record and confirm the matching Firestore rules have been deployed.

## Admin Dashboard

Go to `/admin/login`, sign in with the allowlisted admin email, then manage:

- CMS content
- Products and categories
- Template-specific records such as projects, services, packages, testimonials, notes, team members, case studies, and FAQ
- Product images
- Featured products
- Product status and specifications
- Product detail SEO
- WhatsApp/contact CTA
- Theme colors
- Contact messages

## Catalog Content

Product Catalog content uses this Firestore structure:

```text
siteSettings/
  theme
  seo
  general
  catalog

cms/
  productCatalog

products/
  {productId}

categories/
  {categoryId}

messages/
  {messageId}
```

Use stable product IDs because they become product detail URLs such as `/products/modular-oak-desk`.

Other templates keep top-level page copy in `cms/{templateId}` and store repeated business records in template-specific collections:

```text
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
```

## Theme Colors

Admin users can edit primary, secondary, accent, background, text color, and border radius in `/admin/settings`. Values are saved in Firestore under `siteSettings/theme` and applied to the public website through CSS variables.

If Firebase is not configured yet, the website uses safe default theme values.

## Deploy

Deploy to Vercel, Firebase Hosting, or another Next.js-compatible host. Set all environment variables in your hosting provider before building.
