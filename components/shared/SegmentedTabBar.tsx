"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ISegmentedTab<T extends string = string> {
  id: T;
  label: string;
  icon?: LucideIcon;
  count?: number;
  shortLabel?: string;
}

interface ISegmentedTabBarProps<T extends string> {
  tabs: ISegmentedTab<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
  ariaLabel: string;
  layoutId: string;
  className?: string;
  maxWidthClass?: string;
  columns?: 2 | 3 | 4 | 5;
  size?: "md" | "sm";
  panelIdPrefix?: string;
  wrap?: boolean;
}

const GRID_COLUMNS: Record<2 | 3 | 4 | 5, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

export function SegmentedTabBar<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel,
  layoutId,
  className,
  maxWidthClass = "max-w-3xl",
  columns,
  size = "md",
  panelIdPrefix = "panel",
  wrap = false,
}: ISegmentedTabBarProps<T>) {
  const resolvedColumns =
    columns ??
    (tabs.length <= 2 ? 2 : tabs.length === 3 ? 3 : tabs.length === 5 ? 5 : 4);
  const useWrap = wrap || tabs.length > 5;
  const isCompact = size === "sm";

  return (
    <div
      className={cn(
        "mx-auto w-full rounded-2xl border border-gray-100/80 bg-white/90 p-1.5 shadow-lg shadow-primary/5 backdrop-blur-sm",
        maxWidthClass,
        className
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      <div
        className={cn(
          useWrap
            ? "flex flex-wrap gap-1.5"
            : cn("grid gap-1.5", GRID_COLUMNS[resolvedColumns])
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          const showCount = tab.count !== undefined;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${panelIdPrefix}-${tab.id}`}
              id={`${panelIdPrefix}-tab-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative flex items-center justify-center rounded-xl transition-colors duration-200",
                isCompact
                  ? "min-h-[44px] gap-1.5 px-2.5 py-2 text-xs font-semibold sm:px-3"
                  : "min-h-[52px] flex-col gap-0.5 px-2 py-2.5 text-sm font-semibold sm:min-h-[56px] sm:flex-row sm:gap-2 sm:px-3",
                "font-inter",
                isActive ? "text-white" : "text-text-gray hover:text-primary",
                useWrap &&
                  "min-w-[calc(50%-0.375rem)] flex-1 sm:min-w-[9rem] sm:flex-none"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-md"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-[1] inline-flex items-center gap-1.5 sm:gap-2">
                {Icon ? (
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                ) : null}
                <span className="truncate">
                  <span className="sm:hidden">
                    {tab.shortLabel ?? tab.label}
                  </span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
                {showCount ? (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-bg-light text-primary"
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
