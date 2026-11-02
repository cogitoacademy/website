import type { BlogLocale } from './blog-api';

export function blogHomePath(locale: BlogLocale) {
  return `/${locale}/blog`;
}

export function articlePath(locale: BlogLocale, slug: string) {
  return `${blogHomePath(locale)}/${slug}`;
}

export function categorySegment(locale: BlogLocale) {
  return locale === 'id' ? 'kategori' : 'category';
}

export function categoryPath(locale: BlogLocale, slug: string) {
  return `${blogHomePath(locale)}/${categorySegment(locale)}/${slug}`;
}
