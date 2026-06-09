import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactSection } from "@/components/sections/ContactSection";
import { CatalogExplorer, ProductVisual } from "@/components/sections/CatalogExplorer";
import { getPublishedCmsDocument, listPublishedCollection } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { defaultCategories, defaultProducts, productCatalogDefaultContent } from "@/lib/app-type/cms/default-content";
import type { Category, Product } from "@/lib/app-type/cms/schema";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedCmsDocument("productCatalog", productCatalogDefaultContent);
  return buildMetadata(content?.seoTitle ?? productCatalogDefaultContent.seoTitle, content?.seoDescription ?? productCatalogDefaultContent.seoDescription);
}

export default async function ProductCatalogPage() {
  const [content, dbProducts, dbCategories] = await Promise.all([
    getPublishedCmsDocument("productCatalog", productCatalogDefaultContent),
    listPublishedCollection<Product>("products"),
    listPublishedCollection<Category>("categories")
  ]);
  if (!content) notFound();

  const products = normalizeProducts(dbProducts ?? defaultProducts).filter((item) => item.published);
  const categories = (dbCategories ?? defaultCategories).filter((item) => item.published);
  const featured = products.filter((product) => product.featured);
  const heroProducts = (featured.length > 0 ? featured : products).slice(0, 4);
  const accessoryProducts = products.filter((product) => ["Accessories", "Sneakers", "Beauty"].includes(product.category)).slice(0, 4);
  const clothingProducts = products.filter((product) => product.category === "Clothing").slice(0, 4);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="bg-white px-4 py-5 md:py-8">
          <div className="mx-auto grid max-w-[1480px] gap-5 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="relative min-h-[560px] overflow-hidden rounded-[32px] bg-zinc-950 text-white shadow-[0_30px_90px_rgba(17,17,17,0.16)]">
              <img
                src="/template-visuals/product-fashion-hero.png"
                alt="Editorial fashion campaign with neutral modern outfits"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/34 to-transparent" />
              <div className="relative flex min-h-[560px] max-w-xl flex-col justify-between p-6 md:p-10 lg:p-12">
                <div className="flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.24em]">
                  <span className="rounded-full bg-white px-4 py-2 text-zinc-950">Limited edit</span>
                  <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-white backdrop-blur">Spring 2026</span>
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.28em] text-white/70">Fashion campaign</p>
                  <h1 className="mt-4 max-w-3xl break-words text-5xl font-black leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
                    {content.headline}
                  </h1>
                  <p className="mt-6 max-w-lg text-base leading-8 text-white/80 md:text-lg">{content.subtitle}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href="#products" variant="secondary" className="rounded-full">Shop the edit</ButtonLink>
                    <ButtonLink href={content.whatsappUrl || "/contact"} variant="ghost" className="rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20">
                      {content.whatsappUrl ? "Chat stylist" : "Contact us"}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
              <CampaignCard eyebrow="Exclusive offer" title="New streetwear drops" body="Campaign-ready product sections for seasonal retail edits." href="#products" tone="bg-[#fce7f3]" />
              <CampaignCard eyebrow="Accessories" title="Bags, sneakers, beauty" body="Use categories and rails to separate collections visually." href="#categories" tone="bg-[#ede9fe]" />
            </div>
          </div>
        </section>

        <section id="categories" className="border-y border-zinc-200 bg-white py-10 md:py-12">
          <div className="mx-auto max-w-[1480px] px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f97316]">Popular categories</p>
                <h2 className="mt-3 text-3xl font-black leading-tight text-zinc-950 md:text-4xl">Browse the shelves faster.</h2>
              </div>
              <ButtonLink href="/products" variant="ghost" className="rounded-full border border-zinc-200 text-zinc-950 hover:bg-zinc-100">View all products</ButtonLink>
            </div>
            {categories.length === 0 ? (
              <Card className="mt-8 p-6">
                <p className="font-black text-zinc-950">No categories published yet.</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">Add categories in the admin CMS to guide visitors through your catalog.</p>
              </Card>
            ) : (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.slice(0, 8).map((category, index) => (
                  <a
                    key={category.id ?? category.name}
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="group overflow-hidden rounded-[28px] border border-zinc-200 bg-[#f8f5ef] shadow-[0_18px_60px_rgba(17,17,17,0.05)] transition hover:-translate-y-1 hover:border-zinc-950 hover:bg-white hover:shadow-[0_24px_80px_rgba(17,17,17,0.1)]"
                  >
                    <div className={`relative aspect-[4/3] overflow-hidden ${categoryTone(category.name)}`}>
                      <div className="absolute inset-x-8 bottom-0 h-[72%] rounded-t-full bg-white/50 shadow-2xl backdrop-blur" />
                      <div className="absolute left-6 top-6 rounded-full bg-white/80 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-zinc-700">0{index + 1}</div>
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#f97316]">{category.featured ? "Featured shelf" : "Catalog shelf"}</p>
                      <h3 className="mt-2 text-2xl font-black text-zinc-950">{category.name}</h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">{category.description}</p>
                      <p className="mt-5 text-sm font-black text-zinc-950 transition group-hover:text-[#f97316]">Explore category</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <ProductRail title="Today's best deals" products={heroProducts} ctaLabel={content.whatsappCta} />

        <section className="bg-white px-4 py-8">
          <div className="mx-auto grid max-w-[1480px] gap-5 lg:grid-cols-3">
            <PromoTile title="Spring outfit picks" label="Shop now" tone="from-orange-100 via-rose-50 to-stone-100" />
            <PromoTile title="Daily sneakers edit" label="Explore" tone="from-blue-100 via-slate-50 to-stone-100" />
            <PromoTile title="Essential accessories" label="View collection" tone="from-purple-100 via-pink-50 to-stone-100" />
          </div>
        </section>

        {accessoryProducts.length > 0 ? <ProductRail title="Accessories, sneakers, and beauty" products={accessoryProducts} ctaLabel={content.whatsappCta} /> : null}

        <section id="products" className="border-y border-zinc-200 bg-[#f8f5ef] py-14 md:py-16">
          <div className="mx-auto max-w-[1480px] px-4">
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f97316]">Style finder</p>
                <h2 className="mt-3 text-3xl font-black leading-tight text-zinc-950 md:text-5xl">Search, filter, and sort the collection.</h2>
              </div>
              <p className="max-w-2xl leading-8 text-zinc-600 lg:justify-self-end">Visitors can search by product, category, material, or availability. The CMS controls what is published, while the public page keeps the shopping flow fast and visual.</p>
            </div>
            <div className="mt-8">
              <CatalogExplorer products={products} categories={categories} ctaLabel={content.whatsappCta} />
            </div>
          </div>
        </section>

        {clothingProducts.length > 0 ? <ProductRail title="Clothing deals" products={clothingProducts} ctaLabel={content.whatsappCta} /> : null}

        <section id="about" className="bg-white py-14 md:py-16">
          <div className="mx-auto max-w-[1480px] px-4">
            <div className="grid overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-950 text-white lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-6 md:p-10">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f97316]">Why this template works</p>
                <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">{content.trustHeadline}</h2>
                <p className="mt-5 max-w-xl leading-8 text-white/70">{content.about}</p>
              </div>
              <div className="grid border-t border-white/10 sm:grid-cols-3 lg:border-l lg:border-t-0">
                {content.trustPoints.map((item, index) => (
                  <div key={item} className="border-b border-white/10 p-6 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-black text-zinc-950">0{index + 1}</span>
                    <p className="mt-5 text-sm font-bold leading-6 text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                { value: `${products.length}+`, label: "Published products" },
                { value: `${categories.length}`, label: "Category shelves" },
                { value: "CMS", label: "Editable content" },
                { value: "24/7", label: "Public discovery" }
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(17,17,17,0.05)]">
                  <p className="text-3xl font-black text-zinc-950">{item.value}</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BrandStrip />
        <ServiceStrip />
        <ContactSection title="Need product guidance?" subtitle="Tell us what you are looking for and our team will help shortlist the right option." />
      </main>
      <PublicFooter />
    </>
  );
}

function CampaignCard({ eyebrow, title, body, href, tone }: { eyebrow: string; title: string; body: string; href: string; tone: string }) {
  return (
    <a href={href} className={`group grid min-h-[270px] content-between overflow-hidden rounded-[32px] border border-zinc-200 ${tone} p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(17,17,17,0.12)]`}>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">{eyebrow}</p>
        <h2 className="mt-3 max-w-xs text-3xl font-black leading-tight text-zinc-950">{title}</h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-600">{body}</p>
      </div>
      <span className="inline-flex w-fit rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white transition group-hover:bg-[#f97316]">Explore</span>
    </a>
  );
}

function ProductRail({ title, products, ctaLabel }: { title: string; products: Product[]; ctaLabel: string }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-white py-12 md:py-14">
      <div className="mx-auto max-w-[1480px] px-4">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-black leading-tight text-zinc-950 md:text-4xl">{title}</h2>
          <ButtonLink href="/products" variant="ghost" className="rounded-full border border-zinc-200 text-zinc-950 hover:bg-zinc-100">See all</ButtonLink>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <a key={product.id ?? product.name} href={`/products/${product.id ?? encodeURIComponent(product.name)}`} className="group overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(17,17,17,0.05)] transition hover:-translate-y-1 hover:border-zinc-950 hover:shadow-[0_24px_80px_rgba(17,17,17,0.1)]">
              <ProductVisual product={product} className="aspect-[4/5] w-full" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#c2410c]">{product.status}</span>
                  <span className="text-xs font-black text-amber-500">4.{ratingSeed(product.name)} · {soldSeed(product.name)} sold</span>
                </div>
                <h3 className="mt-3 text-xl font-black leading-tight text-zinc-950">{product.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">{product.shortDescription || product.description}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="flex items-baseline gap-2">
                    {product.price ? <span className="text-lg font-black text-zinc-950">{product.price}</span> : <span className="text-lg font-black text-zinc-950">Ask</span>}
                    {product.price ? <span className="text-xs font-bold text-zinc-400 line-through">{oldPrice(product.price)}</span> : null}
                  </span>
                  <span className="rounded-full bg-zinc-950 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition group-hover:bg-[#f97316]">{ctaLabel}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoTile({ title, label, tone }: { title: string; label: string; tone: string }) {
  return (
    <a href="/products" className={`group relative min-h-[250px] overflow-hidden rounded-[30px] bg-gradient-to-br ${tone} p-6 shadow-[0_18px_60px_rgba(17,17,17,0.06)] transition hover:-translate-y-1`}>
      <div className="absolute bottom-0 right-8 h-[76%] w-[36%] rounded-t-full bg-white/50 shadow-2xl backdrop-blur" />
      <div className="relative flex min-h-[202px] flex-col justify-between">
        <h2 className="max-w-xs text-3xl font-black leading-tight text-zinc-950">{title}</h2>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-950 transition group-hover:text-[#f97316]">{label}</p>
      </div>
    </a>
  );
}

function BrandStrip() {
  return (
    <section className="border-y border-zinc-200 bg-white py-8">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 text-sm font-black uppercase tracking-[0.22em] text-zinc-400">
        {["City Edit", "Local Studio", "Daily Mode", "Soft Essentials", "Weekend Wear", "Market Select"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function ServiceStrip() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto grid max-w-[1480px] gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Free pick up", "Collect local orders in store"],
          ["Fast shipping", "Clear delivery notes"],
          ["Flexible payment", "Inquiry-first purchase path"],
          ["Convenient help", "Product questions stay visible"]
        ].map(([title, body]) => (
          <div key={title} className="rounded-[24px] border border-zinc-200 bg-white p-5 text-center shadow-[0_18px_60px_rgba(17,17,17,0.04)]">
            <span className="mx-auto block h-10 w-10 rounded-full bg-[#f8f5ef]" />
            <p className="mt-4 font-black text-zinc-950">{title}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-500">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function categoryTone(name: string) {
  const tones = [
    "bg-gradient-to-br from-orange-100 via-rose-50 to-stone-100",
    "bg-gradient-to-br from-blue-100 via-slate-50 to-stone-100",
    "bg-gradient-to-br from-purple-100 via-pink-50 to-stone-100",
    "bg-gradient-to-br from-emerald-100 via-stone-50 to-zinc-100"
  ];
  const index = name.length % tones.length;
  return tones[index];
}

function normalizeProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    shortDescription: product.shortDescription || product.description,
    specifications: product.specifications ?? []
  }));
}

function priceNumber(value?: string) {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}

function oldPrice(value?: string) {
  const price = priceNumber(value);
  if (!Number.isFinite(price) || price === Number.MAX_SAFE_INTEGER) return "";
  return `$${Math.round(price * 1.32)}`;
}

function ratingSeed(value: string) {
  return 6 + (value.length % 4);
}

function soldSeed(value: string) {
  return 320 + value.length * 37;
}
