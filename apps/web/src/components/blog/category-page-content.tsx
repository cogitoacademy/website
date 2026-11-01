import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { BlogErrorState } from '@/components/blog/blog-error-state';
import { CategoryHub } from '@/components/blog/category-hub';
import NavbarResolver from '@/components/navbar-resolver';
import type { BlogLocale } from '@/lib/blog-api';
import { loadCategoryPage } from '@/lib/blog-category';
import { categoryPath } from '@/lib/blog-paths';

export async function CategoryPageContent({ locale, slug }: { locale: BlogLocale; slug: string }) {
  const t = await getTranslations({ locale, namespace: 'blog.category' });
  const retryHref = categoryPath(locale, slug);

  let data = null;
  let failed = false;

  try {
    data = await loadCategoryPage(locale, slug);
  } catch (error) {
    console.error('Blog category request failed', error);
    failed = true;
  }

  if (failed) {
    return (
      <>
        <NavbarResolver className="bg-background-cream" />
        <div className="bg-background-cream pb-40 text-neutral-1000">
          <div className="mx-auto max-w-3xl px-4">
            <BlogErrorState
              title={t('errorTitle')}
              description={t('errorDescription')}
              retryLabel={t('retry')}
              retryHref={retryHref}
            />
          </div>
        </div>
      </>
    );
  }

  if (!data || data.status === 'missing') notFound();

  return (
    <>
      <NavbarResolver className="bg-background-cream" />
      <div className="bg-background-cream pb-40 text-neutral-1000">
        <div className="mx-auto max-w-7xl px-4">
          <CategoryHub category={data.category} articles={data.articles} locale={locale} />
        </div>
      </div>
    </>
  );
}
