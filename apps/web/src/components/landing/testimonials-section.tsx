// import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserSoundIcon } from "@phosphor-icons/react/dist/ssr";
import { getLocale } from "next-intl/server";
import { Badge } from "../ui/badge";
import { landingAssets } from "./assets";

export async function TestimonialsSection() {
	const locale = await getLocale();
	const isId = locale === "id";

	const testimonials = [
		{
			name: "Ayasha Yesa",
			roleId: "Praktisi PBB dan Best Delegate di Harvard National MUN",
			roleEn: "UN Practitioner and Best Delegate at Harvard National MUN",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			image: landingAssets.frame339,
			rotation: "rotate-[-5deg]",
			bgColor: "neutral-200",
		},
		{
			name: "Ayasha Yesa",
			roleId: "Praktisi PBB dan Best Delegate di Harvard National MUN",
			roleEn: "UN Practitioner and Best Delegate at Harvard National MUN",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			image: landingAssets.frame339,
			rotation: "rotate-0",
			bgColor: "primary-300",
			featured: true,
		},
		{
			name: "Ayasha Yesa",
			roleId: "Praktisi PBB dan Best Delegate di Harvard National MUN",
			roleEn: "UN Practitioner and Best Delegate at Harvard National MUN",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			image: landingAssets.frame339,
			rotation: "rotate-[5deg]",
			bgColor: "neutral-200",
		},
	];

	return (
		<section className="bg-background-cream py-16">
			<div className="container mx-auto max-w-7xl px-4">
				<div className="flex flex-col items-center gap-12">
					<div className="space-y-2 text-center">
						<Badge variant={"headline-primary"}>
							<UserSoundIcon />{" "}
							<span>{isId ? "Testimoni" : "Testimonials"}</span>
						</Badge>
						<h2 className="font-extrabold text-[32px] text-neutral-1000">
							{isId ? (
								<>
									Dapatkan Strategi Langsung dari{" "}
									<span className="text-primary-500">Tangan Pertama</span>
								</>
							) : (
								<>
									Get Direct Strategies from{" "}
									<span className="text-primary-500">First Hand</span>
								</>
							)}
						</h2>
						<p className="mx-auto max-w-3xl font-medium text-lg text-neutral-1000">
							{isId
								? "Para ahli dan praktisi global yang siap mendampingimu meraih standar juara dunia di setiap kompetisi."
								: "Global experts and practitioners ready to accompany you in achieving world champion standards in every competition."}
						</p>
					</div>

					<div>{testimonials.length} testimonials available (UI pending)</div>
				</div>
			</div>
		</section>
	);
}
