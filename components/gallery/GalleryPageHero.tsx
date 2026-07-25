"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";

export function GalleryPageHero({ children }: { children?: React.ReactNode }) {
  const t = useTranslations("pages.gallery");

  return (
    <section className="relative overflow-hidden bg-[#F9FBF9]">
      <IslamicShapeBackdrop overlay="page" className="opacity-70" />
      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={72}
        height={98}
        className="pointer-events-none absolute right-4 top-8 hidden opacity-90 sm:right-10 md:block"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1] pb-4 pt-12 text-center md:pb-6 md:pt-16">
        <div className="mx-auto flex max-w-xs items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="font-playfair text-sm font-medium uppercase tracking-[0.2em] text-gold md:text-base">
            {t("eyebrow")}
          </p>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        <h1
          className={cn(
            "mt-4 font-playfair text-3xl font-bold tracking-tight text-primary-dark",
            "md:text-4xl lg:text-[2.75rem]"
          )}
        >
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-gray md:text-base">
          {t("subtitle")}
        </p>

        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
