"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { GLOBAL_COUNTRIES } from "@/lib/constants";
import type { ICountryPresence } from "@/lib/types";
import { DualRowMarquee } from "@/components/shared/DualRowMarquee";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/cn";

function FlagMarqueeCard({ country }: { country: ICountryPresence }) {
  return (
    <article
      className={cn(
        "site-card flex w-[148px] shrink-0 flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-5 sm:w-[168px]",
        "transition-shadow duration-200 hover:shadow-md"
      )}
    >
      <div className="relative h-11 w-[4.25rem] overflow-hidden rounded-lg ring-1 ring-black/10 sm:h-12 sm:w-[4.75rem]">
        <Image
          src={`https://flagcdn.com/w320/${country.code}.png`}
          alt={`${country.name} flag`}
          fill
          className="object-cover"
          sizes="76px"
          quality={90}
        />
      </div>
      <div className="min-w-0 text-center">
        <h3 className="font-body text-sm font-semibold leading-snug text-primary-dark">
          {country.name}
        </h3>
        <p className="mt-1 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-primary/65">
          {country.code}
        </p>
      </div>
    </article>
  );
}

function splitCountries(
  countries: ICountryPresence[]
): [ICountryPresence[], ICountryPresence[]] {
  const rowOne = countries.filter((_, index) => index % 2 === 0);
  const rowTwo = countries.filter((_, index) => index % 2 === 1);
  return [rowOne, rowTwo];
}

export function GlobalPresenceSection() {
  const t = useTranslations("home.globalPresence");
  const [rowOne, rowTwo] = splitCountries(GLOBAL_COUNTRIES);

  return (
    <section className="relative overflow-hidden bg-bg-light py-16 md:py-20">
      <div className="site-container relative">
        <ScrollReveal className="mb-10 text-center md:mb-12">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            centered
          />
        </ScrollReveal>
      </div>

      <div className="mb-10 md:mb-12">
        <DualRowMarquee
          rowOneDuration={100}
          rowTwoDuration={120}
          gapClassName="gap-3 sm:gap-4"
          rowOne={rowOne.map((country) => (
            <FlagMarqueeCard key={`r1-${country.code}`} country={country} />
          ))}
          rowTwo={rowTwo.map((country) => (
            <FlagMarqueeCard key={`r2-${country.code}`} country={country} />
          ))}
        />
      </div>

      <div className="site-container relative">
        <ScrollReveal delay={0.1}>
          <p className="mx-auto max-w-3xl text-center font-body text-base leading-relaxed text-text-gray md:text-lg">
            {t("countriesLine")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
