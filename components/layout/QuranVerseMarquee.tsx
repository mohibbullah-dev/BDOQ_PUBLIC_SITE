"use client";

import { useLocale } from "next-intl";
import { HERO_MARQUEE_ITEMS, getMarqueeTranslation } from "@/lib/heroMarquee";
import {
  QuranVerseMarqueeItem,
  type IQuranVerseMarqueeItem,
} from "@/components/shared/QuranVerseMarqueeItem";
import type { LocaleType } from "@/i18n/routing";

const MARQUEE_ARIA: Record<LocaleType, string> = {
  en: "Quranic verses and Hadith",
  bn: "কুরআনের আয়াত ও হাদিস",
};

export function QuranVerseMarquee() {
  const locale = useLocale() as LocaleType;

  const items: IQuranVerseMarqueeItem[] = HERO_MARQUEE_ITEMS.map((item) => ({
    id: item.id,
    arabic: item.arabic,
    translation: getMarqueeTranslation(item, locale),
    reference: item.reference,
  }));

  const loopItems = [...items, ...items];

  return (
    <div
      className="group/marquee site-marquee relative hidden overflow-hidden lg:block"
      role="region"
      aria-label={MARQUEE_ARIA[locale]}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/90 to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0A1628] via-[#0A1628]/90 to-transparent" />

      <div className="flex h-11 items-center overflow-hidden xl:h-12">
        <div className="flex w-max flex-row items-center whitespace-nowrap animate-marquee-left motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]">
          {loopItems.map((item, index) => (
            <QuranVerseMarqueeItem key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
