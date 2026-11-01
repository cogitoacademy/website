import { afterEach, describe, expect, mock, test } from 'bun:test';
import { getActivityClasses } from '../src/lib/activities-api.ts';

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const session = (sequenceNumber) => ({
  id: `s${sequenceNumber}`,
  sequenceNumber,
  startAt: '2026-11-01T10:00:00.000Z',
  titleEn: 'Practice',
  curriculumEn: null,
  mode: 'online',
  tutor: { name: 'Tutor' },
});
const item = {
  id: 'class-1',
  kind: 'cohort',
  state: 'published',
  titleEn: 'MUN',
  descriptionEn: 'Practice MUN',
  coverKey: 'covers/mun.webp',
  cohortFullRateMarks: 20,
  masterclassRateMarks: null,
  competition: { name: 'MUN' },
  sessions: [session(2), session(1)],
};

describe('Activities class adapter', () => {
  test('uses wrapped public RPC, no-store; orders sessions and removes empty classes', async () => {
    globalThis.fetch = mock(async (url, options) => {
      expect(url).toBe('http://localhost:3001/rpc/classes/list');
      expect(options.method).toBe('POST');
      expect(options.cache).toBe('no-store');
      expect(JSON.parse(options.body)).toEqual({ json: {} });
      return Response.json({ json: [item, { ...item, id: 'empty', sessions: [] }] });
    });
    const result = await getActivityClasses('http://localhost:3001/');
    expect(result).toHaveLength(1);
    expect(result[0].sessions.map((s) => s.sequenceNumber)).toEqual([1, 2]);
  });

  test('rejects failed, malformed and unpublished responses instead of showing empty success', async () => {
    for (const response of [
      new Response('', { status: 503 }),
      Response.json({ data: [] }),
      Response.json({ json: [{ ...item, state: 'draft' }] }),
    ]) {
      globalThis.fetch = mock(async () => response);
      await expect(getActivityClasses('http://localhost:3001')).rejects.toThrow();
    }
  });

  test('retains postponed classes with one canonical content language', async () => {
    globalThis.fetch = mock(async () =>
      Response.json({
        json: [{ ...item, state: 'postponed', titleId: 'Kelas MUN', descriptionId: 'Latihan MUN' }],
      }),
    );
    const result = await getActivityClasses('http://localhost:3001');
    expect(result[0].state).toBe('postponed');
    expect(result[0].titleEn).toBe('MUN');
    expect(result[0]).not.toHaveProperty('titleId');
    expect(result[0]).not.toHaveProperty('descriptionId');
  });

  test('allows empty catalog and rejects missing configuration', async () => {
    globalThis.fetch = mock(async () => Response.json({ json: [] }));
    expect(await getActivityClasses('http://localhost:3001')).toEqual([]);
    await expect(getActivityClasses('')).rejects.toThrow('not configured');
  });
});
