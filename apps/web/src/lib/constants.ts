export const APEX_HOST = 'cogitoacademy.id';
export const CANONICAL_HOST = 'www.cogitoacademy.id';

const FALLBACK_BASE_URL = `https://${CANONICAL_HOST}`;

/**
 * Normalizes a configured site URL so the marketing site always advertises the
 * canonical `www` host. Preview and local hosts are left untouched.
 */
export function normalizeBaseUrl(raw?: string): string {
  const value = raw?.trim();
  if (!value) return FALLBACK_BASE_URL;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return FALLBACK_BASE_URL;
  }

  if (url.hostname === APEX_HOST) {
    url.hostname = CANONICAL_HOST;
  }

  const normalized = url.href.replace(/\/+$/, '');
  return normalized || FALLBACK_BASE_URL;
}

export const BASE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL || process.env.BASE_URL);
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.cogitoacademy.id';
export const KNOWLEDGE_BANK_URL = `${APP_URL}/knowledge-bank`;
