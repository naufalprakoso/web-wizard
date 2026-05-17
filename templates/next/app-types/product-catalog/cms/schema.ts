import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  published: z.boolean(),
  featured: z.boolean(),
  name: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().url().or(z.literal("")),
  category: z.string().min(2),
  price: z.string().optional(),
  status: z.string().min(2),
  seoTitle: z.string().min(2),
  seoDescription: z.string().min(10)
});

export const categorySchema = z.object({
  id: z.string().optional(),
  published: z.boolean(),
  name: z.string().min(2),
  description: z.string().min(2)
});

export const productCatalogSchema = z.object({
  published: z.boolean(),
  headline: z.string().min(4),
  subtitle: z.string().min(10),
  about: z.string().min(10),
  whatsappCta: z.string().min(2),
  whatsappUrl: z.string().url().or(z.literal("")),
  seoTitle: z.string().min(4),
  seoDescription: z.string().min(10)
});

export type ProductCatalogContent = z.infer<typeof productCatalogSchema>;
export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;
