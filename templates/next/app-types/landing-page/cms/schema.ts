import { z } from "zod";

export const landingPageSchema = z.object({
  published: z.boolean(),
  heroTitle: z.string().min(4),
  heroSubtitle: z.string().min(10),
  ctaText: z.string().min(2),
  ctaLink: z.string().min(1),
  conversionNote: z.string().min(4),
  heroImage: z.string().url().or(z.literal("")),
  heroImageAlt: z.string().optional(),
  problemTitle: z.string().min(4),
  problemBody: z.string().min(10),
  outcomeTitle: z.string().min(4),
  outcomeBody: z.string().min(10),
  audienceSegments: z.array(z.object({ name: z.string().min(2), description: z.string().min(4) })),
  contentVariants: z.array(z.object({ name: z.string().min(2), description: z.string().min(4), cta: z.string().min(2) })),
  proofPoints: z.array(z.string().min(2)),
  features: z.array(z.string().min(2)),
  benefits: z.array(z.string().min(2)),
  steps: z.array(z.string().min(2)),
  testimonials: z.array(z.object({ name: z.string(), role: z.string().optional(), quote: z.string() })),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  finalCtaTitle: z.string().min(4),
  finalCtaText: z.string().min(10),
  contactInfo: z.string().min(2),
  seoTitle: z.string().min(4),
  seoDescription: z.string().min(10)
});

export type LandingPageContent = z.infer<typeof landingPageSchema>;
