# Open-Source Readiness Checklist

- [x] CLI works
- [x] Generated project builds
- [x] Generated project runs
- [x] Product Catalog template is polished
- [x] Portfolio template works and builds
- [x] Service Business template works and builds
- [x] Admin dashboard works
- [x] CMS structure is ready
- [x] Template-specific CMS CRUD exists for repeated records
- [x] Theme settings work
- [x] Firebase rules exist
- [x] Storage rules exist
- [x] README is clear
- [x] `.env.example` is clear
- [x] No hardcoded local path in generated output
- [x] No branded copyrighted sample images
- [x] Demo image sources and licenses documented
- [x] Demo images require no runtime image API or API key
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
- Fresh Product Catalog with bundled local product photography passed install,
  typecheck, build, route smoke, desktop/mobile browser QA, image loading
  checks, and runtime scans for image-provider API/CDN dependencies.
- Desktop and mobile screenshots were captured for `/products`:
  - `/tmp/web-wizard-review/screenshots/product-desktop.png`
  - `/tmp/web-wizard-review/screenshots/product-mobile.png`
- Follow-up generated Product Catalog passed install, typecheck, build, and route smoke after removing the fake default WhatsApp URL.
- Landing-page improvement pass generated fresh Product Catalog, Landing Page, and Company Profile projects under `/tmp/web-wizard-landing-final2`.
- All three `final2` projects passed `npm install` and `npm run typecheck && npm run build`.
- Runtime QA checked Product Catalog routes `/`, `/products`, `/products/ceramic-task-lamp`, `/about`, `/contact`, `/admin/login`, `/admin/dashboard`, `/admin/cms`, and `/admin/settings`.
- Product Catalog search/filter interaction passed with `/products?q=lamp&category=Home`.
- Desktop and mobile screenshots were captured for all three supported MVP templates:
  - `/tmp/web-wizard-landing-final2/screenshots/product-desktop.png`
  - `/tmp/web-wizard-landing-final2/screenshots/product-mobile-playwright.png`
  - `/tmp/web-wizard-landing-final2/screenshots/landing-desktop.png`
  - `/tmp/web-wizard-landing-final2/screenshots/landing-mobile-playwright.png`
  - `/tmp/web-wizard-landing-final2/screenshots/company-desktop.png`
  - `/tmp/web-wizard-landing-final2/screenshots/company-mobile-playwright.png`
- Mobile overflow check passed for Product Catalog, Landing Page, and Company Profile at 390px viewport.
- Pass 3 generated Product Catalog, Landing Page, and Company Profile projects under `/tmp/web-wizard-landing-pass3`.
- Pass 3 verified all three projects with `npm install`, `npm run typecheck && npm run build`, runtime route smoke, mobile overflow checks, and screenshots.
- Generated `qa:routes` passed for Product Catalog, Landing Page, and Company Profile.
- Generated projects now include `robots.txt`, `sitemap.xml`, local default visuals, CMS repeater fields, and contact subject chips.
- Fresh Portfolio and Service Business projects were generated under `/tmp/web-wizard-new-templates`.
- Portfolio and Service Business both passed `npm install`, `npm run typecheck && npm run build`, `npm run qa:routes`, runtime route checks, desktop screenshot checks, and 390px mobile overflow checks.
- Portfolio screenshots:
  - `/tmp/web-wizard-new-templates/screenshots-final/portfolio-desktop.png`
  - `/tmp/web-wizard-new-templates/screenshots-final/portfolio-mobile.png`
- Service Business screenshots:
  - `/tmp/web-wizard-new-templates/screenshots-final/service-desktop.png`
  - `/tmp/web-wizard-new-templates/screenshots-final/service-mobile.png`
- Template-specific CMS collection pass generated Portfolio, Service Business, and Company Profile projects under `/tmp/web-wizard-template-cms`.
- All three CMS collection projects passed `npm install`, `npm run typecheck && npm run build`, `npm run qa:routes`, runtime route checks, and 390px mobile overflow checks.
- CMS collection screenshots:
  - `/tmp/web-wizard-template-cms/screenshots/portfolio-desktop.png`
  - `/tmp/web-wizard-template-cms/screenshots/portfolio-mobile.png`
  - `/tmp/web-wizard-template-cms/screenshots/service-desktop.png`
  - `/tmp/web-wizard-template-cms/screenshots/service-mobile.png`
  - `/tmp/web-wizard-template-cms/screenshots/company-desktop.png`
  - `/tmp/web-wizard-template-cms/screenshots/company-mobile.png`

## Remaining documented tradeoffs

- Admin allowlist is duplicated in env and Firebase rules for MVP simplicity; generated docs call this out.
- Category/product relationship uses category names rather than category IDs; suitable for the simple MVP, but category rename handling belongs in a future CMS modeling pass.
- Field-level admin form validation remains polish work.
- Generated Product Catalog no longer ships a fake WhatsApp URL; inquiry CTAs use `/contact` until a real URL is configured.
- The newest Portfolio and Service Business templates are intentionally CMS-ready inquiry sites, not booking, payment, subscription, or CRM systems.
- Collection item ordering currently follows collection query order/timestamps rather than a dedicated manual sort field.
