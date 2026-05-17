import { z } from "zod";

export const companyProfileSchema = z.object({
  published: z.boolean(),
  companyName: z.string().min(2),
  companyTagline: z.string().min(4),
  companyDescription: z.string().min(10),
  logoUrl: z.string().url().or(z.literal("")),
  heroImage: z.string().url().or(z.literal("")),
  services: z.array(z.string().min(2)),
  projects: z.array(z.string().min(2)),
  teamMembers: z.array(z.object({ name: z.string(), role: z.string() })),
  values: z.array(z.string().min(2)),
  contactInfo: z.string().min(2),
  seoTitle: z.string().min(4),
  seoDescription: z.string().min(10)
});

export type CompanyProfileContent = z.infer<typeof companyProfileSchema>;
