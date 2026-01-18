"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
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
      className={cn("w-full border-card-border border-b last:border-b-0", className)}
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
    <BaseAccordion.Header data-slot="accordion-header" className={className} {...props}>
      {children}
    </BaseAccordion.Header>
  );
}

export function AccordionTrigger({
  className,
  expandableIndicator = true,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Trigger> & {
  expandableIndicator?: boolean;
}) {
  return (
    <BaseAccordion.Trigger
      data-slot="accordion-trigger"
      data-expandable={expandableIndicator ? true : undefined}
      className={cn(
        "flex cursor-pointer select-none items-center gap-2.5",
        "py-4 transition-colors duration-100",
        "focus:outline-0 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        "w-full text-left font-medium leading-relaxed **:[svg]:size-4",
        "**:data-[slot=expandable-indicator]:transition-all",
        "**:data-[slot=expandable-indicator]:duration-100",
        expandableIndicator && [
          "data-expandable:after:ml-auto data-expandable:after:size-4 data-expandable:after:bg-chevron-down-dark dark:data-expandable:after:bg-chevron-down",
          "data-expandable:after:shrink-0 data-expandable:after:transition-transform data-expandable:after:duration-100",
          "data-expandable:data-panel-open:after:rotate-180",
        ],
        className,
      )}
      {...props}
    />
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
      className={cn(
        "flex w-full flex-col gap-2.5",
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
