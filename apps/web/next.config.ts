import "@cogito-acad/env/web";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	experimental: {
		staleTimes: {
			dynamic: 30,
			static: 300,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},
	// async redirects() {
	//   return [
	//     {
	//       source: "/:path*",
	//       destination: "https://linktr.ee/cogitoacademy.id",
	//       permanent: false,
	//     },
	//   ];
	// },
};

export default withNextIntl(nextConfig);
