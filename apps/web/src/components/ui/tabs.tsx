import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn('group/tabs flex gap-2 lg:gap-4', className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  'group/tabs-list inline-flex w-fit items-center justify-center rounded-none p-[3px] text-muted-foreground data-[variant=line]:rounded-none',
  {
    variants: {
      variant: {
        default: 'h-8 bg-muted',
        line: 'gap-1 bg-transparent',
        sidebar: 'w-full gap-2 lg:gap-4 bg-transparent p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function TabsList({
  className,
  variant = 'default',
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md overflow-hidden border font-medium text-black text-xs transition-all hover:text-foreground    disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        // Variant: Line
        'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',
        // Background and Text
        'data-active:text-black',
        // Position
        'after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[variant=line]/tabs-list:data-active:after:opacity-100',
        // Border Color
        // "[border-color:transparent] data-[active]:[border-color:var(--active-color,transparent)]",
        // Other
        'outline-none ring-0',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn('flex-1 text-xs/relaxed outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
