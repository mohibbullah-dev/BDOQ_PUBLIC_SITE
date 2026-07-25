"use client";

import { Grid3X3, ImageIcon, Layers, Mic, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import { GALLERY_TAB_ORDER, type GalleryTabType } from "@/lib/galleryTabs";
import { cn } from "@/lib/cn";

const TAB_ICONS = {
  all: Layers,
  video: Video,
  audio: Mic,
  gallery: Grid3X3,
  image: ImageIcon,
} as const;

interface IGalleryTabBarProps {
  activeTab: GalleryTabType;
  counts: Record<GalleryTabType, number>;
  onChange: (tab: GalleryTabType) => void;
}

export function GalleryTabBar({
  activeTab,
  counts,
  onChange,
}: IGalleryTabBarProps) {
  const t = useTranslations("content.gallery.tabs");

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2.5"
      role="tablist"
      aria-label={t("ariaLabel")}
    >
      {GALLERY_TAB_ORDER.map((tab) => {
        const isActive = activeTab === tab;
        const Icon = TAB_ICONS[tab];
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`gallery-tab-${tab}`}
            aria-selected={isActive}
            aria-controls={`gallery-panel-${tab}`}
            onClick={() => onChange(tab)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-semibold transition-all",
              isActive
                ? "bg-primary-dark text-white shadow-md shadow-primary-dark/20"
                : "border border-primary/25 bg-white text-primary-dark hover:border-primary hover:bg-bg-light"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {t(tab)}
            <span
              className={cn(
                "inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold",
                isActive
                  ? "bg-white/15 text-white"
                  : "bg-bg-light text-primary"
              )}
            >
              {counts[tab]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
