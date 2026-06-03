import type { PortfolioContent } from "./schema";

export const portfolioDefaultContent: PortfolioContent = {
  published: true,
  name: "Ari Wicaksono",
  role: "Independent product designer and frontend builder",
  headline: "Designing clear digital products for teams that need momentum.",
  bio: "Ari helps early-stage teams turn messy product ideas into focused interfaces, prototypes, and launch-ready websites.",
  location: "Jakarta, remote-friendly",
  availability: "Available for selected projects",
  heroImage: "",
  heroImageAlt: "Portfolio workspace preview",
  skills: ["Interface design", "Frontend implementation", "Design systems", "CMS websites", "Product strategy", "Rapid prototyping"],
  projects: [
    {
      name: "Atlas CRM workspace",
      type: "SaaS product",
      summary: "Redesigned a sales pipeline workspace so operators could scan accounts, notes, and next actions faster.",
      impact: "Reduced review time",
      stack: "Next.js, design system, Firebase",
      link: ""
    },
    {
      name: "Northstar launch site",
      type: "Marketing system",
      summary: "Built a campaign website with editable sections, lead capture, and launch-ready SEO defaults.",
      impact: "Published in one week",
      stack: "Next.js, CMS, theme settings",
      link: ""
    },
    {
      name: "Studio operations dashboard",
      type: "Internal tool",
      summary: "Created a responsive dashboard for project health, client requests, and delivery checkpoints.",
      impact: "Clearer weekly planning",
      stack: "React, data views, forms",
      link: ""
    }
  ],
  services: [
    { title: "Product interface design", description: "Structure screens, flows, and component patterns for product teams that need clarity before scaling." },
    { title: "Frontend implementation", description: "Turn approved designs into responsive, maintainable Next.js interfaces." },
    { title: "CMS-ready websites", description: "Ship polished public pages that non-technical teams can keep current." }
  ],
  testimonials: [
    { name: "Product lead", role: "SaaS team", quote: "The work turned a scattered product idea into a clear interface we could build against." },
    { name: "Studio founder", role: "Creative services", quote: "We shipped a better site and kept editing it ourselves after launch." }
  ],
  notes: [
    { title: "How to reduce launch-page scope", summary: "Start with one conversion path, one proof section, and one contact action." },
    { title: "When design systems are worth it", summary: "Small teams benefit when repeated components reduce decisions instead of adding process." }
  ],
  contactInfo: "hello@example.com",
  seoTitle: "Portfolio Website",
  seoDescription: "A responsive portfolio website with CMS, projects, services, testimonials, Firebase, and theme settings."
};
