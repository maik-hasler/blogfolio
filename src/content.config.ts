import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()),
    /** Frontmatter schreibt "7 min read"; im Code zählt nur die Zahl. */
    ttr: z
      .string()
      .regex(/^\d+ min read$/, 'ttr muss die Form "7 min read" haben')
      .transform((value) => Number.parseInt(value, 10)),
    published: z.boolean().default(false),
  }),
});

export const collections = { blog };
