"use client";

import Link from "next/link";
import { BookOpen, Download, Eye, FileText, HardDrive, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import type { IEbook } from "@/lib/types";
import { EBOOK_CATEGORY_KEYS } from "@/lib/i18n/contentKeys";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import { cn } from "@/lib/cn";

export type BookCardVariant = "featured" | "grid" | "list";

interface IBookCardProps {
  book: IEbook;
  onView: (book: IEbook) => void;
  onDownload: (book: IEbook) => void;
  variant?: BookCardVariant;
}

export function BookCard({
  book,
  onView,
  onDownload,
  variant = "grid",
}: IBookCardProps) {
  const t = useTranslations("content.ebooks");
  const tItem = useTranslations(`content.ebooks.items.${book.slug}`);
  const categoryKey = EBOOK_CATEGORY_KEYS[book.category] ?? book.category;
  const title = tItem("title");
  const description = tItem("description");
  const categoryLabel = t(`categories.${categoryKey}`);

  if (variant === "featured") {
    return (
      <article
        className={cn(
          "site-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white",
          "shadow-[0_10px_36px_-18px_rgba(15,23,42,0.14)] transition-shadow duration-200",
          "hover:shadow-[0_16px_44px_-16px_rgba(38,155,111,0.22)] sm:flex-row"
        )}
      >
        <div className="relative w-full shrink-0 sm:w-[42%] sm:max-w-[220px]">
          {book.featured ? (
            <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-brand-red px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              <Star className="size-3 fill-current" aria-hidden="true" />
              {t("featuredBadge")}
            </span>
          ) : null}
          <Link
            href={`/resources/ebooks/${book.slug}`}
            className="relative block h-full"
          >
            <GradientPlaceholder
              gradient={book.coverGradient}
              className="h-48 rounded-none sm:h-full sm:min-h-[220px]"
              label={title}
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <BookOpen
                className="h-12 w-12 text-white/85 drop-shadow"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>

        <div className="relative z-[1] flex flex-1 flex-col p-5 md:p-6">
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
            {categoryLabel}
          </p>
          <Link href={`/resources/ebooks/${book.slug}`}>
            <h3 className="mt-1.5 font-body text-lg font-semibold text-primary-dark transition-colors hover:text-primary md:text-xl">
              {title}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 flex-1 font-body text-sm leading-relaxed text-text-gray">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 font-body text-xs text-text-gray">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {book.pageCount} {t("pages")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <HardDrive className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {book.fileSize}
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <ActionButtons
              book={book}
              onView={onView}
              onDownload={onDownload}
              downloadLabel={t("download")}
              viewLabel={t("view")}
            />
          </div>
        </div>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article className="site-card flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
        <Link
          href={`/resources/ebooks/${book.slug}`}
          className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-20"
        >
          <GradientPlaceholder
            gradient={book.coverGradient}
            className="h-full w-full rounded-xl"
            label={title}
          />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            {categoryLabel}
          </p>
          <Link href={`/resources/ebooks/${book.slug}`}>
            <h3 className="mt-1 font-body text-base font-semibold text-primary-dark hover:text-primary">
              {title}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-1 font-body text-sm text-text-gray">
            {description}
          </p>
          <p className="mt-2 font-body text-xs text-text-gray">
            {book.pageCount} {t("pages")} · {book.fileSize}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:shrink-0">
          <ActionButtons
            book={book}
            onView={onView}
            onDownload={onDownload}
            downloadLabel={t("download")}
            viewLabel={t("view")}
            compact
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "site-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white",
        "shadow-[0_8px_28px_-18px_rgba(15,23,42,0.12)] transition-shadow duration-200",
        "hover:shadow-[0_14px_36px_-16px_rgba(38,155,111,0.2)]"
      )}
    >
      {book.featured ? (
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-brand-red px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
          <Star className="size-3 fill-current" aria-hidden="true" />
          {t("featuredBadge")}
        </span>
      ) : null}
      <Link href={`/resources/ebooks/${book.slug}`} className="relative block">
        <GradientPlaceholder
          gradient={book.coverGradient}
          className="h-44 rounded-none transition-transform duration-300 group-hover:scale-[1.02]"
          label={title}
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <BookOpen
            className="h-10 w-10 text-white/85 drop-shadow"
            aria-hidden="true"
          />
        </span>
      </Link>
      <div className="relative z-[1] flex flex-1 flex-col p-5">
        <p className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
          {categoryLabel}
        </p>
        <Link href={`/resources/ebooks/${book.slug}`}>
          <h3 className="mt-1.5 line-clamp-2 font-body text-base font-semibold text-primary-dark transition-colors hover:text-primary">
            {title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 font-body text-sm leading-relaxed text-text-gray">
          {description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 font-body text-xs text-text-gray">
          <span className="inline-flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {book.pageCount} {t("pages")}
          </span>
          <span className="inline-flex items-center gap-1">
            <HardDrive className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {book.fileSize}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <ActionButtons
            book={book}
            onView={onView}
            onDownload={onDownload}
            downloadLabel={t("download")}
            viewLabel={t("view")}
            compact
          />
        </div>
      </div>
    </article>
  );
}

function ActionButtons({
  book,
  onView,
  onDownload,
  downloadLabel,
  viewLabel,
  compact = false,
}: {
  book: IEbook;
  onView: (book: IEbook) => void;
  onDownload: (book: IEbook) => void;
  downloadLabel: string;
  viewLabel: string;
  compact?: boolean;
}) {
  return (
    <>
      <button
        type="button"
        onClick={() => onDownload(book)}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-full bg-primary font-body font-semibold text-white",
          "transition-colors hover:bg-primary-dark",
          compact ? "min-h-10 px-4 py-2 text-xs" : "min-h-[44px] px-5 py-2 text-sm"
        )}
      >
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        {downloadLabel}
      </button>
      <button
        type="button"
        onClick={() => onView(book)}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-primary/35 bg-white",
          "font-body font-semibold text-primary transition-colors",
          "hover:border-primary hover:bg-bg-light",
          compact ? "min-h-10 px-4 py-2 text-xs" : "min-h-[44px] px-5 py-2 text-sm"
        )}
      >
        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
        {viewLabel}
      </button>
    </>
  );
}
