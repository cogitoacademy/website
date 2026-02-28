"use client";

import { ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
	ResponsiveModal,
	ResponsiveModalContent,
	ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { cn } from "@/lib/utils";

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
								<p>Baca Selengkapnya</p>
								<ArrowRightIcon />
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
					<p className="text-neutral-1000 text-sm">{description}</p>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="inline-flex items-center rounded-full bg-neutral-100/80 px-3 py-1.5 font-medium text-neutral-1000 text-xs"
							>
								{tag}
							</span>
						))}
					</div>
				</motion.div>
			</div>

			<ResponsiveModal open={open} onOpenChange={setOpen}>
				<ResponsiveModalContent className="sm:max-w-[400px]">
					<ResponsiveModalTitle>{title}</ResponsiveModalTitle>
					<div className="mt-4">
						<p className="text-muted-foreground text-sm">{tutorType}</p>
					</div>
				</ResponsiveModalContent>
			</ResponsiveModal>
		</>
	);
}
