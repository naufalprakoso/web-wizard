import type { Metadata } from "next";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactSection } from "@/components/sections/ContactSection";
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
  const products = (dbProducts.length > 0 ? dbProducts : defaultProducts).filter((item) => item.published);
  const categories = (dbCategories.length > 0 ? dbCategories : defaultCategories).filter((item) => item.published);
  const featured = products.filter((product) => product.featured);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="bg-stone-50 py-16">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-accent">Product catalog</p>
              <h1 className="mt-4 text-5xl font-black leading-tight text-primary md:text-6xl">{content.headline}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">{content.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#products">Browse products</ButtonLink>
                <ButtonLink href={content.whatsappUrl} variant="secondary">WhatsApp us</ButtonLink>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 2).map((product) => (
                <img key={product.name} className="aspect-[4/5] w-full rounded-theme object-cover shadow-xl" src={product.imageUrl} alt="" />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="section-shell">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-accent">Categories</p>
                <h2 className="mt-3 text-4xl font-black text-primary">Shop by intent.</h2>
              </div>
              <p className="max-w-xl leading-7 text-stone-600">{content.about}</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.name} className="p-5">
                  <h3 className="text-xl font-black text-primary">{category.name}</h3>
                  <p className="mt-3 leading-7 text-stone-600">{category.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="bg-white py-16">
          <div className="section-shell">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-widest text-accent">Products</p>
              <h2 className="mt-3 text-4xl font-black text-primary">Featured catalog.</h2>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <a key={product.id ?? product.name} href={`/products/${product.id ?? encodeURIComponent(product.name)}`} className="group rounded-theme border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <img className="aspect-[4/3] w-full rounded-theme object-cover" src={product.imageUrl} alt="" />
                  <div className="p-2">
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-xs font-black uppercase tracking-widest text-accent">{product.category}</p>
                      {product.price ? <p className="font-black text-primary">{product.price}</p> : null}
                    </div>
                    <h3 className="mt-2 text-xl font-black text-primary">{product.name}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600">{product.description}</p>
                    <p className="mt-4 text-sm font-black text-accent">{content.whatsappCta}</p>
                  </div>
                </a>
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
