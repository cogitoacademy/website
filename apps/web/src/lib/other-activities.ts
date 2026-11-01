import { z } from 'zod';
const run = z.object({
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  href: z
    .string()
    .refine(
      (v) =>
        /^https?:\/\//i.test(v) ||
        /^mailto:/i.test(v) ||
        (v.startsWith('/') && !v.startsWith('//')) ||
        v.startsWith('#'),
    )
    .optional(),
});
const body = z.object({
  type: z.literal('doc'),
  blocks: z.array(
    z.discriminatedUnion('type', [
      z.object({ type: z.literal('paragraph'), content: z.array(run) }),
      z.object({
        type: z.literal('list'),
        style: z.enum(['ordered', 'unordered']),
        items: z.array(z.array(run)),
      }),
    ]),
  ),
});
const article = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.url().nullable(),
  location: z.string(),
  startAt: z.iso.datetime({ offset: true }),
  status: z.enum(['upcoming', 'completed']),
  body,
});
export type OtherActivity = z.infer<typeof article>;
export async function getOtherActivities(apiUrl: string, locale: string): Promise<OtherActivity[]> {
  if (!apiUrl) throw new Error('COGITO_APP_API_URL is not configured');
  const response = await fetch(apiUrl.replace(/\/+$/, '') + '/rpc/publicContent/activities/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ json: { locale } }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error('Activities request failed');
  return z.object({ json: z.array(article) }).parse(await response.json()).json;
}
