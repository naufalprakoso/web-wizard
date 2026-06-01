import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { GeneratedHeroVisual } from "@/components/sections/GeneratedVisuals";
import { FinalCTA, SectionHeader, TrustBar } from "@/components/sections/LandingBlocks";
import { getPublishedCmsDocument } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { landingPageDefaultContent } from "@/lib/app-type/cms/default-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedCmsDocument("landingPage", landingPageDefaultContent);
  return buildMetadata(content?.seoTitle ?? landingPageDefaultContent.seoTitle, content?.seoDescription ?? landingPageDefaultContent.seoDescription);
}

export default async function LandingPage() {
  const content = await getPublishedCmsDocument("landingPage", landingPageDefaultContent);
  if (!content) notFound();

  return (
    <>
      <PublicHeader />
      <main>
        <section className="overflow-hidden bg-page py-16 md:py-20">
          <div className="section-shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="min-w-0">
              <h1 className="mt-5 max-w-4xl break-words text-4xl font-black leading-tight text-primary sm:text-5xl md:text-7xl">{content.heroTitle}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{content.heroSubtitle}</p>
              <p className="mt-4 max-w-2xl text-sm font-bold leading-6 text-accent">{content.conversionNote}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={content.ctaLink}>{content.ctaText}</ButtonLink>
                <ButtonLink href="#features" variant="ghost">Explore features</ButtonLink>
              </div>
              <div className="mt-8">
                <TrustBar items={content.proofPoints} />
              </div>
            </div>
            <div className="min-w-0">
              <GeneratedHeroVisual variant="landing" imageUrl={content.heroImage} alt={content.heroImageAlt || content.heroTitle} />
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-black leading-tight text-primary md:text-4xl">{content.problemTitle}</h2>
              <p className="mt-4 leading-7 text-slate-600">{content.problemBody}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {content.audienceSegments.map((segment) => (
                <Card key={segment.name} className="p-5">
                  <h3 className="text-lg font-black text-primary">{segment.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{segment.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="section-shell">
            <SectionHeader label="Page variants" title="One structure, several launch jobs." body="Keep the page focused while changing the content model for the campaign in front of you." />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {content.contentVariants.map((variant) => (
                <Card key={variant.name} className="p-5">
                  <h3 className="text-xl font-black text-primary">{variant.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{variant.description}</p>
                  <p className="mt-5 rounded-theme bg-page px-3 py-2 text-sm font-black text-accent">{variant.cta}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-slate-50 py-20">
          <div className="section-shell">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <h2 className="text-4xl font-black text-primary">{content.outcomeTitle}</h2>
              </div>
              <p className="max-w-2xl leading-7 text-slate-600 lg:justify-self-end">{content.outcomeBody}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {content.features.map((feature) => (
                <Card key={feature} className="p-5">
                  <p className="text-lg font-black text-primary">{feature}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Built into the CMS-backed landing experience.</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-white">
          <div className="section-shell grid gap-8 lg:grid-cols-3">
            {content.benefits.map((benefit) => (
              <div key={benefit} className="border-l-4 border-secondary pl-5">
                <p className="text-xl font-black">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-accent">How it works</p>
              <h2 className="mt-3 text-4xl font-black text-primary">From offer to published page.</h2>
            </div>
            <div className="grid gap-4">
              {content.steps.map((step, index) => (
                <Card key={step} className="flex gap-4 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary font-black text-slate-950">{index + 1}</span>
                  <p className="text-lg font-bold text-primary">{step}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="section-shell grid gap-6 lg:grid-cols-2">
            {content.testimonials.map((item) => (
              <Card key={item.name} className="p-6">
                <p className="text-xl font-bold leading-8 text-primary">“{item.quote}”</p>
                <p className="mt-5 text-sm font-black uppercase tracking-widest text-accent">{item.name}</p>
                {item.role ? <p className="mt-1 text-sm font-semibold text-slate-500">{item.role}</p> : null}
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="section-shell grid gap-4 md:grid-cols-2">
            <SectionHeader label="FAQ" title="Common launch questions." body="Answers stay short so the page keeps moving toward the contact path." />
            <FaqAccordion items={content.faqs} />
          </div>
        </section>

        <FinalCTA title={content.finalCtaTitle} body={content.finalCtaText} ctaHref={content.ctaLink} ctaLabel="Start the conversation" />

        <ContactSection title="Talk through the next step" subtitle={`Reach us at ${content.contactInfo} or send a note through the form.`} />
      </main>
      <PublicFooter />
    </>
  );
}
