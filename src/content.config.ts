import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        subtitle: z.string(),
        link: z.string().url(),
        image: image().optional(),
        videoUrl: z.string().url().optional(),
        gradient: z.string(),
        order: z.number(),
        draft: z.boolean().default(false),
      })
      .refine((data) => Boolean(data.image) !== Boolean(data.videoUrl), {
        message: 'Each project must have exactly one of: image or videoUrl',
      }),
});

export const collections = { projects };
