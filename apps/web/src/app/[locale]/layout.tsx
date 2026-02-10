import { Inter, Lexend_Deca } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import "../../index.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import { routing } from "@/i18n/routing";

const lexendDeca = Lexend_Deca({
	variable: "--font-lexend-deca",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${lexendDeca.variable} ${inter.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<Providers>
						<Header />
						{children}
						<Footer />
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
