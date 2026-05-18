import type { Metadata } from "next";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ContactSection } from "@/components/sections/ContactSection";
import { getCmsDocument } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { productCatalogDefaultContent } from "@/lib/app-type/cms/default-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsDocument("productCatalog", productCatalogDefaultContent);
  return buildMetadata(`Contact | ${content.seoTitle}`, "Ask about products, categories, availability, or catalog support.");
}

export default async function ContactPage() {
  const content = await getCmsDocument("productCatalog", productCatalogDefaultContent);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="bg-page py-14 md:py-20">
          <div className="section-shell max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-accent">Contact</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-primary md:text-6xl">Ask a product question or request a shortlist.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{content.subtitle}</p>
          </div>
        </section>
        <ContactSection title="Tell us what you are looking for" subtitle="Share a product, category, quantity, or use case and the team will reply with a helpful next step." />
      </main>
      <PublicFooter />
    </>
  );
}
