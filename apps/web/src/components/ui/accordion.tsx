"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Root>) {
  return (
    <BaseAccordion.Root
      data-slot="accordion"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Item>) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={cn("group/item w-full border-card-border border-b last:border-b-0 bg-neutral-100 rounded-xl overflow-hidden min-w-0", className)}
      {...props}
    >
      {children}
    </BaseAccordion.Item>
  );
}

export function AccordionHeader({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Header>) {
  return (
    <BaseAccordion.Header data-slot="accordion-header" className={cn("w-full", className)} {...props}>
      {children}
    </BaseAccordion.Header>
  );
}

export function AccordionTrigger({
  className,
  expandableIndicator = true,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Trigger> & {
  expandableIndicator?: boolean;
}) {
  return (
    <BaseAccordion.Trigger
      data-slot="accordion-trigger"
      data-expandable={expandableIndicator ? true : undefined}
      className={cn(
        "group flex cursor-pointer select-none items-center gap-2.5",
        "py-4 pl-4 pr-4 transition-colors duration-100",
        "focus:outline-0 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        "w-full text-left font-medium leading-relaxed bg-background-primary rounded-xl",
        className,
      )}
      {...props}
    >
      {children}
      {expandableIndicator && (
        <Plus
          className={cn(
            "ml-auto size-5 shrink-0 transition-transform duration-200 ease-in-out"
          )}
        />
      )}
    </BaseAccordion.Trigger>
  );
}

export function AccordionPanel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Panel>) {
  return (
    <BaseAccordion.Panel
      data-slot="accordion-panel"
      data-accordion-panel="true"
      className={cn(
        "flex flex-col gap-2.5 p-4 w-full",
        "overflow-hidden transition-all ease-out",
        "h-(--accordion-panel-height) [&[hidden]:not([hidden=until-found])]:hidden",
        "data-ending-style:h-0 data-starting-style:h-0",
        className,
      )}
      {...props}
    >
      <div data-slot="accordion-panel-content" className="w-full pb-2">
        {children}
      </div>
    </BaseAccordion.Panel>
  );
}
