import { z } from "zod";

export const companyProfileSchema = z.object({
  published: z.boolean(),
  companyName: z.string().min(2),
  companyTagline: z.string().min(4),
  companyDescription: z.string().min(10),
  logoUrl: z.string().url().or(z.literal("")),
  heroImage: z.string().url().or(z.literal("")),
  heroImageAlt: z.string().optional(),
  services: z.array(z.object({ title: z.string().min(2), description: z.string().min(4) })),
  projects: z.array(z.object({
    name: z.string().min(2),
    type: z.string().min(2),
    challenge: z.string().min(4),
    approach: z.string().min(4),
    result: z.string().min(2)
  })),
  stats: z.array(z.object({ label: z.string().min(2), value: z.string().min(1) })),
  sectors: z.array(z.string().min(2)),
  teamMembers: z.array(z.object({ name: z.string(), role: z.string(), bio: z.string().optional() })),
  valuesIntro: z.string().min(10),
  values: z.array(z.string().min(2)),
  contactInfo: z.string().min(2),
  seoTitle: z.string().min(4),
  seoDescription: z.string().min(10)
});

export type CompanyProfileContent = z.infer<typeof companyProfileSchema>;
