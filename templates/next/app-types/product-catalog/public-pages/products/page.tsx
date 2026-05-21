import type { Metadata } from "next";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { CatalogExplorer } from "@/components/sections/CatalogExplorer";
import { notFound } from "next/navigation";
import { getPublishedCmsDocument, listPublishedCollection } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { defaultCategories, defaultProducts, productCatalogDefaultContent } from "@/lib/app-type/cms/default-content";
import type { Category, Product } from "@/lib/app-type/cms/schema";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedCmsDocument("productCatalog", productCatalogDefaultContent);
  return buildMetadata(`Products | ${content?.seoTitle ?? productCatalogDefaultContent.seoTitle}`, content?.seoDescription ?? productCatalogDefaultContent.seoDescription);
}

export default async function ProductsPage() {
  const [content, dbProducts, dbCategories] = await Promise.all([
    getPublishedCmsDocument("productCatalog", productCatalogDefaultContent),
    listPublishedCollection<Product>("products"),
    listPublishedCollection<Category>("categories")
  ]);
  if (!content) notFound();

  const products = normalizeProducts(dbProducts ?? defaultProducts).filter((item) => item.published);
  const categories = (dbCategories ?? defaultCategories).filter((item) => item.published);

  return (
    <>
      <PublicHeader />
      <main className="bg-page py-14 md:py-20">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-accent">Products</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-primary md:text-6xl">Explore the full catalog.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{content.subtitle}</p>
          </div>
          <div className="mt-10">
            <CatalogExplorer products={products} categories={categories} ctaLabel={content.whatsappCta} />
          </div>
        </div>
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
