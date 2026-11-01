'use client';

import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { Tutor } from '@/types/tutor';
import TutorCard from '../tutor-card';

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    /* eslint-disable react-compiler/react-compiler -- Multiple conditional setCount calls for responsive breakpoints */
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
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

interface TutorsGridProps {
  tutors: Tutor[];
  showAll?: boolean;
}

export function TutorsGrid({ tutors, showAll = false }: TutorsGridProps) {
  const visibleCount = useVisibleCount();
  const reducedMotion = useReducedMotion();

  const visibleTutors = showAll ? tutors : tutors.slice(0, visibleCount);

  return (
    <m.div
      initial={false}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {visibleTutors.map((tutor, index) => (
          <m.div
            key={tutor.id}
            initial={showAll && !reducedMotion ? { opacity: 0, y: 20 } : false}
            animate={showAll ? { opacity: 1, y: 0 } : undefined}
            whileInView={showAll || reducedMotion ? undefined : { y: [20, 0], opacity: [0, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
            transition={{ duration: showAll ? 0.3 : 0.65, delay: index * (showAll ? 0.05 : 0.12) }}
          >
            <TutorCard tutor={tutor} index={index} />
          </m.div>
        ))}
      </AnimatePresence>
    </m.div>
  );
}
