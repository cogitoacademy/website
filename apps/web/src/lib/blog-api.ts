import { z } from 'zod';

export const blogLocales = ['id', 'en'] as const;
export type BlogLocale = (typeof blogLocales)[number];

export function isBlogLocale(value: string): value is BlogLocale {
  return value === 'id' || value === 'en';
}

const mediaSchema = z.object({
  id: z.string().min(1),
  url: z.string().url(),
  filename: z.string(),
  contentType: z.string(),
  width: z.number().int().positive().nullable(),
  height: z.number().int().positive().nullable(),
  byteSize: z.number().int().positive().nullable(),
});

const runSchema = z.object({
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  href: z.string().optional(),
});

const blockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('heading'),
    level: z.union([z.literal(2), z.literal(3)]),
    text: z.string().min(1),
  }),
  z.object({ type: z.literal('paragraph'), runs: z.array(runSchema).min(1) }),
  z.object({
    type: z.literal('list'),
    style: z.enum(['ordered', 'unordered']),
    items: z.array(z.array(runSchema).min(1)).min(1),
  }),
  z.object({
    type: z.literal('quote'),
    runs: z.array(runSchema).min(1),
    attribution: z.string().optional(),
  }),
  z.object({
    type: z.literal('callout'),
    title: z.string().min(1),
    runs: z.array(runSchema).min(1),
  }),
  z.object({
    type: z.literal('image'),
    mediaId: z.string().min(1),
    alt: z.string().min(1),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal('embed'),
    provider: z.enum(['instagram', 'tiktok']),
    url: z.string().url(),
    posterMediaId: z.string().optional(),
  }),
]);

const categorySchema = z.object({
  slug: z.string(),
  title: z.string(),
});

export const blogCardSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string(),
  hero: z
    .object({
      url: z.string().url(),
      width: z.number().int().positive().nullable(),
      height: z.number().int().positive().nullable(),
      alt: z.string().nullable(),
    })
    .nullable(),
  category: categorySchema,
  subcategory: categorySchema.nullable(),
  tutorName: z.string().nullable(),
  publishedAt: z.string().min(1),
  updatedAt: z.string().min(1),
  readingMinutes: z.number().int().positive(),
});
export type BlogCard = z.infer<typeof blogCardSchema>;

export const blogArticleSchema = blogCardSchema.extend({
  lead: z.string(),
  seoTitle: z.string(),
  metaDescription: z.string(),
  keyFacts: z.array(z.object({ text: z.string().min(1) })),
  body: z.array(blockSchema),
  faq: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })),
  gallery: z.array(
    z.object({
      url: z.string().url(),
      width: z.number().int().positive().nullable(),
      height: z.number().int().positive().nullable(),
      alt: z.string().nullable(),
    }),
  ),
  media: z.record(z.string(), mediaSchema),
  related: z.array(blogCardSchema),
  alternate: z.object({ locale: z.enum(blogLocales), slug: z.string().min(1) }).nullable(),
});
export type BlogArticle = z.infer<typeof blogArticleSchema>;
export type BlogBlock = z.infer<typeof blockSchema>;
export type BlogRun = z.infer<typeof runSchema>;

export const blogCategorySchema = z.object({
  id: z.string().min(1),
  parentId: z.string().nullable(),
  slug: z.string().min(1),
  title: z.string().min(1),
  intro: z.string().nullable(),
  articleCount: z.number().int().nonnegative(),
});
export type BlogCategory = z.infer<typeof blogCategorySchema>;

export class BlogNotFoundError extends Error {
  constructor() {
    super('Blog content not found');
    this.name = 'BlogNotFoundError';
  }
}

export class BlogApiError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Blog request failed with ${status}`);
    this.name = 'BlogApiError';
    this.status = status;
  }
}

function endpoint(path: string) {
  const apiUrl = process.env.COGITO_APP_API_URL;
  if (!apiUrl) throw new Error('COGITO_APP_API_URL is not configured');
  return `${apiUrl.replace(/\/+$/, '')}/rpc/public-content/blog/${path}`;
}

async function readJson<T>(schema: z.ZodType<T>, response: Response): Promise<T> {
  if (response.status === 404) throw new BlogNotFoundError();
  if (!response.ok) throw new BlogApiError(response.status);
  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error('Blog API returned invalid JSON', { cause: error });
  }
  const envelope = z.object({ json: schema }).safeParse(payload);
  if (!envelope.success) {
    throw new Error('Blog API returned an unexpected payload', { cause: envelope.error });
  }
  return envelope.data.json;
}

async function post<T>(path: string, body: Record<string, unknown>, schema: z.ZodType<T>) {
  const response = await fetch(endpoint(path), {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ json: body }),
    next: { revalidate: 60, tags: ['blog'] },
    signal: AbortSignal.timeout(10_000),
  });
  return readJson(schema, response);
}

export async function getBlogArticles(locale: BlogLocale, limit = 12) {
  return post(
    'list',
    { locale, limit },
    z.object({ rows: z.array(blogCardSchema), nextCursor: z.string().nullable() }),
  );
}

export async function getBlogArticle(locale: BlogLocale, slug: string) {
  return post('get', { locale, slug }, blogArticleSchema);
}

export async function getBlogCategories(locale: BlogLocale) {
  return post('categories', { locale }, z.array(blogCategorySchema));
}

export async function getBlogSitemap() {
  const response = await fetch(endpoint('sitemap'), {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ json: {} }),
    next: { revalidate: 60, tags: ['blog'] },
    signal: AbortSignal.timeout(10_000),
  });
  return readJson(
    z.array(
      z.object({
        articleId: z.string().min(1),
        locale: z.enum(blogLocales),
        slug: z.string().min(1),
        updatedAt: z.string().min(1),
        alternate: z.object({ locale: z.enum(blogLocales), slug: z.string().min(1) }).nullable(),
      }),
    ),
    response,
  );
}
