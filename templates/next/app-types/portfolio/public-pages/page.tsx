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
        <section className="overflow-hidden bg-page py-16 md:py-20">
          <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="min-w-0">
              <p className="text-sm font-black uppercase tracking-widest text-accent">{content.role}</p>
              <h1 className="mt-4 max-w-4xl break-words text-4xl font-black leading-tight text-primary sm:text-5xl md:text-6xl">{content.headline}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{content.bio}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#projects">View projects</ButtonLink>
                <ButtonLink href="#contact" variant="secondary">Start a conversation</ButtonLink>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[content.location, content.availability].map((item) => (
                  <div key={item} className="rounded-theme border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm font-black text-primary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <PortfolioVisual name={content.name} imageUrl={content.heroImage} alt={content.heroImageAlt || content.name} skills={content.skills.slice(0, 4)} />
          </div>
        </section>

        <section id="about" className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="section-shell">
            <SectionHeader label="Capabilities" title="A compact skill set for useful launches." body="The portfolio template keeps skills visible without turning the homepage into a resume wall." />
            <div className="mt-8 flex flex-wrap gap-3">
              {content.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-primary shadow-sm">{skill}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 md:py-20">
          <div className="section-shell">
            <SectionHeader label="Selected work" title="Projects with context, not just thumbnails." body="Each project card explains the assignment, outcome, and stack so visitors can judge fit quickly." />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.name} className="p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-accent">{project.type}</p>
                  <h3 className="mt-3 text-xl font-black text-primary">{project.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{project.summary}</p>
                  <div className="mt-5 grid gap-2 text-sm font-bold">
                    <p className="rounded-theme bg-page px-3 py-2 text-primary">{project.impact}</p>
                    <p className="text-slate-500">{project.stack}</p>
                  </div>
                  {project.link ? <a className="mt-5 inline-flex text-sm font-black text-accent" href={project.link}>View project</a> : null}
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-white md:py-20">
          <div className="section-shell grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="border-l-4 border-secondary pl-5">
                <h3 className="text-xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeader label="Proof" title="What collaborators say." />
            <div className="grid gap-4 md:grid-cols-2">
              {testimonials.map((item) => (
                <Card key={item.name} className="p-6">
                  <p className="text-xl font-bold leading-8 text-primary">"{item.quote}"</p>
                  <p className="mt-5 text-sm font-black uppercase tracking-widest text-accent">{item.name}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{item.role}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="section-shell">
            <SectionHeader label="Notes" title="Short thinking for better launches." />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {notes.map((note) => (
                <Card key={note.title} className="p-5">
                  <h3 className="text-xl font-black text-primary">{note.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{note.summary}</p>
                </Card>
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

function PortfolioVisual({ name, imageUrl, alt, skills }: { name: string; imageUrl: string; alt: string; skills: string[] }) {
  if (imageUrl) {
    return <img className="aspect-[4/3] w-full rounded-theme object-cover shadow-2xl" src={imageUrl} alt={alt} />;
  }

  return (
    <div aria-label={alt} role="img" className="relative aspect-[4/3] overflow-hidden rounded-theme border border-slate-200 bg-white p-5 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(79,70,229,0.14)_0%,rgba(79,70,229,0.04)_42%,transparent_43%),linear-gradient(45deg,transparent_0%,transparent_62%,rgba(34,197,94,0.18)_63%,rgba(34,197,94,0.18)_100%)]" />
      <div className="relative grid h-full content-between">
        <div className="flex items-center justify-between">
          <div className="h-3 w-28 rounded-full bg-primary" />
          <div className="h-10 w-10 rounded-full bg-secondary" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-accent">{name}</p>
          <div className="mt-4 grid gap-3">
            <div className="h-5 w-4/5 rounded-full bg-primary" />
            <div className="h-3 w-3/5 rounded-full bg-slate-300" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {skills.map((skill) => (
            <div key={skill} className="rounded-theme border border-slate-200 bg-white/80 p-3">
              <p className="text-xs font-black text-primary">{skill}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
