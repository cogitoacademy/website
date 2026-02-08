import { ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Card } from "../ui/card";

interface ActionCardProps extends ComponentProps<typeof Card> {
  title: string;
  highlight?: string;
  description: string;
  action: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
  };
  theme?: "pink" | "blue";
}

export function ActionCard({
  title,
  highlight,
  description,
  action,
  image,
  theme = "pink",
  className,
  ...props
}: ActionCardProps) {
  const themeColors = {
    pink: "bg-tertiary-pink-200",
    blue: "bg-tertiary-blue-200",
  };

  const circleColor = themeColors[theme];

  // Split title to highlight specific part if needed
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-none bg-neutral-100 p-0 shadow-sm rounded-2xl",
        className,
      )}
      {...props}
    >
      <div className="flex h-full flex-col md:flex-row">
        {/* Content Section */}
        <div className="relative z-10 flex flex-1 flex-col justify-center p-6 md:p-8">
          <h3 className="mb-2 font-bold text-2xl text-primary-500">
            {highlight ? (
              <>
                {titleParts[0]}
                <span className="text-primary-500">{highlight}</span>
                {titleParts[1]}
              </>
            ) : (
              title
            )}
          </h3>
          <p className="mb-6 max-w-sm text-neutral-700">{description}</p>
          <div>
            {action.href.startsWith("http") ? (
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                <ChatCircleDots className="size-5" />
                {action.label}
              </a>
            ) : (
              <Link
                href={action.href as import("next").Route}
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                <ChatCircleDots className="size-5" />
                {action.label}
              </Link>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="absolute right-0 min-h-[250px] w-full items-end justify-end overflow-hidden md:min-h-[300px] md:w-1/2">
          {/* Background Circle Decoration */}
          <div
            className={cn(
              "absolute -right-10 -bottom-10 z-0 size-64 rounded-full opacity-80 md:-right-20 md:-bottom-20 md:size-80",
              circleColor,
            )}
          />

          {/* Main Image */}
          <div className="relative z-10 h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain object-bottom md:object-right-bottom"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
