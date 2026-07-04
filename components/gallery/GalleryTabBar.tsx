"use client";

import { Grid3X3, ImageIcon, Mic, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  GALLERY_TAB_ORDER,
  type GalleryTabType,
} from "@/lib/galleryTabs";
import { SegmentedTabBar } from "@/components/shared/SegmentedTabBar";

const TAB_ICONS = {
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
    <SegmentedTabBar
      tabs={GALLERY_TAB_ORDER.map((tab) => ({
        id: tab,
        label: t(tab),
        icon: TAB_ICONS[tab],
        count: counts[tab],
      }))}
      activeTab={activeTab}
      onChange={onChange}
      ariaLabel={t("ariaLabel")}
      layoutId="gallery-tab-indicator"
      panelIdPrefix="gallery-panel"
      columns={4}
    />
  );
}
