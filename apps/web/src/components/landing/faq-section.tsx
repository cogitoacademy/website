"use client";

import {
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "../ui/container";

export function FaqSection() {
	const faq = [
		{
			id: "faq-1",
			question:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
			answer:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		},
		{
			id: "faq-2",
			question:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
			answer:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		},
		{
			id: "faq-3",
			question:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
			answer:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		},
		{
			id: "faq-4",
			question:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
			answer:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		},
	];

	const midPoint = Math.ceil(faq.length / 2);

	return (
		<Container className="bg-background-cream">
			<div className="container mx-auto px-4">
				<div className="flex w-full max-w-7xl flex-col items-center gap-8">
					{/* Header */}
					<div className="space-y-2 text-center">
						<h2 className="font-extrabold text-[32px] text-neutral-1000">
							Pertanyaan yang{" "}
							<span className="text-primary-500">Sering Ditanyakan</span>
						</h2>
						<p className="mx-auto max-w-3xl font-medium text-lg text-neutral-1000">
							Temukan jawaban atas pertanyaan umum tentang program dan layanan
							kami.
						</p>
					</div>

					<Accordion>
						<div className="mx-auto grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
							<div className="space-y-4 xl:space-y-6">
								{faq.slice(0, midPoint).map((item) => (
									<AccordionItem
										key={item.id}
										value={item.id.toString()}
										className="border-border border-b"
									>
										<AccordionTrigger className="group">
											<span className="text-base">{item.question}</span>
										</AccordionTrigger>
										<AccordionPanel className="text-muted-foreground">
											{item.answer}
										</AccordionPanel>
									</AccordionItem>
								))}
							</div>
							<div className="space-y-4 xl:space-y-6">
								{faq.slice(midPoint).map((item) => (
									<AccordionItem
										key={item.id}
										value={item.id.toString()}
										className="border-border border-b"
									>
										<AccordionTrigger className="group">
											<span className="text-base">{item.question}</span>
										</AccordionTrigger>
										<AccordionPanel className="text-muted-foreground">
											{item.answer}
										</AccordionPanel>
									</AccordionItem>
								))}
							</div>
						</div>
					</Accordion>
				</div>
			</div>
		</Container>
	);
}
