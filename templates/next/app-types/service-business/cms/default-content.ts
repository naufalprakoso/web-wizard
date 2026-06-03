import type { ServiceBusinessContent } from "./schema";

export const serviceBusinessDefaultContent: ServiceBusinessContent = {
  published: true,
  businessName: "Clearpath Studio",
  headline: "Practical service support for busy teams and growing local businesses.",
  subtitle: "A polished service-business website for explaining offers, showing trust, and turning visitors into qualified inquiries.",
  heroImage: "",
  heroImageAlt: "Service business planning board",
  serviceArea: "Jakarta and remote engagements",
  responsePromise: "Replies within one business day",
  services: [
    { title: "Website refresh", description: "Improve messaging, layout, and inquiry paths without rebuilding the whole brand.", outcome: "Clearer public presence" },
    { title: "Service operations setup", description: "Document service packages, intake steps, and delivery expectations.", outcome: "Fewer back-and-forth questions" },
    { title: "Local campaign pages", description: "Launch focused pages for seasonal offers, workshops, and targeted services.", outcome: "Faster campaign publishing" }
  ],
  packages: [
    { name: "Starter audit", price: "From $450", description: "A focused review of the current site, offer, and inquiry path.", features: "Site review, offer notes, action list" },
    { name: "Service page build", price: "From $1,200", description: "A focused page for one service with CMS-ready copy blocks.", features: "Page structure, responsive UI, contact path" },
    { name: "Growth support", price: "Monthly", description: "Ongoing updates for teams that publish offers regularly.", features: "CMS updates, new sections, performance checks" }
  ],
  process: [
    { step: "Clarify the offer", description: "Define who the service is for and what decision the visitor should make." },
    { step: "Shape the page", description: "Build the service story around proof, packages, process, and contact." },
    { step: "Publish and improve", description: "Launch the page, review inquiries, and adjust content from the CMS." }
  ],
  caseStudies: [
    { client: "Neighborhood clinic", need: "Needed clearer service pages for new patients.", result: "Reduced phone clarification requests" },
    { client: "Operations consultant", need: "Needed a focused page for a new advisory package.", result: "Higher-quality inquiry notes" },
    { client: "Workshop organizer", need: "Needed a simple campaign page for a limited event.", result: "Published before registration opened" }
  ],
  faqs: [
    { question: "Can we edit service packages?", answer: "Yes. Admin users can update services, packages, process steps, case studies, and FAQ from the CMS dashboard." },
    { question: "Is this a booking system?", answer: "No. The MVP focuses on clear service pages and contact inquiries, not scheduling or payments." },
    { question: "Can it work without Firebase configured?", answer: "Public pages render fallback content. Firebase is required for CMS saves and contact messages." }
  ],
  trustPoints: ["Clear package comparison", "Simple contact intake", "Published-only public content"],
  contactInfo: "hello@example.com",
  seoTitle: "Service Business Website",
  seoDescription: "A responsive service business website with CMS, service packages, case studies, Firebase, and contact forms."
};
