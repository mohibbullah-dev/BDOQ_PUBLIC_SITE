"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Download,
  ExternalLink,
  Loader2,
  Share2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { IEbook } from "@/lib/types";
import { ACADEMY_INFO, SITE_URL } from "@/lib/constants";
import {
  getEbookPdfUrl,
  getRelatedEbooks,
  triggerEbookDownload,
} from "@/lib/ebooks";
import { BookCard } from "@/components/resources/BookCard";
import { EbookViewerModal } from "@/components/resources/EbookViewerModal";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/cn";

interface IEbookDetailViewProps {
  book: IEbook;
  relatedEbooks?: IEbook[];
}

const CATEGORY_KEYS: Record<
  IEbook["category"],
  "tajweed" | "islamicHistory" | "religious"
> = {
  tajweed: "tajweed",
  "islamic-history": "islamicHistory",
  religious: "religious",
};

export function EbookDetailView({
  book,
  relatedEbooks,
}: IEbookDetailViewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [viewerBook, setViewerBook] = useState<IEbook | null>(null);
  const t = useTranslations("content.ebooks");
  const tDetail = useTranslations("content.ebooks.detail");
  const tReader = useTranslations("content.ebooks.reader");
  const tItem = useTranslations(`content.ebooks.items.${book.slug}`);
  const related = relatedEbooks ?? getRelatedEbooks(book);
  const pdfUrl = getEbookPdfUrl(book);
  const detailUrl = `${SITE_URL}/resources/ebooks/${book.slug}`;
  const displayTitle = tItem("title");
  const displayDescription = tItem("description");
  const categoryLabel = t(`categories.${CATEGORY_KEYS[book.category]}`);
  const languageLabel =
    book.language === "both"
      ? tReader("languageBoth")
      : book.language === "bn"
        ? tReader("languageBn")
        : tReader("languageEn");
  const shareText = encodeURIComponent(
    `📖 ${displayTitle} — Free e-book from BDOQ Academy\n${detailUrl}`
  );
  const whatsappShare = `https://wa.me/${ACADEMY_INFO.whatsapp.replace(/\D/g, "")}?text=${shareText}`;

  return (
    <>
      <section className="page-hero-bg relative overflow-hidden border-b border-primary/10 py-12 md:py-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources/ebooks"
            className="mb-8 inline-flex items-center gap-2 font-inter text-sm font-medium text-text-gray transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {tDetail("backToAll")}
          </Link>

          <div className="grid items-start gap-10 lg:grid-cols-[320px_1fr]">
            <ScrollReveal>
              <GradientPlaceholder
                gradient={book.coverGradient}
                className="h-72 w-full lg:h-80"
                label={tDetail("coverAlt", { title: displayTitle })}
              />
              <div className="mt-4 space-y-2 rounded-2xl border border-gray-100 bg-bg-light p-4">
                <p className="font-inter text-sm text-text-gray">
                  <span className="font-semibold text-primary-dark">
                    {tDetail("author")}:
                  </span>{" "}
                  {book.author}
                </p>
                <p className="font-inter text-sm text-text-gray">
                  <span className="font-semibold text-primary-dark">
                    {tDetail("pagesLabel")}:
                  </span>{" "}
                  {book.pageCount}
                </p>
                <p className="font-inter text-sm text-text-gray">
                  <span className="font-semibold text-primary-dark">
                    {tDetail("size")}:
                  </span>{" "}
                  {book.fileSize}
                </p>
                <p className="font-inter text-sm text-text-gray">
                  <span className="font-semibold text-primary-dark">
                    {tDetail("language")}:
                  </span>{" "}
                  {languageLabel}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <span className="inline-block rounded-full bg-bg-light px-3 py-1 font-inter text-xs font-medium text-primary">
                {categoryLabel}
              </span>
              <h1 className="mt-3 font-playfair text-3xl font-bold text-primary-dark md:text-4xl">
                {displayTitle}
              </h1>
              <p className="mt-4 max-w-2xl font-inter text-base leading-relaxed text-text-gray">
                {displayDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => triggerEbookDownload(book)}
                  className={cn(
                    "inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-6 py-3",
                    "font-inter text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  )}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {tDetail("downloadPdf")}
                </button>
                <button
                  type="button"
                  onClick={() => setViewerBook(book)}
                  className={cn(
                    "inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-primary px-6 py-3",
                    "font-inter text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  )}
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  {tDetail("fullscreenReader")}
                </button>
                <a
                  href={whatsappShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-gray-200 px-6 py-3",
                    "font-inter text-sm font-semibold text-text-dark transition-colors hover:border-primary hover:text-primary"
                  )}
                >
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                  {tReader("share")}
                </a>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#F3F4F6] shadow-md">
                <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
                  <p className="font-inter text-sm font-semibold text-primary-dark">
                    {tDetail("readOnline")}
                  </p>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-inter text-xs font-medium text-primary hover:underline"
                  >
                    {tDetail("openNewTab")}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
                <div className="relative h-[min(70vh,640px)]">
                  {isLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
                      <Loader2
                        className="h-8 w-8 animate-spin text-primary"
                        aria-hidden="true"
                      />
                      <p className="font-inter text-sm text-text-gray">
                        {tReader("loading")}
                      </p>
                    </div>
                  )}
                  <iframe
                    src={`${pdfUrl}#toolbar=1`}
                    title={tDetail("readTitle", { title: displayTitle })}
                    className="h-full w-full border-0"
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-bg-light py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-inter text-2xl font-semibold text-primary-dark">
              {tDetail("moreInCategory")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BookCard
                  key={item.id}
                  book={item}
                  onView={setViewerBook}
                  onDownload={triggerEbookDownload}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <EbookViewerModal
        book={viewerBook}
        isOpen={viewerBook !== null}
        onClose={() => setViewerBook(null)}
      />
    </>
  );
}
