import { z } from "zod";

export const landingPageSchema = z.object({
  published: z.boolean(),
  heroTitle: z.string().min(4),
  heroSubtitle: z.string().min(10),
  ctaText: z.string().min(2),
  ctaLink: z.string().min(1),
  heroImage: z.string().url().or(z.literal("")),
  features: z.array(z.string().min(2)),
  benefits: z.array(z.string().min(2)),
  steps: z.array(z.string().min(2)),
  testimonials: z.array(z.object({ name: z.string(), quote: z.string() })),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  contactInfo: z.string().min(2),
  seoTitle: z.string().min(4),
  seoDescription: z.string().min(10)
});

export type LandingPageContent = z.infer<typeof landingPageSchema>;
