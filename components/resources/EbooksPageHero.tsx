"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { BookOpen } from "lucide-react";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";

export function EbooksPageHero() {
  const t = useTranslations("pages.resources");

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-[#F9FBF9]">
      <IslamicShapeBackdrop overlay="page" className="opacity-60" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(249,251,249,0.95),transparent)]"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1] py-12 md:py-16">
        <div className="relative mx-auto max-w-3xl">
          {/* Arched visual frame */}
          <div
            className={cn(
              "relative mx-auto mb-8 flex h-44 w-full max-w-xl items-end justify-center overflow-hidden",
              "rounded-t-[999px] border border-primary/10 bg-gradient-to-b from-[#E8FAF2] via-[#F3FBF7] to-transparent",
              "md:h-52"
            )}
          >
            <IslamicShapeBackdrop overlay="form" className="opacity-80" />
            <Image
              src="/brand/footer-lantern.svg"
              alt=""
              width={72}
              height={96}
              className="pointer-events-none absolute left-[12%] top-6 opacity-90"
              aria-hidden="true"
            />
            <Image
              src="/brand/footer-lantern.svg"
              alt=""
              width={56}
              height={76}
              className="pointer-events-none absolute right-[14%] top-10 opacity-70"
              aria-hidden="true"
            />
            <div className="relative z-[1] mb-4 flex -space-x-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "flex h-24 w-[4.5rem] items-center justify-center rounded-lg",
                    "border border-white/50 bg-gradient-to-br from-primary to-primary-dark shadow-lg",
                    "md:h-28 md:w-20"
                  )}
                  style={{
                    transform: `rotate(${i * 8 - 8}deg) translateY(${(1 - i) * 6}px)`,
                  }}
                >
                  <BookOpen
                    className="h-8 w-8 text-white/90"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-gold md:text-xs">
              {t("ebooksEyebrow")}
            </p>
            <h1
              className={cn(
                "mt-3 font-playfair text-3xl font-bold tracking-tight text-primary-dark",
                "md:text-4xl lg:text-[2.75rem]"
              )}
            >
              {t("ebooksTitle")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-gray md:text-base">
              {t("ebooksSubtitle")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
