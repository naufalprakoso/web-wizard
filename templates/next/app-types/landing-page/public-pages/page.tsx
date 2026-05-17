import type { Metadata } from "next";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactSection } from "@/components/sections/ContactSection";
import { getCmsDocument } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { landingPageDefaultContent } from "@/lib/app-type/cms/default-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsDocument("landingPage", landingPageDefaultContent);
  return buildMetadata(content.seoTitle, content.seoDescription);
}

export default async function LandingPage() {
  const content = await getCmsDocument("landingPage", landingPageDefaultContent);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="overflow-hidden bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_32%),linear-gradient(180deg,#ffffff,#f8fafc)] py-20">
          <div className="section-shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-accent">Launch-ready website</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight text-primary md:text-7xl">{content.heroTitle}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{content.heroSubtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={content.ctaLink}>{content.ctaText}</ButtonLink>
                <ButtonLink href="#features" variant="ghost">Explore features</ButtonLink>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary" />
              <img className="relative aspect-[4/3] w-full rounded-theme object-cover shadow-2xl" src={content.heroImage} alt="" />
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="section-shell">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-widest text-accent">Problem solved</p>
              <h2 className="mt-3 text-4xl font-black text-primary">A page that explains, persuades, and captures demand.</h2>
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
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="section-shell grid gap-4 md:grid-cols-2">
            {content.faqs.map((item) => (
              <Card key={item.question} className="p-5">
                <h3 className="text-lg font-black text-primary">{item.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
              </Card>
            ))}
          </div>
        </section>

        <ContactSection title="Talk through the next step" subtitle={`Reach us at ${content.contactInfo} or send a note through the form.`} />
      </main>
      <PublicFooter />
    </>
  );
}
