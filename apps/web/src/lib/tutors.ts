import 'server-only';

import {
  parsePublicTutorsResponse,
  publicTutorsEndpoint,
  publicTutorsRequestOptions,
} from '@/lib/tutor-api';
import type { Tutor } from '@/types/tutor';

export async function getTutors(): Promise<Tutor[]> {
  const apiUrl = process.env.COGITO_APP_API_URL;
  if (!apiUrl) throw new Error('COGITO_APP_API_URL is not configured');

  return parsePublicTutorsResponse(
    await fetch(publicTutorsEndpoint(apiUrl), publicTutorsRequestOptions()),
  );
}

export async function getFeaturedTutors(): Promise<Tutor[]> {
  return (await getTutors()).slice(0, 4);
}
