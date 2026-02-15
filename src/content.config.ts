import { defineCollection, z } from 'astro:content';
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

const flashcards = defineCollection({
  type: "content",
  schema: z.object({
    tags: z.array(z.string()),
    published: z.boolean().default(true)
  })
});

export const collections = { blog, flashcards };