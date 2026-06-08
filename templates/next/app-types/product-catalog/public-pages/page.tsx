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
  const heroProducts = (featured.length > 0 ? featured : products).slice(0, 3);
  const stats = [
    { label: "Products", value: String(products.length) },
    { label: "Categories", value: String(categories.length) },
    { label: "Inquiry path", value: content.whatsappUrl ? "Direct chat" : "Contact form" }
  ];

  return (
    <>
      <PublicHeader />
      <main>
        <section className="overflow-hidden bg-slate-950 py-14 text-white md:py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="min-w-0">
              <div className="grid max-w-xl grid-cols-3 border-y border-white/15 py-4 text-center">
                {stats.map((item) => (
                  <div key={item.label} className="border-r border-white/10 px-3 last:border-r-0">
                    <p className="text-2xl font-black text-white">{item.value}</p>
                    <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-white/45">{item.label}</p>
                  </div>
                ))}
              </div>
              <h1 className="mt-8 max-w-4xl break-words text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">{content.headline}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">{content.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#products" variant="secondary">Browse products</ButtonLink>
                <ButtonLink href={content.whatsappUrl || "/contact"} variant="ghost" className="border border-white/15 text-white hover:bg-white/10">{content.whatsappUrl ? "WhatsApp us" : "Contact us"}</ButtonLink>
              </div>
            </div>
            <div className="grid min-w-0 gap-4 sm:grid-cols-[0.78fr_1.22fr] sm:items-end">
              {heroProducts[0] ? (
                <div className="sm:pb-14">
                  <ProductVisual product={heroProducts[0]} className="aspect-[4/5] w-full rounded-[28px] shadow-2xl shadow-black/40" />
                </div>
              ) : null}
              <div className="grid gap-4">
                {heroProducts.slice(1, 3).map((product) => (
                  <ProductVisual key={product.id ?? product.name} product={product} className="aspect-[16/11] w-full rounded-[28px] shadow-2xl shadow-black/30" />
                ))}
                {heroProducts.length > 0 ? (
                  <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur">
                    <p className="text-sm font-bold uppercase tracking-widest text-secondary">Featured stack</p>
                    <div className="mt-4 grid gap-3">
                      {heroProducts.map((product) => (
                        <a key={product.id ?? product.name} href={`/products/${product.id ?? encodeURIComponent(product.name)}`} className="grid grid-cols-[1fr_auto] gap-3 rounded-2xl bg-white p-3 text-slate-950 transition hover:bg-secondary">
                          <span>
                            <span className="block text-sm font-black text-primary">{product.name}</span>
                            <span className="mt-1 block text-xs font-semibold text-slate-500">{product.category} · {product.status}</span>
                          </span>
                          <span className="text-sm font-black text-primary">{product.price || "Ask"}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-theme border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                    <p className="text-sm font-bold uppercase tracking-widest text-accent">Catalog setup</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Publish your first product from the admin CMS to fill this hero area.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="bg-white py-16 md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[320px_1fr]">
            <div className="rounded-[28px] bg-primary p-6 text-white md:p-8">
              <p className="text-sm font-black uppercase tracking-widest text-secondary">Categories</p>
              <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">A guided shelf, not a flat product dump.</h2>
              <p className="mt-5 text-sm leading-7 text-white/70">Use category pages to separate use cases, compare product families, and move visitors toward the right product faster.</p>
              <ButtonLink href="/products" variant="secondary" className="mt-8">View all products</ButtonLink>
            </div>
            {categories.length === 0 ? (
              <Card className="p-6">
                <p className="font-black text-primary">No categories published yet.</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Add categories in the admin CMS to guide visitors through your catalog.</p>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {categories.map((category) => (
                  <a key={category.id ?? category.name} href={`/products?category=${encodeURIComponent(category.name)}`} className="group grid min-h-72 content-between overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-accent hover:bg-white hover:shadow-xl">
                    <div>
                      <div className={`mb-8 h-2 w-20 rounded-full ${categoryTone(category.name)}`} />
                      <p className="text-xs font-black uppercase tracking-widest text-accent">{category.featured ? "Featured shelf" : "Catalog shelf"}</p>
                      <h3 className="mt-3 text-2xl font-black leading-tight text-primary">{category.name}</h3>
                      <p className="mt-4 leading-7 text-slate-600">{category.description}</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4">
                      <p className="text-sm font-black text-primary transition group-hover:text-accent">Browse {category.name}</p>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-lg font-black text-primary shadow-sm transition group-hover:bg-secondary">→</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="products" className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="section-shell">
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-accent">Products</p>
                <h2 className="mt-3 text-3xl font-black text-primary md:text-5xl">Search, filter, and compare from one catalog surface.</h2>
              </div>
              <p className="max-w-2xl leading-8 text-slate-600 lg:justify-self-end">Filter by category, search by product detail, and sort the catalog without turning this into a checkout flow. Every card keeps inquiry context visible.</p>
            </div>
            <div className="mt-8">
              <CatalogExplorer products={products} categories={categories} ctaLabel={content.whatsappCta} />
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-20">
          <div className="section-shell">
            <div className="overflow-hidden rounded-[32px] bg-primary text-white">
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-white/10 p-7 md:p-10 lg:border-b-0 lg:border-r">
                  <p className="text-sm font-black uppercase tracking-widest text-secondary">Why choose us</p>
                  <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">{content.trustHeadline}</h2>
                  <p className="mt-6 max-w-xl leading-8 text-white/70">A catalog site should make selection feel safer: clear availability, practical guidance, and product data that stays editable from the CMS.</p>
                </div>
                <div className="grid gap-0 md:grid-cols-3">
                  {(content.trustPoints.length > 0 ? content.trustPoints : productCatalogDefaultContent.trustPoints).map((point, index) => (
                    <div key={point} className="border-b border-white/10 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-sm font-black text-slate-950">{index + 1}</span>
                      <p className="mt-8 text-lg font-black leading-7">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection title="Need product guidance?" subtitle="Tell us what you are looking for and our team will help shortlist the right option." />
      </main>
      <PublicFooter />
    </>
  );
}

function categoryTone(name: string) {
  const tones = ["bg-secondary", "bg-accent", "bg-primary"];
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
