import {
	CORE_CATEGORIES,
	type CoreCategorySlug,
} from "@/lib/config/coreCategories";

/**
 * Map brand color keys to Tailwind CSS classes
 */
const BRAND_COLOR_MAP: Record<string, string> = {
	// Map old MUN colors to new 500 variant
	"tertiary-blue-300":
		"bg-tertiary-blue-500 hover:bg-tertiary-blue-400 border-tertiary-blue-500 text-white",
	"tertiary-blue-400":
		"bg-tertiary-blue-500 hover:bg-tertiary-blue-400 border-tertiary-blue-500 text-white",

	// New standard MUN color
	"tertiary-blue-500":
		"bg-tertiary-blue-500 hover:bg-tertiary-blue-400 border-tertiary-blue-500 text-white",

	"tertiary-red-600":
		"bg-tertiary-red-600 hover:bg-tertiary-red-500 border-tertiary-red-600 text-white",
	"tertiary-yellow-600":
		"bg-tertiary-yellow-600 hover:bg-tertiary-yellow-500 border-tertiary-yellow-600 text-white",
	"primary-500":
		"bg-primary-500 hover:bg-primary-400 border-primary-500 text-white",
	"secondary-500":
		"bg-secondary-500 hover:bg-secondary-400 border-secondary-500 text-white",
	"tertiary-green-600":
		"bg-tertiary-green-600 hover:bg-tertiary-green-500 border-tertiary-green-600 text-white",
	"tertiary-pink-300":
		"bg-tertiary-pink-300 hover:bg-tertiary-pink-200 border-tertiary-pink-300 text-white",
};

/**
 * Get Tailwind CSS classes for a brand color
 */
export function getBrandColorClass(colorKey: string): string {
	return BRAND_COLOR_MAP[colorKey] || BRAND_COLOR_MAP["primary-500"];
}

/**
 * Map brand color keys to badge variant classes (lighter background with brand color text)
 */
const BADGE_COLOR_MAP: Record<string, string> = {
	// MUN (Mapped to 500 for consistency)
	"tertiary-blue-300": "bg-tertiary-blue-500 text-neutral-1000",
	"tertiary-blue-400": "bg-tertiary-blue-500 text-neutral-1000",
	"tertiary-blue-500": "bg-tertiary-blue-500 text-neutral-1000",

	// Olimpiade

	"tertiary-red-600": "bg-tertiary-red-600 text-neutral-100",
	// WSC
	"tertiary-yellow-600": "bg-tertiary-yellow-600 text-neutral-1000",
	// KTI/Esai
	"primary-500": "bg-primary-500 text-neutral-100",
	// Debat
	"secondary-500": "bg-secondary-500 text-neutral-100",
	// Bisnis
	"tertiary-green-600": "bg-tertiary-green-600 text-neutral-1000",
	// Pidato
	"tertiary-pink-300": "bg-tertiary-pink-300 text-neutral-100",
};

/**
 * Get brand color class for a core category slug
 */
export function getCoreCategoryColor(coreSlug: string): string {
	const category = CORE_CATEGORIES[coreSlug as CoreCategorySlug];
	return category
		? getBrandColorClass(category.brandColor)
		: getBrandColorClass("primary-500");
}

/**
 * Get badge color class for a core category slug (lighter variant for badges)
 */
export function getCoreCategoryBadgeColor(coreSlug: string): string {
	const category = CORE_CATEGORIES[coreSlug as CoreCategorySlug];
	return category
		? BADGE_COLOR_MAP[category.brandColor] || BADGE_COLOR_MAP["primary-500"]
		: BADGE_COLOR_MAP["primary-500"];
}
