"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";

export function AudioPageHero() {
  const t = useTranslations("pages.resources");

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-[#F9FBF9]">
      <IslamicShapeBackdrop overlay="page" className="opacity-70" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(249,251,249,0.95),transparent)]"
        aria-hidden="true"
      />

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

      <div className="site-container relative z-[1] py-12 text-center md:py-16">
        <p className="font-playfair text-sm font-medium tracking-[0.18em] text-gold md:text-base">
          {t("audioEyebrow")}
        </p>
        <h1
          className={cn(
            "mt-3 font-playfair text-3xl font-bold tracking-tight text-primary-dark",
            "md:text-4xl lg:text-[2.75rem]"
          )}
        >
          {t("audioTitle")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-gray md:text-base">
          {t("audioSubtitle")}
        </p>
      </div>
    </section>
  );
}
