"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ImageIcon, Mic, Upload, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import type { IGalleryItem } from "@/lib/types";
import {
  GALLERY_COLLECTIONS,
  getCollectionItems,
} from "@/lib/galleryCollections";
import {
  countGalleryByTab,
  filterGalleryByTab,
  resolveGalleryMediaType,
  showsCollectionGrid,
  type GalleryTabType,
} from "@/lib/galleryTabs";
import { GalleryCollectionCard } from "@/components/gallery/GalleryCollectionCard";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { GalleryMediaTile } from "@/components/gallery/GalleryMediaTile";
import { GalleryPageHero } from "@/components/gallery/GalleryPageHero";
import { GalleryTabBar } from "@/components/gallery/GalleryTabBar";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SiteCta } from "@/components/shared/SiteCta";

const EMPTY_ICONS = {
  all: ImageIcon,
  gallery: ImageIcon,
  image: ImageIcon,
  video: Video,
  audio: Mic,
} as const;

export function GalleryPageContent({ items }: { items: IGalleryItem[] }) {
  const t = useTranslations("content.gallery");
  const tPages = useTranslations("pages.gallery");
  const [activeTab, setActiveTab] = useState<GalleryTabType>("all");
  const [lightboxItems, setLightboxItems] = useState<IGalleryItem[] | null>(
    null
  );
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const tabCounts = useMemo(
    () => ({
      all: countGalleryByTab(items, "all"),
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

  const collections = useMemo(
    () =>
      GALLERY_COLLECTIONS.map((collection) => ({
        collection,
        items: getCollectionItems(collection, items),
      })).filter((entry) => entry.items.length > 0),
    [items]
  );

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

  const openLightbox = (list: IGalleryItem[], index: number): void => {
    setLightboxItems(list);
    setLightboxIndex(index);
  };

  const closeLightbox = (): void => setLightboxItems(null);

  const EmptyIcon = EMPTY_ICONS[activeTab];
  const showCollections = showsCollectionGrid(activeTab);

  return (
    <>
      <GalleryPageHero>
        <GalleryTabBar
          activeTab={activeTab}
          counts={tabCounts}
          onChange={setActiveTab}
        />
      </GalleryPageHero>

      <section className="relative overflow-hidden bg-[#F9FBF9] pb-14 md:pb-20">
        <div className="site-container relative pt-8 md:pt-10">
          <AnimatePresence mode="wait">
            {showCollections ? (
              collections.length === 0 ? (
                <motion.div
                  key="empty-collections"
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
                    {t("empty.gallery.title")}
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-text-gray">
                    {t("empty.gallery.description")}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`collections-${activeTab}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                  role="tabpanel"
                  id={`gallery-panel-${activeTab}`}
                  aria-labelledby={`gallery-tab-${activeTab}`}
                >
                  {collections.map(({ collection, items: collectionItems }, index) => {
                    const title = t(`collections.${collection.titleKey}`);
                    return (
                      <ScrollReveal key={collection.id} delay={index * 0.03}>
                        <GalleryCollectionCard
                          collection={collection}
                          title={title}
                          itemsLabel={t("itemCount", {
                            count: collectionItems.length,
                          })}
                          onClick={() => openLightbox(collectionItems, 0)}
                        />
                      </ScrollReveal>
                    );
                  })}
                </motion.div>
              )
            ) : filteredItems.length === 0 ? (
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
                <p className="mt-2 font-body text-sm leading-relaxed text-text-gray">
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
                className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3"
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
                        onClick={() => openLightbox(filteredItems, index)}
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
                          <p className="line-clamp-1 font-body text-sm font-semibold text-primary-dark">
                            {title}
                          </p>
                          {item.description ? (
                            <p className="mt-1 line-clamp-2 font-body text-xs leading-relaxed text-text-gray">
                              {item.description}
                            </p>
                          ) : null}
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

      <section className="bg-white pb-14 md:pb-20">
        <div className="site-container">
          <div className="site-card flex flex-col items-center gap-5 rounded-2xl border border-primary/10 bg-bg-light px-5 py-6 sm:flex-row sm:justify-between sm:px-8 sm:py-7">
            <div className="flex items-start gap-4 text-center sm:text-left">
              <span className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/25 sm:mx-0">
                <Camera className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-playfair text-xl font-bold text-primary-dark md:text-2xl">
                  {tPages("shareTitle")}
                </h2>
                <p className="mt-1 font-body text-sm leading-relaxed text-text-gray">
                  {tPages("shareDesc")}
                </p>
              </div>
            </div>
            <SiteCta href="/contact" size="sm" className="shrink-0">
              <Upload className="h-4 w-4" aria-hidden="true" />
              {tPages("shareCta")}
            </SiteCta>
          </div>
        </div>
      </section>

      {lightboxItems !== null ? (
        <GalleryLightbox
          items={lightboxItems}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
          getTitle={(id) => {
            const item = lightboxItems.find((entry) => entry.id === id);
            return item ? getItemTitle(item) : id;
          }}
        />
      ) : null}
    </>
  );
}
