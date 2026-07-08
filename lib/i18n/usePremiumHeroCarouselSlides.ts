"use client";

import { useTranslations } from "next-intl";
import {
  PREMIUM_HERO_CAROUSEL_SLIDES,
  type IPremiumHeroCarouselSlideMeta,
} from "@/lib/premiumHeroCarousel";

export interface IPremiumHeroCarouselSlide extends IPremiumHeroCarouselSlideMeta {
  badge: string;
  title: string;
  subtitle: string;
  imageAlt: string;
}

export function usePremiumHeroCarouselSlides(): IPremiumHeroCarouselSlide[] {
  const t = useTranslations("home.premiumHero.carousel.slides");

  return PREMIUM_HERO_CAROUSEL_SLIDES.map((meta) => ({
    ...meta,
    badge: t(`${meta.id}.badge`),
    title: t(`${meta.id}.title`),
    subtitle: t(`${meta.id}.subtitle`),
    imageAlt: t(`${meta.id}.imageAlt`),
  }));
}
