import 'server-only';

import { parsePublicFaqResponse, publicFaqEndpoint, publicFaqRequestOptions } from '@/lib/faq-api';
import type { FaqLocale, FaqSurface, PublicFaq } from '@/types/faq';

export async function getPublicFaq(locale: FaqLocale, surface: FaqSurface): Promise<PublicFaq[]> {
  const apiUrl = process.env.COGITO_APP_API_URL;
  if (!apiUrl) throw new Error('COGITO_APP_API_URL is not configured');

  const endpoint = publicFaqEndpoint(apiUrl);
  return parsePublicFaqResponse(await fetch(endpoint, publicFaqRequestOptions(locale, surface)));
}
