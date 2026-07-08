"use client";

import { GLOBAL_COUNTRIES } from "@/lib/constants";
import { HeroGlobalFlagCard } from "@/components/home/HeroGlobalFlagCard";
import { HeroVisualFrame } from "@/components/home/HeroVisualFrame";
import { Marquee } from "@/components/ui/marquee";
import { heroStatBox } from "@/lib/heroVisualStyles";
import { cn } from "@/lib/cn";

const ROW_A = GLOBAL_COUNTRIES.filter((_, index) => index % 2 === 0);
const ROW_B = GLOBAL_COUNTRIES.filter((_, index) => index % 2 === 1);

function MarqueeFade({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 z-10 w-10 sm:w-14",
        side === "left"
          ? "left-0 bg-gradient-to-r from-white via-white/80 to-transparent"
          : "right-0 bg-gradient-to-l from-white via-white/80 to-transparent"
      )}
      aria-hidden="true"
    />
  );
}

export function HeroGlobalVisual() {
  return (
    <HeroVisualFrame
      accent="green"
      label="Global Student Network · 20+ Countries"
    >
      <div className="bg-white px-3 py-4 sm:px-4 sm:py-5">
        <div className="relative mb-3 space-y-3 sm:mb-4 sm:space-y-3.5">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />

          <Marquee
            pauseOnHover
            durationSeconds={42}
            className="[--gap:0.625rem] sm:[--gap:0.75rem]"
          >
            {ROW_A.map((country) => (
              <HeroGlobalFlagCard
                key={`row-a-${country.code}`}
                country={country}
              />
            ))}
          </Marquee>

          <Marquee
            reverse
            pauseOnHover
            durationSeconds={38}
            className="[--gap:0.625rem] sm:[--gap:0.75rem]"
          >
            {ROW_B.map((country) => (
              <HeroGlobalFlagCard
                key={`row-b-${country.code}`}
                country={country}
              />
            ))}
          </Marquee>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {[
            { value: "20+", label: "Countries" },
            { value: "300+", label: "Students" },
            { value: "4,000+", label: "Hours" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={heroStatBox("px-2 py-2.5 sm:px-3 sm:py-3.5")}
            >
              <p className="font-inter text-base font-bold text-[#269B6F] sm:text-lg">
                {stat.value}
              </p>
              <p className="font-inter text-[9px] font-medium text-[#6B7280] sm:text-[10px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <ul className="sr-only">
          {GLOBAL_COUNTRIES.map((country) => (
            <li key={country.code}>{country.name}</li>
          ))}
        </ul>
      </div>
    </HeroVisualFrame>
  );
}
