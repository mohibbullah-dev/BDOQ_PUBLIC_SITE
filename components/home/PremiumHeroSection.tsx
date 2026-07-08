"use client";

import { PremiumHeroCarousel } from "@/components/home/PremiumHeroCarousel";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Globe } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/shared/SocialBrandIcons";
import { usePremiumHeroCarouselSlides } from "@/lib/i18n/usePremiumHeroCarouselSlides";
import { WHATSAPP_URL } from "@/lib/constants";
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

/** Premium hero — left copy synced to right carousel slide */
export function PremiumHeroSection() {
  const t = useTranslations("home.premiumHero");
  const chips = t.raw("chips") as string[];
  const slides = usePremiumHeroCarouselSlides();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] ?? slides[0];

  return (
    <section
      className={cn(
        "home-hero-section relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#F3F8F4] text-[#111827]"
      )}
      aria-label="Welcome to BD Online Quran Academy"
    >
      {/* Full-bleed Islamic illustration — soft opacity, never solid 100% */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          className="object-cover object-[center_bottom] opacity-[0.65] sm:object-center"
          sizes="100vw"
        />
        {/* Very light wash — art stays strong, copy stays readable */}
        <div className="absolute inset-0 bg-[#F3F8F4]/20 lg:bg-[#F3F8F4]/10" />
      </div>

      <div className="site-container relative z-[1] flex min-h-0 flex-1 flex-col">
        <div className="grid min-h-0 w-full flex-1 pb-8 sm:pb-10 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
          {/* Left: content — synced with carousel */}
          <div className="order-2 flex flex-col justify-center py-8 sm:py-10 lg:order-1 lg:py-12">
            <motion.div {...fadeUp(0)} className="mb-4 sm:mb-5">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2",
                  "bg-[#E8F5EE] font-inter text-[13px] font-semibold text-[#0B5D3B]",
                  "ring-1 ring-[#0B5D3B]/10"
                )}
              >
                <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t("badge")}
              </span>
            </motion.div>

            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                {activeSlide ? (
                  <motion.div key={activeSlide.id} {...copySwap}>
                    <h1
                      className={cn(
                        "max-w-[560px] font-playfair text-[1.85rem] font-bold leading-[1.2] tracking-tight",
                        "text-[#111827] sm:text-[2.2rem] lg:text-[2.35rem] xl:text-[2.5rem]"
                      )}
                    >
                      {activeSlide.title}
                    </h1>
                    <p className="mt-4 max-w-[520px] font-inter text-base leading-relaxed text-[#6B7280] sm:mt-5 sm:text-[17px]">
                      {activeSlide.subtitle}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <motion.ul
              {...fadeUp(0.2)}
              className="mt-5 flex flex-wrap gap-2 sm:mt-6"
              aria-label={t("featuresAria")}
            >
              {chips.map((chip) => (
                <li
                  key={chip}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2",
                    "bg-[#E8F5EE] font-inter text-[13px] font-medium text-[#0B5D3B]",
                    "ring-1 ring-[#0B5D3B]/8 sm:text-sm"
                  )}
                >
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-[#0B5D3B]"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  {chip}
                </li>
              ))}
            </motion.ul>

            <motion.div
              {...fadeUp(0.26)}
              className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Link
                href="/free-class"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5",
                  "bg-[#0B5D3B] font-inter text-base font-semibold text-white",
                  "shadow-[0_10px_28px_rgba(11,93,59,0.28)]",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#094A2F] hover:shadow-[0_14px_36px_rgba(11,93,59,0.32)]"
                )}
              >
                {t("primaryCta")}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0B5D3B]/20",
                  "bg-white px-8 py-3.5 font-inter text-base font-semibold text-[#0B5D3B]",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0B5D3B]/35 hover:bg-[#F8FAF9]"
                )}
              >
                <WhatsappIcon className="h-5 w-5 text-[#25D366]" />
                {t("secondaryCta")}
              </a>
            </motion.div>
          </div>

          {/* Right: photo carousel — no headline overlay */}
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
