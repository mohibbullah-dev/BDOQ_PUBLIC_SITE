"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MoonStar } from "lucide-react";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";

export function PricingPageHero() {
  const t = useTranslations("pages.pricing");
  const tLayout = useTranslations("forms.layout");

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-[#F8F6F0]">
      <IslamicShapeBackdrop overlay="page" className="opacity-70" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,rgba(248,246,240,0.95),transparent)]"
        aria-hidden="true"
      />

      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={96}
        height={130}
        className="pointer-events-none absolute right-3 top-3 hidden opacity-90 sm:right-8 sm:top-5 md:block lg:right-14"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1] py-12 text-center md:py-16">
        <p className="font-amiri text-lg leading-relaxed text-primary md:text-xl">
          {tLayout("bismillah")}
        </p>

        <h1
          className={cn(
            "mt-4 font-playfair text-3xl font-bold tracking-tight text-primary-dark",
            "md:text-4xl lg:text-[2.75rem]"
          )}
        >
          {t("title")}
        </h1>

        <div className="mx-auto mt-5 flex max-w-xs items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <MoonStar
            className="h-5 w-5 shrink-0 text-gold"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        <p className="mx-auto mt-5 max-w-2xl font-body text-sm leading-relaxed text-text-gray md:text-base">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
