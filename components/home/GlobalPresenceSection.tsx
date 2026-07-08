"use client";

import Image from "next/image";
import { Globe2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { GLOBAL_COUNTRIES } from "@/lib/constants";
import type { ICountryPresence } from "@/lib/types";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

interface ICountryPresenceCardProps {
  country: ICountryPresence;
  index: number;
}

function CountryPresenceCard({ country, index }: ICountryPresenceCardProps) {
  return (
    <ScrollReveal delay={index * 0.04}>
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 sm:p-5",
          "shadow-sm transition-all duration-300",
          "hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
        )}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/[0.06] transition-transform duration-500 group-hover:scale-125"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center gap-3 text-center">
          <div className="relative h-11 w-[4.25rem] overflow-hidden rounded-lg shadow-md ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-[4.75rem]">
            <Image
              src={`https://flagcdn.com/w320/${country.code}.png`}
              alt={`${country.name} flag`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 68px, 76px"
              quality={90}
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-inter text-sm font-semibold leading-snug text-primary-dark sm:text-[0.9375rem]">
              {country.name}
            </h3>
            <p className="mt-1 font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-primary/65">
              {country.code}
            </p>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function GlobalPresenceSection() {
  const t = useTranslations("home.globalPresence");

  return (
    <section className="relative overflow-hidden bg-bg-light py-16 md:py-24">
      <div className="site-container relative">
        <ScrollReveal className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-1.5 font-inter text-xs font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-sm">
            <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
            {t("eyebrow")}
          </div>
          <h2 className="font-amiri text-3xl font-bold text-primary-dark md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-base text-text-gray md:text-lg">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {GLOBAL_COUNTRIES.map((country, index) => (
            <CountryPresenceCard
              key={country.code}
              country={country}
              index={index}
            />
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <p className="mx-auto max-w-3xl text-center font-inter text-base leading-relaxed text-text-gray md:text-lg">
            {t("countriesLine")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
