"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MoonStar } from "lucide-react";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";

export function VideosPageHero() {
  const t = useTranslations("pages.resources");

  return (
    <section className="relative overflow-hidden bg-[#F9FBF9]">
      <IslamicShapeBackdrop overlay="page" className="opacity-70" />
      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={72}
        height={98}
        className="pointer-events-none absolute left-4 top-6 hidden opacity-90 sm:left-10 md:block"
        aria-hidden="true"
      />
      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={64}
        height={88}
        className="pointer-events-none absolute right-4 top-8 hidden opacity-75 sm:right-10 md:block"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1] pb-6 pt-12 text-center md:pb-8 md:pt-16">
        <p className="font-playfair text-sm font-medium tracking-[0.18em] text-gold md:text-base">
          {t("videosEyebrow")}
        </p>
        <h1
          className={cn(
            "mt-3 font-playfair text-3xl font-bold tracking-tight text-primary-dark",
            "md:text-4xl lg:text-[2.75rem]"
          )}
        >
          {t("videosTitle")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-gray md:text-base">
          {t("videosSubtitle")}
        </p>
        <div className="mx-auto mt-5 flex max-w-xs items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <MoonStar
            className="h-5 w-5 shrink-0 text-gold"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}
