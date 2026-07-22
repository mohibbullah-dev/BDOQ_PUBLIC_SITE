"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ImageIcon, Mic, Video } from "lucide-react";
import type { IGalleryItem } from "@/lib/types";
import {
  countGalleryByTab,
  filterGalleryByTab,
  resolveGalleryMediaType,
  type GalleryTabType,
} from "@/lib/galleryTabs";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { GalleryMediaTile } from "@/components/gallery/GalleryMediaTile";
import { GalleryTabBar } from "@/components/gallery/GalleryTabBar";
import { LocalizedPageHeroClient } from "@/components/shared/LocalizedPageHeroClient";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const EMPTY_ICONS = {
  gallery: ImageIcon,
  image: ImageIcon,
  video: Video,
  audio: Mic,
} as const;

export function GalleryPageContent({ items }: { items: IGalleryItem[] }) {
  const t = useTranslations("content.gallery");
  const [activeTab, setActiveTab] = useState<GalleryTabType>("gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tabCounts = useMemo(
    () => ({
      gallery: countGalleryByTab(items, "gallery"),
      image: countGalleryByTab(items, "image"),
      video: countGalleryByTab(items, "video"),
      audio: countGalleryByTab(items, "audio"),
    }),
    [items]
  );

  const filteredItems = useMemo(
    () => filterGalleryByTab(items, activeTab),
    [activeTab, items]
  );

  const openLightbox = (index: number): void => setLightboxIndex(index);
  const closeLightbox = (): void => setLightboxIndex(null);

  const getItemTitle = (item: IGalleryItem): string => {
    if (item.title.trim().length > 0) return item.title;
    const key = `items.${item.id}.title`;
    return t.has(key) ? t(key) : item.id;
  };

  const getMediaLabel = (item: IGalleryItem): string => {
    const type = resolveGalleryMediaType(item);
    if (type === "photo") return t("tabs.image");
    return t(`tabs.${type}`);
  };

  const EmptyIcon = EMPTY_ICONS[activeTab];

  return (
    <>
      <LocalizedPageHeroClient pageKey="gallery" centered>
        <div className="mt-10">
          <GalleryTabBar
            activeTab={activeTab}
            counts={tabCounts}
            onChange={setActiveTab}
          />
        </div>
      </LocalizedPageHeroClient>

      <section className="relative pb-16 md:pb-24 bg-bg-light overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(27 107 68 / 0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="site-container relative pt-10 md:pt-14">
          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div
                key={`empty-${activeTab}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mx-auto max-w-md rounded-3xl border border-gray-100 bg-white px-8 py-14 text-center shadow-lg"
                role="tabpanel"
                id={`gallery-panel-${activeTab}`}
                aria-labelledby={`gallery-tab-${activeTab}`}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <EmptyIcon className="h-8 w-8" aria-hidden />
                </div>
                <p className="mt-5 font-body text-base font-semibold text-primary-dark">
                  {t(`empty.${activeTab}.title`)}
                </p>
                <p className="mt-2 font-body text-sm text-text-gray leading-relaxed">
                  {t(`empty.${activeTab}.description`)}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
                role="tabpanel"
                id={`gallery-panel-${activeTab}`}
                aria-labelledby={`gallery-tab-${activeTab}`}
              >
                {filteredItems.map((item, index) => {
                  const title = getItemTitle(item);
                  return (
                    <ScrollReveal key={item.id} delay={index * 0.04}>
                      <button
                        type="button"
                        onClick={() => openLightbox(index)}
                        className="group mb-5 block w-full break-inside-avoid text-left"
                        aria-label={title}
                      >
                        <GalleryMediaTile
                          item={item}
                          title={title}
                          mediaLabel={getMediaLabel(item)}
                          className="w-full"
                        />
                        <div className="px-1 pt-3">
                          <p className="font-body text-sm font-semibold text-primary-dark line-clamp-1">
                            {title}
                          </p>
                          {item.description && (
                            <p className="font-body text-xs text-text-gray mt-1 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </button>
                    </ScrollReveal>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={filteredItems}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
          getTitle={(id) => {
            const item = filteredItems.find((entry) => entry.id === id);
            return item ? getItemTitle(item) : id;
          }}
        />
      )}
    </>
  );
}
