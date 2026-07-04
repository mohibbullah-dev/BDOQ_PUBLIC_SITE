export interface IQuranVerseMarqueeItem {
  id: string;
  arabic: string;
  translation: string;
  reference: string;
}

interface IQuranVerseMarqueeItemProps {
  item: IQuranVerseMarqueeItem;
}

function MarqueeSeparator() {
  return (
    <span
      className="mx-1 inline-flex h-3 w-px shrink-0 bg-gradient-to-b from-transparent via-[var(--gold)]/60 to-transparent xl:mx-2"
      aria-hidden="true"
    />
  );
}

export function QuranVerseMarqueeItem({ item }: IQuranVerseMarqueeItemProps) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 px-5 xl:gap-3.5 xl:px-8">
      <span
        className="shrink-0 font-amiri text-[18px] font-normal leading-[1.65] tracking-wide text-white xl:text-[20px]"
        dir="rtl"
        lang="ar"
      >
        {item.arabic}
      </span>

      <MarqueeSeparator />

      <span className="shrink-0 font-inter text-[13px] font-medium leading-snug text-white/90 xl:text-sm">
        {item.translation}
      </span>

      <MarqueeSeparator />

      <span className="shrink-0 whitespace-nowrap font-inter text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--gold-light)] xl:text-[11px]">
        {item.reference}
      </span>
    </span>
  );
}
