"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ModeToggle } from "./mode-toggle";

export default function Header({ locale }: { locale: string }) {
	const t = useTranslations("nav");

	return (
		<header className="border-b">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="text-2xl font-bold">
						cogito-acad
					</Link>

					<nav className="hidden md:flex items-center gap-6">
						<Link href="/" className="hover:text-primary transition-colors">
							{t("home")}
						</Link>
						<Link
							href="/tutors"
							className="hover:text-primary transition-colors"
						>
							{t("tutors")}
						</Link>
						<Link
							href="/events"
							className="hover:text-primary transition-colors"
						>
							{t("events")}
						</Link>
						<Link
							href="/about"
							className="hover:text-primary transition-colors"
						>
							{t("about")}
						</Link>
						<Link href="/faq" className="hover:text-primary transition-colors">
							{t("faq")}
						</Link>
					</nav>

					<div className="flex items-center gap-4">
						<Link
							href={locale === "id" ? "/en" : "/id"}
							className="px-3 py-1 text-sm border rounded-md hover:bg-accent transition-colors"
						>
							{locale === "id" ? "EN" : "ID"}
						</Link>
						<ModeToggle />
					</div>
				</div>

				<nav className="md:hidden flex items-center justify-around py-2 gap-4">
					<Link
						href="/"
						className="text-sm hover:text-primary transition-colors"
					>
						{t("home")}
					</Link>
					<Link
						href="/tutors"
						className="text-sm hover:text-primary transition-colors"
					>
						{t("tutors")}
					</Link>
					<Link
						href="/events"
						className="text-sm hover:text-primary transition-colors"
					>
						{t("events")}
					</Link>
					<Link
						href="/about"
						className="text-sm hover:text-primary transition-colors"
					>
						{t("about")}
					</Link>
					<Link
						href="/faq"
						className="text-sm hover:text-primary transition-colors"
					>
						{t("faq")}
					</Link>
				</nav>
			</div>
		</header>
	);
}
