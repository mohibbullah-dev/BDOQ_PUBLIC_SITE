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
      className="mx-2 inline-flex h-4 w-px shrink-0 bg-[var(--green-primary)]/35 xl:mx-3"
      aria-hidden="true"
    />
  );
}

export function QuranVerseMarqueeItem({ item }: IQuranVerseMarqueeItemProps) {
  return (
    <span className="inline-flex shrink-0 items-center gap-3 px-6 xl:gap-4 xl:px-10">
      <span
        className="shrink-0 font-amiri text-[20px] font-medium leading-[1.7] tracking-wide text-[#1B5E45] xl:text-[22px]"
        dir="rtl"
        lang="ar"
      >
        {item.arabic}
      </span>

      <MarqueeSeparator />

      <span className="max-w-[28rem] shrink-0 font-body text-sm font-medium leading-snug text-[var(--text-dark)] xl:text-[15px]">
        {item.translation}
      </span>

      <MarqueeSeparator />

      <span className="inline-flex shrink-0 items-center rounded-[8px] border border-[var(--green-primary)]/25 bg-[var(--green-light)] px-2.5 py-1 font-body text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--green-primary)] xl:text-xs">
        {item.reference}
      </span>
    </span>
  );
}
