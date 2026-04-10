import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Language of the post; defaults to "de". */
    lang: z.enum(["de", "en"]).default("de"),
    /**
     * Optional explicit slug used in URLs. If not set, Astro derives one
     * from the file path.
     */
    slug: z.string().optional(),
    /**
     * Shared key across DE and EN versions of the same post. The blog
     * post template uses this to find the cross-language counterpart so
     * the language switcher in the header points to the translated post
     * instead of a 404.
     */
    translationKey: z.string().optional(),
  }),
});

export const collections = { blog };
