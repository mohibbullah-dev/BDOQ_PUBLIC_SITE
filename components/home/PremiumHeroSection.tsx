"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Play,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { PremiumHeroCarousel } from "@/components/home/PremiumHeroCarousel";
import { HeroQuoteBanner } from "@/components/home/HeroQuoteBanner";
import { SiteCta } from "@/components/shared/SiteCta";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { usePremiumHeroCarouselSlides } from "@/lib/i18n/usePremiumHeroCarouselSlides";
import { cn } from "@/lib/cn";

const FEATURES = [
  { key: "teachers", icon: Users },
  { key: "classes", icon: BookOpen },
  { key: "safe", icon: ShieldCheck },
  { key: "schedule", icon: CalendarDays },
] as const;

const copyTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

function HighlightedTitle({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) {
  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>;
  }

  const parts = title.split(highlight);

  return (
    <>
      {parts[0]}
      <span className="text-primary">{highlight}</span>
      {parts.slice(1).join(highlight)}
    </>
  );
}

/** Flat 4-slide hero — mihrab visual + feature strip (mockup design) */
export function PremiumHeroSection() {
  const t = useTranslations("home.premiumHero");
  const slides = usePremiumHeroCarouselSlides();
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex] ?? slides[0];

  if (!slide) return null;

  const showPlayOnSecondary = slide.secondaryHref.includes("how-to-start");

  return (
    <section
      className={cn(
        "home-hero-section relative flex w-full flex-col overflow-hidden",
        "bg-[#F7FCF9] text-[#111827]"
      )}
      aria-label={t("aria")}
    >
      <IslamicShapeBackdrop overlay="home" priority />

      <div className="site-container relative z-[1] flex min-h-0 flex-1 flex-col pb-6 pt-2 md:pb-8">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-14">
          {/* Left copy — synced to active slide */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={copyTransition}
              >
                <p className="inline-flex items-center gap-2 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:text-xs">
                  <ShieldCheck
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {slide.badge}
                </p>

                <h1
                  className={cn(
                    "mt-4 max-w-[34rem] font-playfair text-[1.85rem] font-bold leading-[1.18] tracking-tight text-primary-dark",
                    "sm:text-[2.35rem] lg:text-[2.6rem] xl:text-[2.85rem]",
                    activeIndex === 0 ? "" : "lg:min-h-[5.5rem]"
                  )}
                >
                  <HighlightedTitle
                    title={slide.title}
                    highlight={slide.titleHighlight}
                  />
                </h1>

                <p className="mt-4 max-w-[32rem] font-body text-base leading-relaxed text-text-gray sm:mt-5 sm:text-[17px]">
                  {slide.subtitle}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                  <SiteCta href={slide.primaryHref}>
                    {slide.primaryCta}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </SiteCta>
                  <SiteCta href={slide.secondaryHref} variant="secondary">
                    {showPlayOnSecondary ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current">
                        <Play
                          className="ml-0.5 h-3 w-3 fill-current"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                    {slide.secondaryCta}
                  </SiteCta>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arch carousel */}
          <div className="order-1 mx-auto w-full max-w-lg lg:order-2 lg:max-w-none">
            <PremiumHeroCarousel
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
            />
          </div>
        </div>

        {/* Floating features bar — static across slides */}
        <div className="relative z-10 mt-8 md:mt-10 lg:-mb-2 lg:mt-4">
          <ul
            className={cn(
              "grid grid-cols-1 gap-4 rounded-3xl border border-gray-100 bg-white p-4",
              "shadow-[0_18px_50px_-22px_rgba(15,23,42,0.2)]",
              "sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:p-5 xl:p-6"
            )}
            aria-label={t("featuresAria")}
          >
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li
                  key={feature.key}
                  className={cn(
                    "flex items-start gap-3 px-2 lg:px-4",
                    index < FEATURES.length - 1 &&
                      "lg:border-r lg:border-gray-100"
                  )}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-light text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-body text-sm font-semibold text-primary-dark">
                      {t(`features.${feature.key}.title`)}
                    </span>
                    <span className="mt-0.5 block font-body text-xs text-text-gray">
                      {t(`features.${feature.key}.desc`)}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <HeroQuoteBanner />
    </section>
  );
}
