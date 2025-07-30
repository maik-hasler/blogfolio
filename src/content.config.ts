import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
    schema: ({ }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        tags: z.array(z.string()),
        ttr: z.string(),
        published: z.boolean().default(false)
    })
});

export const collections = { blog };