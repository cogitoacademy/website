import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono, Inter, Lexend_Deca } from "next/font/google";

import "../../index.css";
import Providers from "@/components/providers";
import Header from "@/components/header";

const lexendDeca = Lexend_Deca({
	variable: "--font-lexend-deca",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${lexendDeca.variable} ${inter.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<Providers>
						<div className="grid grid-rows-[auto_1fr] h-svh">
							<Header locale={locale} />
							{children}
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
