import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  published: z.boolean(),
  featured: z.boolean(),
  name: z.string().min(2),
  shortDescription: z.string().min(10),
  description: z.string().min(10),
  imageUrl: z.string().url().or(z.literal("")),
  imageAlt: z.string().optional(),
  imageTone: z.string().optional(),
  category: z.string().min(2),
  price: z.string().optional(),
  status: z.string().min(2),
  specifications: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).default([]),
  seoTitle: z.string().min(2),
  seoDescription: z.string().min(10)
});

export const categorySchema = z.object({
  id: z.string().optional(),
  published: z.boolean(),
  featured: z.boolean().optional(),
  name: z.string().min(2),
  description: z.string().min(2)
});

export const productCatalogSchema = z.object({
  published: z.boolean(),
  headline: z.string().min(4),
  subtitle: z.string().min(10),
  about: z.string().min(10),
  trustHeadline: z.string().min(4),
  trustPoints: z.array(z.string().min(2)).default([]),
  whatsappCta: z.string().min(2),
  whatsappUrl: z.string().url().or(z.literal("")),
  seoTitle: z.string().min(4),
  seoDescription: z.string().min(10)
});

export type ProductCatalogContent = z.infer<typeof productCatalogSchema>;
export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;
