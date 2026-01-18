import { cn } from "@/lib/utils";
import { cloneElement, isValidElement, type ReactElement } from "react";

type ContainerProps = {
  className?: string;
  asChild?: boolean;
  children?: React.ReactNode;
};

export const Container = ({
  className,
  asChild = false,
  children,
}: ContainerProps) => {
  const baseClassName = "mx-auto flex w-full container flex-col gap-4 px-4 py-8 md:px-8";

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(baseClassName, className, child.props.className),
    });
  }

  return (
    <main className={cn(baseClassName, className)}>{children}</main>
  );
};
