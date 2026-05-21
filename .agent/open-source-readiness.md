# Open-Source Readiness Checklist

- [x] CLI works
- [x] Generated project builds
- [x] Generated project runs
- [x] Product Catalog template is polished
- [x] Admin dashboard works
- [x] CMS structure is ready
- [x] Theme settings work
- [x] Firebase rules exist
- [x] Storage rules exist
- [x] README is clear
- [x] `.env.example` is clear
- [x] No hardcoded local path in generated output
- [x] No branded copyrighted sample images
- [x] No lorem ipsum in main content
- [x] No broken links found in checked Product Catalog routes
- [x] No crashing placeholder pages found
- [x] Responsive desktop/mobile checked
- [x] Roadmap documented
- [x] Contribution guide present

## Verification evidence

- Root CLI build passed with `npm run build`.
- Fresh Product Catalog, Landing Page, and Company Profile projects were generated after fixes.
- `npm install` completed in all three final generated projects.
- `npm run typecheck && npm run build` passed in all three final generated projects.
- Product Catalog dev server ran on `http://localhost:3211`.
- Browser QA checked `/`, `/products`, `/products/modular-oak-desk`, `/about`, `/contact`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, and `/admin/settings`.
- Product search/filter interaction was exercised.
- Desktop and mobile screenshots were captured for `/products`:
  - `/tmp/web-wizard-review/screenshots/product-desktop.png`
  - `/tmp/web-wizard-review/screenshots/product-mobile.png`
- Follow-up generated Product Catalog passed install, typecheck, build, and route smoke after removing the fake default WhatsApp URL.

## Remaining documented tradeoffs

- Admin allowlist is duplicated in env and Firebase rules for MVP simplicity; generated docs call this out.
- Category/product relationship uses category names rather than category IDs; suitable for the simple MVP, but category rename handling belongs in a future CMS modeling pass.
- Field-level admin form validation remains polish work.
- Generated Product Catalog no longer ships a fake WhatsApp URL; inquiry CTAs use `/contact` until a real URL is configured.
