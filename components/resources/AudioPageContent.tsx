"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Bookmark,
  Download,
  Heart,
  Headphones,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { IAudioPageData } from "@/lib/resources";
import type { IAudioRecitation } from "@/lib/types";
import { AudioPageHero } from "@/components/resources/AudioPageHero";
import { FeaturedAudioPlayer } from "@/components/resources/FeaturedAudioPlayer";
import { RecitationCard } from "@/components/resources/RecitationCard";
import {
  SurahListSidebar,
  type ISurahListItem,
} from "@/components/resources/SurahListSidebar";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

const FEATURE_KEYS = [
  { key: "featureQuality", icon: Headphones },
  { key: "featureAccess", icon: Bookmark },
  { key: "featureDownload", icon: Download },
  { key: "featureReflect", icon: Heart },
] as const;

interface IAudioPageContentProps {
  data: IAudioPageData;
}

export function AudioPageContent({ data }: IAudioPageContentProps) {
  const t = useTranslations("content.audio");
  const tPages = useTranslations("pages.resources");

  const surahItems = useMemo<ISurahListItem[]>(() => {
    const featured: ISurahListItem = {
      id: "featured",
      name: data.featuredTitle,
      subtitle: t("featuredSubtitle", { count: data.verses.length || 7 }),
      arabicTitle: data.featuredArabic ?? "الفاتحة",
      audioUrl: data.featuredSrc,
    };

    const fromRecitations = data.recitations.map((item) => ({
      id: item.id,
      name: item.surahName,
      subtitle: item.paraInfo,
      arabicTitle: undefined,
      audioUrl: undefined,
    }));

    return [featured, ...fromRecitations];
  }, [data, t]);

  const [activeId, setActiveId] = useState(surahItems[0]?.id ?? "featured");

  const activeIndex = surahItems.findIndex((item) => item.id === activeId);
  const activeItem = surahItems[activeIndex] ?? surahItems[0];

  const handleSelect = useCallback((item: ISurahListItem) => {
    setActiveId(item.id);
  }, []);

  const handleSelectRecitation = useCallback((recitation: IAudioRecitation) => {
    setActiveId(recitation.id);
  }, []);

  const handlePrev = useCallback(() => {
    if (activeIndex <= 0) return;
    setActiveId(surahItems[activeIndex - 1].id);
  }, [activeIndex, surahItems]);

  const handleNext = useCallback(() => {
    if (activeIndex < 0 || activeIndex >= surahItems.length - 1) return;
    setActiveId(surahItems[activeIndex + 1].id);
  }, [activeIndex, surahItems]);

  return (
    <>
      <AudioPageHero />

      <section className="bg-[#F3F5F4] py-10 md:py-14">
        <div className="site-container">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(260px,320px)_1fr]">
            <ScrollReveal direction="left">
              <SurahListSidebar
                items={surahItems}
                activeId={activeItem?.id ?? "featured"}
                onSelect={handleSelect}
              />
            </ScrollReveal>

            <div className="space-y-6">
              <ScrollReveal direction="right" delay={0.08}>
                <FeaturedAudioPlayer
                  src={
                    activeItem?.audioUrl ||
                    (activeItem?.id === "featured" ? data.featuredSrc : "")
                  }
                  title={activeItem?.name ?? data.featuredTitle}
                  arabicTitle={
                    activeItem?.arabicTitle ?? data.featuredArabic ?? "الفاتحة"
                  }
                  onPrev={handlePrev}
                  onNext={handleNext}
                  hasPrev={activeIndex > 0}
                  hasNext={
                    activeIndex >= 0 && activeIndex < surahItems.length - 1
                  }
                />
              </ScrollReveal>

              <div id="other-recitations">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="font-playfair text-xl font-bold text-primary-dark md:text-2xl">
                    {t("otherRecitations")}
                  </h2>
                  <a
                    href="#other-recitations"
                    className="font-body text-sm font-semibold text-primary hover:text-primary-dark"
                  >
                    {t("viewAll")}
                  </a>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {data.recitations.map((recitation, index) => (
                    <ScrollReveal key={recitation.id} delay={index * 0.05}>
                      <RecitationCard
                        recitation={recitation}
                        onSelect={handleSelectRecitation}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-bg-light py-8 md:py-10">
        <div className="site-container">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {FEATURE_KEYS.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.key}
                  className={cn(
                    "flex items-start gap-3 px-2 lg:px-5",
                    index < FEATURE_KEYS.length - 1 &&
                      "lg:border-r lg:border-primary/15"
                  )}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-body text-sm font-semibold text-primary-dark">
                      {tPages(item.key)}
                    </p>
                    <p className="mt-1 font-body text-xs leading-relaxed text-text-gray">
                      {tPages(`${item.key}Desc`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
