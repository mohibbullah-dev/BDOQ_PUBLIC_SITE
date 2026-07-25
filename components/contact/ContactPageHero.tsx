"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";

export function ContactPageHero() {
  const t = useTranslations("pages.contact");

  return (
    <section className="relative overflow-hidden bg-[#F9FBF9]">
      <IslamicShapeBackdrop overlay="page" className="opacity-65" />
      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={68}
        height={92}
        className="pointer-events-none absolute left-4 top-6 hidden opacity-90 sm:left-10 md:block"
        aria-hidden="true"
      />
      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={60}
        height={82}
        className="pointer-events-none absolute right-4 top-8 hidden opacity-75 sm:right-10 md:block"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1] pb-8 pt-12 text-center md:pb-10 md:pt-16">
        <p className="font-playfair text-sm font-medium uppercase tracking-[0.2em] text-gold md:text-base">
          {t("eyebrow")}
        </p>
        <h1
          className={cn(
            "mt-3 font-playfair text-3xl font-bold tracking-tight text-primary-dark",
            "md:text-4xl lg:text-[2.75rem]"
          )}
        >
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-gray md:text-base">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
