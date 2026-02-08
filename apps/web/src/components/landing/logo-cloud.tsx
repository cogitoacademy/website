"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Logo {
  id: string;
  name: string;
  url: string;
}

interface LogoCloudProps {
  logos: Logo[];
  interval?: number;
  displayCount?: number;
}

export function LogoCloud({ logos, interval = 3000, displayCount = 3 }: LogoCloudProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + displayCount) % logos.length);
      setKey((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, displayCount, logos.length]);

  const getVisibleLogos = () => {
    const visible = [];
    for (let i = 0; i < displayCount; i++) {
      visible.push(logos[(currentIndex + i) % logos.length]);
    }
    return visible;
  };

  const visibleLogos = getVisibleLogos();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <div className="flex w-full flex-col items-center justify-center pb-6">
      <div className="w-full max-w-4xl px-4">
        <motion.div
          className="grid grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={key}
        >
          {visibleLogos.map((logo, idx) => (
            <motion.div
              key={`${logo.id}-${currentIndex}-${idx}`}
              variants={itemVariants}
              className="flex items-center justify-center"
            >
              <div className="flex h-24 w-full items-center justify-center rounded-lg border border-white/15 bg-gradient-to-br from-white/10 to-white/5 transition-all duration-300">
                <img
                  src={logo.url || "/placeholder.svg"}
                  alt={logo.name}
                  className="h-12 w-auto object-contain px-4"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicator dots */}
      {/*<div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(logos.length / displayCount) }).map(
          (_, idx) => {
            const isActive = Math.floor(currentIndex / displayCount) === idx;
            return (
              <motion.div
                key={idx}
                layoutId={`dot-${idx}`}
                className={`rounded-full transition-all duration-300 ${
                  isActive ? "bg-black" : "bg-black/20 hover:bg-black/40"
                }`}
                animate={{
                  width: isActive ? 24 : 8,
                  height: 8,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          },
        )}
      </div>*/}
    </div>
  );
}
