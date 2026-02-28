"use client";

import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "../ui/container";
import { WordRotateHighlighter } from "../ui/word-rotate-highlighter";
import { ClassCard } from "./hero-class-card";
import { LogoCloud } from "./logo-cloud";

const sampleLogos = [
	{
		id: "1",
		name: "Sekolah Victory Plus Bekasi",
		url: "/logos/sekolah_victory_plus_bekasi.webp",
	},
	{
		id: "2",
		name: "SMA Al Hikmah Surabaya",
		url: "/logos/sma_al_hikmah_surabaya.webp",
	},
	{
		id: "3",
		name: "SMAN 16 Surabaya",
		url: "/logos/sman_16_surabaya.webp",
	},
	{
		id: "4",
		name: "Sekolah Victory Plus Bekasi",
		url: "/logos/sekolah_victory_plus_bekasi.webp",
	},
	{
		id: "5",
		name: "SMA Al Hikmah Surabaya",
		url: "/logos/sma_al_hikmah_surabaya.webp",
	},
	{
		id: "6",
		name: "SMAN 16 Surabaya",
		url: "/logos/sman_16_surabaya.webp",
	},
];

const classCardsData = {
	id: [
		{
			title: "Kelas Reguler",
			description:
				"Belajar semua tentang suatu jenis perlombaan dari dasar sampai mahir dengan kurikulum yang dirancang oleh para Tutor secara holistik.",
			tags: ["Individu", "MUN & WSC & Debate"],
		},
		{
			title: "Kelas Intensif",
			description:
				"Pelatihan yang dapat dilakukan sesuai kebutuhan untuk mempersiapkan diri dalam mengikuti satu ajang perlombaan tertentu dengan memaksimalkan pengetahuan yang sudah ada.",
			tags: ["Individu & Kelompok", "Semua Lomba"],
		},
		{
			title: "Kelas Ekstrakurikuler",
			description:
				"Pelatihan rutin untuk klub minat dan bakat di sekolah dengan kurikulum yang dapat disesuaikan dengan kebutuhan dan tujuan sekolah dalam bidang prestasi tersebut.",
			tags: ["Kelompok", "Semua Lomba"],
		},
	],
	en: [
		{
			title: "Regular Class",
			description:
				"Learn all about a type of competition from scratch to advanced with a holistically designed curriculum by Tutors.",
			tags: ["Individual", "MUN & WSC & Debate"],
		},
		{
			title: "Intensive Class",
			description:
				"Training that can be done as needed to prepare for a specific competition by maximizing existing knowledge.",
			tags: ["Individual & Group", "All Competitions"],
		},
		{
			title: "Extracurricular Class",
			description:
				"Routine training for school interest and talent clubs with a curriculum that can be adjusted to the school's needs and goals in that field of achievement.",
			tags: ["Group", "All Competitions"],
		},
	],
};

