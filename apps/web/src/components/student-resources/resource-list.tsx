"use client";

import { Download, Eye, FileText } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

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

export function ResourceList({ resources }: ResourceListProps) {
	const [selectedResource, setSelectedResource] = useState<Resource | null>(
		null,
	);

	// Group resources by category
	const groupedResources = resources.reduce(
		(acc, resource) => {
			const category = resource.category || "other";
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(resource);
			return acc;
		},
		{} as Record<string, Resource[]>,
	);

	const categoryLabels: Record<string, string> = {
		"position-paper": "Position Papers",
		"resolution-bank": "Resolution Bank",
		"study-guide": "Study Guides",
		other: "Other Resources",
	};

	return (
		<div className="space-y-8">
			{Object.entries(groupedResources).map(([category, items]) => (
				<div key={category} className="space-y-4">
					<h2 className="font-semibold text-2xl tracking-tight">
						{categoryLabels[category] || category}
					</h2>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{items.map((resource) => (
							<Card
								key={resource._id}
								className="flex h-full flex-col transition-shadow hover:shadow-md"
							>
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between">
										<Badge variant="outline" className="mb-2 capitalize">
											{category.replace("-", " ")}
										</Badge>
										<FileText className="h-4 w-4 text-muted-foreground" />
									</div>
									<CardTitle className="line-clamp-2 text-lg">
										{resource.title}
									</CardTitle>
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
										View
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
										<span className="sr-only">Download</span>
									</a>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			))}

			<Sheet
				open={!!selectedResource}
				onOpenChange={(open) => !open && setSelectedResource(null)}
			>
				<SheetContent className="w-[95vw] sm:max-w-2xl" side="right">
					<SheetHeader className="border-b pb-4">
						<SheetTitle>{selectedResource?.title}</SheetTitle>
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
							className={buttonVariants()}
						>
							<Download className="mr-2 h-4 w-4" />
							Download PDF
						</a>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
}
