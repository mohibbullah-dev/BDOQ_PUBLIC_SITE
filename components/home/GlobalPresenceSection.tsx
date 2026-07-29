"use client";

import Image from "next/image";
import { ArrowRight, Globe2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { GLOBAL_COUNTRIES } from "@/lib/constants";
import type { ICountryPresence } from "@/lib/types";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SiteCta } from "@/components/shared/SiteCta";
import type { ISectionHeaderContent } from "@/lib/types";
import { useSectionHeaderText } from "@/lib/i18n/useSectionHeaderText";
import { cn } from "@/lib/cn";

/** Extra countries shown on home global grid (mockup coverage) */
const EXTRA_COUNTRIES: ICountryPresence[] = [
  { name: "Kuwait", flag: "🇰🇼", code: "kw" },
  { name: "Oman", flag: "🇴🇲", code: "om" },
  { name: "Bahrain", flag: "🇧🇭", code: "bh" },
  { name: "Ireland", flag: "🇮🇪", code: "ie" },
];

function GoldEyebrow({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2.5">
      <span className="h-px w-8 bg-[#D4A853]/60 sm:w-12" aria-hidden="true" />
      <span
        className="inline-block h-1.5 w-1.5 rotate-45 bg-[#D4A853]"
        aria-hidden="true"
      />
      <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4A853] sm:text-xs">
        {label}
      </p>
      <span
        className="inline-block h-1.5 w-1.5 rotate-45 bg-[#D4A853]"
        aria-hidden="true"
      />
      <span className="h-px w-8 bg-[#D4A853]/60 sm:w-12" aria-hidden="true" />
    </div>
  );
}

function CountryCard({ country }: { country: ICountryPresence }) {
  const t = useTranslations("home.globalPresence");

  return (
    <article
      className={cn(
        "site-card flex flex-col items-center rounded-xl border border-gray-100 bg-white px-2.5 py-3",
        "shadow-[0_8px_24px_-18px_rgba(15,23,42,0.18)]",
        "transition-transform duration-200 hover:-translate-y-0.5"
      )}
    >
      <div className="relative h-8 w-12 overflow-hidden rounded-md ring-1 ring-black/10 sm:h-9 sm:w-14">
        <Image
          src={`https://flagcdn.com/w160/${country.code}.png`}
          alt={`${country.name} flag`}
          fill
          className="object-cover"
          sizes="56px"
          quality={90}
        />
      </div>
      <h3 className="mt-2 line-clamp-1 text-center font-body text-[11px] font-semibold text-primary-dark sm:text-xs">
        {country.name}
      </h3>
      <p className="mt-0.5 font-body text-[10px] text-text-gray">
        {t("studentsLabel")}
      </p>
    </article>
  );
}

function MoreCountriesCard() {
  const t = useTranslations("home.globalPresence");

  return (
    <article
      className={cn(
        "site-card flex flex-col items-center justify-center rounded-xl border border-primary/20 bg-bg-light px-2.5 py-3",
        "shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)]"
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Globe2 className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="mt-2 text-center font-body text-[11px] font-semibold leading-snug text-primary-dark sm:text-xs">
        {t("moreCountries")}
      </p>
    </article>
  );
}

function mergeCountries(): ICountryPresence[] {
  const seen = new Set(GLOBAL_COUNTRIES.map((c) => c.code));
  const extras = EXTRA_COUNTRIES.filter((c) => !seen.has(c.code));
  return [...GLOBAL_COUNTRIES, ...extras];
}

/** Global presence — static country flag grid (mockup) */
export function GlobalPresenceSection({
  header,
}: {
  header?: ISectionHeaderContent;
}) {
  const t = useTranslations("home.globalPresence");
  const copy = useSectionHeaderText("home.globalPresence", header, [
    "eyebrow",
    "title",
    "subtitle",
  ]);
  const countries = mergeCountries();

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(38,155,111,0.55) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      <div className="site-container relative z-[1]">
        <ScrollReveal className="mb-10 md:mb-12">
          <div className="mx-auto max-w-3xl text-center">
            <GoldEyebrow label={copy.eyebrow ?? t("eyebrow")} />
            <h2 className="font-playfair text-3xl font-bold tracking-tight text-primary-dark md:text-4xl">
              {copy.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-text-gray">
              {copy.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 lg:gap-3">
            {countries.map((country) => (
              <CountryCard key={country.code} country={country} />
            ))}
            <MoreCountriesCard />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10 text-center md:mt-12">
          <SiteCta href="/student-admission" className="bg-primary-dark hover:brightness-110">
            {t("cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </SiteCta>
        </ScrollReveal>
      </div>
    </section>
  );
}
