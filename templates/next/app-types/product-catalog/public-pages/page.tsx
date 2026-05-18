import type { Metadata } from "next";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactSection } from "@/components/sections/ContactSection";
import { CatalogExplorer, ProductVisual } from "@/components/sections/CatalogExplorer";
import { getCmsDocument, listCollection } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { defaultCategories, defaultProducts, productCatalogDefaultContent } from "@/lib/app-type/cms/default-content";
import type { Category, Product } from "@/lib/app-type/cms/schema";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsDocument("productCatalog", productCatalogDefaultContent);
  return buildMetadata(content.seoTitle, content.seoDescription);
}

export default async function ProductCatalogPage() {
  const [content, dbProducts, dbCategories] = await Promise.all([
    getCmsDocument("productCatalog", productCatalogDefaultContent),
    listCollection<Product>("products"),
    listCollection<Category>("categories")
  ]);
  const products = normalizeProducts(dbProducts.length > 0 ? dbProducts : defaultProducts).filter((item) => item.published);
  const categories = (dbCategories.length > 0 ? dbCategories : defaultCategories).filter((item) => item.published);
  const featured = products.filter((product) => product.featured);
  const heroProducts = (featured.length > 0 ? featured : products).slice(0, 3);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="overflow-hidden bg-page py-14 md:py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-accent">Product catalog</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-primary sm:text-5xl lg:text-6xl">{content.headline}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{content.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#products">Browse products</ButtonLink>
                <ButtonLink href={content.whatsappUrl} variant="secondary">WhatsApp us</ButtonLink>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["CMS-ready", "Inquiry-first", "Mobile polished"].map((item) => (
                  <div key={item} className="rounded-theme border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm font-black text-primary">{item}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">Built into the generated catalog.</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr] sm:items-end">
              {heroProducts[0] ? (
                <div className="sm:pb-10">
                  <ProductVisual product={heroProducts[0]} className="aspect-[4/5] w-full rounded-theme shadow-xl" />
                </div>
              ) : null}
              <div className="grid gap-4">
                {heroProducts.slice(1, 3).map((product) => (
                  <ProductVisual key={product.id ?? product.name} product={product} className="aspect-[16/11] w-full rounded-theme shadow-lg" />
                ))}
                <div className="rounded-theme border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-widest text-accent">Catalog note</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{content.about}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="py-16 md:py-20">
          <div className="section-shell">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-accent">Categories</p>
                <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">Browse by category.</h2>
              </div>
              <ButtonLink href="/products" variant="ghost" className="justify-start md:justify-center">View all products</ButtonLink>
            </div>
            {categories.length === 0 ? (
              <Card className="mt-8 p-6">
                <p className="font-black text-primary">No categories published yet.</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Add categories in the admin CMS to guide visitors through your catalog.</p>
              </Card>
            ) : (
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {categories.map((category) => (
                  <Card key={category.id ?? category.name} className="p-5 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                    <p className="text-xs font-black uppercase tracking-widest text-accent">{category.featured ? "Featured" : "Category"}</p>
                    <h3 className="mt-3 text-xl font-black text-primary">{category.name}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{category.description}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="products" className="bg-slate-50 py-16 md:py-20">
          <div className="section-shell">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-widest text-accent">Products</p>
              <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">Search the catalog.</h2>
              <p className="mt-4 leading-7 text-slate-600">Filter by category, search by product detail, and sort the catalog without turning this into a checkout flow.</p>
            </div>
            <div className="mt-8">
              <CatalogExplorer products={products} categories={categories} ctaLabel={content.whatsappCta} />
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-accent">Why choose us</p>
              <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">{content.trustHeadline}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {(content.trustPoints.length > 0 ? content.trustPoints : productCatalogDefaultContent.trustPoints).map((point) => (
                <Card key={point} className="p-5">
                  <div className="mb-4 h-1.5 w-12 rounded-full bg-secondary" />
                  <p className="text-sm font-bold leading-6 text-slate-700">{point}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ContactSection title="Need product guidance?" subtitle="Tell us what you are looking for and our team will help shortlist the right option." />
      </main>
      <PublicFooter />
    </>
  );
}

function normalizeProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    shortDescription: product.shortDescription || product.description,
    specifications: product.specifications ?? []
  }));
}
