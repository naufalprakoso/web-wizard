import type { LandingPageContent } from "./schema";

export const landingPageDefaultContent: LandingPageContent = {
  published: true,
  heroTitle: "Convert clicks into booked calls",
  heroSubtitle: "A polished landing page system for campaigns, offers, and launches that need clear messaging, mobile-first sections, and CMS-managed lead capture.",
  ctaText: "Start your launch",
  ctaLink: "#contact",
  conversionNote: "Best for teams that need one high-converting page instead of a heavy website rebuild.",
  heroImage: "",
  heroImageAlt: "Mobile-first landing page funnel preview",
  problemTitle: "Most campaign pages look finished but fail to guide the next decision.",
  problemBody: "This template gives teams a landing page that feels intentionally designed from the first viewport to the contact form, with content that stays editable after launch.",
  outcomeTitle: "A conversion story visitors can understand in one scroll.",
  outcomeBody: "Every section supports a specific job: explain the offer, make the value tangible, answer objections, show proof, and move visitors into a simple contact path.",
  audienceSegments: [
    { name: "Launch teams", description: "Publish a campaign page before the product, event, or announcement needs a full website." },
    { name: "Service sellers", description: "Present outcomes, process, proof, and contact steps in one focused conversion path." },
    { name: "Growth teams", description: "Test messaging and update sections from the CMS without waiting for a redesign." }
  ],
  contentVariants: [
    { name: "SaaS waitlist", description: "Validate demand with a product story, benefit blocks, FAQs, and a lightweight inquiry path.", cta: "Join the waitlist" },
    { name: "Service offer", description: "Explain the pain point, method, expected result, proof, and next step without a bloated website.", cta: "Request a consultation" },
    { name: "Event campaign", description: "Promote a workshop, launch, or announcement with a clear schedule and conversion-focused CTA.", cta: "Reserve a spot" }
  ],
  proofPoints: ["CMS-managed copy", "Mobile-first funnel flow", "Firebase-ready inquiries"],
  features: ["Hero and campaign message", "Offer modules and proof", "Lead capture contact flow", "SEO-ready content structure"],
  benefits: ["Keep the headline, CTA, proof points, FAQ, and contact details editable from the CMS", "Turn features, objections, and proof into visual sections instead of flat text blocks", "Collect visitor intent through a clean contact form that works with the generated Firebase setup", "Ship a page that is structured for search previews, social sharing, and fast responsive loading"],
  steps: ["Clarify the offer", "Shape the page story", "Publish and refine"],
  testimonials: [
    { name: "Growth team", role: "Campaign launch", quote: "The page made the offer obvious and helped us qualify inquiries before sales calls." },
    { name: "Studio lead", role: "Service offer", quote: "The structure gave our pitch more confidence without turning the site into a long brochure." }
  ],
  faqs: [
    { question: "Can we edit the content?", answer: "Yes. Admin users can update the headline, CTA, proof points, feature sections, testimonials, FAQs, and contact details from the CMS dashboard." },
    { question: "Does it work on mobile?", answer: "Yes. The layout is mobile-first and then expands into richer desktop sections without changing the campaign story." },
    { question: "Can it run without Firebase configured?", answer: "Yes. Public pages render with safe fallback content, while CMS and lead capture become active after Firebase environment variables are configured." }
  ],
  finalCtaTitle: "Build the page around one clear next step.",
  finalCtaText: "Use the CMS to refine the message, keep every launch section current, and collect visitor intent through the generated contact form.",
  contactInfo: "hello@example.com",
  seoTitle: "Modern Conversion Landing Page",
  seoDescription: "A modern responsive landing page template with CMS-managed content, Firebase-ready lead capture, SEO, and theme settings."
};
