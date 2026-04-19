'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './ui/container';

export interface CarouselItem {
  id: string | number;
  img: string;
  desc: string;
  name: string;
  title: string;
  avatar: string;
  initials?: string;
  color?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
  responsiveGap?: boolean;
  className?: string;
  showNavigation?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onItemClick?: (item: CarouselItem, index: number) => void;
  renderCard?: (item: CarouselItem, index?: number, isActive?: boolean) => React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  cardWidth = 450,
  cardHeight = 225,
  gap = 32,
  responsiveGap = false,
  className = '',
  showNavigation = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  onItemClick,
  renderCard,
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [_currentGap, setCurrentGap] = useState(gap);

  useEffect(() => {
    if (!responsiveGap) {
      setCurrentGap(gap);
      return;
    }

    const updateGap = () => {
      const width = window.innerWidth;
      let newGap: number;
      if (width < 640) newGap = Math.min(16, gap * 0.5);
      else if (width < 768) newGap = Math.max(24, gap * 0.75);
      else if (width < 1024) newGap = gap;
      else if (width < 1280) newGap = gap * 1.25;
      else newGap = gap * 1.5;
      setCurrentGap(newGap);
    };

    updateGap();
    window.addEventListener('resize', updateGap);
    return () => window.removeEventListener('resize', updateGap);
  }, [gap, responsiveGap]);

  const extendedItems = items.length > 0 ? [items[items.length - 1], ...items, items[0]] : [];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex === 0) {
          setCurrentIndex(items.length);
        } else if (currentIndex === extendedItems.length - 1) {
          setCurrentIndex(1);
        }
        setIsTransitioning(false);
      },
      isTransitioning ? 500 : 0,
    );
    return () => clearTimeout(timer);
  }, [currentIndex, items.length, extendedItems.length, isTransitioning]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      if (!isTransitioning) setCurrentIndex((prev) => prev + 1);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isTransitioning]);

  /**
   * Arc/fan layout — cards are arranged in a downward-opening arc:
   *   - position  0: center top, no rotation
   *   - position ±1: dropped down, rotated ±15°, shifted horizontally
   *   - position ±2: dropped further, rotated ±30°, shifted further (hidden)
   *   - beyond ±2 : fully hidden
   *
   * The transform-origin is set to the bottom-center of the card so that
   * rotation pivots from the bottom, creating a natural fan effect.
   */
  const getCardStyle = (index: number): React.CSSProperties => {
    const position = index - currentIndex;

    // Arc parameters
    const ARC_TRANSLATE_X = cardWidth * 0.85; // horizontal spread per step
    const ARC_TRANSLATE_Y = 80; // vertical drop per step
    const ARC_ROTATE_DEG = 15; // rotation per step (degrees)

    const absPos = Math.abs(position);
    const sign = Math.sign(position);

    // Render up to ±2 for smooth circular transition, but only show ±1 and 0
    const isRendered = absPos <= 2;

    if (!isRendered) {
      return {
        opacity: 0,
        visibility: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      };
    }

    const translateX = sign * absPos * ARC_TRANSLATE_X;
    const translateY = absPos * ARC_TRANSLATE_Y * absPos;
    const rotate = sign * absPos * ARC_ROTATE_DEG;
    const zIndex = 10 - absPos * 3;
    // ±2 cards are fully invisible — only used as ghost frames for smooth animation
    const opacity = absPos <= 1 ? 1 : 0;
    const pointerEvents = absPos <= 1 ? 'auto' : ('none' as const);

    const isJumpFrame =
      (currentIndex === 0 && index === items.length) ||
      (currentIndex === extendedItems.length - 1 && index === 1);

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`,
      transformOrigin: 'bottom center',
      opacity,
      zIndex,
      visibility: 'visible',
      pointerEvents,
      transition:
        isTransitioning && !isJumpFrame ? 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
    };
  };

  const defaultRenderCard = (item: CarouselItem) => {
    const itemId =
      typeof item.id === 'number' ? item.id : Number.parseInt(item.id as string, 10) || 0;
    const bgColor =
      itemId % 2 === 0
        ? 'bg-tertiary-yellow-200 border-neutral-200 *:text-black'
        : 'bg-secondary-200 *:text-neutral-1000 border-neutral-200';

    const showInitials = item.avatar === '/placeholder.jpg' && item.initials;

    return (
      <div
        className={`mx-auto flex aspect-video w-full max-w-[90vw] flex-col overflow-hidden rounded-[20px] border shadow-sm transition sm:max-w-none ${bgColor}`}
      >
        <div className="flex flex-1 flex-col justify-between text-pretty p-4 text-left">
          <p className="max-h-full overflow-y-auto font-light text-xs sm:text-sm lg:text-sm">{item.desc}</p>
          <div className="flex items-center space-x-2">
            <div
              className={`flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full lg:size-13 ${
                showInitials
                  ? `${item.color || 'bg-primary-500'} text-white font-medium text-sm`
                  : 'bg-primary-100'
              }`}
            >
              {showInitials ? (
                <span>{item.initials}</span>
              ) : (
                <Image
                  src={item.avatar}
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="h-full w-full"
                />
              )}
            </div>
            <div>
              <h3 className={cn('font-medium text-sm lg:text-base')}>{item.name}</h3>
              <h4 className="line-clamp-2 text-xs lg:text-sm">{item.title}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Main carousel container */}
      <div className="relative z-30 flex h-40 min-[460px]:h-50 lg:h-80 w-full max-w-280 items-start justify-center overflow-visible">
        {/* Cards */}
        <div className="relative flex items-start justify-center">
          {extendedItems.map((item, index) => {
            if (!item) return null;
            return (
              <button
                key={`${item.id}-${index}`}
                type="button"
                className="absolute cursor-pointer"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  ...getCardStyle(index),
                }}
                onClick={() => {
                  const actualIndex = index - 1;
                  if (
                    actualIndex >= 0 &&
                    actualIndex < items.length &&
                    actualIndex !== currentIndex - 1
                  ) {
                    goToSlide(actualIndex);
                  }
                  onItemClick?.(item, actualIndex);
                }}
              >
                {renderCard
                  ? renderCard(item, index, index === currentIndex)
                  : defaultRenderCard(item)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      {showNavigation && (
        <Container className="pt-5 pb-0 translate-y-20 lg:translate-y-0">
          <div className="mb-6 flex w-full items-center justify-between gap-8">
            <button
              type="button"
              onClick={prevSlide}
              disabled={isTransitioning}
              className="z-30 rounded-[10px] bg-primary-500 hover:bg-primary-400 p-2.5 text-neutral-100 transition-all duration-300 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeftIcon size={24} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              disabled={isTransitioning}
              className="z-30 rounded-[10px] bg-primary-500 hover:bg-primary-400 p-2.5 text-neutral-100 transition-all duration-300 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowRightIcon size={24} />
            </button>
          </div>
        </Container>
      )}

      {/* Dots indicator */}
      {showDots && (
        <div className="mt-8 flex gap-2">
          {items.map((item, index) => {
            let activeIndex = currentIndex - 1;
            if (activeIndex < 0) activeIndex = items.length - 1;
            if (activeIndex >= items.length) activeIndex = 0;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`size-2 rounded-full transition-all duration-200 disabled:cursor-not-allowed ${
                  index === activeIndex ? 'scale-125 bg-dot-active' : 'scale-125 bg-dot-inactive'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Carousel;
