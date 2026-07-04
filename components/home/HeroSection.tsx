"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useHeroSlides } from "@/lib/i18n/useHeroSlides";
import { HeroSlideVisual } from "@/components/home/HeroSlideVisual";
import { HeroStatsBar } from "@/components/home/HeroStatsBar";
import { cn } from "@/lib/cn";
import type { IStatDisplay } from "@/lib/stats";

const AUTO_PLAY_MS = 7000;

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

const visualVariants = {
  enter: {
    opacity: 0,
    y: 12,
    scale: 0.985,
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.99,
  },
};

function HeroWaveDivider() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 text-white"
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

interface IHeroCarouselDotsProps {
  slides: ReturnType<typeof useHeroSlides>;
  activeIndex: number;
  isPaused: boolean;
  onSelect: (index: number) => void;
  slidesAria: string;
}

function HeroCarouselDots({
  slides,
  activeIndex,
  isPaused,
  onSelect,
  slidesAria,
}: IHeroCarouselDotsProps) {
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    setProgressKey((key) => key + 1);
  }, [activeIndex]);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full",
        "border border-white/15 bg-white/[0.08] px-4 py-2.5 backdrop-blur-md",
        "shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
      )}
      role="tablist"
      aria-label={slidesAria}
    >
      {slides.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Slide ${index + 1}: ${item.eyebrow}`}
            onClick={() => onSelect(index)}
            className="group relative flex items-center justify-center p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span
              className={cn(
                "relative block overflow-hidden rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isActive
                  ? "h-1.5 w-10 bg-white/20"
                  : "h-1.5 w-1.5 bg-white/35 group-hover:bg-white/55"
              )}
            >
              {isActive && (
                <span
                  key={progressKey}
                  className={cn(
                    "absolute inset-0 rounded-full",
                    "bg-[linear-gradient(90deg,var(--gold),#E84B3A)]",
                    "animate-hero-dot-progress"
                  )}
                  style={{
                    animationDuration: `${AUTO_PLAY_MS}ms`,
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                />
              )}
            </span>
            <span className="sr-only">{item.eyebrow}</span>
          </button>
        );
      })}
    </div>
  );
}

export function HeroSection({ stats }: { stats: IStatDisplay[] }) {
  const slides = useHeroSlides();
  const tHero = useTranslations("home.hero");
  const tCta = useTranslations("cta");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const goTo = useCallback(
    (index: number): void => {
      const total = slides.length;
      const nextIndex = ((index % total) + total) % total;
      setActiveIndex(nextIndex);
    },
    [slides.length]
  );

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  const slide = slides[activeIndex];

  return (
    <section
      className={cn(
        "home-hero-section relative flex min-h-[100svh] flex-col overflow-x-hidden text-white",
        "bg-[linear-gradient(160deg,#0A1628_0%,#0D4A2F_60%,#1B6B44_100%)]"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label={tHero("carouselAria")}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage: "var(--islamic-pattern)",
          backgroundRepeat: "repeat",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-[1] mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-12 lg:py-16 xl:px-12">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <div className="relative grid min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                variants={slideVariants}
                initial={hasMounted ? "enter" : false}
                animate="center"
                exit="exit"
                transition={carouselTransition}
                className="col-start-1 row-start-1 w-full"
              >
                <p
                  className={cn(
                    "hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]",
                    "bg-[rgba(232,75,58,0.1)] px-4 py-2",
                    "text-[13px] font-semibold uppercase tracking-wider text-[var(--gold-light)]"
                  )}
                >
                  <span aria-hidden="true">✦</span>
                  {slide.eyebrow}
                </p>

                <h1 className="hero-headline font-playfair text-[2.5rem] font-bold leading-[1.1] text-white sm:text-5xl lg:text-[64px]">
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

                <p className="hero-subtext mt-6 max-w-[540px] font-inter text-base leading-[1.75] text-white/80 sm:text-lg">
                  {slide.subtext}
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/free-class"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4",
                      "bg-[linear-gradient(135deg,#E84B3A,#C62828)] font-inter text-base font-bold text-white",
                      "transition-all duration-300 hover:scale-[1.03] hover:shadow-brand"
                    )}
                  >
                    {tCta("takeFreeTrialClass")}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/about"
                    className={cn(
                      "inline-flex items-center justify-center rounded-full border-[1.5px] border-white/40",
                      "bg-transparent px-8 py-4 font-inter text-base font-semibold text-white",
                      "transition-all duration-300 hover:bg-white/10"
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
                      className="flex items-center gap-2 text-[13px] text-white/70"
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

          <div className="relative grid min-w-0 lg:order-last">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`visual-${slide.id}`}
                variants={visualVariants}
                initial={hasMounted ? "enter" : false}
                animate="center"
                exit="exit"
                transition={carouselTransition}
                className="col-start-1 row-start-1 w-full"
              >
                <HeroSlideVisual type={slide.visual} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative z-[5] mt-8 flex shrink-0 flex-col items-center gap-5 pb-20 sm:mt-10 sm:pb-24 md:pb-28 lg:mt-12">
          <HeroCarouselDots
            slides={slides}
            activeIndex={activeIndex}
            isPaused={isPaused}
            onSelect={goTo}
            slidesAria={tHero("slidesAria")}
          />
          <HeroStatsBar stats={stats} />
        </div>
      </div>
      <HeroWaveDivider />
    </section>
  );
}
