import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "cogito-acad",
	description: "cogito-acad",
};

export default async function LocaleTemplate({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	return (
		<div className="grid grid-rows-[auto_1fr] h-svh">
			<Header locale={locale} />
			{children}
		</div>
	);
}
