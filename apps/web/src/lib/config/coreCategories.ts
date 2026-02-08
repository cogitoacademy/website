export const CORE_CATEGORIES = {
	mun: {
		name: "Model United Nations",
		brandColor: "tertiary-blue-500",
	},

	olimpiade: {
		name: "Olimpiade",
		brandColor: "tertiary-red-600",
	},
	wsc: {
		name: "World Scholar's Cup",
		brandColor: "tertiary-yellow-600",
	},
	kti: {
		name: "KTI dan Esai",
		brandColor: "primary-500",
	},
	debat: {
		name: "Debat",
		brandColor: "secondary-500",
	},
	business: {
		name: "Business Plan",
		brandColor: "tertiary-green-600",
	},
	pidato: {
		name: "Pidato",
		brandColor: "tertiary-pink-300",
	},
} as const;

export type CoreCategorySlug = keyof typeof CORE_CATEGORIES;
