import type { Metadata } from "next";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactSection } from "@/components/sections/ContactSection";
import { getCmsDocument } from "@/lib/cms/cms-service";
import { buildMetadata } from "@/lib/seo/seo";
import { companyProfileDefaultContent } from "@/lib/app-type/cms/default-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsDocument("companyProfile", companyProfileDefaultContent);
  return buildMetadata(content.seoTitle, content.seoDescription);
}

export default async function CompanyProfilePage() {
  const content = await getCmsDocument("companyProfile", companyProfileDefaultContent);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="bg-primary py-16 text-white">
          <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-secondary">{content.companyName}</p>
              <h1 className="mt-4 text-5xl font-black leading-tight md:text-6xl">{content.companyTagline}</h1>
              <p className="mt-6 text-lg leading-8 text-slate-200">{content.companyDescription}</p>
              <ButtonLink href="#contact" variant="secondary" className="mt-8">Contact our team</ButtonLink>
            </div>
            <img className="aspect-[5/4] w-full rounded-theme object-cover shadow-2xl" src={content.heroImage} alt="" />
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Services</p>
              <h2 className="mt-3 text-4xl font-black text-primary">Disciplined support for serious work.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {content.services.map((service) => (
                <Card key={service} className="p-5">
                  <h3 className="text-xl font-black text-primary">{service}</h3>
                  <p className="mt-3 leading-7 text-slate-600">Structured engagement, senior attention, and measurable outcomes.</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="section-shell">
            <p className="text-sm font-bold uppercase tracking-widest text-accent">Projects and clients</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {content.projects.map((project) => (
                <div key={project} className="rounded-theme bg-white p-5 text-lg font-black text-primary shadow-sm">{project}</div>
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
                  <Card key={member.name} className="p-5">
                    <p className="text-xl font-black text-primary">{member.name}</p>
                    <p className="mt-1 font-semibold text-slate-600">{member.role}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Values</p>
              <div className="mt-6 grid gap-4">
                {content.values.map((value) => (
                  <div key={value} className="border-l-4 border-secondary pl-5 text-2xl font-black leading-tight text-primary">{value}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactSection title="Talk to a senior advisor" subtitle={`Reach ${content.companyName} at ${content.contactInfo} or send a message below.`} />
      </main>
      <PublicFooter />
    </>
  );
}
