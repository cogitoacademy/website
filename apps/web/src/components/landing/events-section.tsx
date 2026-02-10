import {
	ArrowRightIcon,
	CalendarDotsIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type EventDummy = {
	titleId: string;
	titleEn: string;
	descId: string;
	descEn: string;
	image: string;
	link: string;
};

const EVENT_DUMMY: EventDummy[] = [
	{
		titleId: "Monthly Townhall",
		titleEn: "Monthly Townhall",
		descId: "Gali wawasan baru dalam diskusi bulanan kami.",
		descEn: "Explore new insights in our monthly discussions.",
		image: "/path/to/image1.jpg",
		link: "/events/monthly-townhall",
	},
	{
		titleId: "Cogito 101 Series",
		titleEn: "Cogito 101 Series",
		descId: "Kenali ragam peluang prestasi global dan siapkan dirimu!",
		descEn: "Discover global achievement opportunities and prepare yourself!",
		image: "/placeholder.jpg",
		link: "/events/cogito-101-series",
	},
];

export function EventsSection() {
	const locale = useLocale();
	const isId = locale === "id";

	return (
		<div className="relative z-1">
			<svg
				viewBox="0 0 1440 160"
				preserveAspectRatio="none"
				className="absolute top-0 left-0 h-30 w-full -translate-y-full"
			>
				<path
					d="M0,160 C240,0 1200,0 1440,160 L1440,160 L0,160 Z"
					className="fill-primary-100"
				/>
			</svg>
			<section className="bg-primary-100 pt-5 pb-20">
				<div className="mx-auto max-w-7xl">
					<div className="flex flex-col items-center gap-8">
						<div className="flex flex-col items-center space-y-2">
							<Badge variant={"headline-primary"}>
								<CalendarDotsIcon />{" "}
								<span>{isId ? "Acara Publik" : "Public Events"}</span>
							</Badge>
							<h2 className="font-extrabold text-3xl text-neutral-1000">
								{isId ? (
									<>
										Satu <span className="text-primary-500">Bulan</span>, Satu{" "}
										<span className="text-primary-500">Inspirasi Dunia</span>
									</>
								) : (
									<>
										One <span className="text-primary-500">Month</span>, One{" "}
										<span className="text-primary-500">World Inspiration</span>
									</>
								)}
							</h2>
						</div>
						<div className="grid w-full grid-cols-1 gap-8 px-10 md:grid-cols-2">
							{EVENT_DUMMY.slice(0, 2).map((event) => (
								<EventCard
									key={event.titleId}
									title={isId ? event.titleId : event.titleEn}
									desc={isId ? event.descId : event.descEn}
									image={event.image}
									link={event.link}
									isId={isId}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

function EventCard({
	title,
	desc,
	image,
	link,
	isId,
}: {
	title: string;
	desc: string;
	image: string;
	link: string;
	isId: boolean;
}) {
	return (
		<div className="relative grid h-45 grid-cols-3 overflow-hidden rounded-2xl bg-background-cream p-6 xl:h-68 xl:p-10">
			<div className="col-span-2 flex h-full flex-col items-start">
				<div>
					<p className="font-bold text-2xl text-primary-500">{title}</p>
					<p>{desc}</p>
				</div>

				<Link href={link} className="mt-auto mb-0">
					<Button size="lg">
						<span>{isId ? "Lihat Selengkapnya" : "View More"}</span>
						<ArrowRightIcon color="#ffffff" className="size-5" />
					</Button>
				</Link>
			</div>

			<Image
				src={image}
				width={500}
				height={500}
				alt={"Event Image"}
				className="flex h-[121%] w-full translate-x-11 items-center justify-center bg-gray-200 object-cover text-neutral-100"
			/>
		</div>
	);
}
