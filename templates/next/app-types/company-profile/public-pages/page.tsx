import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactSection } from "@/components/sections/ContactSection";
import { GeneratedHeroVisual } from "@/components/sections/GeneratedVisuals";
import { SectionHeader } from "@/components/sections/LandingBlocks";
import { getPublishedCmsDocument } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { companyProfileDefaultContent } from "@/lib/app-type/cms/default-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedCmsDocument("companyProfile", companyProfileDefaultContent);
  return buildMetadata(content?.seoTitle ?? companyProfileDefaultContent.seoTitle, content?.seoDescription ?? companyProfileDefaultContent.seoDescription);
}

export default async function CompanyProfilePage() {
  const content = await getPublishedCmsDocument("companyProfile", companyProfileDefaultContent);
  if (!content) notFound();
  const projects = content.projects.map(normalizeProject);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="bg-primary py-16 text-white">
          <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="min-w-0">
              {content.logoUrl ? (
                <img className="mb-6 h-12 w-auto rounded-sm bg-white/10 object-contain p-2" src={content.logoUrl} alt={`${content.companyName} logo`} />
              ) : (
                <p className="text-sm font-bold uppercase tracking-widest text-secondary">{content.companyName}</p>
              )}
              <h1 className="mt-4 break-words text-4xl font-black leading-tight sm:text-5xl md:text-6xl">{content.companyTagline}</h1>
              <p className="mt-6 text-base leading-8 text-slate-200 sm:text-lg">{content.companyDescription}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#contact" variant="secondary">Talk to our team</ButtonLink>
                <ButtonLink href="#services" variant="ghost" className="text-white hover:bg-white/10">View services</ButtonLink>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {content.stats.map((item) => (
                  <div key={item.label} className="rounded-theme border border-white/10 bg-white/5 p-4">
                    <p className="text-xl font-black text-white">{item.value}</p>
                    <p className="mt-1 text-xs font-black uppercase tracking-widest text-white/60">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-0">
              <GeneratedHeroVisual variant="company" imageUrl={content.heroImage} alt={content.heroImageAlt || content.companyName} />
            </div>
          </div>
        </section>

        <section id="services" className="py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <span id="about" className="sr-only" />
            <div>
              <h2 className="mt-3 text-4xl font-black text-primary">Disciplined support for serious work.</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {content.sectors.map((sector) => (
                  <span key={sector} className="rounded-full border border-slate-200 bg-page px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-600">{sector}</span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {content.services.map((service) => (
                <Card key={service.title} className="p-5">
                  <h3 className="text-xl font-black text-primary">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-black uppercase tracking-widest text-slate-500">
                    {["Plan", "Align", "Deliver"].map((step) => (
                      <span key={step} className="rounded-full bg-page px-2 py-2">{step}</span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="section-shell">
            <SectionHeader label="Selected work" title="Case-study patterns without the heavy case-study page." body="Each card keeps the challenge, approach, and result visible for fast scanning." />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.name} className="p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-accent">{project.type}</p>
                  <h3 className="mt-3 text-xl font-black text-primary">{project.name}</h3>
                  <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
                    <p><span className="font-black text-primary">Challenge:</span> {project.challenge}</p>
                    <p><span className="font-black text-primary">Approach:</span> {project.approach}</p>
                  </div>
                  <p className="mt-4 rounded-theme bg-page px-3 py-2 text-sm font-black text-primary">{project.result}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="section-shell grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Team</p>
              <div className="mt-6 grid gap-4">
                {content.teamMembers.map((member) => (
                  <Card key={member.name} className="grid gap-4 p-5 sm:grid-cols-[56px_1fr]">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-lg font-black text-white">{initials(member.name)}</div>
                    <div>
                      <p className="text-xl font-black text-primary">{member.name}</p>
                      <p className="mt-1 font-semibold text-slate-600">{member.role}</p>
                      {member.bio ? <p className="mt-3 text-sm leading-6 text-slate-600">{member.bio}</p> : null}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Values</p>
              <p className="mt-4 leading-7 text-slate-600">{content.valuesIntro}</p>
              <div className="mt-6 grid gap-4">
                {content.values.map((value) => (
                  <div key={value} className="border-l-4 border-secondary pl-5 text-2xl font-black leading-tight text-primary">{value}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="section-shell grid gap-4 md:grid-cols-3">
            {[
              { label: "Contact", value: content.contactInfo },
              { label: "Best fit", value: content.sectors.slice(0, 2).join(" and ") },
              { label: "Response", value: "One business day after Firebase setup" }
            ].map((item) => (
              <Card key={item.label} className="p-5">
                <p className="text-xs font-black uppercase tracking-widest text-accent">{item.label}</p>
                <p className="mt-2 text-lg font-black text-primary">{item.value}</p>
              </Card>
            ))}
          </div>
        </section>

        <ContactSection title="Talk to our team" subtitle={`Reach ${content.companyName} at ${content.contactInfo} or send a message below.`} />
      </main>
      <PublicFooter />
    </>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function normalizeProject(project: {
  name: string;
  type: string;
  challenge?: string;
  approach?: string;
  result: string;
  summary?: string;
}) {
  return {
    ...project,
    challenge: project.challenge || project.summary || "Clarify the highest-friction part of the work.",
    approach: project.approach || "Turn the work into a clear plan, operating rhythm, and decision path."
  };
}
