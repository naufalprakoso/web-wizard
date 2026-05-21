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
