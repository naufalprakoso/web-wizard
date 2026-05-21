import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProductVisual } from "@/components/sections/CatalogExplorer";
import { hasFirebaseConfig } from "@/lib/firebase/client";
import { getPublishedCmsDocument, getPublishedCollectionItem, listPublishedCollection } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { defaultProducts, productCatalogDefaultContent } from "@/lib/app-type/cms/default-content";
import type { Product } from "@/lib/app-type/cms/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

async function findProduct(slug: string): Promise<Product | null> {
  if (hasFirebaseConfig()) {
    const fromDb = await getPublishedCollectionItem<Product>("products", slug);
    return fromDb ? normalizeProduct(fromDb) : null;
  }

  const fallback = defaultProducts.find((product) => product.id === slug && product.published);
  return fallback ? normalizeProduct(fallback) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await findProduct(slug);
  if (!product) return buildMetadata("Product", "Product detail");
  return buildMetadata(product.seoTitle, product.seoDescription);
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [product, content, dbProducts] = await Promise.all([
    findProduct(slug),
    getPublishedCmsDocument("productCatalog", productCatalogDefaultContent),
    listPublishedCollection<Product>("products")
  ]);

  if (!product || !content) notFound();

  const allProducts = (dbProducts ?? defaultProducts).map(normalizeProduct).filter((item) => item.published);
  const relatedProducts = allProducts.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3);

  return (
    <>
      <PublicHeader />
      <main className="bg-page">
        <section className="section-shell py-6">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
            <a className="hover:text-accent" href="/">Home</a>
            <span>/</span>
            <a className="hover:text-accent" href="/products">Products</a>
            <span>/</span>
            <span className="text-primary">{product.name}</span>
          </nav>
        </section>

        <section className="section-shell grid gap-8 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="grid gap-4">
            <ProductVisual product={product} className="aspect-[4/3] w-full rounded-theme shadow-xl" />
            <div className="grid gap-3 sm:grid-cols-3">
              {[product.category, product.status, product.price || "Contact for price"].map((item) => (
                <div key={item} className="rounded-theme border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Detail</p>
                  <p className="mt-1 font-black text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <section className="rounded-theme border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-black text-slate-950">{product.category}</span>
              <span className="rounded-full bg-page px-4 py-2 text-sm font-black text-slate-700">{product.status}</span>
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight text-primary md:text-5xl">{product.name}</h1>
            {product.price ? <p className="mt-4 text-2xl font-black text-accent">{product.price}</p> : null}
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{product.shortDescription}</p>
            <p className="mt-4 leading-8 text-slate-600">{product.description}</p>
            <div className="mt-7 grid gap-3">
              <ButtonLink className="w-full sm:w-auto" href={content.whatsappUrl || "/contact"}>{content.whatsappCta}</ButtonLink>
              <a className="text-sm font-bold text-accent" href="/products">Back to catalog</a>
            </div>
          </section>
        </section>

        <section className="section-shell pb-16">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-accent">Specifications</p>
              <h2 className="mt-3 text-3xl font-black text-primary">Product details.</h2>
            </div>
            <Card className="overflow-hidden">
              {product.specifications.length === 0 ? (
                <p className="p-5 text-sm leading-6 text-slate-600">Specifications can be added from the admin CMS when more product details are available.</p>
              ) : (
                <dl className="divide-y divide-slate-200">
                  {product.specifications.map((item) => (
                    <div key={item.label} className="grid gap-1 p-5 sm:grid-cols-[180px_1fr]">
                      <dt className="text-sm font-black text-primary">{item.label}</dt>
                      <dd className="text-sm leading-6 text-slate-600">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </Card>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="section-shell">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-accent">Related products</p>
                <h2 className="mt-3 text-3xl font-black text-primary">More from {product.category}.</h2>
              </div>
              <ButtonLink href="/products" variant="ghost" className="justify-start md:justify-center">View all products</ButtonLink>
            </div>
            {relatedProducts.length === 0 ? (
              <Card className="mt-8 p-6">
                <p className="font-black text-primary">No related products yet.</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Publish more products in this category from the admin CMS to fill this section.</p>
              </Card>
            ) : (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((item) => (
                  <a key={item.id ?? item.name} href={`/products/${item.id}`} className="overflow-hidden rounded-theme border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-xl">
                    <ProductVisual product={item} className="aspect-[4/3] w-full" />
                    <div className="p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-accent">{item.category}</p>
                      <h3 className="mt-2 text-xl font-black text-primary">{item.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.shortDescription}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    shortDescription: product.shortDescription || product.description,
    specifications: product.specifications ?? []
  };
}
