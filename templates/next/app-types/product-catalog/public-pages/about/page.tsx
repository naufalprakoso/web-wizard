import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Card } from "@/components/ui/Card";
import { getPublishedCmsDocument } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { productCatalogDefaultContent } from "@/lib/app-type/cms/default-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedCmsDocument("productCatalog", productCatalogDefaultContent);
  return buildMetadata(`About | ${content?.seoTitle ?? productCatalogDefaultContent.seoTitle}`, content?.about ?? productCatalogDefaultContent.about);
}

export default async function AboutPage() {
  const content = await getPublishedCmsDocument("productCatalog", productCatalogDefaultContent);
  if (!content) notFound();
  const trustPoints = content.trustPoints.length > 0 ? content.trustPoints : productCatalogDefaultContent.trustPoints;

  return (
    <>
      <PublicHeader />
      <main className="bg-page py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-accent">About</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-primary md:text-6xl">A catalog built around clear product decisions.</h1>
          </div>
          <div className="grid gap-5">
            <Card className="p-6">
              <p className="text-lg leading-8 text-slate-700">{content.about}</p>
            </Card>
            <div className="grid gap-4 md:grid-cols-3">
              {trustPoints.map((point) => (
                <Card key={point} className="p-5">
                  <div className="mb-4 h-1.5 w-12 rounded-full bg-secondary" />
                  <p className="text-sm font-bold leading-6 text-slate-700">{point}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
