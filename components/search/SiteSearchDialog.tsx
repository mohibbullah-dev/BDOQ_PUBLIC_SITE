"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  FileText,
  LayoutGrid,
  Newspaper,
  Search,
  UserRound,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
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
    empty: "Type at least 2 characters to search courses, teachers, and more.",
    pages: "Pages",
    results: "Results",
    noResults: "No matches found. Try another keyword.",
    navigate: "↑↓ navigate",
    open: "↵ open",
    close: "esc close",
  },
  bn: {
    empty: "কোর্স, শিক্ষক ও আরও খুঁজতে কমপক্ষে ২ অক্ষর লিখুন।",
    pages: "পেজ",
    results: "ফলাফল",
    noResults: "কিছু পাওয়া যায়নি। অন্য কীওয়ার্ড চেষ্টা করুন।",
    navigate: "↑↓ নেভিগেট",
    open: "↵ খুলুন",
    close: "esc বন্ধ",
  },
} as const;

const SOFT_BORDER = "border-[rgb(220_235_228/0.7)]";
const SOFT_SHADOW =
  "shadow-[0_0_0_1px_rgb(210_232_220/0.28),0_2px_8px_rgb(180_220_200/0.1)]";

function SearchListSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-3 last:mb-0">
      <p className="mb-1.5 px-2 font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-text-gray">
        {title}
      </p>
      <ul
        className={cn(
          "overflow-hidden rounded border bg-white/90",
          SOFT_BORDER,
          SOFT_SHADOW
        )}
      >
        {children}
      </ul>
    </section>
  );
}

function SearchListRow({
  href,
  index,
  icon,
  title,
  subtitle,
  meta,
  active,
  onNavigate,
  onHover,
}: {
  href: string;
  index: number;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  meta?: string;
  active: boolean;
  onNavigate: () => void;
  onHover: () => void;
}) {
  return (
    <li className="border-b border-[rgb(220_235_228/0.55)] last:border-b-0">
      <Link
        href={href}
        data-search-index={index}
        onClick={(event) => {
          event.preventDefault();
          onNavigate();
        }}
        onMouseEnter={onHover}
        className={cn(
          "group flex w-full items-center gap-3 px-3 py-2.5 text-left transition",
          active ? "bg-primary/10" : "hover:bg-[#f6fcf9]"
        )}
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary ring-1 ring-primary/15 transition",
            active && "bg-[#D4A853]/15 text-[#B8923F] ring-[#D4A853]/25"
          )}
        >
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-inter text-sm font-semibold text-primary-dark">
            {title}
          </span>
          {subtitle ? (
            <span className="mt-0.5 block truncate font-inter text-xs text-text-gray">
              {subtitle}
            </span>
          ) : null}
        </span>
        {meta ? (
          <span className="shrink-0 rounded bg-[#f6fcf9] px-2 py-0.5 font-inter text-[10px] font-semibold uppercase tracking-wide text-text-gray">
            {meta}
          </span>
        ) : null}
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-text-gray/40 transition group-hover:translate-x-0.5 group-hover:text-[#D4A853]",
            active && "translate-x-0.5 text-[#D4A853]"
          )}
          aria-hidden
        />
      </Link>
    </li>
  );
}

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

  const defaultPages = useMemo(
    () => index.filter((item) => item.category === "page").slice(0, 6),
    [index]
  );

  const results = useMemo(() => searchSite(query, index, 10), [index, query]);
  const trimmed = query.trim();
  const showingPages = trimmed.length === 0;
  const listItems = showingPages ? defaultPages : results;

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
  }, [query, showingPages]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (listItems.length === 0) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) =>
          Math.min(current + 1, listItems.length - 1)
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const selected = listItems[activeIndex];
        if (selected) navigateTo(selected);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleClose, isOpen, listItems, navigateTo]);

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
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Close search"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className={cn(
              "relative z-10 w-full max-w-lg overflow-hidden rounded border bg-[#fcfefd]",
              SOFT_BORDER,
              SOFT_SHADOW
            )}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={cn(
                "flex items-center gap-2 border-b px-4 py-3",
                SOFT_BORDER
              )}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                <Search className="size-4" aria-hidden />
              </span>
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
                className="rounded p-1.5 text-text-gray transition hover:bg-[#f6fcf9] hover:text-primary-dark"
                aria-label="Close search"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div
              ref={listRef}
              className="max-h-[min(60vh,420px)] overflow-y-auto p-3"
            >
              {showingPages ? (
                <SearchListSection title={hints.pages}>
                  {defaultPages.map((result, itemIndex) => {
                    const Icon = CATEGORY_ICONS[result.category];
                    return (
                      <SearchListRow
                        key={result.id}
                        href={result.href}
                        index={itemIndex}
                        icon={<Icon className="size-4" aria-hidden />}
                        title={result.title}
                        subtitle={result.href}
                        active={itemIndex === activeIndex}
                        onNavigate={() => navigateTo(result)}
                        onHover={() => setActiveIndex(itemIndex)}
                      />
                    );
                  })}
                </SearchListSection>
              ) : null}

              {!showingPages && results.length === 0 ? (
                <p className="px-2 py-4 text-center font-inter text-sm text-text-gray">
                  {hints.noResults}
                </p>
              ) : null}

              {!showingPages && results.length > 0 ? (
                <SearchListSection title={hints.results}>
                  {results.map((result, itemIndex) => {
                    const Icon = CATEGORY_ICONS[result.category];
                    return (
                      <SearchListRow
                        key={result.id}
                        href={result.href}
                        index={itemIndex}
                        icon={<Icon className="size-4" aria-hidden />}
                        title={result.title}
                        subtitle={result.description}
                        meta={SEARCH_CATEGORY_LABELS[result.category]}
                        active={itemIndex === activeIndex}
                        onNavigate={() => navigateTo(result)}
                        onHover={() => setActiveIndex(itemIndex)}
                      />
                    );
                  })}
                </SearchListSection>
              ) : null}

              {showingPages ? (
                <p className="px-2 pt-1 font-inter text-sm text-text-gray">
                  {hints.empty}
                </p>
              ) : null}
            </div>

            <div
              className={cn(
                "flex flex-wrap items-center justify-between gap-2 border-t bg-[#f6fcf9]/80 px-4 py-2.5",
                SOFT_BORDER
              )}
            >
              <span className="hidden font-inter text-[11px] text-text-gray sm:inline">
                {hints.navigate} · {hints.open} · {hints.close}
              </span>
              <kbd className="ml-auto hidden rounded border border-[rgb(220_235_228/0.8)] bg-white px-2 py-0.5 font-mono text-[10px] text-text-gray sm:inline">
                Ctrl K
              </kbd>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