export function HeroSection() {
	const locale = useLocale();
	const isId = locale === "id";

	const rotatingWordsId = ["Kompeten", "Tangguh", "Mendunia"];
	const rotatingWordsEn = ["Competent", "Resilient", "Global"];
	const cards = isId ? classCardsData.id : classCardsData.en;

	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % 3);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<div className="absolute inset-0 bottom-50 z-0 w-full bg-neutral-100 [clip-path:polygon(0_0,100%_0,100%_70%,50%_100%,0%_70%)] sm:bottom-120 md:bottom-90" />

			<Container className="relative z-1 flex-col items-center pt-28 pb-0 sm:pt-36 md:pt-42 lg:pt-50">
				<section className="relative z-99 flex flex-col items-center justify-center">
					{/* Badge / Tagline */}
					<div className="mb-2 rounded-[12px] bg-background-primary px-2.5 py-2 text-center text-2xs leading-snug sm:text-sm">
						{isId ? (
							<>
								Didukung oleh{" "}
								<span className="font-bold text-secondary-600">200+</span>{" "}
								prestasi tutor di{" "}
								<span className="font-bold text-secondary-600">9</span> bidang
								keilmuan
							</>
						) : (
							<>
								Supported by{" "}
								<span className="font-bold text-secondary-600">200+</span> tutor
								achievements in{" "}
								<span className="font-bold text-secondary-600">9</span> fields
								of study
							</>
						)}
					</div>

					{/* Headline */}

					<div className="inline max-w-100 text-center font-bold text-2xl text-neutral-1000 transition-normal sm:max-w-lg sm:text-3xl md:max-w-xl md:text-4xl lg:max-w-3xl lg:text-5xl lg:leading-snug">
						{isId ? (
							<>
								Mulai Perjalananmu Menjadi Pelajar yang
								<span className="w-1 sm:w-2"> </span>
								<WordRotateHighlighter
									words={rotatingWordsId}
									className="italic"
									action="highlight"
									color="#f8eaa4"
									highlightDelay={500}
								/>{" "}
							</>
						) : (
							<>
								Start Your Journey to Become Student who
								<span className="w-1 sm:w-2"> </span>
								<WordRotateHighlighter
									words={rotatingWordsEn}
									className="italic"
									action="highlight"
									color="#f8eaa4"
									highlightDelay={500}
								/>{" "}
							</>
						)}
					</div>

					{/* Subtitle */}
					<p className="mt-2 max-w-xs text-center text-neutral-1000 text-xs sm:mt-4 sm:max-w-md sm:text-sm">
						{isId
							? "Menjadi ahli yang siap berprestasi, lebih dari sekadar kompetisi, bersama Cogito Academy melalui materi mendalam."
							: "Become an expert ready to excel, beyond just competitions, with Cogito Academy's in-depth materials."}
					</p>

					{/* CTA Buttons */}
					<div className="my-2 flex w-full flex-col items-center gap-2 sm:my-6 sm:w-auto sm:flex-row sm:gap-4">
						<Button
							size="md"
							className="w-full max-w-[214px] sm:w-auto sm:max-w-none"
						>
							<span>
								{isId
									? "Jadwalkan Konsultasi Gratis"
									: "Schedule Free Consultation"}
							</span>
							<ChatsCircleIcon
								weight="duotone"
								color="#ffffff"
								className="size-5"
							/>
						</Button>

						<Button
							size="md"
							variant="gray"
							className="w-full max-w-[214px] sm:w-auto sm:max-w-none"
						>
							<span>{isId ? "Lihat Program" : "View Programs"}</span>
							<ArrowRight className="size-4" />
						</Button>
					</div>
				</section>

				{/* Trust Section */}
				<section className="flex flex-col items-center">
					<p className="text-neutral-700 text-xs sm:text-sm">
						{isId
							? "Cogito telah dipercaya oleh"
							: "Cogito has been trusted by"}
					</p>
					<LogoCloud logos={sampleLogos} interval={3000} displayCount={3} />
				</section>

				{/* Baca Selengkapnya Link */}
				{/*<section className="flex w-full items-center justify-between rounded-2xl bg-neutral-100 px-5 py-4">
          <span className="font-semibold text-neutral-1000 text-sm">
            {isId ? "Baca Selengkapnya" : "Read More"}
          </span>
          <ArrowRight className="size-5 text-primary-500" />
        </section>*/}

				{/* Class Cards */}
				<section className="-mt-70 grid w-full grid-cols-1 gap-5 md:mt-0 md:grid-cols-3 md:gap-4">
					{/* Kuning */}
					<ClassCard
						className="order-2 min-h-90 translate-y-20 bg-tertiary-yellow-400 md:order-1 md:translate-y-20"
						innerClassName="bg-tertiary-yellow-100"
						title={cards[0].title}
						description={cards[0].description}
						tags={cards[0].tags}
						isActiveTrigger={activeIndex === 0}
						tutorType="Tutor Kelas Intensif"
					/>
					<ClassCard
						className="order-1 min-h-120 translate-y-70 bg-tertiary-blue-300 md:order-2 md:translate-y-0"
						innerClassName="bg-tertiary-blue-100"
						title={cards[1].title}
						description={cards[1].description}
						tags={cards[1].tags}
						isActiveTrigger={activeIndex === 1}
						tutorType="Tutor Kelas Ekstrakurikuler"
					/>
					<ClassCard
						className="order-2 min-h-84 bg-tertiary-pink-300 md:order-3 md:translate-y-20"
						innerClassName="bg-tertiary-pink-100"
						title={cards[2].title}
						description={cards[2].description}
						tags={cards[2].tags}
						isActiveTrigger={activeIndex === 2}
						tutorType="Tutor Kelas Reguler"
					/>
				</section>
			</Container>
		</>
	);
}
