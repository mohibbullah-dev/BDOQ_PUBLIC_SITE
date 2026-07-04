"use client";

import { useTranslations } from "next-intl";
import { HERO_SLIDE_META } from "@/lib/heroSlides";
import type { IHeroSlide } from "@/lib/heroSlides";

type SlideId = (typeof HERO_SLIDE_META)[number]["id"];

export function useHeroSlides(): IHeroSlide[] {
  const t = useTranslations("home.hero.slides");

  return HERO_SLIDE_META.map((meta) => {
    const slideId = meta.id as SlideId;
    const headline = t.raw(`${slideId}.headline`) as [string, string, string];
    const trustItems = t.raw(`${slideId}.trust`) as string[];

    return {
      id: meta.id,
      eyebrow: t(`${slideId}.eyebrow`),
      headline,
      gradientLineIndex: meta.gradientLineIndex,
      subtext: t(`${slideId}.subtext`),
      trustItems,
      visual: meta.visual,
    };
  });
}
