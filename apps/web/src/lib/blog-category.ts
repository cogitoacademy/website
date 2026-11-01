import type { BlogLocale } from './blog-api';
import { getBlogArticles, getBlogCategories } from './blog-api';

export async function loadCategoryPage(locale: BlogLocale, slug: string) {
  const [categories, list] = await Promise.all([
    getBlogCategories(locale),
    getBlogArticles(locale, 24),
  ]);

  const category = categories.find((item) => item.slug === slug);
  if (!category) return { status: 'missing' as const };

  const articles = list.rows.filter(
    (article) => article.category.slug === slug || article.subcategory?.slug === slug,
  );
  if (articles.length < 2) return { status: 'missing' as const };

  return { status: 'ok' as const, category, articles };
}
