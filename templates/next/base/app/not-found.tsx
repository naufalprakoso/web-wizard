import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const appType: string = "__APP_TYPE__";

const helpfulLinksByAppType: Record<string, Array<{ label: string; href: string; description: string }>> = {
  "product-catalog": [
    { label: "Browse products", href: "/products", description: "Search the catalog and compare published products." },
    { label: "Contact us", href: "/contact", description: "Ask about product availability or a custom request." }
  ],
  portfolio: [
    { label: "View projects", href: "/#projects", description: "See selected work, services, and proof." },
    { label: "Start a conversation", href: "/#contact", description: "Send a project note through the contact form." }
  ],
  "service-business": [
    { label: "See services", href: "/#about", description: "Review the available services and outcomes." },
    { label: "Compare packages", href: "/#packages", description: "Find the package that best fits your request." }
  ]
};

export default function NotFound() {
  const helpfulLinks = helpfulLinksByAppType[appType] ?? [
    { label: "About", href: "/#about", description: "Learn more about this website." },
    { label: "Contact", href: "/#contact", description: "Send a message through the contact form." }
  ];

  return (
    <>
      <PublicHeader />
      <main className="bg-page py-16 md:py-24">
        <section className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="min-w-0">
              <p className="text-sm font-black uppercase tracking-widest text-accent">404</p>
              <h1 className="mt-4 max-w-3xl break-words text-4xl font-black leading-tight text-primary sm:text-5xl md:text-6xl">
                This page could not be found.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                The link may be outdated, unpublished, or typed incorrectly. Use the options below to get back to a working page.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/">Back to home</ButtonLink>
                <ButtonLink href={helpfulLinks[0]?.href ?? "/"} variant="secondary">{helpfulLinks[0]?.label ?? "Explore"}</ButtonLink>
              </div>
            </div>
            <Card className="p-5 md:p-6">
              <div className="rounded-theme border border-dashed border-slate-300 bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-page text-lg font-black text-primary">?</span>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-accent">Helpful links</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Try one of these routes instead.</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3">
                  {[{ label: "Home", href: "/", description: "Return to the main page." }, ...helpfulLinks].map((item) => (
                    <a key={item.href} href={item.href} className="focus-ring rounded-theme border border-slate-200 bg-slate-50 p-4 transition hover:border-accent hover:bg-white">
                      <p className="font-black text-primary">{item.label}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
