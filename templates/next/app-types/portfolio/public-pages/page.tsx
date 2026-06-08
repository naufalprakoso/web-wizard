import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeader } from "@/components/sections/LandingBlocks";
import { getPublishedCmsDocument, listPublishedCollection } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { portfolioDefaultContent } from "@/lib/app-type/cms/default-content";
import type { PortfolioNote, PortfolioProject, PortfolioService, PortfolioTestimonial } from "@/lib/app-type/cms/schema";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedCmsDocument("portfolio", portfolioDefaultContent);
  return buildMetadata(content?.seoTitle ?? portfolioDefaultContent.seoTitle, content?.seoDescription ?? portfolioDefaultContent.seoDescription);
}

export default async function PortfolioPage() {
  const [content, projectItems, serviceItems, testimonialItems, noteItems] = await Promise.all([
    getPublishedCmsDocument("portfolio", portfolioDefaultContent),
    listPublishedCollection<PortfolioProject>("portfolioProjects"),
    listPublishedCollection<PortfolioService>("portfolioServices"),
    listPublishedCollection<PortfolioTestimonial>("portfolioTestimonials"),
    listPublishedCollection<PortfolioNote>("portfolioNotes")
  ]);
  if (!content) notFound();
  const projects = resolveItems(projectItems, content.projects);
  const services = resolveItems(serviceItems, content.services);
  const testimonials = resolveItems(testimonialItems, content.testimonials);
  const notes = resolveItems(noteItems, content.notes);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="overflow-hidden bg-white py-14 md:py-20">
          <div className="section-shell">
            <div className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[220px_1fr]">
              <aside className="grid content-between gap-6 border-l-4 border-secondary pl-5">
                <div>
                  <p className="text-lg font-black text-primary">{content.name}</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-500">{content.role}</p>
                </div>
                <div className="grid gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                  <p>{content.location}</p>
                  <p>{content.availability}</p>
                </div>
              </aside>
              <div className="min-w-0">
                <h1 className="max-w-6xl break-words text-5xl font-black leading-[0.9] tracking-tight text-primary sm:text-7xl lg:text-8xl">{content.headline}</h1>
                <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                  <div>
                    <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{content.bio}</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <ButtonLink href="#projects">View projects</ButtonLink>
                      <ButtonLink href="#contact" variant="secondary">Start a conversation</ButtonLink>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {content.skills.slice(0, 4).map((skill) => (
                      <div key={skill} className="border-t border-slate-200 pt-3">
                        <p className="text-sm font-black text-primary">{skill}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <PortfolioVisual name={content.name} imageUrl={content.heroImage} alt={content.heroImageAlt || content.name} skills={content.skills.slice(0, 4)} projects={projects.slice(0, 3)} />
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionHeader label="Capabilities" title="A compact skill set for useful launches." body="The portfolio template keeps skills visible without turning the homepage into a resume wall." />
            <div className="overflow-hidden rounded-[28px] border border-orange-100 bg-white">
              <div className="grid grid-cols-[1fr_repeat(4,70px)] border-b border-orange-100 bg-orange-50 px-5 py-4 text-xs font-black text-slate-500">
                <span>Capability</span><span>Expert</span><span>Advanced</span><span>Proficient</span><span>Basic</span>
              </div>
              {content.skills.map((skill, index) => (
                <div key={skill} className="grid grid-cols-[1fr_repeat(4,70px)] items-center border-b border-orange-100 px-5 py-4 text-sm last:border-b-0">
                  <p className="font-black text-primary">{skill}</p>
                  {[0, 1, 2, 3].map((level) => (
                    <span key={level} className={`mx-auto h-2.5 w-2.5 rounded-full ${level <= index % 4 ? "bg-orange-500" : "border border-slate-300"}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 md:py-20">
          <div className="section-shell">
            <SectionHeader label="Selected work" title="Projects with context, not just thumbnails." body="Each project card explains the assignment, outcome, and stack so visitors can judge fit quickly." />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {projects.map((project, index) => (
                <div key={project.name} className="overflow-hidden rounded-[24px] border border-orange-100 bg-white shadow-sm">
                  <div className={`relative aspect-[16/9] overflow-hidden p-5 ${index % 2 === 0 ? "bg-slate-950" : "bg-orange-50"}`}>
                    <div className={`absolute inset-5 rounded-[16px] border ${index % 2 === 0 ? "border-white/10 bg-white/5" : "border-orange-100 bg-white"}`}>
                      <div className="flex gap-2 border-b border-current/10 p-3">
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                        <span className="h-2 w-2 rounded-full bg-slate-300" />
                        <span className="h-2 w-2 rounded-full bg-slate-300" />
                      </div>
                      <div className="grid h-[calc(100%_-_37px)] grid-cols-[0.35fr_0.65fr] gap-3 p-3">
                        <div className="rounded bg-current/5" />
                        <div className="grid gap-3">
                          <div className="rounded bg-current/10" />
                          <div className="grid grid-cols-3 gap-2">
                            <span className="rounded bg-orange-500/70" />
                            <span className="rounded bg-current/10" />
                            <span className="rounded bg-current/10" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-secondary">{project.type}</p>
                    <h3 className="mt-2 text-2xl font-black leading-tight text-primary">{project.name}</h3>
                    <p className="mt-4 leading-7 text-slate-600">{project.summary}</p>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <p className="text-sm font-black text-orange-600">{project.impact}</p>
                      <p className="text-xs font-bold text-slate-500">{project.stack}</p>
                    </div>
                    {project.link ? <a className="mt-5 inline-flex text-sm font-black text-accent" href={project.link}>View project</a> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-white md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-secondary">Engagement modes</p>
              <h2 className="mt-3 text-4xl font-black leading-tight">Choose the shape of the work.</h2>
            </div>
            <div className="grid gap-5">
              {services.map((service) => (
                <div key={service.title} className="border-l-4 border-secondary bg-white/5 p-5">
                  <h3 className="text-2xl font-black">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/75">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeader label="Proof" title="What collaborators say." />
            <div className="grid gap-4 md:grid-cols-2">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-5xl font-black text-secondary">“</p>
                  <p className="-mt-2 text-xl font-bold leading-8 text-primary">{item.quote}</p>
                  <p className="mt-8 text-sm font-black uppercase tracking-widest text-accent">{item.name}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{item.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="section-shell">
            <SectionHeader label="Notes" title="Short thinking for better launches." />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {notes.map((note, index) => (
                <div key={note.title} className="rounded-[28px] bg-white p-6 shadow-sm">
                  <p className="text-sm font-black uppercase tracking-widest text-accent">Note 0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-black text-primary">{note.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{note.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection title={`Work with ${content.name}`} subtitle={`Reach out at ${content.contactInfo} or send a project note through the form.`} />
      </main>
      <PublicFooter />
    </>
  );
}

function resolveItems<TItem>(collectionItems: TItem[] | null, fallback: TItem[]) {
  return collectionItems && collectionItems.length > 0 ? collectionItems : fallback;
}

function PortfolioVisual({
  name,
  imageUrl,
  alt,
  skills,
  projects
}: {
  name: string;
  imageUrl: string;
  alt: string;
  skills: string[];
  projects: Array<Pick<PortfolioProject, "name" | "type" | "impact">>;
}) {
  if (imageUrl) {
    return <img className="aspect-[16/7] w-full rounded-[28px] object-cover shadow-2xl" src={imageUrl} alt={alt} />;
  }

  return (
    <div aria-label={alt} role="img" className="overflow-hidden rounded-[28px] border border-slate-200 bg-primary text-white shadow-2xl">
      <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
          <p className="text-xs font-black uppercase tracking-widest text-secondary">{name}</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {skills.map((skill) => (
              <div key={skill} className="rounded-theme border border-white/10 bg-white/5 p-3">
                <p className="text-xs font-black">{skill}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 bg-white p-6 text-primary md:grid-cols-3">
          {projects.map((project) => (
            <div key={project.name} className="rounded-theme border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-accent">{project.type}</p>
              <p className="mt-3 text-lg font-black leading-tight">{project.name}</p>
              <p className="mt-5 text-sm font-black text-slate-500">{project.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
