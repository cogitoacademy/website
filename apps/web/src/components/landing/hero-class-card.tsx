"use client";

import {
	ArrowRightIcon,
	AwardIcon,
	BadgeCheckIcon,
	ChevronDownIcon,
	Trophy,
	User,
	Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import {
	ResponsiveModal,
	ResponsiveModalContent,
	ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const REGULER_SUBJECTS = [
	{
		slug: "mun",
		labelId: "Model United Nations",
		labelEn: "Model United Nations",
		sessionsId:
			"24 sesi pembelajaran intensif dengan jadwal satu pertemuan setiap minggu.",
		sessionsEn: "24 intensive learning sessions with one meeting every week.",
		topicsId: [
			"Dasar-dasar MUN dan menguasai prosedur",
			"Riset negara, dewan, dan topik",
			"Menulis position paper yang kuat",
			"Public speaking dan retorika",
			"Strategi diplomasi dan negosiasi",
			"Menulis draft resolusi",
		],
		topicsEn: [
			"MUN basics and mastering rules of procedure",
			"Country, council, and topic research methods",
			"Writing a strong position paper",
			"Public speaking and rhetorics",
			"Diplomacy and negotiation strategies",
			"Writing draft resolution",
		],
		color: "bg-tertiary-blue-500",
		secondaryColor: "bg-tertiary-blue-300",
	},
	{
		slug: "wsc",
		labelId: "World Scholar's Cup",
		labelEn: "World Scholar's Cup",
		sessionsId:
			"36 sesi pembelajaran intensif dengan jadwal satu pertemuan setiap minggu.",
		sessionsEn: "36 intensive learning sessions with one meeting every week.",
		topicsId: [
			"Teknik Scholar's Bowl",
			"Penguasaan materi lintas disiplin",
			"Menulis esai akademik",
			"Analisis dan evaluasi sumber",
			"Strategi dan kolaborasi tim",
			"Taktik soal pilihan ganda",
		],
		topicsEn: [
			"Scholar's Bowl techniques",
			"Cross-disciplinary subject mastery",
			"Academic essay writing",
			"Source analysis and evaluation",
			"Team strategy and collaboration",
			"Multiple-choice question tactics",
		],
		color: "bg-tertiary-yellow-600",
		secondaryColor: "bg-tertiaty-yellow-300",
	},
	{
		slug: "debat",
		labelId: "Debat",
		labelEn: "Debate",
		sessionsId:
			"18 sesi pembelajaran intensif dengan jadwal satu pertemuan setiap minggu.",
		sessionsEn: "18 intensive learning sessions with one meeting every week.",
		topicsId: [
			"Fundamentasi argumentasi",
			"Analisis mosi",
			"Peran narasumber (1, 2, 3)",
			"Teknik rebuttal",
			"Cross-examination",
			"Penyampaian final focus",
		],
		topicsEn: [
			"Argumentation fundamentals",
			"Motion analysis",
			"Speaker roles (first, second, third)",
			"Rebuttal techniques",
			"Cross-examination",
			"Final focus delivery",
		],
		color: "bg-secondary-500",
		secondaryColor: "bg-secondary-100",
	},
] as const;

const COLOR_BG_MAP: Record<string, string> = {
	"bg-tertiary-blue-500": "bg-tertiary-blue-500",
	"bg-tertiary-yellow-600": "bg-tertiary-yellow-600",
	"bg-secondary-500": "bg-secondary-500",
};

const COLOR_BG_LIGHT_MAP: Record<string, string> = {
	"bg-tertiary-blue-500": "bg-tertiary-blue-100",
	"bg-tertiary-yellow-600": "bg-tertiary-yellow-100",
	"bg-secondary-500": "bg-secondary-100",
};

const COLOR_ACTIVE_BG_MAP: Record<string, string> = {
	"bg-tertiary-blue-500": "data-active:bg-tertiary-blue-100",
	"bg-tertiary-yellow-600": "data-active:bg-tertiary-yellow-100",
	"bg-secondary-500": "data-active:bg-secondary-100",
};

const COLOR_TEXT_MAP: Record<string, string> = {
	"tertiary-blue-500": "text-tertiary-blue-500",
	"tertiary-yellow-600": "text-tertiary-yellow-600",
	"secondary-500": "text-secondary-500",
};

interface ModalContent {
	title: string;
	description: string;
	features: string[];
	ctaText: string;
	badge: string;
	badgeColor: string;
	availableFor?: string;
}

function getModalContent(
	tutorType?: string,
	t?: (key: string) => string,
): ModalContent {
	if (tutorType === "Tutor Kelas Intensif") {
		return {
			title: t?.("hero.modal.intensive.title") ?? "Kelas Intensif",
			description:
				t?.("hero.modal.intensive.description") ??
				"Persiapan on-demand yang dirancang khusus untuk satu ajang lomba.",
			features: t
				? [
						t("hero.modal.features.0"),
						t("hero.modal.features.1"),
						t("hero.modal.features.2"),
						t("hero.modal.features.3"),
						t("hero.modal.features.4"),
						t("hero.modal.features.5"),
						t("hero.modal.features.6"),
						t("hero.modal.features.7"),
						t("hero.modal.features.8"),
					]
				: [
						"World Scholar's Cup",
						"Model United Nations",
						"Debat (English/Bahasa)",
						"Pidato (English/Bahasa)",
						"Karya Tulis Ilmiah & Esai",
						"Business Plan",
						"Olimpiade SMP",
						"Olimpiade SMA",
						"...dan masih banyak lagi",
					],
			ctaText:
				t?.("hero.modal.intensive.cta") ??
				"Konsultasi Gratis sekarang dengan Tim Cogito",
			badge: t?.("hero.modal.intensive.badge") ?? "Best for Competition",
			badgeColor: "bg-yellow-400",
			availableFor: t?.("hero.modal.intensive.availableFor"),
		};
	}
	return {
		title: t?.("hero.modal.extracurricular.title") ?? "Kelas Ekstrakurikuler",
		description:
			t?.("hero.modal.extracurricular.description") ??
			"Pelatihan rutin yang dirancang berdasarkan kebutuhan di suatu sekolah. Yuk, bentuk ekosistem juara di sekolahmu dengan program rutin yang fleksibel.",
		features: t
			? [
					t("hero.modal.features.0"),
					t("hero.modal.features.1"),
					t("hero.modal.features.2"),
					t("hero.modal.features.3"),
					t("hero.modal.features.4"),
					t("hero.modal.features.5"),
					t("hero.modal.features.6"),
					t("hero.modal.features.7"),
					t("hero.modal.features.8"),
				]
			: [
					"World Scholar's Cup",
					"Model United Nations",
					"Debat (English/Bahasa)",
					"Pidato (English/Bahasa)",
					"Karya Tulis Ilmiah & Esai",
					"Business Plan",
					"Olimpiade SMP",
					"Olimpiade SMA",
					"...dan masih banyak lagi",
				],
		ctaText:
			t?.("hero.modal.extracurricular.cta") ??
			"Konsultasi Gratis sekarang dengan Tim Cogito",
		badge: t?.("hero.modal.extracurricular.badge") ?? "For Schools",
		badgeColor: "bg-blue-400",
		availableFor: t?.("hero.modal.intensive.availableFor"),
	};
}

function ModalImageHeader({ content }: { content: ModalContent }) {
	return (
		<div className="relative h-[200px] shrink-0 overflow-hidden bg-[#A855F7] md:h-50">
			<Image
				src="/modal-banner.webp"
				alt="Class in Cogito Academy"
				fill
				className="object-cover object-top"
				sizes="(max-width: 640px) 100vw, 40vw"
			/>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-black opacity-70" />
			<div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-4">
				<div className="flex-1">
					<ResponsiveModalTitle className="font-bold text-2xl text-white leading-none tracking-tight">
						{content.title}
					</ResponsiveModalTitle>
					<p className="mt-1 line-clamp-2 max-w-lg text-sm text-white/90 sm:line-clamp-none">
						{content.description}
					</p>
				</div>
				<Badge variant="headline-primary" className="lg:text-xs">
					{content.badge}
				</Badge>
			</div>
		</div>
	);
}

function RegulerTabContent({
	isId,
	activeTab,
	onTabChange,
	t,
}: {
	isId: boolean;
	activeTab: string;
	onTabChange: (value: string) => void;
	t: (key: string) => string;
}) {
	return (
		<Tabs
			value={activeTab}
			onValueChange={onTabChange}
			className="flex-col lg:flex-row"
		>
			<div className="shrink-0 lg:w-60">
				<TabsList
					variant="sidebar"
					className="flex w-full flex-row items-center justify-start overflow-x-auto lg:flex-col"
				>
					{REGULER_SUBJECTS.map((subject) => (
						<TabsTrigger
							key={subject.slug}
							value={subject.slug}
							className={cn(
								"shrink-0 shadow-xs lg:w-full lg:min-w-full",
								COLOR_BG_MAP[subject.color],
							)}
						>
							<div
								className={cn(
									"mt-2 inline-flex min-w-[110px] shrink-0 justify-between rounded-t-md px-4 py-3 lg:w-full",
									activeTab === subject.slug
										? COLOR_BG_LIGHT_MAP[subject.color]
										: "bg-background-cream",
								)}
							>
								{isId ? subject.labelId : subject.labelEn}
								<ArrowRightIcon className="hidden lg:block" />
								<ChevronDownIcon className="ml-2 lg:hidden" />
							</div>
						</TabsTrigger>
					))}
				</TabsList>
			</div>
			<div className="min-w-0 flex-1 overflow-hidden rounded-lg">
				{REGULER_SUBJECTS.map((subject) => (
					<TabsContent
						key={subject.slug}
						value={subject.slug}
						className={cn(subject.color, "overflow-hidden rounded-xl border")}
					>
						<div className="p-4">
							<ResponsiveModalTitle className="font-semibold text-foreground leading-none tracking-tight sm:text-base lg:text-lg">
								{isId ? subject.labelId : subject.labelEn}
							</ResponsiveModalTitle>
						</div>
						<div className="space-y-3 overflow-hidden rounded-lg bg-background-cream p-4">
							<p className="text-neutral-1000 text-sm">
								{isId ? subject.sessionsId : subject.sessionsEn}
							</p>
							<h3 className="font-semibold text-base text-neutral-1000 lg:text-lg">
								{t("hero.modal.regular.whatYouWillLearn")}
							</h3>
							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
								{(isId ? subject.topicsId : subject.topicsEn).map(
									(topic, index) => (
										<div
											key={index}
											className={cn(
												"flex items-start gap-3 rounded-lg p-3",
												COLOR_BG_LIGHT_MAP[subject.color],
											)}
										>
											<BadgeCheckIcon
												className={cn(
													"size-4 shrink-0",
													COLOR_TEXT_MAP[subject.color],
												)}
											/>
											<span className="text-black text-xs">{topic}</span>
										</div>
									),
								)}
							</div>
						</div>
					</TabsContent>
				))}
			</div>
		</Tabs>
	);
}

function IntensifEkstrakurikulerContent({
	content,
}: {
	content: ModalContent;
}) {
	return (
		<div>
			<div className="space-y-3">
				{content.availableFor && (
					<h3 className="text-neutral-1000">{content.availableFor}</h3>
				)}
				<ul className="flex flex-wrap gap-2">
					{content.features.map((feature, index) => (
						<li key={index}>
							<Badge
								className="bg-tertiary-blue-200 text-black"
								variant={"tutor"}
							>
								{feature}
							</Badge>
						</li>
					))}
				</ul>
			</div>
			<div className="mt-6">
				<Button className="w-full" size="md">
					{content.ctaText}
				</Button>
			</div>
		</div>
	);
}

export function ClassCard({
	className,
	innerClassName,
	title,
	description,
	tags,
	isActiveTrigger,
	tutorType,
}: {
	className?: string;
	innerClassName?: string;
	title: string;
	description: string;
	tags: string[];
	isActiveTrigger?: boolean;
	tutorType?: string;
}) {
	const [open, setOpen] = useState(false);
	const [activeRegulerTab, setActiveRegulerTab] = useState<string>(
		REGULER_SUBJECTS[0].slug,
	);
	const locale = useLocale();
	const isId = locale === "id";
	const t = useTranslations();
	const modalContent = getModalContent(tutorType, t);

	const handleClick = () => {
		if (tutorType) {
			setOpen(true);
		}
	};

	return (
		<>
			<div
				className={`overflow-hidden rounded-2xl ${className} relative md:min-h-100 ${
					tutorType ? "cursor-pointer" : ""
				}`}
				onClick={handleClick}
			>
				<AnimatePresence initial={false}>
					{isActiveTrigger && (
						<motion.div
							key="trigger"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
							style={{ overflow: "hidden" }}
						>
							<div className="my-3 flex w-full items-center justify-between px-5 sm:px-6">
								<p className="text-sm lg:text-base">{t("common.readMore")}</p>
								<ArrowRightIcon className="size-4 lg:size-5" />
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<motion.div
					animate={{ marginTop: isActiveTrigger ? 0 : 12 }}
					transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
					className={cn(
						"flex min-h-full flex-col gap-3 rounded-2xl p-5 sm:p-6",
						innerClassName ?? "",
					)}
				>
					<h2 className="font-bold text-neutral-1000 text-xl sm:text-2xl">
						{title}
					</h2>
					<p className="line-clamp-2 text-neutral-1000 text-sm lg:line-clamp-none">
						{description}
					</p>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag, index) => (
							<span
								key={tag}
								className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100/80 px-3 py-1.5 font-medium text-neutral-1000 text-xs"
							>
								{index === 0 && <Users className="size-4" />}
								{index === 1 && <AwardIcon className="size-4" />}
								{tag}
							</span>
						))}
					</div>
				</motion.div>
			</div>

			<ResponsiveModal open={open} onOpenChange={setOpen}>
				<ResponsiveModalContent
					side={"bottom"}
					style={{ maxHeight: "75dvh" }}
					className={cn(
						"flex flex-col overflow-hidden rounded-t-2xl border-none p-0 sm:max-w-[600px] sm:rounded-lg",
						tutorType === "Tutor Kelas Reguler"
							? "lg:max-w-4xl xl:max-w-5xl"
							: "lg:max-w-2xl",
					)}
				>
					<ModalImageHeader content={modalContent} />
					<div className="min-h-0 flex-1 overflow-y-auto p-4 pt-0">
						{tutorType === "Tutor Kelas Reguler" ? (
							<RegulerTabContent
								isId={isId}
								activeTab={activeRegulerTab}
								onTabChange={setActiveRegulerTab}
								t={t}
							/>
						) : (
							<IntensifEkstrakurikulerContent content={modalContent} />
						)}
					</div>
				</ResponsiveModalContent>
			</ResponsiveModal>
		</>
	);
}
