"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface IHeroVisualFrameProps {
  children: ReactNode;
  className?: string;
  accent?: "teal" | "gold" | "green";
  label?: string;
}

const ACCENT_BAR = {
  teal: "from-teal-accent via-[#1B6B44] to-[#0D4A2F]",
  gold: "from-[var(--gold)] via-[#1B6B44] to-[#0D4A2F]",
  green: "from-emerald-400 via-[#1B6B44] to-[#0D4A2F]",
} as const;

export function HeroVisualFrame({
  children,
  className,
  accent = "teal",
  label,
}: IHeroVisualFrameProps) {
  return (
    <div
      className={cn(
        "animate-hero-float relative mx-auto w-full max-w-[620px] min-w-0",
        "max-sm:max-w-[calc(100vw-2rem)]",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.625rem]",
          "border border-gray-200/80 bg-white",
          "shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
        )}
      >
        <div
          className={cn("h-2 w-full bg-gradient-to-r", ACCENT_BAR[accent])}
          aria-hidden="true"
        />

        {label && (
          <p className="border-b border-gray-100 bg-white px-3 py-2.5 font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-[#0D4A2F] sm:px-5 sm:py-3 sm:text-[11px] sm:tracking-[0.14em]">
            {label}
          </p>
        )}

        <div className="relative bg-white">{children}</div>
      </div>
    </div>
  );
}
