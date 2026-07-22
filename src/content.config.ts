import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    year: z.string(),
    role: z.string().optional(),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    repo: z.string().url().optional(),
    link: z.string().url().optional(),
    /** Accent hue (0-360) used for the card gradient + detail hero. */
    hue: z.number().default(222),
  }),
});

export const collections = { projects };
