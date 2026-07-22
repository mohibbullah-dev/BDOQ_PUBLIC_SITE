"use client";

import { PremiumHeroCarousel } from "@/components/home/PremiumHeroCarousel";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePremiumHeroCarouselSlides } from "@/lib/i18n/usePremiumHeroCarouselSlides";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";

const HERO_BG = "/images/hero/islamic-hero-bg.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const copySwap = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

/** Premium hero — left copy synced to right carousel (4 client slides) */
export function PremiumHeroSection() {
  const t = useTranslations("home.premiumHero");
  const slides = usePremiumHeroCarouselSlides();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] ?? slides[0];
  const isFirstSlide = activeIndex === 0;

  return (
    <section
      className={cn(
        "home-hero-section relative flex w-full flex-col overflow-hidden bg-[#F7FCF9] text-[#111827]"
      )}
      aria-label={t("carousel.aria")}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          className="object-cover object-[center_bottom] opacity-[0.35] sm:object-center sm:opacity-[0.42]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#F7FCF9]/55" />
      </div>

      <div className="site-container relative z-[1] flex min-h-0 flex-1 flex-col">
        <div className="grid min-h-0 w-full flex-1 pb-8 sm:pb-10 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
          <div className="order-2 flex flex-col justify-center py-8 sm:py-10 lg:order-1 lg:py-12">
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                {activeSlide ? (
                  <motion.div key={activeSlide.id} {...copySwap}>
                    <p className="section-eyebrow mb-4 text-[12px] uppercase text-brand-red sm:mb-5 sm:text-[13px]">
                      <span className="inline-flex items-center gap-2">
                        <Globe className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        {activeSlide.badge}
                      </span>
                    </p>

                    {isFirstSlide ? (
                      <h1
                        className={cn(
                          "max-w-[560px] font-playfair text-[1.75rem] font-bold leading-[1.2] tracking-tight text-[var(--green-dark)]",
                          "sm:text-[2.1rem] lg:text-[2.25rem] xl:text-[2.4rem]"
                        )}
                      >
                        {activeSlide.title}
                      </h1>
                    ) : (
                      <h2
                        className={cn(
                          "max-w-[560px] font-playfair text-[1.75rem] font-bold leading-[1.2] tracking-tight text-[var(--green-dark)]",
                          "sm:text-[2.1rem] lg:text-[2.25rem] xl:text-[2.4rem]"
                        )}
                      >
                        {activeSlide.title}
                      </h2>
                    )}

                    <p className="mt-4 max-w-[520px] font-body text-base leading-relaxed text-[#6B7280] sm:mt-5 sm:text-[17px]">
                      {activeSlide.subtitle}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <motion.div
              {...fadeUp(0.2)}
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                {activeSlide ? (
                  <motion.div
                    key={`${activeSlide.id}-ctas`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
                  >
                    <SiteCta href={activeSlide.primaryHref}>
                      {activeSlide.primaryCta}
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </SiteCta>
                    <SiteCta href={activeSlide.secondaryHref} variant="secondary">
                      {activeSlide.secondaryCta}
                    </SiteCta>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            {...fadeUp(0.05)}
            className="order-1 w-full min-w-0 lg:order-2"
          >
            <PremiumHeroCarousel
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
