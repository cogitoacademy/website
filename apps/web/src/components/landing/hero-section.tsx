import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Container } from "../ui/container";
import { WordRotateHighlighter } from "../ui/word-rotate-highlighter";
import { LogoCloud } from "./logo-cloud";

const sampleLogos = [
	{
		id: "1",
		name: "Framer Motion",
		url: "https://cdn.worldvectorlogo.com/logos/framer-2.svg",
	},
	{
		id: "2",
		name: "Next.js",
		url: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
	},
	{
		id: "3",
		name: "TypeScript",
		url: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
	},
	{
		id: "4",
		name: "Tailwind CSS",
		url: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
	},
	{
		id: "5",
		name: "Framer Motion",
		url: "https://cdn.worldvectorlogo.com/logos/framer-2.svg",
	},
	{
		id: "6",
		name: "Node.js",
		url: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
	},
];

export async function HeroSection() {
	const locale = await getLocale();
	const isId = locale === "id";

	const rotatingWordsId = ["Kompeten", "Tangguh", "Mendunia"];
	const rotatingWordsEn = ["Competent", "Resilient", "Global"];

	return (
		<>
			<div className="absolute inset-0 bottom-90 z-0 w-full bg-neutral-100 [clip-path:polygon(0_0,100%_0,100%_70%,50%_100%,0%_70%)]" />
			<Container className="relative z-1 flex-col items-center pt-50 pb-0">
				<section className="flex flex-col items-center justify-center">
					<div className="mb-2 rounded-[12px] bg-background-primary px-2.5 py-2 leading-none">
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
					<div className="*:text-center">
						<div className="font-bold text-5xl text-neutral-1000">
							{isId
								? "Mulai Perjalananmu Menjadi"
								: "Start Your Journey to Become"}
						</div>
						<div className="mb-4 flex flex-wrap items-baseline justify-center font-bold text-5xl text-neutral-1000 transition-normal">
							{isId ? (
								<>
									Pelajar yang<span className="w-2"> </span>
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
									Student who<span className="w-2"> </span>
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
					</div>

					{/* Subtitle */}
					<p className="max-w-md text-center text-neutral-1000 text-sm">
						{isId
							? "Menjadi ahli yang siap berprestasi, lebih dari sekadar kompetisi, bersama Cogito Academy melalui materi mendalam."
							: "Become an expert ready to excel, beyond just competitions, with Cogito Academy's in-depth materials."}
					</p>

					{/* CTA Buttons */}
					<div className="my-6 flex flex-col gap-4 sm:flex-row">
						<Button size="lg">
							<span>
								{isId
									? "Jadwalkan Konsultasi gratis"
									: "Schedule Free Consultation"}
							</span>
							<ChatsCircleIcon
								weight="duotone"
								color="#ffffff"
								className="size-5"
							/>
						</Button>

						<Button variant="subtle" size="lg">
							<span>{isId ? "Lihat Program" : "View Programs"}</span>
							<ArrowRight className="ml-2 size-5" />
						</Button>
					</div>
				</section>
				<section className="flex flex-col items-center">
					<p>
						{isId
							? "Cogito telah dipercaya oleh"
							: "Cogito has been trusted by"}
					</p>
					<LogoCloud logos={sampleLogos} interval={3000} displayCount={3} />
				</section>

				<section className="grid grid-cols-1 md:grid-cols-3">
					<ClassCard
						className="translate-y-20 -rotate-10 bg-tertiary-yellow-400"
						isId={isId}
					/>
					<ClassCard className="bg-tertiary-blue-500" isId={isId} />
					<ClassCard
						className="translate-y-20 rotate-10 bg-tertiary-pink-300"
						isId={isId}
					/>
				</section>
			</Container>
		</>
	);
}

function ClassCard({ className, isId }: { className?: string; isId: boolean }) {
	return (
		<div
			className={`flex flex-col items-center px-8 py-6 ${className} min-h-100 rounded-2xl`}
		>
			<h2 className="mb-4 font-bold text-2xl text-neutral-1000">
				{isId ? "Kelas Online" : "Online Classes"}
			</h2>
			<p className="text-center text-base text-neutral-1000">
				{isId
					? "Ikuti kelas online yang diselenggarakan oleh Cogito Academy."
					: "Join online classes organized by Cogito Academy."}
			</p>
		</div>
	);
}
