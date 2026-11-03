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
    /** Frontmatter writes "7 min read"; only the number matters in code. */
    ttr: z
      .string()
      .regex(/^\d+ min read$/, 'ttr must have the form "7 min read"')
      .transform((value) => Number.parseInt(value, 10)),
    published: z.boolean().default(false),
  }),
});

export const collections = { blog };
