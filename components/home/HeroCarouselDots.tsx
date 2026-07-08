"use client";

import { useEffect, useState } from "react";
import { useHeroSlides } from "@/lib/i18n/useHeroSlides";
import { cn } from "@/lib/cn";

interface IHeroCarouselDotsProps {
  slides: ReturnType<typeof useHeroSlides>;
  activeIndex: number;
  isPaused: boolean;
  autoPlayMs: number;
  onSelect: (index: number) => void;
  slidesAria: string;
}

export function HeroCarouselDots({
  slides,
  activeIndex,
  isPaused,
  autoPlayMs,
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
        "border border-[var(--green-primary)]/15 bg-white/80 px-4 py-2.5 backdrop-blur-md",
        "shadow-[0_8px_32px_rgba(50,201,145,0.12)]"
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
                  ? "h-1.5 w-10 bg-[var(--green-primary)]/25"
                  : "h-1.5 w-1.5 bg-[var(--green-primary)]/35 group-hover:bg-[var(--green-primary)]/55"
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
                    animationDuration: `${autoPlayMs}ms`,
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
