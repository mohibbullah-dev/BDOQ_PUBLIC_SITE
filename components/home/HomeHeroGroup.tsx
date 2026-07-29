"use client";

import type { IPremiumHeroCarouselSlide } from "@/lib/i18n/usePremiumHeroCarouselSlides";
import { PremiumHeroSection } from "@/components/home/PremiumHeroSection";

interface IHomeHeroGroupProps {
  cmsSlides?: IPremiumHeroCarouselSlide[] | null;
}

export function HomeHeroGroup({ cmsSlides }: IHomeHeroGroupProps) {
  return <PremiumHeroSection cmsSlides={cmsSlides} />;
}
