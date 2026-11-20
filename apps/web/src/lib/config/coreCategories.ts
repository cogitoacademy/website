export const CORE_CATEGORIES = {
  mun: {
    name: 'Model United Nations',
    brandColor: 'tertiary-blue-500',
  },

  olimpiade: {
    name: 'Olimpiade',
    brandColor: 'tertiary-red-600',
  },
  wsc: {
    name: "World Scholar's Cup",
    brandColor: 'tertiary-yellow-600',
  },
  kti: {
    name: 'KTI dan Esai',
    brandColor: 'primary-500',
  },
  debat: {
    name: 'Debat',
    brandColor: 'secondary-500',
  },
  business: {
    name: 'Business Plan',
    brandColor: 'tertiary-green-600',
  },
  pidato: {
    name: 'Pidato',
    brandColor: 'tertiary-pink-300',
  },
} as const;

export type CoreCategorySlug = keyof typeof CORE_CATEGORIES;

/**
 * The Cogito app stores the seven default competition categories under
 * canonical slugs. Legacy Sanity documents use the short aliases, so both
 * shapes must resolve to the same presentation color while the app becomes the
 * only calendar source.
 */
const CORE_CATEGORY_ALIASES: Record<string, CoreCategorySlug> = {
  'competition-model-united-nations': 'mun',
  'competition-olympiad': 'olimpiade',
  'competition-world-scholars-cup': 'wsc',
  'competition-essay-writing': 'kti',
  'competition-debate': 'debat',
  'competition-business': 'business',
  'competition-public-speaking': 'pidato',
};

export function resolveCoreCategorySlug(slug?: string | null): CoreCategorySlug | undefined {
  if (!slug) return undefined;
  if (Object.hasOwn(CORE_CATEGORIES, slug)) return slug as CoreCategorySlug;
  return CORE_CATEGORY_ALIASES[slug];
}
