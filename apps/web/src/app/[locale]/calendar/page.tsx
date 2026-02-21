import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { CalendarSkeleton } from "@/components/competition-calendar/calendar-skeleton";
import type { CalendarCompetition } from "@/components/competition-calendar/types";
import NavbarResolver from "@/components/navbar-resolver";
import { sanityToCalendarCompetition } from "@/lib/transforms/competitionTransform";
import { COMPETITIONS_QUERY } from "@/queries/competitions";
import { client } from "@/sanity/client";
import type { SanityCompetition } from "@/types/sanity/competition";
import CalendarClient from "./calendar";

async function CalendarContent() {
	try {
		const sanityCompetitions = await client.fetch<SanityCompetition[]>(
			COMPETITIONS_QUERY,
			{},
			{ next: { revalidate: 1800 } },
		);

		const calendarCompetitions = sanityCompetitions
			.map((c) => sanityToCalendarCompetition(c))
			.filter(Boolean) as CalendarCompetition[];

		return <CalendarClient initialCompetitions={calendarCompetitions} />;
	} catch (error) {
		console.error("Failed to fetch competitions:", error);
		return <CalendarClient initialCompetitions={[]} />;
	}
}

type Props = {
	params: Promise<{
		locale: string;
	}>;
};

export default async function CompetitionCalendarPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<NavbarResolver />
			<main className="relative z-3 mx-auto max-w-7xl gap-y-15 space-y-15 overflow-x-clip px-4">
				<div className="space-y-2">
					<h1 className="font-semibold text-2xl text-neutral-1000 sm:text-3xl md:text-4xl lg:text-5xl">
						{locale === "en" ? (
							<>
								Discover Your Next{" "}
								<span className="font-extrabold text-primary-500 italic">
									World Stage
								</span>
							</>
						) : (
							<>
								Temukan{" "}
								<span className="font-extrabold text-primary-500 italic">
									Panggung Duniamu
								</span>{" "}
								Selanjutnya
							</>
						)}
					</h1>
					<p className="max-w-2xl">
						{locale === "en"
							? "From national competitions to international stages, we provide access to thousands of achievement opportunities that have been systematically curated for you."
							: "Dari kompetisi nasional hingga panggung internasional, kami menyediakan akses ke ribuan peluang prestasi yang telah dikurasi secara sistematis untukmu."}
					</p>
				</div>
				<Suspense fallback={<CalendarSkeleton />}>
					<CalendarContent />
				</Suspense>
			</main>
		</>
	);
}
