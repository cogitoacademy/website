import type { BlogLocale } from './blog-api';
import { getBlogArticles, getBlogCategories } from './blog-api';

export async function loadCategoryPage(locale: BlogLocale, slug: string) {
  const siblingLocale: BlogLocale = locale === 'id' ? 'en' : 'id';
  const [categories, siblingCategories, list] = await Promise.all([
    getBlogCategories(locale),
    getBlogCategories(siblingLocale).catch(() => []),
    getBlogArticles(locale, 24),
  ]);

  const category = categories.find((item) => item.slug === slug);
  if (!category) return { status: 'missing' as const };

  const articles = list.rows.filter(
    (article) => article.category.slug === slug || article.subcategory?.slug === slug,
  );
  if (articles.length < 2) return { status: 'missing' as const };

  const sibling = siblingCategories.find((item) => item.id === category.id);
  return {
    status: 'ok' as const,
    category,
    articles,
    sibling:
      sibling && sibling.articleCount >= 2 ? { locale: siblingLocale, slug: sibling.slug } : null,
  };
}
