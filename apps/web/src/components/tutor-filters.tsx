"use client";

import { ChevronDown, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { LocationValue } from "@/lib/config/locations";
import type { CompetitionCategory } from "@/types/tutor";

interface LocationOption {
  value: LocationValue;
  label: string;
}

interface TutorFiltersProps {
  locations: readonly LocationOption[];
  categories: CompetitionCategory[];
  selectedLocations: string[];
  selectedCategories: string[];
  searchQuery: string;
  onLocationChange: (value: string) => void;
  onCategoryChange: (id: string) => void;
  onSearchChange: (value: string) => void;
  onClearAll: () => void;
}

export default function TutorFilters({
  locations,
  categories,
  selectedLocations,
  selectedCategories,
  searchQuery,
  onLocationChange,
  onCategoryChange,
  onSearchChange,
  onClearAll,
}: TutorFiltersProps) {
  const t = useTranslations("tutors");

  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="w-full md:w-72">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 " />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            type="search"
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {(selectedLocations.length > 0 || selectedCategories.length > 0) && (
          <Button
            variant="ghost"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground md:inline-flex hidden"
          >
            {t("clearFilters")}
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            <span>{t("location")}</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{t("selectLocation")}</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {locations.map((location) => (
              <DropdownMenuCheckboxItem
                key={location.value}
                checked={selectedLocations.includes(location.value)}
                onCheckedChange={() => onLocationChange(location.value)}
              >
                {location.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            <span>{t("competitionField")}</span>
            <ChevronDown className="h-4 w-4" />
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
            className="text-muted-foreground hover:text-foreground md:hidden"
          >
            {t("clearFilters")}
          </Button>
        )}
      </div>
    </div>
  );
}
