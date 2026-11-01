import type { BlogLocale } from './blog-api';

export function formatBlogDate(value: string, locale: BlogLocale) {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    dateStyle: 'long',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(value));
}
