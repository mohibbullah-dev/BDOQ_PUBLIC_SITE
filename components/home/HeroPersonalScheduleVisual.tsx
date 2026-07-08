"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CalendarCheck,
  ChartLine,
  Clock,
  Globe,
  Heart,
  User,
} from "lucide-react";
import { HeroVisualFrame } from "@/components/home/HeroVisualFrame";
import { API_BASE } from "@/lib/constants";
import { heroBadge, heroPanel, heroStatBox } from "@/lib/heroVisualStyles";
import { cn } from "@/lib/cn";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

interface IScheduleDay {
  day: string;
  hasSessions: boolean;
  sessionCount: number;
}

interface ISchedulePreviewResponse {
  success: boolean;
  data: {
    days: IScheduleDay[];
    hasData: boolean;
  };
}

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function HeroPersonalScheduleVisual() {
  const [scheduleDays, setScheduleDays] = useState<IScheduleDay[]>([]);
  const [hasData, setHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      try {
        const response = await fetch(`${API_BASE}/public/schedule-preview`);
        if (!response.ok) throw new Error("Failed to load schedule preview");
        const json = (await response.json()) as ISchedulePreviewResponse;
        if (cancelled) return;
        setScheduleDays(json.data?.days ?? []);
        setHasData(Boolean(json.data?.hasData));
      } catch {
        if (!cancelled) {
          setScheduleDays([]);
          setHasData(false);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeDays = hasData
    ? scheduleDays.filter((day) => day.hasSessions).length
    : 0;

  return (
    <HeroVisualFrame accent="gold" label="Your Personal Schedule">
      <div className="p-5 sm:p-6">
        <motion.div
          {...fadeIn(0)}
          className="mb-4 flex items-center justify-between gap-2"
        >
          <span className="font-inter text-sm font-bold uppercase tracking-wide text-[#32C991]">
            Your Personal Plan
          </span>
          <span className={heroBadge()}>1-to-1 Focus</span>
        </motion.div>

        <motion.div
          {...fadeIn(0.08)}
          className={cn(
            heroPanel(),
            "mb-4 flex items-center gap-3 border-[#32C991]/15 bg-[#E8FAF2]/80"
          )}
        >
          <User className="h-5 w-5 text-[#32C991]" aria-hidden="true" />
          <div>
            <p className="font-inter text-sm font-semibold text-[#32C991]">
              {hasData ? "Live academy schedule" : "Flexible weekly slots"}
            </p>
            <p className="font-inter text-xs text-[#6B7280]">
              {hasData
                ? `${activeDays} active days from real class slots`
                : "Pick times that fit your timezone"}
            </p>
          </div>
        </motion.div>

        <div className="mb-4 grid grid-cols-7 gap-1.5">
          {WEEK_DAYS.map((day, index) => {
            const match = scheduleDays.find((item) => item.day === day);
            const active = match?.hasSessions ?? false;

            return (
              <motion.div
                key={day}
                {...fadeIn(0.12 + index * 0.04)}
                className={cn(
                  "rounded-xl border px-1 py-2 text-center transition-colors",
                  active
                    ? "border-[#32C991]/30 bg-[#32C991]/10"
                    : "border-gray-100 bg-white/70"
                )}
              >
                <p
                  className={cn(
                    "font-inter text-[10px] font-semibold uppercase",
                    active ? "text-[#32C991]" : "text-[#9CA3AF]"
                  )}
                >
                  {day}
                </p>
                <p
                  className={cn(
                    "mt-1 font-inter text-xs font-bold",
                    active ? "text-[#32C991]" : "text-[#D1D5DB]"
                  )}
                >
                  {isLoading ? "â€¦" : active ? "âœ“" : "â€”"}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Clock, label: "Flexible", value: "Your time" },
            { icon: Globe, label: "Global", value: "Any TZ" },
            {
              icon: ChartLine,
              label: "Active days",
              value: hasData ? String(activeDays) : "â€”",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              {...fadeIn(0.35 + index * 0.06)}
              className={heroStatBox()}
            >
              <stat.icon
                className="mx-auto mb-1 h-4 w-4 text-[#32C991]"
                aria-hidden="true"
              />
              <p className="font-inter text-sm font-bold text-[#32C991]">
                {stat.value}
              </p>
              <p className="font-inter text-[10px] text-[#6B7280]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeIn(0.5)}
          className="mt-4 flex items-center gap-2 rounded-2xl border border-[#32C991]/15 bg-[#32C991]/5 px-4 py-3"
        >
          <CalendarCheck
            className="h-4 w-4 shrink-0 text-[#32C991]"
            aria-hidden="true"
          />
          <p className="font-inter text-xs leading-relaxed text-[#32C991]">
            {hasData
              ? "Schedule preview reflects active portal session slots."
              : "Book a free trial to set your personal class schedule."}
          </p>
          <Heart
            className="ml-auto h-4 w-4 shrink-0 text-[var(--gold)]"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </HeroVisualFrame>
  );
}
