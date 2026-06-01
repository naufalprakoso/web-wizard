import type { LandingPageContent } from "./schema";

export const landingPageDefaultContent: LandingPageContent = {
  published: true,
  heroTitle: "Launch a focused website in days, not months",
  heroSubtitle: "A conversion-focused landing page for teams that need clear messaging, editable sections, and a practical way to collect leads.",
  ctaText: "Book a strategy call",
  ctaLink: "#contact",
  conversionNote: "Best for campaigns, service offers, waitlists, and product launches that need one clear next step.",
  heroImage: "",
  heroImageAlt: "Structured landing page campaign preview",
  problemTitle: "Campaign pages often stall between design, copy, and deployment.",
  problemBody: "This template gives small teams a focused page structure they can publish quickly, then keep current from the CMS without rebuilding the whole site.",
  outcomeTitle: "A clear path from first visit to qualified lead.",
  outcomeBody: "Every section supports one job: explain the offer, show why it matters, answer doubts, and send visitors into a simple contact flow.",
  audienceSegments: [
    { name: "Launch teams", description: "Publish a clear offer page before a campaign, event, or product release." },
    { name: "Service businesses", description: "Explain outcomes, process, proof, and contact steps without a heavy website." },
    { name: "Internal teams", description: "Create editable pages for pilots, programs, and announcements." }
  ],
  contentVariants: [
    { name: "SaaS waitlist", description: "Collect interest before a product is ready for a full website.", cta: "Join the waitlist" },
    { name: "Service offer", description: "Explain the problem, process, proof, and contact path for a focused service.", cta: "Request a consultation" },
    { name: "Event campaign", description: "Publish a temporary page for a launch, workshop, program, or announcement.", cta: "Reserve a spot" }
  ],
  proofPoints: ["Editable CMS sections", "Mobile-first conversion flow", "Firebase-ready lead capture"],
  features: ["CMS-managed sections", "Fast responsive pages", "Firebase-ready admin", "SEO-friendly structure"],
  benefits: ["Move campaigns faster without developer bottlenecks", "Keep messaging consistent across every section", "Capture leads through a validated contact form"],
  steps: ["Clarify your offer", "Publish the core sections", "Review leads and update the page"],
  testimonials: [
    { name: "Growth team", role: "Sample use case", quote: "The page made the offer obvious and helped qualify inquiries faster." },
    { name: "Operations lead", role: "Sample use case", quote: "We can update launch content without waiting on a deployment." }
  ],
  faqs: [
    { question: "Can we edit the content?", answer: "Yes. Admin users can update the landing page content from the CMS dashboard." },
    { question: "Does it work on mobile?", answer: "The layout is mobile-first and adapts from one-column sections to desktop grids." }
  ],
  finalCtaTitle: "Ready to turn the offer into a working page?",
  finalCtaText: "Use the CMS to adjust the message, publish the sections that matter, and collect visitor intent through the contact form.",
  contactInfo: "hello@example.com",
  seoTitle: "Conversion-Focused Landing Page",
  seoDescription: "A responsive landing page with CMS, Firebase, SEO, and theme settings."
};
