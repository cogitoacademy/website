import { parseFaqResponse } from './faq-response';
import type { FaqLocale, FaqSurface, PublicFaq } from '@/types/faq';

export type PublicFaqLoadResult =
  | { status: 'success'; items: PublicFaq[] }
  | { status: 'failure'; error: unknown };

function isNextDynamicServerUsage(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    error.digest === 'DYNAMIC_SERVER_USAGE'
  );
}

export function publicFaqEndpoint(apiUrl: string) {
  return `${apiUrl.replace(/\/+$/, '')}/rpc/publicContent/faq/list`;
}

export async function tryLoadPublicFaq(
  read: () => Promise<PublicFaq[]>,
): Promise<PublicFaqLoadResult> {
  try {
    return { status: 'success', items: await read() };
  } catch (error) {
    if (isNextDynamicServerUsage(error)) throw error;
    return { status: 'failure', error };
  }
}

export function publicFaqRequestOptions(locale: FaqLocale, surface: FaqSurface): RequestInit {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ json: { locale, surface } }),
    cache: 'no-store',
  };
}

export async function parsePublicFaqResponse(response: Response): Promise<PublicFaq[]> {
  if (!response.ok) {
    throw new Error(`FAQ request failed with ${response.status}`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error('FAQ API returned invalid JSON', { cause: error });
  }

  return parseFaqResponse(payload);
}
