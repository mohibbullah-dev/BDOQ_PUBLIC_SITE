"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { BookMarked, BookOpen, History, ScrollText } from "lucide-react";
import { EBOOK_CATEGORIES } from "@/lib/constants";
import type { EbookCategoryType, IEbook } from "@/lib/types";
import { triggerEbookDownload } from "@/lib/ebooks";
import { BookCard } from "@/components/resources/BookCard";
import { EbookViewerModal } from "@/components/resources/EbookViewerModal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SegmentedTabBar } from "@/components/shared/SegmentedTabBar";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";

interface IEbooksPageContentProps {
  ebooks: IEbook[];
}

export function EbooksPageContent({ ebooks }: IEbooksPageContentProps) {
  const t = useTranslations("pages.resources");
  const tEbooks = useTranslations("content.ebooks");
  const [activeCategory, setActiveCategory] = useState<
    EbookCategoryType | "all"
  >("all");
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
      const aFeatured = a.featured ? 1 : 0;
      const bFeatured = b.featured ? 1 : 0;
      if (bFeatured !== aFeatured) return bFeatured - aFeatured;
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    });
  }, [activeCategory, ebooks]);

  const featuredBooks = useMemo(
    () => filteredBooks.filter((book) => book.featured),
    [filteredBooks]
  );

  const otherBooks = useMemo(
    () => filteredBooks.filter((book) => !book.featured),
    [filteredBooks]
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

  return (
    <>
      <section className="page-hero-bg relative overflow-hidden border-b border-primary/10 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <ScrollReveal>
              <SectionHeader
                eyebrow={t("ebooksEyebrow")}
                title={t("ebooksTitle")}
                subtitle={t("ebooksSubtitle")}
                titleAs="h1"
                variant="page"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.15} direction="right">
              <div className="relative flex justify-center">
                <GradientPlaceholder
                  gradient="from-primary to-teal"
                  className="h-56 w-full max-w-md"
                  label={tEbooks("stackAlt")}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex -space-x-4">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex h-32 w-24 items-center justify-center rounded-lg border border-white/30 bg-white/20 shadow-lg backdrop-blur-sm"
                        style={{
                          transform: `rotate(${i * 6 - 6}deg) translateY(${i * -4}px)`,
                        }}
                      >
                        <BookOpen
                          className="h-10 w-10 text-white"
                          aria-hidden="true"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-bg-light py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <SegmentedTabBar
              tabs={ebookTabs}
              activeTab={activeCategory}
              onChange={setActiveCategory}
              ariaLabel={tEbooks("filterLabel")}
              layoutId="ebooks-category-tab-indicator"
              panelIdPrefix="ebooks-panel"
              maxWidthClass="max-w-4xl"
            />
          </div>

          {featuredBooks.length > 0 ? (
            <div className="mb-12">
              <h2 className="mb-6 font-amiri text-2xl font-bold text-primary-dark md:text-3xl">
                {tEbooks("featuredBooks")}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredBooks.map((book, index) => (
                  <ScrollReveal key={book.id} delay={index * 0.05}>
                    <BookCard
                      book={book}
                      onView={handleView}
                      onDownload={handleDownload}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ) : null}

          {otherBooks.length > 0 ? (
            <>
              {featuredBooks.length > 0 ? (
                <h2 className="mb-6 font-amiri text-2xl font-bold text-primary-dark md:text-3xl">
                  {activeCategory === "all"
                    ? tEbooks("allBooks")
                    : tEbooks(
                        `categories.${activeCategory === "islamic-history" ? "islamicHistory" : activeCategory}`
                      )}
                </h2>
              ) : null}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherBooks.map((book, index) => (
                  <ScrollReveal key={book.id} delay={index * 0.05}>
                    <BookCard
                      book={book}
                      onView={handleView}
                      onDownload={handleDownload}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </>
          ) : null}
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
