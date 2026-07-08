"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HeroCarouselDots } from "@/components/home/HeroCarouselDots";
import { HeroSlideVisual } from "@/components/home/HeroSlideVisual";
import { useHomeHeroCarousel } from "@/components/home/HomeHeroCarouselContext";
import { HeroVisualLayoutProvider } from "@/components/home/HeroVisualLayoutContext";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";

const carouselEase = [0.25, 0.1, 0.25, 1] as const;

const carouselTransition = {
  duration: 0.55,
  ease: carouselEase,
} as const;

const visualVariants = {
  enter: {
    opacity: 0,
    y: 12,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -8,
  },
};

/** Full-width section — each slide card spans the section width */
export function HeroVisualCarouselSection() {
  const { slides, activeIndex, isPaused, setIsPaused, goTo, autoPlayMs } =
    useHomeHeroCarousel();
  const tHero = useTranslations("home.hero");
  const [hasMounted, setHasMounted] = useState(false);
  const slide = slides[activeIndex];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section
      id={
        slide.id === "start-now" ? "free-trial-booking" : "hero-visual-carousel"
      }
      className={cn(
        "relative w-full overflow-hidden bg-bg-light py-10 md:py-14 lg:py-16"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Academy highlights"
    >
      <IslamicShapeBackdrop overlay="home" />

      <HeroVisualLayoutProvider layout="section">
        <div className="site-container relative z-[1] flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
          <div className="relative w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                variants={visualVariants}
                initial={hasMounted ? "enter" : false}
                animate="center"
                exit="exit"
                transition={carouselTransition}
                className="w-full"
              >
                <HeroSlideVisual type={slide.visual} />
              </motion.div>
            </AnimatePresence>
          </div>

          <HeroCarouselDots
            slides={slides}
            activeIndex={activeIndex}
            isPaused={isPaused}
            autoPlayMs={autoPlayMs}
            onSelect={goTo}
            slidesAria={tHero("slidesAria")}
          />
        </div>
      </HeroVisualLayoutProvider>
    </section>
  );
}
