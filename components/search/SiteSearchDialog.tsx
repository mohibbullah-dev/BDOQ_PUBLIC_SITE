"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  FileText,
  LayoutGrid,
  Newspaper,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import {
  buildSearchIndex,
  SEARCH_CATEGORY_LABELS,
  searchSite,
  type ISearchResult,
  type SearchResultCategoryType,
} from "@/lib/search";
import { cn } from "@/lib/cn";

interface ISiteSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_ICONS: Record<SearchResultCategoryType, typeof BookOpen> = {
  course: BookOpen,
  teacher: UserRound,
  blog: Newspaper,
  ebook: FileText,
  page: LayoutGrid,
};

const PLACEHOLDERS = {
  en: "Search courses, teachers, blog, e-books…",
  bn: "কোর্স, শিক্ষক, ব্লগ, ই-বুক খুঁজুন…",
} as const;

const HINTS = {
  en: {
    empty: "Type to search across BDOQ Academy",
    noResults: "No matches found. Try another keyword.",
    navigate: "↑↓ navigate",
    open: "↵ open",
    close: "esc close",
  },
  bn: {
    empty: "BDOQ Academy-তে খুঁজতে লিখুন",
    noResults: "কিছু পাওয়া যায়নি। অন্য কীওয়ার্ড চেষ্টা করুন।",
    navigate: "↑↓ নেভিগেট",
    open: "↵ খুলুন",
    close: "esc বন্ধ",
  },
} as const;

export function SiteSearchDialog({ isOpen, onClose }: ISiteSearchDialogProps) {
  const router = useRouter();
  const locale = useLocale();
  const localeKey = locale === "bn" ? "bn" : "en";
  const hints = HINTS[localeKey];
  const placeholder = PLACEHOLDERS[localeKey];

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [index, setIndex] = useState<ISearchResult[]>(() => buildSearchIndex());
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    async function loadIndex(): Promise<void> {
      try {
        const { buildLiveSearchIndex } = await import("@/lib/search");
        const liveIndex = await buildLiveSearchIndex();
        if (!cancelled) setIndex(liveIndex);
      } catch {
        if (!cancelled) setIndex(buildSearchIndex());
      }
    }

    void loadIndex();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const results = useMemo(() => searchSite(query, index, 10), [index, query]);

  const resetState = useCallback((): void => {
    setQuery("");
    setActiveIndex(0);
  }, []);

  const handleClose = useCallback((): void => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  const navigateTo = useCallback(
    (result: ISearchResult): void => {
      handleClose();
      router.push(result.href);
    },
    [handleClose, router]
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (results.length === 0) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, results.length - 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const selected = results[activeIndex];
        if (selected) navigateTo(selected);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleClose, isOpen, navigateTo, results]);

  useEffect(() => {
    const activeElement = listRef.current?.querySelector<HTMLElement>(
      `[data-search-index="${activeIndex}"]`
    );
    activeElement?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[12vh] sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-[#0D4A2F]/55 backdrop-blur-sm"
            aria-label="Close search"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
              <Search
                className="h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                aria-label="Search site"
                className="flex-1 bg-transparent font-inter text-base text-primary-dark placeholder:text-text-gray/80 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-gray transition-colors hover:bg-gray-100 hover:text-primary-dark"
                aria-label="Close search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div
              ref={listRef}
              className="max-h-[min(52vh,420px)] overflow-y-auto p-2"
            >
              {query.trim().length === 0 && (
                <p className="px-3 py-8 text-center font-inter text-sm text-text-gray">
                  {hints.empty}
                </p>
              )}

              {query.trim().length > 0 && results.length === 0 && (
                <p className="px-3 py-8 text-center font-inter text-sm text-text-gray">
                  {hints.noResults}
                </p>
              )}

              {results.map((result, index) => {
                const Icon = CATEGORY_ICONS[result.category];
                const isActive = index === activeIndex;

                return (
                  <Link
                    key={result.id}
                    href={result.href}
                    data-search-index={index}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo(result);
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "flex items-start gap-3 rounded-xl px-3 py-3 transition-colors",
                      isActive ? "bg-primary/10" : "hover:bg-gray-50"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-bg-light text-primary"
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-inter text-sm font-semibold text-primary-dark">
                          {result.title}
                        </span>
                        <span className="rounded-full bg-bg-light px-2 py-0.5 font-inter text-[10px] font-semibold uppercase tracking-wide text-primary">
                          {SEARCH_CATEGORY_LABELS[result.category]}
                        </span>
                      </span>
                      <span className="mt-0.5 block font-inter text-xs leading-relaxed text-text-gray line-clamp-2">
                        {result.description}
                      </span>
                    </span>
                    <ArrowRight
                      className={cn(
                        "mt-2 h-4 w-4 shrink-0 transition-transform",
                        isActive
                          ? "translate-x-0.5 text-primary"
                          : "text-gray-300"
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 bg-bg-light/60 px-4 py-2.5">
              <span className="hidden font-inter text-[11px] text-text-gray sm:inline">
                {hints.navigate} · {hints.open} · {hints.close}
              </span>
              <kbd className="ml-auto hidden rounded-md border border-gray-200 bg-white px-2 py-0.5 font-mono text-[10px] text-text-gray sm:inline">
                Ctrl K
              </kbd>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
