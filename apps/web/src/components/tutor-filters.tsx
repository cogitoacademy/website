"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CompetitionCategory, Location } from "@/types/tutor";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TutorFiltersProps {
	locations: Location[];
	categories: CompetitionCategory[];
	selectedLocations: string[];
	selectedCategories: string[];
	onLocationChange: (id: string) => void;
	onCategoryChange: (id: string) => void;
	onClearAll: () => void;
}

export default function TutorFilters({
	locations,
	categories,
	selectedLocations,
	selectedCategories,
	onLocationChange,
	onCategoryChange,
	onClearAll,
}: TutorFiltersProps) {
	const t = useTranslations("tutors");

	return (
		<div className="flex flex-wrap gap-3 mb-8">
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="outline" />}>
					<span>{t("location")}</span>
					<ChevronDown className="w-4 h-4" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuGroup>
						<DropdownMenuLabel>{t("selectLocation")}</DropdownMenuLabel>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					{locations.map((location) => (
						<DropdownMenuCheckboxItem
							key={location._id}
							checked={selectedLocations.includes(location._id)}
							onCheckedChange={() => onLocationChange(location._id)}
						>
							{location.name.replace(/_/g, " ")}
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="outline" />}>
					<span>{t("competitionField")}</span>
					<ChevronDown className="w-4 h-4" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuGroup>
						<DropdownMenuLabel>{t("selectCategory")}</DropdownMenuLabel>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					{categories.map((category) => (
						<DropdownMenuCheckboxItem
							key={category._id}
							checked={selectedCategories.includes(category._id)}
							onCheckedChange={() => onCategoryChange(category._id)}
						>
							{category.name}
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			{(selectedLocations.length > 0 || selectedCategories.length > 0) && (
				<Button
					variant="ghost"
					onClick={onClearAll}
					className="text-muted-foreground hover:text-foreground"
				>
					{t("clearFilters")}
				</Button>
			)}
		</div>
	);
}
