import { z } from "zod";

const serviceBaseSchema = z.object({ title: z.string().min(2), description: z.string().min(4), outcome: z.string().min(2) });
const packageBaseSchema = z.object({ name: z.string().min(2), price: z.string().min(1), description: z.string().min(4), features: z.string().min(2) });
const processBaseSchema = z.object({ step: z.string().min(2), description: z.string().min(4) });
const caseStudyBaseSchema = z.object({ client: z.string().min(2), need: z.string().min(4), result: z.string().min(2) });
const faqBaseSchema = z.object({ question: z.string().min(2), answer: z.string().min(4) });

export const serviceBusinessSchema = z.object({
  published: z.boolean(),
  businessName: z.string().min(2),
  headline: z.string().min(4),
  subtitle: z.string().min(10),
  heroImage: z.string().url().or(z.literal("")),
  heroImageAlt: z.string().optional(),
  serviceArea: z.string().min(2),
  responsePromise: z.string().min(2),
  services: z.array(serviceBaseSchema),
  packages: z.array(packageBaseSchema),
  process: z.array(processBaseSchema),
  caseStudies: z.array(caseStudyBaseSchema),
  faqs: z.array(faqBaseSchema),
  trustPoints: z.array(z.string().min(2)),
  contactInfo: z.string().min(2),
  seoTitle: z.string().min(4),
  seoDescription: z.string().min(10)
});

export const serviceBusinessServiceSchema = serviceBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });
export const serviceBusinessPackageSchema = packageBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });
export const serviceBusinessProcessSchema = processBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });
export const serviceBusinessCaseStudySchema = caseStudyBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });
export const serviceBusinessFaqSchema = faqBaseSchema.extend({ id: z.string().optional(), published: z.boolean() });

export type ServiceBusinessContent = z.infer<typeof serviceBusinessSchema>;
export type ServiceBusinessService = z.infer<typeof serviceBusinessServiceSchema>;
export type ServiceBusinessPackage = z.infer<typeof serviceBusinessPackageSchema>;
export type ServiceBusinessProcess = z.infer<typeof serviceBusinessProcessSchema>;
export type ServiceBusinessCaseStudy = z.infer<typeof serviceBusinessCaseStudySchema>;
export type ServiceBusinessFaq = z.infer<typeof serviceBusinessFaqSchema>;
