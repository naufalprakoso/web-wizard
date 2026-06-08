import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeader } from "@/components/sections/LandingBlocks";
import { getPublishedCmsDocument, listPublishedCollection } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { companyProfileDefaultContent } from "@/lib/app-type/cms/default-content";
import type { CompanyCaseStudy, CompanyService, CompanyTeamMember } from "@/lib/app-type/cms/schema";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedCmsDocument("companyProfile", companyProfileDefaultContent);
  return buildMetadata(content?.seoTitle ?? companyProfileDefaultContent.seoTitle, content?.seoDescription ?? companyProfileDefaultContent.seoDescription);
}

export default async function CompanyProfilePage() {
  const [content, serviceItems, caseStudyItems, teamItems] = await Promise.all([
    getPublishedCmsDocument("companyProfile", companyProfileDefaultContent),
    listPublishedCollection<CompanyService>("companyServices"),
    listPublishedCollection<CompanyCaseStudy>("companyCaseStudies"),
    listPublishedCollection<CompanyTeamMember>("companyTeamMembers")
  ]);
  if (!content) notFound();
  const services = resolveItems(serviceItems, content.services);
  const projects = resolveItems(caseStudyItems, content.projects).map(normalizeProject);
  const teamMembers = resolveItems(teamItems, content.teamMembers);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="overflow-hidden bg-[#07111f] py-14 text-white md:py-20">
          <div className="section-shell">
            <div className="min-w-0">
              {content.logoUrl ? (
                <img className="mb-6 h-12 w-auto rounded-sm bg-white/10 object-contain p-2" src={content.logoUrl} alt={`${content.companyName} logo`} />
              ) : (
                <p className="text-sm font-bold uppercase tracking-widest text-secondary">{content.companyName}</p>
              )}
              <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
                <div>
                  <h1 className="max-w-5xl break-words text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">{content.companyTagline}</h1>
                  <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{content.companyDescription}</p>
                </div>
                <div className="rounded-[32px] border border-white/10 bg-white p-5 text-primary shadow-2xl">
                  <p className="text-xs font-black uppercase tracking-widest text-accent">Operating brief</p>
                  <div className="mt-5 grid gap-4">
                    {content.stats.map((item) => (
                      <div key={item.label} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                        <p className="text-2xl font-black">{item.value}</p>
                        <p className="mt-1 text-xs font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#contact" variant="secondary">Talk to our team</ButtonLink>
                <ButtonLink href="#services" variant="ghost" className="border border-white/15 text-white hover:bg-white/10">View services</ButtonLink>
              </div>
              <div className="mt-10">
                <CompanyStrategyBoard companyName={content.companyName} imageUrl={content.heroImage} alt={content.heroImageAlt || content.companyName} services={services.slice(0, 3)} projects={projects.slice(0, 2)} />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <span id="about" className="sr-only" />
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="mt-3 text-4xl font-black leading-tight text-primary md:text-5xl">Disciplined support for serious work.</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {content.sectors.map((sector) => (
                  <span key={sector} className="rounded-full border border-slate-200 bg-page px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-600">{sector}</span>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[32px] border border-slate-200">
              {services.map((service, index) => (
                <div key={service.title} className="grid gap-5 border-b border-slate-200 bg-white p-6 last:border-b-0 md:grid-cols-[72px_1fr_220px] md:items-center">
                  <span className="text-5xl font-black text-slate-200">0{index + 1}</span>
                  <div>
                    <h3 className="text-2xl font-black text-primary">{service.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-black uppercase tracking-widest text-slate-500 md:grid-cols-1">
                    {["Plan", "Align", "Deliver"].map((step) => (
                      <span key={step} className="rounded-full bg-page px-2 py-2">{step}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="section-shell">
            <SectionHeader label="Selected work" title="Case-study patterns without the heavy case-study page." body="Each card keeps the challenge, approach, and result visible for fast scanning." />
            <div className="mt-10 grid gap-5">
              {projects.map((project, index) => (
                <div key={project.name} className="grid gap-5 rounded-[28px] bg-white p-5 shadow-sm md:grid-cols-[170px_1fr_240px] md:items-center">
                  <div>
                    <p className="text-5xl font-black text-secondary">0{index + 1}</p>
                    <p className="mt-4 text-xs font-black uppercase tracking-widest text-accent">{project.type}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-primary">{project.name}</h3>
                    <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-600 md:grid-cols-2">
                      <p><span className="font-black text-primary">Challenge:</span> {project.challenge}</p>
                      <p><span className="font-black text-primary">Approach:</span> {project.approach}</p>
                    </div>
                  </div>
                  <p className="rounded-[22px] bg-primary px-4 py-5 text-sm font-black leading-6 text-white">{project.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="section-shell">
            <div className="overflow-hidden rounded-[32px] bg-[#07111f] text-white">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="border-b border-white/10 p-7 md:p-10 lg:border-b-0 lg:border-r">
                  <p className="text-sm font-bold uppercase tracking-widest text-secondary">Team</p>
                  <div className="mt-8 grid gap-4">
                    {teamMembers.map((member) => (
                      <div key={member.name} className="grid gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5 sm:grid-cols-[56px_1fr]">
                        <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-black text-primary">{initials(member.name)}</div>
                        <div>
                          <p className="text-xl font-black">{member.name}</p>
                          <p className="mt-1 font-semibold text-secondary">{member.role}</p>
                          {member.bio ? <p className="mt-3 text-sm leading-6 text-white/65">{member.bio}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-7 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-widest text-secondary">Values</p>
                  <p className="mt-4 leading-7 text-white/65">{content.valuesIntro}</p>
                  <div className="mt-8 grid gap-5">
                    {content.values.map((value) => (
                      <div key={value} className="border-l-4 border-secondary pl-5 text-3xl font-black leading-tight">{value}</div>
                    ))}
                  </div>
                </div>
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

function resolveItems<TItem>(collectionItems: TItem[] | null, fallback: TItem[]) {
  return collectionItems && collectionItems.length > 0 ? collectionItems : fallback;
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

function CompanyStrategyBoard({
  companyName,
  imageUrl,
  alt,
  services,
  projects
}: {
  companyName: string;
  imageUrl: string;
  alt: string;
  services: Array<Pick<CompanyService, "title" | "description">>;
  projects: ReturnType<typeof normalizeProject>[];
}) {
  if (imageUrl) {
    return <img className="aspect-[16/7] w-full rounded-[28px] border border-white/15 object-cover shadow-2xl" src={imageUrl} alt={alt} />;
  }

  return (
    <div aria-label={alt} role="img" className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101d2e] shadow-2xl">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
          <p className="text-xs font-black uppercase tracking-widest text-secondary">{companyName}</p>
          <div className="mt-8 grid gap-4">
            {services.map((service, index) => (
              <div key={service.title} className="grid grid-cols-[36px_1fr] gap-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-black text-primary">{index + 1}</span>
                <div>
                  <p className="font-black text-white">{service.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/60">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 bg-white p-6 text-primary">
          <div className="grid grid-cols-3 gap-3">
            {["Focus", "Rhythm", "Outcome"].map((label) => (
              <div key={label} className="rounded-theme border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</p>
                <div className="mt-5 h-2 rounded-full bg-secondary" />
              </div>
            ))}
          </div>
          {projects.map((project) => (
            <div key={project.name} className="rounded-theme border border-slate-200 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-accent">{project.type}</p>
              <p className="mt-2 text-lg font-black">{project.name}</p>
              <p className="mt-2 text-sm font-bold text-slate-500">{project.result}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
