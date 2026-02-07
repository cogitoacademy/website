import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
	CalendarIcon,
	ClockIcon,
	ExternalLinkIcon,
	MapPinIcon,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import NavbarResolver from "@/components/navbar-resolver";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { sanityToEvent } from "@/lib/transforms/eventTransform";
import { EVENTS_BY_CATEGORY_QUERY } from "@/queries/events";
import { client } from "@/sanity/client";
import type { Event, SanityEvent } from "@/types/sanity/event";

const VALID_CATEGORIES = ["monthly-townhall", "cogito-101-series"] as const;
type CategorySlug = (typeof VALID_CATEGORIES)[number];

const CATEGORY_META: Record<
	CategorySlug,
	{
		title: { id: string; en: string };
		subtitle: { id: string; en: string };
		description: { id: string; en: string };
	}
> = {
	"monthly-townhall": {
		title: {
			id: "Monthly Townhall",
			en: "Monthly Townhall",
		},
		subtitle: {
			id: "Bergabunglah setiap bulan untuk update, diskusi, dan bonding komunitas.",
			en: "Join us every month for updates, discussions, and community bonding.",
		},
		description: {
			id: "Pertemuan bulanan kami adalah detak jantung komunitas Cogito. Kami membahas kegiatan mendatang, berbagi pencapaian, dan membuka sesi tanya jawab.",
			en: "Our monthly meetings are the heartbeat of the Cogito community. We discuss upcoming activities, share achievements, and open the floor for Q&A.",
		},
	},
	"cogito-101-series": {
		title: {
			id: "Cogito 101 Series",
			en: "Cogito 101 Series",
		},
		subtitle: {
			id: "Kenali ragam peluang prestasi global dan siapkan dirimu!",
			en: "Discover global achievement opportunities and prepare yourself!",
		},
		description: {
			id: "Seri pengenalan untuk kamu yang baru bergabung atau ingin memahami lebih dalam tentang dunia kompetisi dan peluang prestasi di Cogito Academy.",
			en: "An introductory series for newcomers or those who want to dive deeper into the world of competitions and achievement opportunities at Cogito Academy.",
		},
	},
};

type Props = {
	params: Promise<{
		locale: string;
		category: string;
	}>;
};

export default async function EventCategoryPage({ params }: Props) {
	const { locale, category } = await params;

	if (!VALID_CATEGORIES.includes(category as CategorySlug)) {
		notFound();
	}

	const categorySlug = category as CategorySlug;
	const meta = CATEGORY_META[categorySlug];
	const lang = locale === "en" ? "en" : "id";

	// Fetch events from Sanity
	let events: Event[] = [];
	try {
		const sanityEvents = await client.fetch<SanityEvent[]>(
			EVENTS_BY_CATEGORY_QUERY,
			{ category: categorySlug },
		);

		events = sanityEvents.map((e) => sanityToEvent(e, lang));
	} catch (error) {
		console.error("Failed to fetch events:", error);
	}

	const upcomingEvents = events.filter((e) => e.status === "upcoming");
	const pastEvents = events.filter((e) => e.status === "past");

	return (
		<>
			<NavbarResolver />
			<main className="relative z-1 mx-auto max-w-7xl px-4 pb-20">
				{/* Hero Section */}
				<section className="py-12 md:py-20">
					<div className="space-y-4">
						<h1 className="font-bold text-4xl text-neutral-1000 tracking-tight md:text-5xl">
							{meta.title[lang]}
						</h1>
						<p className="font-medium text-neutral-600 text-xl md:text-2xl">
							{meta.subtitle[lang]}
						</p>
						<p className="max-w-2xl text-base text-neutral-600 leading-relaxed">
							{meta.description[lang]}
						</p>
					</div>
				</section>

				{/* Upcoming Events */}
				{upcomingEvents.length > 0 && (
					<section className="mb-12">
						<h2 className="mb-6 font-bold text-2xl text-neutral-1000">
							{lang === "id" ? "Akan Datang" : "Upcoming"}
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{upcomingEvents.map((event) => (
								<EventCard key={event.id} event={event} lang={lang} />
							))}
						</div>
					</section>
				)}

				{/* Past Events */}
				{pastEvents.length > 0 && (
					<section className="mb-12">
						<h2 className="mb-6 font-bold text-2xl text-neutral-1000">
							{lang === "id" ? "Sudah Berlalu" : "Past Events"}
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{pastEvents.map((event) => (
								<EventCard key={event.id} event={event} lang={lang} />
							))}
						</div>
					</section>
				)}

				{/* Empty State */}
				{events.length === 0 && (
					<section className="py-20 text-center">
						<p className="text-lg text-neutral-500">
							{lang === "id"
								? "Belum ada kegiatan yang terdaftar."
								: "No events available yet."}
						</p>
					</section>
				)}
			</main>
		</>
	);
}

function EventCard({ event, lang }: { event: Event; lang: string }) {
	const dateLocale = lang === "id" ? idLocale : undefined;
	const formattedDate = format(event.date, "d MMMM yyyy", {
		locale: dateLocale,
	});

	return (
		<Card className="overflow-hidden border-neutral-200 shadow-sm transition-shadow hover:shadow-md">
			{/* Image */}
			{event.imageUrl && (
				<div className="relative aspect-[16/9] bg-neutral-100">
					<Image
						src={event.imageUrl}
						alt={event.title}
						fill
						className="object-cover"
					/>
				</div>
			)}

			<CardHeader>
				<div className="mb-2 flex items-center gap-2">
					<Badge
						variant={event.status === "upcoming" ? "default" : "secondary"}
					>
						{event.status === "upcoming"
							? lang === "id"
								? "Akan Datang"
								: "Upcoming"
							: lang === "id"
								? "Selesai"
								: "Past"}
					</Badge>
				</div>
				<CardTitle className="line-clamp-2 text-lg md:text-xl">
					{event.title}
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-3">
				{event.description && (
					<CardDescription className="line-clamp-3 text-sm">
						{event.description}
					</CardDescription>
				)}

				<div className="space-y-2 text-neutral-600 text-sm">
					<div className="flex items-center gap-2">
						<CalendarIcon className="h-4 w-4 shrink-0" />
						<span>{formattedDate}</span>
					</div>

					{event.time && (
						<div className="flex items-center gap-2">
							<ClockIcon className="h-4 w-4 shrink-0" />
							<span>{event.time}</span>
						</div>
					)}

					{event.place && (
						<div className="flex items-center gap-2">
							<MapPinIcon className="h-4 w-4 shrink-0" />
							<span>{event.place}</span>
						</div>
					)}
				</div>

				{event.summary && (
					<p className="line-clamp-4 text-neutral-600 text-sm leading-relaxed">
						{event.summary}
					</p>
				)}
			</CardContent>

			{event.registrationLink && event.status === "upcoming" && (
				<CardFooter>
					<a
						href={event.registrationLink}
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({
							variant: "default",
							className: "w-full",
						})}
					>
						{lang === "id" ? "Daftar Sekarang" : "Register Now"}
						<ExternalLinkIcon className="ml-2 h-4 w-4" />
					</a>
				</CardFooter>
			)}
		</Card>
	);
}
