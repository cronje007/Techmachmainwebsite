import { defineCollection, z } from 'astro:content';

const divisions = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      summary: z.string(),
      heroImage: z.string(),
      services: z.array(z.string()),
      gallery: z.array(z.string())
    })
});

const projects = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      division: z.string(),
      location: z.string(),
      date: z.union([z.string(), z.date()]),
      featuredImage: z.string(),
      gallery: z.array(z.string()),
      excerpt: z.string()
    })
});

const partners = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      name: z.string(),
      category: z.string(),
      logo: z.string(),
      website: z.string().url().optional()
    })
});

const pages = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      heroHeadline: z.string().optional(),
      heroText: z.string().optional(),
      ctaText: z.string().optional(),
      intro: z.string().optional(),
      contactEmail: z.string().optional(),
      contactPhone: z.string().optional(),
      address: z.string().optional(),
      droneImage: z.string().optional()
    })
});

export const collections = { divisions, projects, partners, pages };
