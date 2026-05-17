import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { getCmsDocument, getCollectionItem } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { defaultProducts, productCatalogDefaultContent } from "@/lib/app-type/cms/default-content";
import type { Product } from "@/lib/app-type/cms/schema";

type Props = {
  params: Promise<{ productId: string }>;
};

async function findProduct(productId: string): Promise<Product | null> {
  const fromDb = await getCollectionItem<Product>("products", productId);
  if (fromDb?.published) return fromDb;
  return defaultProducts.find((product) => product.id === productId && product.published) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = await findProduct(productId);
  if (!product) return buildMetadata("Product", "Product detail");
  return buildMetadata(product.seoTitle, product.seoDescription);
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = await params;
  const [product, content] = await Promise.all([
    findProduct(productId),
    getCmsDocument("productCatalog", productCatalogDefaultContent)
  ]);

  if (!product) notFound();

  return (
    <>
      <PublicHeader />
      <main className="bg-stone-50 py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <img className="aspect-[4/3] w-full rounded-theme object-cover shadow-xl" src={product.imageUrl} alt="" />
          <section className="rounded-theme bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-widest text-accent">{product.category}</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-primary">{product.name}</h1>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.price ? <span className="rounded-full bg-secondary px-4 py-2 text-sm font-black text-stone-950">{product.price}</span> : null}
              <span className="rounded-full bg-stone-100 px-4 py-2 text-sm font-black text-stone-700">{product.status}</span>
            </div>
            <p className="mt-6 text-lg leading-8 text-stone-600">{product.description}</p>
            <ButtonLink className="mt-8 w-full md:w-auto" href={content.whatsappUrl}>{content.whatsappCta}</ButtonLink>
          </section>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
