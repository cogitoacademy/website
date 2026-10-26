import { describe, expect, test } from 'bun:test';
import {
  parsePublicFaqResponse,
  publicFaqEndpoint,
  publicFaqRequestOptions,
  tryLoadPublicFaq,
} from '../src/lib/faq-api.ts';

const endpoint = 'http://127.0.0.1:4300/rpc/publicContent/faq/list';

describe('public FAQ API', () => {
  test('builds the public FAQ RPC path from the configured API URL', () => {
    expect(publicFaqEndpoint('http://127.0.0.1:4300/')).toBe(endpoint);
  });

  test('builds a no-store POST with the wrapped locale and surface input', () => {
    const options = publicFaqRequestOptions('id', 'landing');

    expect(options.method).toBe('POST');
    expect(options.cache).toBe('no-store');
    expect(options.headers['Content-Type']).toBe('application/json');
    expect(JSON.parse(options.body)).toEqual({ json: { locale: 'id', surface: 'landing' } });
  });

  test('returns an empty list for valid responses with or without empty metadata', async () => {
    await expect(parsePublicFaqResponse(Response.json({ json: [], meta: [] }))).resolves.toEqual(
      [],
    );
    await expect(parsePublicFaqResponse(Response.json({ json: [] }))).resolves.toEqual([]);
  });

  test('throws on transport and malformed-response failures instead of treating them as empty', async () => {
    const httpFailure = new Response(null, { status: 503 });
    const invalidJson = new Response('{', { status: 200 });
    const invalidEnvelope = Response.json({ json: [], meta: {} });

    await expect(parsePublicFaqResponse(httpFailure)).rejects.toThrow(
      'FAQ request failed with 503',
    );
    await expect(parsePublicFaqResponse(invalidJson)).rejects.toThrow(
      'FAQ API returned invalid JSON',
    );
    await expect(parsePublicFaqResponse(invalidEnvelope)).rejects.toThrow(
      'invalid oRPC response envelope',
    );
  });

  test('rejects malformed FAQ entries in an otherwise valid envelope', async () => {
    const invalidEntry = Response.json({
      json: [{ id: 'faq-1', question: 'Question?', answer: [] }],
      meta: [],
    });

    await expect(parsePublicFaqResponse(invalidEntry)).rejects.toThrow('invalid sort order');
  });

  test('accepts localized rich documents and continues accepting legacy responses', async () => {
    const rich = await parsePublicFaqResponse(
      Response.json({
        json: [
          {
            id: 'faq-rich',
            question: 'How to join?',
            answer: [{ type: 'paragraph', text: 'Read the guide.' }],
            questionRich: {
              type: 'doc',
              blocks: [
                {
                  type: 'paragraph',
                  content: [{ text: 'How to ', bold: true }, { text: 'join?' }],
                },
              ],
            },
            answerRich: {
              type: 'doc',
              blocks: [
                {
                  type: 'paragraph',
                  content: [
                    { text: 'Read ' },
                    { text: 'the guide.', href: 'https://example.com/guide' },
                  ],
                },
              ],
            },
            sortOrder: 0,
          },
          {
            id: 'faq-legacy',
            question: 'Legacy question?',
            answer: [{ type: 'paragraph', text: 'Legacy answer.' }],
            sortOrder: 1,
          },
        ],
      }),
    );

    expect(rich[0].questionRich.blocks[0].content[0].bold).toBe(true);
    expect(rich[0].answerRich.blocks[0].content[1].href).toBe('https://example.com/guide');
    expect(rich[1].questionRich).toBeUndefined();
    expect(rich[1].answer).toEqual([{ type: 'paragraph', text: 'Legacy answer.' }]);
  });

  test('rejects unsafe links in rich FAQ content', async () => {
    const invalidEntry = Response.json({
      json: [
        {
          id: 'faq-1',
          question: 'Question?',
          answer: [{ type: 'paragraph', text: 'Answer.' }],
          questionRich: {
            type: 'doc',
            blocks: [
              {
                type: 'paragraph',
                content: [{ text: 'Question?', href: 'javascript:alert(1)' }],
              },
            ],
          },
          sortOrder: 0,
        },
      ],
      meta: [],
    });

    await expect(parsePublicFaqResponse(invalidEntry)).rejects.toThrow('unsafe link');
  });

  test('keeps a valid empty list distinct from a failed request', async () => {
    const empty = await tryLoadPublicFaq(async () => []);
    const failed = await tryLoadPublicFaq(async () => {
      throw new Error('FAQ request failed with 503');
    });

    expect(empty).toEqual({ status: 'success', items: [] });
    expect(failed.status).toBe('failure');
    expect(failed.error.message).toBe('FAQ request failed with 503');
  });

  test('lets Next dynamic-render signals propagate during the production build', async () => {
    const dynamicRender = Object.assign(new Error('dynamic server usage'), {
      digest: 'DYNAMIC_SERVER_USAGE',
    });

    await expect(tryLoadPublicFaq(() => Promise.reject(dynamicRender))).rejects.toBe(dynamicRender);
  });
});
