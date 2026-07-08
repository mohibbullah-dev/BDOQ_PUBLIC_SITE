import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { GLOBAL_COUNTRIES } from "@/lib/constants";
import { CONTACT_MAP_PRECOMPUTED, HQ_MAP_POSITION } from "@/lib/contactMapData";
import {
  CONTACT_MAP_MARKERS,
  GOOGLE_MAPS_URL,
  MAP_VIEWBOX,
} from "@/lib/contactMapMarkers";
import { DottedMap } from "@/components/ui/dotted-map";
import { CountryFlag } from "@/components/shared/CountryFlag";

export function ContactGlobalMap() {
  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md lg:mt-14">
      <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gradient-to-r from-primary/[0.06] via-white to-teal/[0.04] px-4 py-3.5 sm:px-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Globe2 className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-inter text-xs font-bold uppercase tracking-widest text-primary">
            Global presence
          </p>
          <p className="font-inter text-sm text-text-gray">
            20+ countries Â· HQ in Gopalganj, Bangladesh
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="relative border-b border-gray-100 bg-[linear-gradient(180deg,#E8FAF2_0%,#FFFFFF_100%)] px-3 py-5 sm:px-5 lg:border-b-0 lg:border-r">
          <div className="relative mx-auto aspect-[2/1] w-full lg:max-w-none">
            <DottedMap
              width={MAP_VIEWBOX.width}
              height={MAP_VIEWBOX.height}
              markers={CONTACT_MAP_MARKERS}
              precomputed={CONTACT_MAP_PRECOMPUTED}
              dotRadius={0.16}
              dotColor="rgba(50, 201, 145, 0.32)"
              markerColor="#32C991"
              pulse={false}
              className="h-full w-full"
            />

            <div
              className="pointer-events-none absolute z-10"
              style={{
                left: `${HQ_MAP_POSITION.left}%`,
                top: `${HQ_MAP_POSITION.top}%`,
                transform: "translate(-50%, calc(-100% - 10px))",
              }}
            >
              <div className="flex items-center gap-2 rounded-full border border-primary/25 bg-white px-2.5 py-1.5 shadow-lg ring-2 ring-primary/10">
                <CountryFlag code="bd" name="Bangladesh" size="md" />
                <span className="whitespace-nowrap font-inter text-[11px] font-bold text-primary-dark">
                  BDOQ HQ
                </span>
              </div>
              <div
                className="mx-auto mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(50,201,145,0.25)]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-white px-4 py-5 sm:px-5 lg:py-6">
          <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-wider text-text-gray">
            Students learning from
          </p>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {GLOBAL_COUNTRIES.map((country) => (
              <li
                key={country.code}
                className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-bg-light/60 px-3 py-2"
              >
                <CountryFlag code={country.code} name={country.name} />
                <span className="min-w-0 truncate font-inter text-xs font-medium text-primary-dark">
                  {country.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 sm:px-5">
        <p className="font-inter text-xs text-text-gray">
          Green dots show active student regions worldwide
        </p>
        <Link
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          Open HQ in Google Maps
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
