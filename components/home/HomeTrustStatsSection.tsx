"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  CalendarDays,
  GraduationCap,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { HOME_TRUST_STATS } from "@/lib/constants";
import { cn } from "@/lib/cn";

const ICONS: Record<(typeof HOME_TRUST_STATS)[number]["icon"], LucideIcon> = {
  calendar: CalendarDays,
  graduation: GraduationCap,
  users: Users,
  star: Star,
};

function AnimatedStatValue({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;

    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number): void => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/** Premium floating trust metrics — sits below hero, above quick nav */
export function HomeTrustStatsSection() {
  const t = useTranslations("home.trustStats");

  return (
    <section
      aria-label={t("aria")}
      className="relative z-20 -mt-10 pb-2 md:-mt-14 md:pb-4"
    >
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative overflow-hidden rounded-3xl border border-white/70",
            "bg-white/95 shadow-[0_28px_90px_-32px_rgba(38,155,111,0.45)]",
            "backdrop-blur-xl"
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(50,201,145,0.14),transparent)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[#D4A853]/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-12 size-56 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-2 divide-x divide-y divide-primary/10 lg:grid-cols-4 lg:divide-y-0">
            {HOME_TRUST_STATS.map((stat, index) => {
              const Icon = ICONS[stat.icon];

              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex flex-col items-center px-4 py-7 text-center sm:px-6 sm:py-8 md:py-9"
                >
                  <span
                    className={cn(
                      "mb-4 flex size-12 items-center justify-center rounded-2xl sm:size-14",
                      "bg-gradient-to-br from-[#E8FAF2] to-white",
                      "ring-1 ring-primary/15 shadow-[0_8px_24px_-12px_rgba(50,201,145,0.5)]",
                      "transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_28px_-10px_rgba(50,201,145,0.55)]"
                    )}
                  >
                    <Icon
                      className="size-5 text-primary sm:size-6"
                      aria-hidden="true"
                    />
                  </span>

                  <p className="font-playfair text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl md:text-[2.5rem] md:leading-none">
                    <AnimatedStatValue value={stat.value} suffix={stat.suffix} />
                  </p>

                  <p className="mt-2 max-w-[9rem] font-body text-xs font-semibold uppercase tracking-[0.12em] text-text-dark/80 sm:text-[13px]">
                    {t(stat.labelKey)}
                  </p>

                  <span
                    className="mt-3 h-0.5 w-8 rounded-full bg-gradient-to-r from-primary to-[#D4A853] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </motion.div>
              );
            })}
          </div>

          <div
            className="h-1 w-full bg-gradient-to-r from-primary via-[#D4A853] to-[#CD443F]"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
