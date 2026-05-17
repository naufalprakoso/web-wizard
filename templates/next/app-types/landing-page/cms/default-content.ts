import type { LandingPageContent } from "./schema";

export const landingPageDefaultContent: LandingPageContent = {
  published: true,
  heroTitle: "Launch a focused website in days, not months",
  heroSubtitle: "A conversion-focused landing page for teams that need clear messaging, editable sections, and a practical way to collect leads.",
  ctaText: "Book a strategy call",
  ctaLink: "#contact",
  heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
  features: ["CMS-managed sections", "Fast responsive pages", "Firebase-ready admin", "SEO-friendly structure"],
  benefits: ["Move campaigns faster without developer bottlenecks", "Keep messaging consistent across every section", "Capture leads through a validated contact form"],
  steps: ["Clarify your offer", "Publish the core sections", "Review leads and update the page"],
  testimonials: [
    { name: "Maya Chen", quote: "The new page made our offer obvious and helped sales qualify leads faster." },
    { name: "Rafi Nugroho", quote: "We can update launch content ourselves without waiting on a deployment." }
  ],
  faqs: [
    { question: "Can we edit the content?", answer: "Yes. Admin users can update the landing page content from the CMS dashboard." },
    { question: "Does it work on mobile?", answer: "The layout is mobile-first and adapts from one-column sections to desktop grids." }
  ],
  contactInfo: "hello@example.com",
  seoTitle: "Conversion-Focused Landing Page",
  seoDescription: "A responsive landing page with CMS, Firebase, SEO, and theme settings."
};
