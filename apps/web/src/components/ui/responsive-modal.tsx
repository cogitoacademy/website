"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const responsiveModalVariants = cva(
	"fixed z-50 gap-4 bg-background p-6 shadow-lg outline-none ring-1 ring-foreground/10 duration-300 data-closed:animate-out data-open:animate-in",
	{
		variants: {
			side: {
				top: "data-closed:slide-out-to-top data-open:slide-in-from-top sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95 sm:data-closed:slide-out-to-top-0 sm:data-open:slide-in-from-top-0 inset-x-0 top-0 border-b sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-full sm:max-w-[calc(100%-2rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border",
				bottom:
					"data-closed:slide-out-to-bottom data-open:slide-in-from-bottom sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95 sm:data-closed:slide-out-to-bottom-0 sm:data-open:slide-in-from-bottom-0 inset-x-0 bottom-0 border-t sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border",
				left: "data-closed:slide-out-to-left data-open:slide-in-from-left sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95 sm:data-closed:slide-out-to-left-0 sm:data-open:slide-in-from-left-0 inset-y-0 left-0 h-full w-3/4 border-r sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-auto sm:w-full sm:max-w-[calc(100%-2rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border",
				right:
					"data-closed:slide-out-to-right data-open:slide-in-from-right sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95 sm:data-closed:slide-out-to-right-0 sm:data-open:slide-in-from-right-0 inset-y-0 right-0 h-full w-3/4 border-l sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-auto sm:w-full sm:max-w-[calc(100%-2rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border",
			},
		},
		defaultVariants: {
			side: "bottom",
		},
	},
);

function ResponsiveModalRoot({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="responsive-modal" {...props} />;
}

function ResponsiveModalTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return (
		<DialogPrimitive.Trigger data-slot="responsive-modal-trigger" {...props} />
	);
}

function ResponsiveModalPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return (
		<DialogPrimitive.Portal data-slot="responsive-modal-portal" {...props} />
	);
}

function ResponsiveModalClose({ ...props }: DialogPrimitive.Close.Props) {
	return (
		<DialogPrimitive.Close data-slot="responsive-modal-close" {...props} />
	);
}

function ResponsiveModalOverlay({
	className,
	...props
}: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="responsive-modal-overlay"
			className={cn(
				"data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/50 duration-300 ease-in-out data-closed:animate-out data-open:animate-in",
				className,
			)}
			{...props}
		/>
	);
}

function ResponsiveModalContent({
	className,
	side = "bottom",
	showCloseButton = true,
	children,
	...props
}: DialogPrimitive.Popup.Props &
	VariantProps<typeof responsiveModalVariants> & {
		showCloseButton?: boolean;
	}) {
	return (
		<ResponsiveModalPortal>
			<ResponsiveModalOverlay />
			<DialogPrimitive.Popup
				data-slot="responsive-modal-content"
				className={cn(responsiveModalVariants({ side }), className)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<ResponsiveModalClose
						data-slot="responsive-modal-close"
						render={
							<Button
								variant="ghost"
								className="absolute top-4 right-4"
								size="icon-sm"
							/>
						}
					>
						<XIcon />
						<span className="sr-only">Close</span>
					</ResponsiveModalClose>
				)}
			</DialogPrimitive.Popup>
		</ResponsiveModalPortal>
	);
}

function ResponsiveModalHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="responsive-modal-header"
			className={cn("flex flex-col gap-1 text-left", className)}
			{...props}
		/>
	);
}

function ResponsiveModalFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="responsive-modal-footer"
			className={cn(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

function ResponsiveModalTitle({
	className,
	...props
}: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="responsive-modal-title"
			className={cn("font-semibold text-lg", className)}
			{...props}
		/>
	);
}

function ResponsiveModalDescription({
	className,
	...props
}: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="responsive-modal-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export {
	ResponsiveModalRoot as ResponsiveModal,
	ResponsiveModalClose,
	ResponsiveModalContent,
	ResponsiveModalDescription,
	ResponsiveModalFooter,
	ResponsiveModalHeader,
	ResponsiveModalPortal,
	ResponsiveModalTitle,
	ResponsiveModalTrigger,
	ResponsiveModalOverlay,
};
