import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { SectionHeader, TrustBar } from "@/components/sections/LandingBlocks";
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
        <section className="overflow-hidden bg-[#f7f7f2] py-14 md:py-20">
          <div className="section-shell">
            <div className="grid gap-8 border-y border-slate-950/15 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="min-w-0">
                <h1 className="max-w-5xl break-words text-5xl font-black leading-[0.92] tracking-tight text-primary sm:text-6xl md:text-8xl">{content.heroTitle}</h1>
                <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                  <p className="max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">{content.heroSubtitle}</p>
                  <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                    <ButtonLink href={content.ctaLink}>{content.ctaText}</ButtonLink>
                    <ButtonLink href="#features" variant="ghost" className="border border-slate-300 bg-white">Explore features</ButtonLink>
                  </div>
                </div>
              </div>
              <LaunchBoard content={content} />
            </div>
            <div className="grid gap-3 border-b border-slate-950/15 py-5 md:grid-cols-3">
              {content.proofPoints.map((item) => (
                <p key={item} className="text-sm font-black uppercase tracking-widest text-slate-600">{item}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-slate-200 bg-white py-16 md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <div className="rounded-[32px] bg-slate-950 p-7 text-white md:p-10">
              <h2 className="text-3xl font-black leading-tight md:text-5xl">{content.problemTitle}</h2>
              <p className="mt-6 leading-8 text-white/70">{content.problemBody}</p>
              <div className="mt-10 h-2 w-24 rounded-full bg-secondary" />
            </div>
            <div className="grid gap-4">
              {content.audienceSegments.map((segment, index) => (
                <div key={segment.name} className="grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:grid-cols-[56px_1fr] md:items-start">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-black text-primary shadow-sm">{index + 1}</span>
                  <span>
                    <span className="block text-xl font-black text-primary">{segment.name}</span>
                    <span className="mt-2 block text-sm leading-7 text-slate-600">{segment.description}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f2] py-16 md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[360px_1fr]">
            <SectionHeader label="Page variants" title="One structure, several launch jobs." body="Keep the page focused while changing the content model for the campaign in front of you." />
            <div className="grid gap-4">
              {content.contentVariants.map((variant, index) => (
                <div key={variant.name} className="grid gap-4 rounded-[28px] bg-white p-5 shadow-sm md:grid-cols-[1fr_220px] md:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-accent">Variant 0{index + 1}</p>
                    <h3 className="mt-2 text-2xl font-black text-primary">{variant.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{variant.description}</p>
                  </div>
                  <p className="rounded-[20px] bg-slate-950 px-4 py-5 text-sm font-black leading-6 text-white md:text-center">{variant.cta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="section-shell">
            <div className="rounded-[28px] border border-green-100 bg-green-50 p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <h2 className="text-4xl font-black leading-tight text-green-950 md:text-5xl">{content.outcomeTitle}</h2>
                <p className="max-w-2xl leading-7 text-green-950/65 lg:justify-self-end">{content.outcomeBody}</p>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
              {content.features.map((feature, index) => (
                <div key={feature} className="rounded-[20px] border border-green-100 bg-white p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-green-50 font-black text-green-700">0{index + 1}</span>
                  <p className="mt-5 text-lg font-black text-green-950">{feature}</p>
                  <p className="mt-3 text-sm leading-6 text-green-950/60">Built into the CMS-backed landing experience.</p>
                </div>
              ))}
              </div>
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
          <div className="section-shell">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-accent">How it works</p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-primary">From offer to published page.</h2>
              <p className="mt-4 leading-7 text-slate-600">A landing page should move from decision to action with a visible path.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {content.steps.map((step, index) => (
                <div key={step} className="relative text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-green-500 bg-white text-lg font-black text-green-700">0{index + 1}</span>
                  {index < content.steps.length - 1 ? <span className="absolute left-[60%] right-[-40%] top-8 hidden h-px bg-green-300 md:block" /> : null}
                  <p className="mt-5 text-xl font-black leading-tight text-primary">{step}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">A focused step that keeps the launch moving without adding process overhead.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white">
          <div className="section-shell grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-secondary">Proof</p>
              <h2 className="mt-3 text-4xl font-black leading-tight">Real launch feedback, formatted for trust.</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
            {content.testimonials.map((item) => (
              <div key={item.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-xl font-bold leading-8">“{item.quote}”</p>
                <p className="mt-5 text-sm font-black uppercase tracking-widest text-secondary">{item.name}</p>
                {item.role ? <p className="mt-1 text-sm font-semibold text-white/50">{item.role}</p> : null}
              </div>
            ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="section-shell grid gap-4 md:grid-cols-2">
            <SectionHeader label="FAQ" title="Frequently Asked Questions" body="Answers stay short so the page keeps moving toward the contact path." />
            <FaqAccordion items={content.faqs} />
          </div>
        </section>

        <section className="bg-violet-50 py-16 md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-violet-700">Launch-ready system</p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-violet-950">{content.finalCtaTitle}</h2>
              <p className="mt-4 max-w-xl leading-7 text-violet-950/65">{content.finalCtaText}</p>
              <div className="mt-6 grid gap-2 text-sm font-bold text-violet-950">
                {["CMS-managed content", "Responsive sections", "Firebase-ready forms"].map((item) => <p key={item}>✓ {item}</p>)}
              </div>
              <ButtonLink href={content.ctaLink} className="mt-8">Start the conversation</ButtonLink>
            </div>
            <div className="rounded-[28px] border border-violet-100 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <p className="font-black text-primary">Campaign overview</p>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">Ready</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {["Sections", "Leads", "Updates"].map((item, index) => (
                  <div key={item} className="rounded-[18px] bg-slate-50 p-4">
                    <p className="text-2xl font-black text-violet-700">{index === 0 ? "8" : index === 1 ? "24" : "CMS"}</p>
                    <p className="mt-2 text-xs font-bold text-slate-500">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-32 rounded-[20px] bg-[linear-gradient(180deg,#f5f3ff_0%,#ffffff_100%)] p-5">
                <div className="h-2 w-1/3 rounded-full bg-violet-200" />
                <div className="mt-12 flex items-end gap-2">
                  {[36, 52, 44, 72, 62, 88].map((height, index) => <div key={index} className="flex-1 rounded-t bg-violet-500" style={{ height }} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection title="Talk through the next step" subtitle={`Reach us at ${content.contactInfo} or send a note through the form.`} />
      </main>
      <PublicFooter />
    </>
  );
}

function LaunchBoard({ content }: { content: typeof landingPageDefaultContent }) {
  if (content.heroImage) {
    return <img className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-2xl" src={content.heroImage} alt={content.heroImageAlt || content.heroTitle} />;
  }

  return (
    <div aria-label={content.heroImageAlt || content.heroTitle} role="img" className="rounded-[32px] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <p className="text-xs font-black uppercase tracking-widest text-secondary">Launch board</p>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-black text-slate-950">Ready</span>
      </div>
      <div className="mt-5 grid gap-4">
        {content.contentVariants.slice(0, 3).map((variant, index) => (
          <div key={variant.name} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl bg-white/10 p-4">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-black text-primary">{index + 1}</span>
            <span>
              <span className="block font-black">{variant.name}</span>
              <span className="mt-1 block text-sm leading-6 text-white/65">{variant.cta}</span>
            </span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm font-bold leading-6 text-white/65">{content.conversionNote}</p>
    </div>
  );
}
