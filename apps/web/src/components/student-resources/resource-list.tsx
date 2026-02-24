"use client";

import { FunnelIcon, FunnelXIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { Download, Eye, FileText, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Resource {
  _id: string;
  title: string;
  description?: string;
  category: string;
  fileUrl: string;
}

interface ResourceListProps {
  resources: Resource[];
}

const categoryColors: Record<string, string> = {
  "position-paper": "bg-blue-500/10 text-blue-600 border-blue-200",
  "resolution-bank": "bg-green-500/10 text-green-600 border-green-200",
  "study-guide": "bg-purple-500/10 text-purple-600 border-purple-200",
  other: "bg-gray-500/10 text-gray-600 border-gray-200",
};

export function ResourceList({ resources }: ResourceListProps) {
  const t = useTranslations("studentResources");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categoryLabels: Record<string, string> = {
    "position-paper": t("categoryLabels.position-paper"),
    "resolution-bank": t("categoryLabels.resolution-bank"),
    "study-guide": t("categoryLabels.study-guide"),
    other: t("categoryLabels.other"),
  };

  const availableCategories = useMemo(() => {
    const categories = new Set(resources.map((r) => r.category || "other"));
    return Array.from(categories);
  }, [resources]);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const category = resource.category || "other";
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(category);

      const searchMatch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (resource.description &&
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return categoryMatch && searchMatch;
    });
  }, [resources, selectedCategories, searchQuery]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategories.length > 0 || searchQuery !== "";

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="flex gap-1.5 sm:items-center sm:justify-between sm:gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center sm:gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" className="gap-2">
                  <FunnelIcon className="h-4 w-4" />
                  <span>{t("filter")}</span>
                  {selectedCategories.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedCategories.length}
                    </Badge>
                  )}
                </Button>
              }
            />
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{t("categories")}</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {availableCategories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                >
                  {categoryLabels[category] || category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              <FunnelXIcon />
            </Button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-muted-foreground text-sm">
        {t("showing", {
          count: filteredResources.length,
          total: resources.length,
        })}
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <p className="font-medium text-lg text-muted-foreground">{t("noResources")}</p>
          <p className="text-muted-foreground/70 text-sm">{t("noResourcesHint")}</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredResources.map((resource, index) => {
              const category = resource.category || "other";
              return (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card
                    key={resource._id}
                    className="flex h-full flex-col rounded-xl transition-shadow hover:shadow-md"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge variant="secondary" className="mb-2 capitalize">
                          {category.replace("-", " ")}
                        </Badge>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardTitle className="line-clamp-2 text-lg">{resource.title}</CardTitle>
                      {resource.description && (
                        <CardDescription className="line-clamp-2">
                          {resource.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="mt-auto flex gap-2 pt-0">
                      <Button
                        variant="default"
                        className="flex-1"
                        onClick={() => setSelectedResource(resource)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {t("view")}
                      </Button>
                      <a
                        href={`${resource.fileUrl}?dl=`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: "outline",
                          size: "icon",
                        })}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">{t("download")}</span>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Preview Sheet */}
      <Sheet open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
        <SheetContent className="w-[95vw] sm:max-w-2xl" side="right">
          <SheetHeader className="border-b pb-4">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                  categoryColors[selectedResource?.category || "other"]?.split(" ")[0] ||
                  "bg-gray-100"
                }`}
              >
                <FileText className={"h-5 w-5"} />
              </div>
              <div className="min-w-0 flex-1">
                <SheetTitle className="line-clamp-2 text-left">
                  {selectedResource?.title}
                </SheetTitle>
                {selectedResource?.description && (
                  <p className="mt-1">{selectedResource.description}</p>
                )}
              </div>

              {selectedResource?.category && (
                <Badge variant="secondary" className="mr-8">
                  {categoryLabels[selectedResource.category] || selectedResource.category}
                </Badge>
              )}
            </div>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-auto bg-neutral-100 p-4 dark:bg-neutral-900">
            {selectedResource && (
              <iframe
                src={`${selectedResource.fileUrl}#toolbar=0`}
                className="h-full min-h-[50vh] w-full rounded-md border shadow-sm"
                title={selectedResource.title}
              />
            )}
          </div>
          <SheetFooter className="border-t bg-background pt-4">
            <a
              href={`${selectedResource?.fileUrl}?dl=`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ className: "gap-2" })}
            >
              <Download className="h-4 w-4" />
              {t("downloadPdf")}
            </a>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
