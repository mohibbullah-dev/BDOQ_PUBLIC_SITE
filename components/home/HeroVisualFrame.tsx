"use client";

import type { ReactNode } from "react";
import { useHeroVisualLayout } from "@/components/home/HeroVisualLayoutContext";
import { cn } from "@/lib/cn";

interface IHeroVisualFrameProps {
  children: ReactNode;
  className?: string;
  accent?: "teal" | "gold" | "green";
  label?: string;
}

const ACCENT_BAR = {
  teal: "from-teal-accent via-[#32C991] to-[#269B6F]",
  gold: "from-[var(--gold)] via-[#32C991] to-[#269B6F]",
  green: "from-emerald-400 via-[#32C991] to-[#269B6F]",
} as const;

export function HeroVisualFrame({
  children,
  className,
  accent = "teal",
  label,
}: IHeroVisualFrameProps) {
  const layout = useHeroVisualLayout();
  const isSection = layout === "section";

  return (
    <div
      className={cn(
        "relative mx-auto w-full min-w-0",
        isSection
          ? "max-w-none"
          : "animate-hero-float max-w-[620px] max-sm:max-w-[calc(100vw-2rem)]",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-white",
          isSection
            ? "rounded-2xl border border-primary/10 shadow-[0_12px_40px_rgba(50,201,145,0.12)] sm:rounded-3xl"
            : "rounded-[1.25rem] border border-gray-200/80 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:rounded-[1.625rem] sm:shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
        )}
      >
        <div
          className={cn("w-full bg-gradient-to-r", ACCENT_BAR[accent])}
          style={{ height: isSection ? "4px" : "8px" }}
          aria-hidden="true"
        />

        {label && (
          <p
            className={cn(
              "border-b border-gray-100 bg-white font-inter font-bold uppercase text-[#269B6F]",
              isSection
                ? "px-5 py-3 text-[11px] tracking-[0.14em] sm:px-8 sm:py-3.5 sm:text-xs"
                : "px-3 py-2.5 text-[10px] tracking-[0.12em] sm:px-5 sm:py-3 sm:text-[11px] sm:tracking-[0.14em]"
            )}
          >
            {label}
          </p>
        )}

        <div className="relative bg-white">{children}</div>
      </div>
    </div>
  );
}
