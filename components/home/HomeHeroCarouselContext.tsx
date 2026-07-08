"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useHeroSlides } from "@/lib/i18n/useHeroSlides";
import { HERO_CAROUSEL_AUTO_PLAY_MS } from "@/lib/heroCarousel";

interface IHomeHeroCarouselContextValue {
  slides: ReturnType<typeof useHeroSlides>;
  activeIndex: number;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  goTo: (index: number) => void;
  autoPlayMs: number;
}

const HomeHeroCarouselContext =
  createContext<IHomeHeroCarouselContextValue | null>(null);

export function HomeHeroCarouselProvider({
  children,
}: {
  children: ReactNode;
}) {
  const slides = useHeroSlides();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    }, HERO_CAROUSEL_AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  const value = useMemo(
    () => ({
      slides,
      activeIndex,
      isPaused,
      setIsPaused,
      goTo,
      autoPlayMs: HERO_CAROUSEL_AUTO_PLAY_MS,
    }),
    [slides, activeIndex, isPaused, goTo]
  );

  return (
    <HomeHeroCarouselContext.Provider value={value}>
      {children}
    </HomeHeroCarouselContext.Provider>
  );
}

export function useHomeHeroCarousel(): IHomeHeroCarouselContextValue {
  const context = useContext(HomeHeroCarouselContext);
  if (!context) {
    throw new Error(
      "useHomeHeroCarousel must be used within HomeHeroCarouselProvider"
    );
  }
  return context;
}
