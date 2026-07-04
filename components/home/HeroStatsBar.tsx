"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { IStatDisplay } from "@/lib/stats";
import { cn } from "@/lib/cn";

interface IHeroStatsBarProps {
  stats: IStatDisplay[];
}

export function HeroStatsBar({ stats }: IHeroStatsBarProps) {
  const t = useTranslations("stats");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="w-full min-w-0 max-w-7xl" aria-label="Academy statistics">
      <motion.div
        initial={hasMounted ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mx-auto max-w-7xl rounded-2xl border border-white/15",
          "bg-[#0A1628]/45 px-3 py-3 shadow-lg backdrop-blur-md sm:px-6 sm:py-5"
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
                index < stats.length - 1 && "lg:border-r lg:border-white/10"
              )}
            >
              <p className="font-inter text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                {stat.value}
              </p>
              <p className="mt-0.5 font-inter text-[11px] leading-tight text-white/65 sm:text-xs md:text-sm">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
