"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { GLOBAL_COUNTRIES } from "@/lib/constants";
import { CONTACT_MAP_PRECOMPUTED, HQ_MAP_POSITION } from "@/lib/contactMapData";
import {
  CONTACT_MAP_MARKERS,
  MAP_VIEWBOX,
} from "@/lib/contactMapMarkers";
import { DottedMap } from "@/components/ui/dotted-map";
import { CountryFlag } from "@/components/shared/CountryFlag";

const DISPLAY_COUNTRIES = [
  "bd",
  "sa",
  "qa",
  "us",
  "gb",
  "ca",
  "ae",
  "my",
  "au",
  "jp",
] as const;

export function ContactGlobalMap() {
  const t = useTranslations("pages.contact");
  const countries = DISPLAY_COUNTRIES.map((code) =>
    GLOBAL_COUNTRIES.find((country) => country.code === code)
  ).filter((country): country is (typeof GLOBAL_COUNTRIES)[number] =>
    Boolean(country)
  );

  return (
    <section className="site-card mt-14 rounded-2xl border border-gray-100 bg-white px-4 py-8 shadow-sm md:mt-16 md:px-8 md:py-10">
      <h2 className="text-center font-playfair text-2xl font-bold text-primary-dark md:text-3xl">
        {t("globalTitle")}
      </h2>

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="relative mx-auto aspect-[2/1] w-full max-w-xl overflow-hidden rounded-xl bg-[linear-gradient(180deg,#F3FBF7_0%,#FFFFFF_100%)]">
          <DottedMap
            width={MAP_VIEWBOX.width}
            height={MAP_VIEWBOX.height}
            markers={CONTACT_MAP_MARKERS}
            precomputed={CONTACT_MAP_PRECOMPUTED}
            dotRadius={0.16}
            dotColor="rgba(50, 201, 145, 0.28)"
            markerColor="#32C991"
            pulse={false}
            className="h-full w-full"
          />
          <div
            className="pointer-events-none absolute z-10"
            style={{
              left: `${HQ_MAP_POSITION.left}%`,
              top: `${HQ_MAP_POSITION.top}%`,
              transform: "translate(-50%, calc(-100% - 8px))",
            }}
          >
            <div className="rounded-full bg-primary px-2.5 py-1 font-body text-[10px] font-bold text-white shadow-md">
              HQ
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {countries.map((country) => (
            <li
              key={country.code}
              className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-[#F9FBF9] px-3 py-2.5"
            >
              <CountryFlag code={country.code} name={country.name} />
              <span className="min-w-0 truncate font-body text-sm font-medium text-primary-dark">
                {country.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-center font-body text-sm text-text-gray">
        <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        {t("globalFooter")}
      </p>
    </section>
  );
}
