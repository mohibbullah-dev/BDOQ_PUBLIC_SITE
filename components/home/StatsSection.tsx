"use client";

import { useTranslations } from "next-intl";
import type { IStatDisplay } from "@/lib/stats";
import { cn } from "@/lib/cn";

interface IStatsSectionProps {
  stats: IStatDisplay[];
}

export function StatsSection({ stats }: IStatsSectionProps) {
  const t = useTranslations("stats");

  return (
    <section className="bg-white py-8 md:py-10" aria-label="Academy statistics">
      <div className="site-container">
        <div
          className={cn(
            "rounded-2xl border border-primary/15 bg-bg-light/60 px-3 py-4 sm:px-6 sm:py-5"
          )}
        >
          <div
            className={cn(
              "flex snap-x snap-mandatory gap-0 overflow-x-auto pb-1",
              "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              "sm:grid sm:grid-cols-2 sm:gap-x-2 sm:gap-y-4 sm:overflow-visible sm:pb-0",
              "md:grid-cols-3 lg:grid-cols-5 lg:gap-y-0"
            )}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.labelKey}
                className={cn(
                  "min-w-[42%] shrink-0 snap-center px-2 text-center sm:min-w-0 sm:px-3",
                  "first:min-w-[46%] sm:first:min-w-0",
                  index < stats.length - 1 && "lg:border-r lg:border-primary/10"
                )}
              >
                <p className="font-playfair text-2xl font-bold text-primary-dark sm:text-3xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 font-body text-[11px] leading-tight text-text-gray sm:text-xs md:text-sm">
                  {t(stat.labelKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
