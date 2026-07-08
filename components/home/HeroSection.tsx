"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useHomeHeroCarousel } from "@/components/home/HomeHeroCarouselContext";
import { HeroStatsBar } from "@/components/home/HeroStatsBar";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";
import type { IStatDisplay } from "@/lib/stats";

const carouselEase = [0.25, 0.1, 0.25, 1] as const;

const carouselTransition = {
  duration: 0.55,
  ease: carouselEase,
} as const;

const slideVariants = {
  enter: {
    opacity: 0,
    y: 10,
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

function HeroWaveDivider() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 text-bg-light"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block h-[60px] w-full sm:h-[80px] md:h-[100px]"
      >
        <path
          d="M0,48 C240,96 480,0 720,48 C960,96 1200,0 1440,48 L1440,100 L0,100 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function HeroSection({ stats }: { stats: IStatDisplay[] }) {
  const { slides, activeIndex, setIsPaused } = useHomeHeroCarousel();
  const tHero = useTranslations("home.hero");
  const tCta = useTranslations("cta");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const slide = slides[activeIndex];

  return (
    <section
      className={cn(
        "home-hero-section relative flex min-h-[min(100svh,900px)] flex-col overflow-x-hidden bg-bg-light text-[var(--green-dark)]"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label={tHero("carouselAria")}
    >
      <IslamicShapeBackdrop overlay="home" />

      <div className="site-container relative z-[1] flex flex-1 flex-col justify-center py-10 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-4xl lg:max-w-3xl">
          <div className="relative grid min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                variants={slideVariants}
                initial={hasMounted ? "enter" : false}
                animate="center"
                exit="exit"
                transition={carouselTransition}
                className="w-full"
              >
                <p
                  className={cn(
                    "hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]",
                    "bg-[rgba(50,201,145,0.1)] px-4 py-2",
                    "text-[13px] font-semibold uppercase tracking-wider text-[var(--gold-light)]"
                  )}
                >
                  <span aria-hidden="true">✦</span>
                  {slide.eyebrow}
                </p>

                <h1 className="hero-headline font-playfair text-[2.5rem] font-bold leading-[1.1] text-[var(--green-dark)] sm:text-5xl lg:text-[64px]">
                  {slide.headline.map((line, index) => (
                    <span key={`${slide.id}-line-${index}`} className="block">
                      {index === slide.gradientLineIndex ? (
                        <span className="gradient-text">{line}</span>
                      ) : (
                        line
                      )}
                    </span>
                  ))}
                </h1>

                <p className="hero-subtext mt-6 max-w-[540px] font-inter text-base leading-[1.75] text-[var(--text-gray)] sm:text-lg">
                  {slide.subtext}
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/free-class"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4",
                      "bg-[var(--green-primary)] font-inter text-base font-bold text-white",
                      "transition-all duration-300 hover:scale-[1.03] hover:shadow-brand"
                    )}
                  >
                    {tCta("takeFreeTrialClass")}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/about"
                    className={cn(
                      "site-btn-hover-overlay inline-flex items-center justify-center rounded-full border-[1.5px] border-[var(--green-primary)]",
                      "bg-transparent px-8 py-4 font-inter text-base font-semibold text-[var(--green-primary)]",
                      "transition-all duration-300"
                    )}
                  >
                    {tCta("learnMoreAboutUs")}
                  </Link>
                </div>

                <ul
                  className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6"
                  aria-label={tHero("trustAria")}
                >
                  {slide.trustItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[13px] text-[var(--text-gray)]"
                    >
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--green-primary)]/80"
                        aria-hidden="true"
                      >
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative z-[5] mt-8 flex shrink-0 flex-col items-center pb-12 sm:mt-10 sm:pb-14 md:pb-16 lg:mt-12">
          <HeroStatsBar stats={stats} />
        </div>
      </div>
      <HeroWaveDivider />
    </section>
  );
}
