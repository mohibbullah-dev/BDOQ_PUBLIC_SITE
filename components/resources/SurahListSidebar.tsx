"use client";

import { AudioLines, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export interface ISurahListItem {
  id: string;
  name: string;
  subtitle: string;
  arabicTitle?: string;
  audioUrl?: string;
}

interface ISurahListSidebarProps {
  items: ISurahListItem[];
  activeId: string;
  onSelect: (item: ISurahListItem) => void;
}

export function SurahListSidebar({
  items,
  activeId,
  onSelect,
}: ISurahListSidebarProps) {
  const t = useTranslations("content.audio");

  return (
    <aside className="site-card flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-start gap-3 border-b border-gray-100 pb-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg-light text-primary">
          <BookOpen className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-playfair text-lg font-bold text-primary-dark">
            {t("surahListTitle")}
          </h2>
          <p className="mt-0.5 font-body text-xs text-text-gray">
            {t("surahListSubtitle")}
          </p>
        </div>
      </div>

      <ul
        className="max-h-[420px] flex-1 space-y-2 overflow-y-auto pr-1"
        role="listbox"
        aria-label={t("surahListTitle")}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => onSelect(item)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all",
                  isActive
                    ? "border-primary/25 bg-bg-light shadow-sm"
                    : "border-gray-100 bg-white hover:border-primary/20 hover:bg-[#F9FBF9]"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-body text-xs font-bold",
                    isActive
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-text-gray"
                  )}
                >
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block font-body text-sm font-semibold",
                      isActive ? "text-primary-dark" : "text-primary-dark"
                    )}
                  >
                    {item.name}
                  </span>
                  <span className="mt-0.5 block font-body text-xs text-text-gray">
                    {item.subtitle}
                  </span>
                </span>
                {isActive ? (
                  <AudioLines
                    className="h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <a
        href="#other-recitations"
        className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-primary/25 bg-bg-light px-4 py-2.5 font-body text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
      >
        {t("viewAllSurahs")}
      </a>
    </aside>
  );
}
