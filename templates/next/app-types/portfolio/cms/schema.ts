import { z } from "zod";

const projectBaseSchema = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
  summary: z.string().min(10),
  impact: z.string().min(2),
  stack: z.string().min(2),
  link: z.string().url().or(z.literal(""))
});

const serviceBaseSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(4)
});

const testimonialBaseSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  quote: z.string().min(10)
});

const noteBaseSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(10)
});

export const portfolioSchema = z.object({
  published: z.boolean(),
  name: z.string().min(2),
  role: z.string().min(2),
  headline: z.string().min(4),
  bio: z.string().min(10),
  location: z.string().min(2),
  availability: z.string().min(2),
  heroImage: z.string().url().or(z.literal("")),
  heroImageAlt: z.string().optional(),
  skills: z.array(z.string().min(2)),
  projects: z.array(projectBaseSchema),
  services: z.array(serviceBaseSchema),
  testimonials: z.array(testimonialBaseSchema),
  notes: z.array(noteBaseSchema),
  contactInfo: z.string().min(2),
  seoTitle: z.string().min(4),
  seoDescription: z.string().min(10)
});

export const portfolioProjectSchema = projectBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });
export const portfolioServiceSchema = serviceBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });
export const portfolioTestimonialSchema = testimonialBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });
export const portfolioNoteSchema = noteBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });

export type PortfolioContent = z.infer<typeof portfolioSchema>;
export type PortfolioProject = z.infer<typeof portfolioProjectSchema>;
export type PortfolioService = z.infer<typeof portfolioServiceSchema>;
export type PortfolioTestimonial = z.infer<typeof portfolioTestimonialSchema>;
export type PortfolioNote = z.infer<typeof portfolioNoteSchema>;
