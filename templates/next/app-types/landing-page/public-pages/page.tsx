import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getPublishedCmsDocument } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { landingPageDefaultContent } from "@/lib/app-type/cms/default-content";

const genericLogos = ["NOVA", "ATLAS", "KIN", "PULSE", "EMBER"];
const demoMetrics = [
  { value: "38%", label: "higher qualified inquiries" },
  { value: "2.4x", label: "faster campaign launch" },
  { value: "14", label: "editable CMS sections" }
];

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedCmsDocument("landingPage", landingPageDefaultContent);
  return buildMetadata(content?.seoTitle ?? landingPageDefaultContent.seoTitle, content?.seoDescription ?? landingPageDefaultContent.seoDescription);
}

export default async function LandingPage() {
  const content = await getPublishedCmsDocument("landingPage", landingPageDefaultContent);
  if (!content) notFound();

  const primaryVariant = content.contentVariants[0] ?? landingPageDefaultContent.contentVariants[0];

  return (
    <>
      <PublicHeader />
      <main className="overflow-hidden bg-white text-[#111111]">
        <section className="relative isolate border-b border-black/10 bg-[radial-gradient(circle_at_70%_20%,rgba(188,255,94,0.45),transparent_28%),radial-gradient(circle_at_20%_8%,rgba(255,185,230,0.42),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f7f8ee_100%)]">
          <div className="absolute inset-x-0 top-0 -z-10 h-44 bg-[linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:44px_44px] opacity-60" />
          <div className="section-shell grid min-h-[calc(100svh-65px)] gap-10 py-12 md:py-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="min-w-0">
              <h1 className="max-w-4xl break-words text-balance text-[clamp(3.4rem,14vw,5rem)] font-black leading-[0.86] tracking-tight text-[#080808] md:text-[clamp(4.6rem,7vw,6.2rem)] lg:text-[clamp(4.8rem,5.7vw,5.9rem)]">
                {content.heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-balance text-lg leading-8 text-black/68 md:text-xl">{content.heroSubtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={content.ctaLink} className="rounded-full bg-[#111111] px-7 text-white shadow-[0_14px_35px_rgba(0,0,0,0.18)] hover:bg-black">
                  {content.ctaText}
                </ButtonLink>
                <ButtonLink href="#features" variant="ghost" className="rounded-full border border-black/15 bg-white/70 px-7 text-[#111111] backdrop-blur hover:bg-white">
                  See the system
                </ButtonLink>
              </div>
              <p className="mt-6 max-w-xl text-sm font-semibold leading-6 text-black/52">{content.conversionNote}</p>
            </div>
            <FunnelPreview content={content} primaryVariant={primaryVariant} />
          </div>
          <div className="section-shell border-t border-black/10 py-5">
            <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-black/45">Built for launches by teams like</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {genericLogos.map((logo) => (
                  <div key={logo} className="rounded-full border border-black/10 bg-white/55 px-4 py-3 text-center text-sm font-black tracking-[0.22em] text-black/45 backdrop-blur">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-16 md:py-24">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-balance text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">{content.problemTitle}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/62">{content.problemBody}</p>
            </div>
            <div className="rounded-[34px] border border-black/10 bg-[#111111] p-4 text-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
              <div className="rounded-[26px] bg-[radial-gradient(circle_at_20%_20%,rgba(188,255,94,0.22),transparent_35%),#1c1c1c] p-6 md:p-8">
                <p className="text-7xl font-black tracking-tight text-[#c5ff55] md:text-8xl">03</p>
                <p className="mt-3 max-w-md text-2xl font-black leading-tight">Decisions visitors must make before they take action.</p>
                <div className="mt-8 grid gap-3">
                  {content.audienceSegments.slice(0, 3).map((segment, index) => (
                    <AudienceRow key={segment.name} index={index} name={segment.name} description={segment.description} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f6ef] py-16 md:py-24">
          <div className="section-shell">
            <div className="grid gap-6 md:grid-cols-3">
              {demoMetrics.map((metric) => (
                <div key={metric.label} className="rounded-[30px] border border-black/10 bg-white p-7 shadow-[0_18px_45px_rgba(17,17,17,0.06)]">
                  <p className="text-5xl font-black tracking-tight text-[#111111]">{metric.value}</p>
                  <p className="mt-3 text-sm font-bold leading-6 text-black/56">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-16 md:py-24">
          <div className="section-shell">
            <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
              <div className="lg:sticky lg:top-24">
                <h2 className="text-balance text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">{content.outcomeTitle}</h2>
                <p className="mt-6 text-lg leading-8 text-black/62">{content.outcomeBody}</p>
              </div>
              <div className="grid gap-5">
                {content.features.map((feature, index) => (
                  <FeaturePanel key={feature} index={index} title={feature} body={content.benefits[index % content.benefits.length] ?? landingPageDefaultContent.benefits[0]} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#111111] py-16 text-white md:py-24">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-balance text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">Shape the page around the offer.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">The template changes rhythm for different campaigns, so a waitlist, service offer, or event page does not feel like the same generic website.</p>
            </div>
            <div className="grid gap-4">
              {content.contentVariants.map((variant, index) => (
                <VariantCard key={variant.name} index={index} name={variant.name} description={variant.description} cta={variant.cta} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f9f5ff] py-16 md:py-24">
          <div className="section-shell">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">From first idea to live page.</h2>
              <p className="mt-5 text-lg leading-8 text-black/62">A short launch path keeps the content, CMS, and contact flow aligned.</p>
            </div>
            <div className="relative mt-12 grid gap-4 md:grid-cols-3">
              <div className="absolute left-[16%] right-[16%] top-12 hidden h-px bg-black/10 md:block" />
              {content.steps.map((step, index) => (
                <div key={step} className="relative rounded-[32px] border border-black/10 bg-white p-6 text-center shadow-[0_18px_45px_rgba(79,70,229,0.08)]">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#111111] text-sm font-black text-[#c5ff55]">0{index + 1}</span>
                  <h3 className="mt-6 text-2xl font-black tracking-tight">{step}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/56">{content.proofPoints[index % content.proofPoints.length] ?? landingPageDefaultContent.proofPoints[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <h2 className="text-balance text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">Proof that feels human, not templated.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-black/62">Use concise testimonial blocks and crisp claims to reduce hesitation before the form.</p>
            </div>
            <div className="grid gap-4">
              {content.testimonials.map((item, index) => (
                <article key={`${item.name}-${index}`} className="rounded-[30px] border border-black/10 bg-[#f8f8f2] p-6">
                  <p className="text-2xl font-black leading-tight text-[#111111]">"{item.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[#111111] text-sm font-black text-white">{item.name.slice(0, 1)}</div>
                    <div>
                      <p className="font-black">{item.name}</p>
                      {item.role ? <p className="text-sm font-semibold text-black/50">{item.role}</p> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f6ef] py-16 md:py-24">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="text-balance text-4xl font-black leading-[0.95] tracking-tight md:text-5xl">Questions before launch?</h2>
              <p className="mt-5 text-lg leading-8 text-black/62">Keep answers short, visible, and close to the conversion path.</p>
            </div>
            <FaqAccordion items={content.faqs} />
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="section-shell relative overflow-hidden rounded-[42px] bg-[#111111] p-6 text-white shadow-[0_30px_90px_rgba(17,17,17,0.22)] md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,185,230,0.18)_0%,transparent_34%,rgba(188,255,94,0.26)_100%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
              <div>
                <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.9] tracking-tight md:text-7xl">{content.finalCtaTitle}</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{content.finalCtaText}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={content.ctaLink} className="rounded-full bg-white px-7 text-[#111111] hover:bg-white/90">
                    {content.ctaText}
                  </ButtonLink>
                  <ButtonLink href="#contact" variant="ghost" className="rounded-full border border-white/20 px-7 text-white hover:bg-white/10">
                    Contact the team
                  </ButtonLink>
                </div>
              </div>
              <div className="rounded-[30px] border border-white/15 bg-white/12 p-5 backdrop-blur">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-white/55">Launch checklist</p>
                <div className="mt-5 grid gap-3">
                  {content.proofPoints.map((point) => (
                    <div key={point} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#c5ff55] text-xs font-black text-[#111111]">✓</span>
                      <span className="text-sm font-bold text-white/82">{point}</span>
                    </div>
                  ))}
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

function FunnelPreview({ content, primaryVariant }: { content: typeof landingPageDefaultContent; primaryVariant: (typeof landingPageDefaultContent.contentVariants)[number] }) {
  return (
    <div className="relative min-h-[560px] lg:min-h-[640px]" aria-label={content.heroImageAlt || content.heroTitle} role="img">
      <div className="absolute left-2 top-6 hidden w-60 rounded-[28px] border border-black/10 bg-white/75 p-4 shadow-[0_24px_70px_rgba(17,17,17,0.15)] backdrop-blur md:block">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-black/40">Live campaign</p>
        <p className="mt-3 text-3xl font-black tracking-tight text-[#111111]">84%</p>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/10">
          <div className="h-full w-[84%] rounded-full bg-[#c5ff55]" />
        </div>
        <p className="mt-4 text-sm font-semibold leading-6 text-black/54">{content.proofPoints[0]}</p>
      </div>
      <div className="absolute bottom-10 right-0 hidden w-72 rounded-[30px] border border-black/10 bg-[#111111] p-5 text-white shadow-[0_24px_70px_rgba(17,17,17,0.22)] md:block">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black">{primaryVariant.name}</p>
          <span className="rounded-full bg-[#c5ff55] px-3 py-1 text-xs font-black text-[#111111]">Ready</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/58">{primaryVariant.description}</p>
        <div className="mt-5 grid grid-cols-5 items-end gap-2">
          {[48, 72, 58, 92, 80].map((height, index) => (
            <div key={index} className="rounded-full bg-white/18" style={{ height }} />
          ))}
        </div>
      </div>
      <div className="mx-auto w-full max-w-[410px] rounded-[48px] border border-black/10 bg-[#111111] p-3 shadow-[0_35px_100px_rgba(17,17,17,0.28)]">
        <div className="overflow-hidden rounded-[38px] bg-white">
          <div className="bg-[radial-gradient(circle_at_75%_18%,rgba(188,255,94,0.75),transparent_34%),linear-gradient(180deg,#fff8fb_0%,#f4f5ee_100%)] p-5">
            <div className="mx-auto h-1.5 w-20 rounded-full bg-black/20" />
            <div className="mt-8">
              {content.heroImage ? (
                <img className="aspect-[4/3] w-full rounded-[28px] object-cover" src={content.heroImage} alt={content.heroImageAlt || content.heroTitle} />
              ) : (
                <div className="rounded-[28px] bg-[#111111] p-5 text-white">
                  <p className="text-4xl font-black leading-[0.92] tracking-tight">{content.heroTitle}</p>
                  <p className="mt-4 text-sm leading-6 text-white/62">{content.heroSubtitle}</p>
                  <div className="mt-6 rounded-full bg-[#c5ff55] px-5 py-3 text-center text-sm font-black text-[#111111]">{content.ctaText}</div>
                </div>
              )}
            </div>
            <div className="mt-4 grid gap-3">
              {content.features.slice(0, 3).map((feature, index) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#111111] text-xs font-black text-[#c5ff55]">{index + 1}</span>
                  <span className="text-sm font-black text-[#111111]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-px bg-black/10">
            {content.proofPoints.slice(0, 3).map((point) => (
              <div key={point} className="bg-white px-3 py-4 text-center text-[11px] font-black leading-4 text-black/50">{point}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceRow({ index, name, description }: { index: number; name: string; description: string }) {
  return (
    <div className="grid grid-cols-[42px_1fr] gap-3 rounded-2xl bg-white/8 p-3">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-black text-[#111111]">0{index + 1}</span>
      <span>
        <span className="block font-black">{name}</span>
        <span className="mt-1 block text-sm leading-6 text-white/58">{description}</span>
      </span>
    </div>
  );
}

function FeaturePanel({ index, title, body }: { index: number; title: string; body: string }) {
  const colors = ["bg-[#f3ffcf]", "bg-[#fff0fa]", "bg-[#edf4ff]", "bg-[#f8f8f2]"];
  return (
    <article className={`grid gap-6 rounded-[34px] border border-black/10 p-5 shadow-[0_18px_50px_rgba(17,17,17,0.06)] md:grid-cols-[1fr_240px] md:items-center ${colors[index % colors.length]}`}>
      <div>
        <p className="text-sm font-black uppercase tracking-[0.24em] text-black/40">Module 0{index + 1}</p>
        <h3 className="mt-3 text-3xl font-black tracking-tight">{title}</h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-black/60">{body}</p>
      </div>
      <div className="rounded-[28px] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-300" />
          <span className="h-3 w-3 rounded-full bg-yellow-300" />
          <span className="h-3 w-3 rounded-full bg-green-300" />
        </div>
        <div className="mt-5 grid gap-3">
          <div className="h-3 w-10/12 rounded-full bg-black/10" />
          <div className="h-3 w-8/12 rounded-full bg-black/10" />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[42, 70, 55].map((height, itemIndex) => (
              <div key={itemIndex} className="rounded-t-2xl bg-[#111111]" style={{ height }} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function VariantCard({ index, name, description, cta }: { index: number; name: string; description: string; cta: string }) {
  return (
    <article className="group grid gap-4 rounded-[30px] border border-white/10 bg-white/[0.07] p-5 transition hover:bg-white/[0.11] md:grid-cols-[64px_1fr_auto] md:items-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-sm font-black text-[#111111]">0{index + 1}</span>
      <div>
        <h3 className="text-2xl font-black tracking-tight">{name}</h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-white/56">{description}</p>
      </div>
      <p className="rounded-full bg-[#c5ff55] px-5 py-3 text-sm font-black text-[#111111] md:justify-self-end">{cta}</p>
    </article>
  );
}
