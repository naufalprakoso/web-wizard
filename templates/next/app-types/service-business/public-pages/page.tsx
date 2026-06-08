import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCTA, SectionHeader, TrustBar } from "@/components/sections/LandingBlocks";
import { getPublishedCmsDocument, listPublishedCollection } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { serviceBusinessDefaultContent } from "@/lib/app-type/cms/default-content";
import type { ServiceBusinessCaseStudy, ServiceBusinessFaq, ServiceBusinessPackage, ServiceBusinessProcess, ServiceBusinessService } from "@/lib/app-type/cms/schema";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedCmsDocument("serviceBusiness", serviceBusinessDefaultContent);
  return buildMetadata(content?.seoTitle ?? serviceBusinessDefaultContent.seoTitle, content?.seoDescription ?? serviceBusinessDefaultContent.seoDescription);
}

export default async function ServiceBusinessPage() {
  const [content, serviceItems, packageItems, processItems, caseStudyItems, faqItems] = await Promise.all([
    getPublishedCmsDocument("serviceBusiness", serviceBusinessDefaultContent),
    listPublishedCollection<ServiceBusinessService>("serviceBusinessServices"),
    listPublishedCollection<ServiceBusinessPackage>("serviceBusinessPackages"),
    listPublishedCollection<ServiceBusinessProcess>("serviceBusinessProcess"),
    listPublishedCollection<ServiceBusinessCaseStudy>("serviceBusinessCaseStudies"),
    listPublishedCollection<ServiceBusinessFaq>("serviceBusinessFaqs")
  ]);
  if (!content) notFound();
  const services = resolveItems(serviceItems, content.services);
  const packages = resolveItems(packageItems, content.packages);
  const process = resolveItems(processItems, content.process);
  const caseStudies = resolveItems(caseStudyItems, content.caseStudies);
  const faqs = resolveItems(faqItems, content.faqs);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="bg-[#fff7ed] py-14 md:py-20">
          <div className="section-shell">
            <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-stretch">
              <div className="min-w-0 rounded-[36px] bg-white p-6 shadow-xl shadow-orange-950/10 md:p-10">
                <p className="text-sm font-black uppercase tracking-widest text-accent">{content.businessName}</p>
                <h1 className="mt-5 max-w-4xl break-words text-4xl font-black leading-[0.95] tracking-tight text-primary sm:text-6xl md:text-7xl">{content.headline}</h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{content.subtitle}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="#packages">Compare packages</ButtonLink>
                  <ButtonLink href="#contact" variant="secondary">Request a quote</ButtonLink>
                </div>
                <div className="mt-8">
                  <TrustBar items={[content.serviceArea, content.responsePromise, ...content.trustPoints.slice(0, 1)]} />
                </div>
              </div>
              <div className="grid content-between gap-4 rounded-[36px] bg-primary p-5 text-white shadow-xl shadow-orange-950/10">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-secondary">Fast quote path</p>
                  <div className="mt-5 grid gap-3">
                    {packages.slice(0, 3).map((item) => (
                      <a key={item.name} href="#contact" className="rounded-2xl border border-white/10 bg-white/10 p-4 transition hover:bg-white/15">
                        <span className="block text-lg font-black">{item.name}</span>
                        <span className="mt-1 block text-sm font-bold text-secondary">{item.price}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <ServiceVisual imageUrl={content.heroImage} alt={content.heroImageAlt || content.businessName} businessName={content.businessName} />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-slate-200 bg-white py-16 md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[340px_1fr]">
            <SectionHeader label="Services" title="Clear offers visitors can understand quickly." body="This template is built for service businesses that need practical packages, trust cues, and a simple inquiry flow." />
            <div className="grid gap-4">
              {services.map((service, index) => (
                <div key={service.title} className="grid gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5 md:grid-cols-[70px_1fr_220px] md:items-center">
                  <span className="text-5xl font-black text-orange-200">0{index + 1}</span>
                  <div>
                    <h3 className="text-2xl font-black text-primary">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                  </div>
                  <p className="rounded-[20px] bg-white px-4 py-4 text-sm font-black leading-6 text-accent shadow-sm">{service.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="packages" className="py-16 md:py-20">
          <div className="section-shell">
            <SectionHeader label="Packages" title="Simple package comparison." body="Keep pricing directional, explain what is included, and route detailed questions into contact." />
            <div className="mt-8 overflow-hidden rounded-[32px] border border-slate-200">
              {packages.map((item, index) => (
                <div key={item.name} className="grid gap-5 border-b border-slate-200 bg-white p-6 last:border-b-0 md:grid-cols-[1fr_170px_1.1fr] md:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-accent">Package 0{index + 1}</p>
                    <h3 className="mt-2 text-2xl font-black text-primary">{item.name}</h3>
                  </div>
                  <p className="text-3xl font-black text-accent md:text-center">{item.price}</p>
                  <div>
                    <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                    <p className="mt-4 rounded-[18px] bg-page px-4 py-3 text-sm font-bold text-primary">{item.features}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-white md:py-20">
          <div className="section-shell">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-secondary">Process</p>
                <h2 className="mt-3 text-4xl font-black leading-tight">A short path from inquiry to published offer.</h2>
              </div>
              <div className="grid gap-5">
                {process.map((item, index) => (
                  <div key={item.step} className="grid gap-4 border-t border-white/10 pt-5 md:grid-cols-[80px_1fr]">
                    <span className="text-5xl font-black text-secondary">0{index + 1}</span>
                    <span>
                      <span className="block text-2xl font-black">{item.step}</span>
                      <span className="mt-3 block text-sm leading-6 text-white/75">{item.description}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[340px_1fr]">
            <SectionHeader label="Proof" title="Service work with concrete outcomes." />
            <div className="grid gap-4">
              {caseStudies.map((item) => (
                <div key={item.client} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-widest text-accent">{item.client}</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-[1fr_240px] md:items-center">
                    <p className="text-sm leading-6 text-slate-600"><span className="font-black text-primary">Need:</span> {item.need}</p>
                    <p className="rounded-[18px] bg-slate-950 px-4 py-4 text-sm font-black leading-6 text-white">{item.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="section-shell grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader label="FAQ" title="Common service questions." />
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <FinalCTA title="Ready to clarify the next service inquiry?" body="Use the CMS to adjust services, packages, proof, and FAQ without changing the generated code." ctaHref="#contact" ctaLabel="Request a quote" />

        <ContactSection title={`Contact ${content.businessName}`} subtitle={`Reach us at ${content.contactInfo} or send a note through the form.`} />
      </main>
      <PublicFooter />
    </>
  );
}

function resolveItems<TItem>(collectionItems: TItem[] | null, fallback: TItem[]) {
  return collectionItems && collectionItems.length > 0 ? collectionItems : fallback;
}

function ServiceVisual({ imageUrl, alt, businessName }: { imageUrl: string; alt: string; businessName: string }) {
  if (imageUrl) {
    return <img className="aspect-[4/3] w-full rounded-theme object-cover shadow-2xl" src={imageUrl} alt={alt} />;
  }

  return (
    <div aria-label={alt} role="img" className="relative aspect-[4/3] overflow-hidden rounded-theme border border-slate-200 bg-white p-5 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,118,110,0.14)_0%,rgba(15,118,110,0.04)_42%,transparent_43%),linear-gradient(45deg,transparent_0%,transparent_62%,rgba(249,115,22,0.18)_63%,rgba(249,115,22,0.18)_100%)]" />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-5">
        <div className="flex items-center justify-between">
          <div className="h-3 w-28 rounded-full bg-primary" />
          <div className="h-9 w-24 rounded-full bg-secondary" />
        </div>
        <div className="grid content-center gap-4">
          <p className="text-sm font-black uppercase tracking-widest text-accent">{businessName}</p>
          <div className="h-6 w-4/5 rounded-full bg-primary" />
          <div className="h-4 w-2/3 rounded-full bg-slate-300" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["Offer", "Process", "Quote"].map((item) => (
            <div key={item} className="rounded-theme border border-slate-200 bg-white/80 p-3">
              <p className="text-xs font-black text-primary">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
