"use client";

import { AnimatePresence, type MotionProps, motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Highlighter } from "./highlighter";

interface WordRotateHighlighterProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
  action?:
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  highlightDelay?: number;
}

export function WordRotateHighlighter({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth,
  animationDuration,
  iterations,
  padding,
  multiline,
  isView = false,
  highlightDelay = 500,
}: WordRotateHighlighterProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1 key={words[index]} className={cn("relative", className)} {...motionProps}>
          <Highlighter
            action={action}
            color={color}
            strokeWidth={strokeWidth}
            animationDuration={animationDuration}
            iterations={iterations}
            padding={padding}
            multiline={multiline}
            isView={isView}
            delay={highlightDelay}
          >
            {words[index]}
          </Highlighter>
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
