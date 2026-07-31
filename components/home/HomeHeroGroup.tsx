"use client";

import type { IPremiumHeroCarouselSlide } from "@/lib/i18n/usePremiumHeroCarouselSlides";
import { PremiumHeroSection } from "@/components/home/PremiumHeroSection";
import { HomeTrustStatsSection } from "@/components/home/HomeTrustStatsSection";

interface IHomeHeroGroupProps {
  cmsSlides?: IPremiumHeroCarouselSlide[] | null;
}

export function HomeHeroGroup({ cmsSlides }: IHomeHeroGroupProps) {
  return (
    <>
      <PremiumHeroSection cmsSlides={cmsSlides} />
      <HomeTrustStatsSection />
    </>
  );
}
