"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useLocale } from "next-intl";
import {
  HERO_MARQUEE_ITEMS,
  getMarqueeReference,
  getMarqueeTranslation,
} from "@/lib/heroMarquee";
import type { LocaleType } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const AUTO_MS = 7000;
const PER_PAGE = 3;

function RubElHizbFrame({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 4L38.5 18.5L54 14L48 28.5L60 36L46 42L50 56.5L36 50L32 62L28 50L14 56.5L18 42L4 36L16 28.5L10 14L25.5 18.5L32 4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <rect
        x="20"
        y="20"
        width="24"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Inline mosque skyline — avoids next/image SVG breakage */
function MosqueWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 88"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g opacity="0.9">
        <rect x="18" y="28" width="8" height="52" rx="1" />
        <rect x="14" y="22" width="16" height="8" rx="1" />
        <path d="M22 8 L24 22 H20 Z" />
        <path d="M40 80 V52 C40 40 52 34 64 34 C76 34 88 40 88 52 V80 Z" />
        <path d="M52 34 C52 22 64 14 64 14 C64 14 76 22 76 34 Z" />
        <path d="M100 80 V46 C100 28 124 16 160 16 C196 16 220 28 220 46 V80 Z" />
        <path d="M136 16 C136 4 160 0 160 0 C160 0 184 4 184 16 Z" />
        <circle cx="160" cy="4" r="2.5" />
        <path d="M232 80 V52 C232 40 244 34 256 34 C268 34 280 40 280 52 V80 Z" />
        <path d="M244 34 C244 22 256 14 256 14 C256 14 268 22 268 34 Z" />
        <rect x="294" y="28" width="8" height="52" rx="1" />
        <rect x="290" y="22" width="16" height="8" rx="1" />
        <path d="M298 8 L300 22 H296 Z" />
        <rect x="0" y="78" width="320" height="10" opacity="0.35" />
      </g>
    </svg>
  );
}

/** Dark green Quran/Hadith banner under hero — 3 visible, auto-rotates 12 quotes */
export function HeroQuoteBanner() {
  const locale = useLocale() as LocaleType;
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const chunks: (typeof HERO_MARQUEE_ITEMS)[] = [];
    for (let i = 0; i < HERO_MARQUEE_ITEMS.length; i += PER_PAGE) {
      chunks.push(HERO_MARQUEE_ITEMS.slice(i, i + PER_PAGE));
    }
    return chunks;
  }, []);

  const totalPages = pages.length;

  useEffect(() => {
    if (totalPages < 2) return undefined;
    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % totalPages);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [totalPages]);

  const visible = pages[page] ?? pages[0] ?? [];

  return (
    <div
      className="relative z-[1] overflow-hidden bg-[#0B3D2E] text-white"
      role="region"
      aria-label={
        locale === "bn" ? "কুরআনের আয়াত ও হাদিস" : "Quranic verses and Hadith"
      }
    >
      <MosqueWatermark className="pointer-events-none absolute -right-4 bottom-0 z-0 w-[min(58vw,480px)] text-white opacity-[0.12]" />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(50,201,145,0.5), transparent 45%), radial-gradient(circle at 80% 40%, rgba(212,168,83,0.28), transparent 40%)",
        }}
        aria-hidden="true"
      />

      <div className="site-container relative py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-8">
          <div className="relative mx-auto flex h-16 w-16 shrink-0 items-center justify-center text-primary lg:mx-0">
            <RubElHizbFrame className="absolute inset-0 h-full w-full" />
            <BookOpen className="relative h-6 w-6" aria-hidden="true" />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0"
            >
              {visible.map((item, index) => (
                <div
                  key={`${item.id}-${page}`}
                  className={cn(
                    "text-center lg:px-6 lg:text-left",
                    index > 0 && "lg:border-l lg:border-white/15"
                  )}
                >
                  <span className="inline-flex rounded-md border border-primary/55 px-2.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider text-primary">
                    {getMarqueeReference(item, locale)}
                  </span>
                  <p
                    className="mt-2.5 font-amiri text-lg leading-relaxed text-white md:text-xl"
                    dir="rtl"
                    lang="ar"
                  >
                    {item.arabic}
                  </p>
                  <p className="mt-1.5 font-body text-xs leading-relaxed text-white/75 md:text-sm">
                    {getMarqueeTranslation(item, locale)}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 ? (
          <div
            className="mt-6 flex items-center justify-center gap-2"
            role="tablist"
            aria-label={locale === "bn" ? "আয়াত স্লাইড" : "Verse slides"}
          >
            {pages.map((_, index) => {
              const isActive = index === page;
              return (
                <button
                  key={`quote-dot-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={
                    locale === "bn"
                      ? `স্লাইড ${index + 1}`
                      : `Slide ${index + 1}`
                  }
                  onClick={() => setPage(index)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isActive
                      ? "h-2 w-6 bg-primary"
                      : "h-2 w-2 bg-white/35 hover:bg-white/55"
                  )}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
