import { z } from "zod";

const imageSourceSchema = z.string().refine(
  (value) => value === "" || value.startsWith("/") || z.string().url().safeParse(value).success,
  "Use an absolute URL, a site-relative path beginning with /, or leave the field empty."
);

const campaignCardSchema = z.object({
  eyebrow: z.string().min(2),
  title: z.string().min(2),
  body: z.string().min(2),
  ctaLabel: z.string().min(2),
  href: z.string().min(1),
  imageUrl: imageSourceSchema,
  imageAlt: z.string(),
  tone: z.string().min(2)
});

const promoTileSchema = z.object({
  title: z.string().min(2),
  ctaLabel: z.string().min(2),
  href: z.string().min(1),
  imageUrl: imageSourceSchema,
  imageAlt: z.string(),
  tone: z.string().min(2)
});

const serviceBenefitSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(2)
});

export const productSchema = z.object({
  id: z.string().optional(),
  published: z.boolean(),
  featured: z.boolean(),
  name: z.string().min(2),
  shortDescription: z.string().min(10),
  description: z.string().min(10),
  imageUrl: imageSourceSchema,
  imageAlt: z.string().optional(),
  imageTone: z.string().optional(),
  category: z.string().min(2),
  price: z.string().optional(),
  compareAtPrice: z.string().optional(),
  rating: z.number().min(0).max(5),
  soldCount: z.number().int().min(0),
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
  description: z.string().min(2),
  imageUrl: imageSourceSchema,
  imageAlt: z.string()
});

export const productCatalogSchema = z.object({
  published: z.boolean(),
  heroImageUrl: imageSourceSchema,
  heroImageAlt: z.string().min(2),
  campaignLabel: z.string().min(2),
  campaignPeriod: z.string().min(2),
  campaignEyebrow: z.string().min(2),
  headline: z.string().min(4),
  subtitle: z.string().min(10),
  primaryCtaLabel: z.string().min(2),
  sideBanners: z.array(campaignCardSchema).max(4),
  categoryEyebrow: z.string().min(2),
  categoryTitle: z.string().min(2),
  topDealsTitle: z.string().min(2),
  promoTiles: z.array(promoTileSchema).max(6),
  accessoryRailTitle: z.string().min(2),
  finderEyebrow: z.string().min(2),
  finderTitle: z.string().min(2),
  finderDescription: z.string().min(10),
  clothingRailTitle: z.string().min(2),
  brandStrip: z.array(z.string().min(2)).max(12),
  serviceBenefits: z.array(serviceBenefitSchema).max(8),
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
