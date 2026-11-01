import { describe, expect, test } from 'bun:test';
import {
  parsePublicTutorsResponse,
  publicTutorsEndpoint,
  publicTutorsRequestOptions,
  tryLoadPublicTutors,
} from '../src/lib/tutor-api.ts';

const tutor = {
  id: 'profile-1',
  name: 'Ada Tutor',
  profileImageUrl: null,
  shortBio: 'A short introduction.',
  affiliation: 'Cogito Academy',
  education: [{ university: 'UGM', degree: 'Computer Science' }],
  achievements: [{ competitionName: 'IMO', year: 2024, awards: ['Gold'] }],
  experiences: [
    {
      role: 'Coach',
      organization: 'Team A',
      startYear: 2022,
      endYear: null,
      description: 'Prepared students for competitions.',
    },
  ],
  subjects: [
    {
      id: 'subject-1',
      slug: 'algebra',
      name: 'Algebra',
      nameId: 'Aljabar',
      parent: {
        id: 'parent-1',
        slug: 'mathematics',
        name: 'Mathematics',
        nameId: 'Matematika',
        lightTextColor: 'oklch(0.2 0.02 250)',
        lightBackgroundColor: 'oklch(0.96 0.03 250)',
        darkTextColor: 'oklch(0.92 0.02 250)',
        darkBackgroundColor: 'oklch(0.25 0.04 250)',
      },
    },
  ],
  modality: 'both',
};

describe('public tutor API', () => {
  test('builds the slash-path RPC endpoint and no-store wrapped request', () => {
    expect(publicTutorsEndpoint('http://127.0.0.1:4300/')).toBe(
      'http://127.0.0.1:4300/rpc/publicContent/tutors/list',
    );

    const options = publicTutorsRequestOptions();
    expect(options.method).toBe('POST');
    expect(options.cache).toBe('no-store');
    expect(options.headers['Content-Type']).toBe('application/json');
    expect(JSON.parse(options.body)).toEqual({ json: {} });
  });

  test('accepts a valid empty response and validates the published tutor projection', async () => {
    await expect(parsePublicTutorsResponse(Response.json({ json: [], meta: [] }))).resolves.toEqual(
      [],
    );
    await expect(parsePublicTutorsResponse(Response.json({ json: [] }))).resolves.toEqual([]);
    await expect(
      parsePublicTutorsResponse(Response.json({ json: [tutor], meta: [] })),
    ).resolves.toEqual([tutor]);
    await expect(parsePublicTutorsResponse(Response.json({ json: [tutor] }))).resolves.toEqual([
      tutor,
    ]);
  });

  test('rejects transport, envelope, and tutor-shape failures', async () => {
    await expect(parsePublicTutorsResponse(new Response(null, { status: 503 }))).rejects.toThrow(
      'Tutor request failed with 503',
    );
    await expect(parsePublicTutorsResponse(new Response('{', { status: 200 }))).rejects.toThrow(
      'Tutor API returned invalid JSON',
    );
    await expect(parsePublicTutorsResponse(Response.json({ json: [], meta: {} }))).rejects.toThrow(
      'invalid oRPC response envelope',
    );
    await expect(
      parsePublicTutorsResponse(
        Response.json({ json: [{ ...tutor, modality: 'hybrid' }], meta: [] }),
      ),
    ).rejects.toThrow('invalid oRPC response envelope');
  });

  test('keeps an empty directory distinct from a failed request', async () => {
    await expect(tryLoadPublicTutors(async () => [])).resolves.toEqual({
      status: 'success',
      items: [],
    });

    const failed = await tryLoadPublicTutors(async () => {
      throw new Error('Tutor request failed with 503');
    });
    expect(failed.status).toBe('failure');
    expect(failed.error.message).toBe('Tutor request failed with 503');
  });

  test('lets Next dynamic-render signals propagate during the production build', async () => {
    const dynamicRender = Object.assign(new Error('dynamic server usage'), {
      digest: 'DYNAMIC_SERVER_USAGE',
    });

    await expect(tryLoadPublicTutors(() => Promise.reject(dynamicRender))).rejects.toBe(
      dynamicRender,
    );
  });
});
