"use client";

import { useTranslations } from "next-intl";
import {
  PREMIUM_HERO_CAROUSEL_SLIDES,
  type IPremiumHeroCarouselSlideMeta,
} from "@/lib/premiumHeroCarousel";

export interface IPremiumHeroCarouselSlide extends IPremiumHeroCarouselSlideMeta {
  badge: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  imageAlt: string;
  primaryCta: string;
  secondaryCta: string;
  slideId?: string;
}

export function usePremiumHeroCarouselSlides(
  cmsSlides?: IPremiumHeroCarouselSlide[] | null
): IPremiumHeroCarouselSlide[] {
  const t = useTranslations("home.premiumHero.carousel.slides");

  if (cmsSlides && cmsSlides.length > 0) {
    return cmsSlides;
  }

  return PREMIUM_HERO_CAROUSEL_SLIDES.map((meta) => {
    const highlightKey = `${meta.id}.titleHighlight` as const;
    const titleHighlight = t.has(highlightKey)
      ? t(highlightKey)
      : undefined;

    return {
      ...meta,
      badge: t(`${meta.id}.badge`),
      title: t(`${meta.id}.title`),
      titleHighlight,
      subtitle: t(`${meta.id}.subtitle`),
      imageAlt: t(`${meta.id}.imageAlt`),
      primaryCta: t(`${meta.id}.primaryCta`),
      secondaryCta: t(`${meta.id}.secondaryCta`),
      imageObjectPosition: meta.imageObjectPosition,
      imageScale: meta.imageScale,
    };
  });
}
