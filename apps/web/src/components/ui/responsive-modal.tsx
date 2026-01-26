"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const responsiveModalVariants = cva(
  "bg-background fixed z-50 grid gap-4 p-6 shadow-lg data-open:animate-in data-closed:animate-out duration-300 outline-none ring-foreground/10 ring-1",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-closed:slide-out-to-top data-open:slide-in-from-top sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-[calc(100%-2rem)] sm:w-full sm:rounded-lg sm:border sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95 sm:data-closed:slide-out-to-top-0 sm:data-open:slide-in-from-top-0",
        bottom:
          "inset-x-0 bottom-0 border-t data-closed:slide-out-to-bottom data-open:slide-in-from-bottom sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-fit sm:w-full sm:rounded-lg sm:border sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95 sm:data-closed:slide-out-to-bottom-0 sm:data-open:slide-in-from-bottom-0",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-closed:slide-out-to-left data-open:slide-in-from-left sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:h-auto sm:w-full sm:max-w-[calc(100%-2rem)] sm:rounded-lg sm:border sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95 sm:data-closed:slide-out-to-left-0 sm:data-open:slide-in-from-left-0",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-closed:slide-out-to-right data-open:slide-in-from-right sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:h-auto sm:w-full sm:max-w-[calc(100%-2rem)] sm:rounded-lg sm:border sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95 sm:data-closed:slide-out-to-right-0 sm:data-open:slide-in-from-right-0",
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
  return <DialogPrimitive.Trigger data-slot="responsive-modal-trigger" {...props} />;
}

function ResponsiveModalPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="responsive-modal-portal" {...props} />;
}

function ResponsiveModalClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="responsive-modal-close" {...props} />;
}

function ResponsiveModalOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="responsive-modal-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/50 fixed inset-0 z-50 duration-300 ease-in-out",
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
            render={<Button variant="ghost" className="absolute top-4 right-4" size="icon-sm" />}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </ResponsiveModalClose>
        )}
      </DialogPrimitive.Popup>
    </ResponsiveModalPortal>
  );
}

function ResponsiveModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="responsive-modal-header"
      className={cn("flex flex-col gap-1 text-left", className)}
      {...props}
    />
  );
}

function ResponsiveModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="responsive-modal-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

function ResponsiveModalTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="responsive-modal-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function ResponsiveModalDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="responsive-modal-description"
      className={cn("text-sm text-muted-foreground", className)}
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
