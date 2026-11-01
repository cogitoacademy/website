'use client';

import { useInView } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import styles from './learning-scene.module.css';

export function LearningScene({
  children,
  className = 'relative mt-auto flex w-full flex-1 items-end justify-center',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  return (
    <div ref={ref} data-active={inView} className={`${styles.scene} ${className}`}>
      {children}
    </div>
  );
}
