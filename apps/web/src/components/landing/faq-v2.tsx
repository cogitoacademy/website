"use client";

import { SealQuestionIcon } from "@phosphor-icons/react/dist/ssr";
import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Badge } from "../ui/badge";

function cn(...inputs: (string | undefined | null | false)[]) {
	return twMerge(clsx(inputs));
}

function useIsMobile(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
		setIsMobile(mql.matches);
		const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
		mql.addEventListener("change", handler);
		return () => mql.removeEventListener("change", handler);
	}, [breakpoint]);
	return isMobile;
}

export default function FaqSectionV2() {
	const t = useTranslations("faq");
	const [activeIndex, setActiveIndex] = useState(0);
	const isMobile = useIsMobile();

	const faqData = [
		{
			id: 1,
			question: t("items.q2"),
			answer: t("items.a2p1") + "\n\n" + t("items.a2p2"),
		},
		{
			id: 2,
			question: t("items.q3"),
			answer: t("items.a3p1"),
		},
		{
			id: 3,
			question: t("items.q4"),
			answer: t("items.a4p1"),
		},
		{
			id: 4,
			question: t("items.q5"),
			answer: t("items.a5p1"),
		},
	];

	return (
		<>
			<div
				id="faq"
				className="invisible h-0 scroll-mt-8 md:scroll-mt-[6.5rem]"
				aria-hidden="true"
			/>

			<section className="bg-background-primary">
				<div className="mx-auto flex w-full max-w-7xl flex-col gap-y-7.5 px-4 py-20">
					<div className="flex flex-col items-center justify-center space-y-2 *:max-w-[335px] *:text-center *:min-[580px]:max-w-none">
						<Badge variant={"headline-cream"}>
							<SealQuestionIcon className="size-5" />{" "}
							<span>{t("v2.badge")}</span>
						</Badge>
						<h3 className="mx-auto text-pretty font-bold text-2xl text-neutral-1000 lg:max-w-none lg:text-3xl">
							{t("v2.title")}
							<span className="text-primary-500">{t("v2.titleHighlight")}</span>
						</h3>
						<p className="mx-auto max-w-3xl font-medium text-neutral-1000 text-xs md:max-w-none md:text-sm xl:text-base">
							{t("v2.subtitle")}
						</p>
					</div>

					<div className="flex flex-col gap-4 *:select-none md:h-[300px] md:flex-row">
						{faqData.map((item, index) => {
							const isActive = activeIndex === index;

							return (
								<motion.div
									key={item.id}
									animate={
										isMobile
											? {
													height: isActive ? 300 : "auto",
													minHeight: isActive ? 300 : 100,
													backgroundColor: isActive ? "#E89AB8" : "#FFFBF7",
												}
											: {
													flex: isActive ? 3 : 1,
													backgroundColor: isActive ? "#E89AB8" : "#FFFBF7",
												}
									}
									transition={{
										duration: 0.4,
										ease: "easeInOut",
									}}
									onClick={() => setActiveIndex(index)}
									className={cn(
										"relative cursor-pointer overflow-hidden rounded-3xl border border-gray-100 shadow-sm",
										!isActive && "hover:bg-white",
									)}
								>
									{/* Content Wrapper */}
									<div className="relative h-full w-full">
										{/*
                    Invisible spacer — always relative & in-flow so it defines
                    the card's intrinsic height for the inactive state.
                    Mirrors the same padding/layout as inactive content.
                  */}
										<div
											className="invisible flex flex-row items-center justify-between p-6 md:flex-col md:justify-between"
											aria-hidden="true"
										>
											<div>
												<p className="line-clamp-10 font-medium leading-snug">
													{item.question}
												</p>
											</div>
											<div className="ml-6 md:self-end">
												<ArrowUpRight className="h-6 w-6" />
											</div>
										</div>

										{/* ACTIVE STATE CONTENT */}
										<motion.div
											initial={false}
											animate={{
												opacity: isActive ? 1 : 0,
											}}
											transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
											className="absolute inset-0 flex flex-col"
											style={{ pointerEvents: isActive ? "auto" : "none" }}
										>
											<div className="flex h-full w-full flex-shrink-0 flex-col">
												<h3 className="mb-3 p-4 pb-0 font-bold text-base text-gray-900">
													{item.question}
												</h3>

												<div className="flex-1 overflow-hidden rounded-2xl bg-white p-6 shadow-sm">
													<div className="custom-scrollbar h-full overflow-y-auto pr-2">
														<p className="whitespace-pre-line text-gray-600 text-sm leading-relaxed">
															{item.answer}
														</p>
													</div>
												</div>
											</div>
										</motion.div>

										{/* INACTIVE STATE CONTENT */}
										<motion.div
											initial={false}
											animate={{
												opacity: isActive ? 0 : 1,
											}}
											transition={{ duration: 0.2 }}
											className="absolute inset-0 flex flex-row items-center justify-between bg-white p-6 md:flex-col md:justify-between"
											style={{ pointerEvents: isActive ? "none" : "auto" }}
										>
											<div>
												<p className="line-clamp-10 font-medium text-gray-600 leading-snug">
													{item.question}
												</p>
											</div>
											<div className="ml-6 md:self-end">
												<ArrowUpRight className="h-6 w-6 text-gray-800" />
											</div>
										</motion.div>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
}
