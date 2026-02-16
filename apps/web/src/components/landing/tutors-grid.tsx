"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Tutor } from "@/types/tutor";
import TutorCard from "../tutor-card";

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    function update() {
      const width = window.innerWidth;

      if (width >= 1280)
        setCount(4); // xl
      else if (width >= 1024)
        setCount(3); // lg
      else if (width >= 768)
        setCount(2); // md
      else setCount(1); // mobile
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

interface TutorsGridProps {
  tutors: Tutor[];
  showAll?: boolean;
}

export function TutorsGrid({ tutors, showAll = false }: TutorsGridProps) {
  const visibleCount = useVisibleCount();

  const visibleTutors = showAll ? tutors : tutors.slice(0, visibleCount);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {visibleTutors.map((tutor, index) => (
          <motion.div
            key={tutor._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <TutorCard tutor={tutor} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
