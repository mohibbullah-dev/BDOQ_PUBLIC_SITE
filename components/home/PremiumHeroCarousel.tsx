"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useTranslations } from "next-intl";
import {
  usePremiumHeroCarouselSlides,
  type IPremiumHeroCarouselSlide,
} from "@/lib/i18n/usePremiumHeroCarouselSlides";
import { cn } from "@/lib/cn";

const AUTO_PLAY_MS = 6000;

const slideTransition = {
  duration: 0.45,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

function PhotoSlide({
  slide,
  priority,
}: {
  slide: IPremiumHeroCarouselSlide;
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#E8F5EF]">
      <Image
        src={slide.image}
        alt={slide.imageAlt}
        fill
        className={cn(slide.imageClassName ?? "object-cover object-center")}
        sizes="(max-width: 1024px) 90vw, 480px"
        priority={priority}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

export interface IPremiumHeroCarouselProps {
  activeIndex: number;
  onActiveIndexChange: Dispatch<SetStateAction<number>>;
}

/** Mihrab-framed image carousel — 4 flat slides with autoplay */
export function PremiumHeroCarousel({
  activeIndex,
  onActiveIndexChange,
}: IPremiumHeroCarouselProps) {
  const t = useTranslations("home.premiumHero.carousel");
  const slides = usePremiumHeroCarouselSlides();
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = slides.length;

  const goTo = useCallback(
    (index: number) => {
      onActiveIndexChange(((index % totalSlides) + totalSlides) % totalSlides);
    },
    [onActiveIndexChange, totalSlides]
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || totalSlides < 2) return undefined;

    const timer = window.setInterval(() => {
      onActiveIndexChange((current) => (current + 1) % totalSlides);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, onActiveIndexChange, totalSlides]);

  const slide = slides[activeIndex] ?? slides[0];

  if (!slide) return null;

  return (
    <div
      className="relative mx-auto aspect-[4/5] w-full max-w-[440px] lg:max-w-[480px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={t("aria")}
    >
      <div className="hero-mihrab-frame absolute inset-0">
        <div className="hero-mihrab-inner absolute inset-[10px] overflow-hidden sm:inset-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={slideTransition}
              className="absolute inset-0"
            >
              <PhotoSlide slide={slide} priority={activeIndex === 0} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
          role="tablist"
          aria-label={t("aria")}
        >
          {slides.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={item.badge}
                onClick={() => goTo(index)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/20",
                  isActive
                    ? "h-2 w-6 bg-white shadow-sm"
                    : "h-2 w-2 bg-white/50 hover:bg-white/75"
                )}
              />
            );
          })}
        </div>
      </div>

      {/* no-btn-overlay: globals force position:relative on rounded-full bg-primary */}
      <button
        type="button"
        onClick={goPrev}
        aria-label={t("prev")}
        className="hero-carousel-nav hero-carousel-nav--prev no-btn-overlay"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label={t("next")}
        className="hero-carousel-nav hero-carousel-nav--next no-btn-overlay"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
