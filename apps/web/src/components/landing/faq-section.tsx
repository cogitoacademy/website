"use client";

import { useTranslations } from "next-intl";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "../ui/container";

export function FaqSection() {
	const t = useTranslations("faq");

	const faq = [
		{
			id: "faq-1",
			question: t("items.q1"),
			answer: (
				<div className="space-y-3">
					<p>{t("items.a1")}</p>
				</div>
			),
		},
		{
			id: "faq-2",
			question: t("items.q2"),
			answer: (
				<div className="space-y-3">
					<p>{t("items.a2Title")}</p>
					<ul className="ml-4 list-outside list-disc space-y-2">
						<li>
							<strong>{t("items.a2p1Title")}</strong>
							<br />
							{t("items.a2p1")}
						</li>
						<li>
							<strong>{t("items.a2p2Title")}</strong>
							<br />
							{t("items.a2p2")}
						</li>
						<li>
							<strong>{t("items.a2p3Title")}</strong>
							<br />
							{t("items.a2p3")}
						</li>
					</ul>
				</div>
			),
		},
		{
			id: "faq-3",
			question: t("items.q3"),
			answer: (
				<div className="space-y-3">
					<p>{t("items.a3Title")}</p>
					<ul className="ml-4 list-outside list-disc space-y-2">
						<li>
							<strong>{t("items.a3p1Title")}</strong>
							<br />
							{t("items.a3p1")}
						</li>
						<li>
							<strong>{t("items.a3p2Title")}</strong>
							<br />
							{t("items.a3p2")}
						</li>
						<li>
							<strong>{t("items.a3p3Title")}</strong>
							<br />
							{t("items.a3p3")}
						</li>
					</ul>
				</div>
			),
		},
		{
			id: "faq-4",
			question: t("items.q4"),
			answer: (
				<div className="space-y-3">
					<p>{t("items.a4Title")}</p>
					<ul className="ml-4 list-outside list-disc space-y-2">
						<li>
							<strong>{t("items.a4p1Title")}</strong>
							<br />
							{t("items.a4p1")}
						</li>
						<li>
							<strong>{t("items.a4p2Title")}</strong>
							<br />
							{t("items.a4p2")}
						</li>
						<li>
							<strong>{t("items.a4p3Title")}</strong>
							<br />
							{t("items.a4p3")}
						</li>
						<li>
							<strong>{t("items.a4p4Title")}</strong>
							<br />
							{t("items.a4p4")}
						</li>
					</ul>
				</div>
			),
		},
		{
			id: "faq-5",
			question: t("items.q5"),
			answer: (
				<div className="space-y-3">
					<p>{t("items.a5p1")}</p>
					<p>{t("items.a5p2")}</p>
				</div>
			),
		},
	];

	const midPoint = Math.ceil(faq.length / 2);

	return (
		<Container className="max-w-7xl bg-background-cream py-15">
			{/* Header */}
			<div className="space-y-2 text-center">
				<h2 className="font-extrabold text-[32px] text-neutral-1000">
					{t("header.title")}
					<span className="text-primary-500">{t("header.titleHighlight")}</span>
				</h2>
				<p className="mx-auto max-w-3xl font-medium text-lg text-neutral-1000">
					{t("header.subtitle")}
				</p>
			</div>

			<Accordion>
				<div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
					<div className="space-y-4 xl:space-y-6">
						{faq.slice(0, midPoint).map((item) => (
							<AccordionItem key={item.id} value={item.id.toString()}>
								<AccordionTrigger className="group">
									<span>{item.question}</span>
								</AccordionTrigger>
								<AccordionContent>{item.answer}</AccordionContent>
							</AccordionItem>
						))}
					</div>
					<div className="space-y-4 xl:space-y-6">
						{faq.slice(midPoint).map((item) => (
							<AccordionItem key={item.id} value={item.id.toString()}>
								<AccordionTrigger className="group">
									<span>{item.question}</span>
								</AccordionTrigger>
								<AccordionContent>{item.answer}</AccordionContent>
							</AccordionItem>
						))}
					</div>
				</div>
			</Accordion>
		</Container>
	);
}
