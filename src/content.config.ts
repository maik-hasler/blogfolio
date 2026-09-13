import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.{md,mdx}"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()),
    ttr: z.string(),
    published: z.boolean().default(false)
  })
});

export const collections = { blog };