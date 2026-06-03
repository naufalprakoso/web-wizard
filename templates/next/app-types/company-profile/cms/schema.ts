import { z } from "zod";

const serviceBaseSchema = z.object({ title: z.string().min(2), description: z.string().min(4) });
const caseStudyBaseSchema = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
  challenge: z.string().min(4),
  approach: z.string().min(4),
  result: z.string().min(2)
});
const teamMemberBaseSchema = z.object({ name: z.string().min(2), role: z.string().min(2), bio: z.string().optional() });

export const companyProfileSchema = z.object({
  published: z.boolean(),
  companyName: z.string().min(2),
  companyTagline: z.string().min(4),
  companyDescription: z.string().min(10),
  logoUrl: z.string().url().or(z.literal("")),
  heroImage: z.string().url().or(z.literal("")),
  heroImageAlt: z.string().optional(),
  services: z.array(serviceBaseSchema),
  projects: z.array(caseStudyBaseSchema),
  stats: z.array(z.object({ label: z.string().min(2), value: z.string().min(1) })),
  sectors: z.array(z.string().min(2)),
  teamMembers: z.array(teamMemberBaseSchema),
  valuesIntro: z.string().min(10),
  values: z.array(z.string().min(2)),
  contactInfo: z.string().min(2),
  seoTitle: z.string().min(4),
  seoDescription: z.string().min(10)
});

export const companyServiceSchema = serviceBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });
export const companyCaseStudySchema = caseStudyBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });
export const companyTeamMemberSchema = teamMemberBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });

export type CompanyProfileContent = z.infer<typeof companyProfileSchema>;
export type CompanyService = z.infer<typeof companyServiceSchema>;
export type CompanyCaseStudy = z.infer<typeof companyCaseStudySchema>;
export type CompanyTeamMember = z.infer<typeof companyTeamMemberSchema>;
