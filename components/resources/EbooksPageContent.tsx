"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  HelpCircle,
  History,
  LayoutGrid,
  List,
  ScrollText,
} from "lucide-react";
import { EBOOK_CATEGORIES } from "@/lib/constants";
import type { EbookCategoryType, IEbook } from "@/lib/types";
import { triggerEbookDownload } from "@/lib/ebooks";
import { BookCard, type BookCardVariant } from "@/components/resources/BookCard";
import { EbookViewerModal } from "@/components/resources/EbookViewerModal";
import { EbooksPageHero } from "@/components/resources/EbooksPageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";

type SortType = "newest" | "title" | "pages";
type ViewType = "grid" | "list";

interface IEbooksPageContentProps {
  ebooks: IEbook[];
}

export function EbooksPageContent({ ebooks }: IEbooksPageContentProps) {
  const t = useTranslations("pages.resources");
  const tEbooks = useTranslations("content.ebooks");
  const [activeCategory, setActiveCategory] = useState<
    EbookCategoryType | "all"
  >("all");
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const [viewMode, setViewMode] = useState<ViewType>("grid");
  const [viewerBook, setViewerBook] = useState<IEbook | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<EbookCategoryType | "all", number> = {
      all: ebooks.length,
      tajweed: 0,
      "islamic-history": 0,
      religious: 0,
    };
    for (const book of ebooks) {
      counts[book.category] += 1;
    }
    return counts;
  }, [ebooks]);

  const ebookTabs = useMemo(
    () => [
      {
        id: "all" as const,
        label: tEbooks("allBooks"),
        icon: BookMarked,
        count: categoryCounts.all,
      },
      ...EBOOK_CATEGORIES.map((cat) => {
        const key = cat.id === "islamic-history" ? "islamicHistory" : cat.id;
        const icons = {
          tajweed: BookOpen,
          "islamic-history": History,
          religious: ScrollText,
        } as const;
        return {
          id: cat.id,
          label: tEbooks(`categories.${key}`),
          icon: icons[cat.id],
          count: categoryCounts[cat.id],
        };
      }),
    ],
    [categoryCounts, tEbooks]
  );

  const filteredBooks = useMemo(() => {
    const list =
      activeCategory === "all"
        ? ebooks
        : ebooks.filter((book) => book.category === activeCategory);

    return [...list].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "pages") {
        return b.pageCount - a.pageCount;
      }
      // newest: featured first, then sortOrder
      const aFeatured = a.featured ? 1 : 0;
      const bFeatured = b.featured ? 1 : 0;
      if (bFeatured !== aFeatured) return bFeatured - aFeatured;
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    });
  }, [activeCategory, ebooks, sortBy]);

  const featuredBooks = useMemo(
    () =>
      (activeCategory === "all"
        ? ebooks
        : ebooks.filter((book) => book.category === activeCategory)
      ).filter((book) => book.featured),
    [activeCategory, ebooks]
  );

  const viewerIndex = viewerBook
    ? filteredBooks.findIndex((book) => book.id === viewerBook.id)
    : -1;

  const handleView = useCallback((book: IEbook): void => {
    setViewerBook(book);
  }, []);

  const handleDownload = useCallback((book: IEbook): void => {
    triggerEbookDownload(book);
  }, []);

  const handleNavigate = useCallback(
    (direction: "prev" | "next"): void => {
      if (viewerIndex < 0) return;
      const nextIndex =
        direction === "prev" ? viewerIndex - 1 : viewerIndex + 1;
      const nextBook = filteredBooks[nextIndex];
      if (nextBook) setViewerBook(nextBook);
    },
    [filteredBooks, viewerIndex]
  );

  const cardVariant: BookCardVariant =
    viewMode === "list" ? "list" : "grid";

  return (
    <>
      <EbooksPageHero />

      <section className="bg-[#F9FBF9] pb-6 pt-8 md:pb-8 md:pt-10">
        <div className="site-container">
          <div
            className="flex flex-wrap items-center justify-center gap-2.5"
            role="tablist"
            aria-label={tEbooks("filterLabel")}
          >
            {ebookTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-semibold transition-all",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-white text-primary-dark ring-1 ring-gray-200 hover:ring-primary/30"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {tab.label}
                  <span
                    className={cn(
                      "inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-bg-light text-primary"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {featuredBooks.length > 0 ? (
        <section className="bg-[#F9FBF9] pb-10 md:pb-14">
          <div className="site-container">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-playfair text-2xl font-bold text-primary-dark md:text-3xl">
                {tEbooks("featuredBooks")}
              </h2>
              <a
                href="#all-books"
                className="inline-flex items-center gap-1 font-body text-sm font-semibold text-primary hover:text-primary-dark"
              >
                {tEbooks("viewAll")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {featuredBooks.map((book, index) => (
                <ScrollReveal key={book.id} delay={index * 0.06}>
                  <BookCard
                    book={book}
                    variant="featured"
                    onView={handleView}
                    onDownload={handleDownload}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="all-books" className="bg-white py-12 md:py-16">
        <div className="site-container">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-playfair text-2xl font-bold text-primary-dark md:text-3xl">
              {activeCategory === "all"
                ? tEbooks("allBooks")
                : tEbooks(
                    `categories.${activeCategory === "islamic-history" ? "islamicHistory" : activeCategory}`
                  )}
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 font-body text-sm text-text-gray">
                <span className="whitespace-nowrap">{tEbooks("sortBy")}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                  className="rounded-full border border-gray-200 bg-[#F9FBF9] px-3 py-2 font-body text-sm font-medium text-primary-dark outline-none focus:border-primary"
                >
                  <option value="newest">{tEbooks("sortNewest")}</option>
                  <option value="title">{tEbooks("sortTitle")}</option>
                  <option value="pages">{tEbooks("sortPages")}</option>
                </select>
              </label>

              <div
                className="inline-flex rounded-full border border-gray-200 bg-[#F9FBF9] p-1"
                role="group"
                aria-label={tEbooks("viewToggle")}
              >
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-pressed={viewMode === "grid"}
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "text-text-gray hover:text-primary"
                  )}
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{tEbooks("viewGrid")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                    viewMode === "list"
                      ? "bg-primary text-white"
                      : "text-text-gray hover:text-primary"
                  )}
                >
                  <List className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{tEbooks("viewList")}</span>
                </button>
              </div>
            </div>
          </div>

          {filteredBooks.length > 0 ? (
            <div
              className={cn(
                viewMode === "list"
                  ? "flex flex-col gap-3"
                  : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              )}
            >
              {filteredBooks.map((book, index) => (
                <ScrollReveal key={book.id} delay={index * 0.04}>
                  <BookCard
                    book={book}
                    variant={cardVariant}
                    onView={handleView}
                    onDownload={handleDownload}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-gray-200 bg-[#F9FBF9] px-6 py-12 text-center font-body text-sm text-text-gray">
              {tEbooks("emptyCategory")}
            </p>
          )}
        </div>
      </section>

      <section className="bg-[#F9FBF9] py-12 md:py-16">
        <div className="site-container">
          <div className="rounded-[1.75rem] border border-primary/10 bg-[#F3EFE6] px-6 py-10 text-center md:px-10 md:py-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
              <HelpCircle className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-playfair text-2xl font-bold text-primary-dark md:text-3xl">
              {t("requestTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-text-gray md:text-base">
              {t("requestDesc")}
            </p>
            <div className="mt-7">
              <SiteCta href="/contact">
                {t("requestCta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </SiteCta>
            </div>
            <p className="mt-4 font-body text-xs text-text-gray">
              {t("requestHint")}{" "}
              <Link
                href="/free-class"
                className="font-semibold text-primary hover:text-primary-dark"
              >
                {t("requestTrial")}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <EbookViewerModal
        book={viewerBook}
        isOpen={viewerBook !== null}
        onClose={() => setViewerBook(null)}
        onNavigate={handleNavigate}
        hasPrev={viewerIndex > 0}
        hasNext={viewerIndex >= 0 && viewerIndex < filteredBooks.length - 1}
      />
    </>
  );
}
