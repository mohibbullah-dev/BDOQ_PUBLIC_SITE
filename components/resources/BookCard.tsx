"use client";

import Link from "next/link";
import { Download, Eye, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import type { IEbook } from "@/lib/types";
import { EBOOK_CATEGORY_KEYS } from "@/lib/i18n/contentKeys";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import { cn } from "@/lib/cn";

interface IBookCardProps {
  book: IEbook;
  onView: (book: IEbook) => void;
  onDownload: (book: IEbook) => void;
}

export function BookCard({ book, onView, onDownload }: IBookCardProps) {
  const t = useTranslations("content.ebooks");
  const tItem = useTranslations(`content.ebooks.items.${book.slug}`);
  const categoryKey = EBOOK_CATEGORY_KEYS[book.category] ?? book.category;

  return (
    <article className="site-card group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md">
      {book.featured ? (
        <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#32C991,#CD443F)] px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
          <Star className="size-3 fill-current" aria-hidden="true" />
          {t("featuredBadge")}
        </span>
      ) : null}
      <Link href={`/resources/ebooks/${book.slug}`} className="block">
        <GradientPlaceholder
          gradient={book.coverGradient}
          className="h-48 rounded-none transition-transform duration-300 group-hover:scale-[1.02]"
          label={tItem("title")}
        />
      </Link>
      <div className="relative z-[1] space-y-3 p-5">
        <span className="inline-block rounded-full bg-bg-light px-3 py-1 font-body text-xs font-medium text-primary">
          {t(`categories.${categoryKey}`)}
        </span>
        <Link href={`/resources/ebooks/${book.slug}`}>
          <h3 className="line-clamp-2 font-body text-lg font-semibold text-primary-dark transition-colors hover:text-primary">
            {tItem("title")}
          </h3>
        </Link>
        <p className="line-clamp-3 font-body text-sm leading-relaxed text-text-gray">
          {tItem("description")}
        </p>
        <p className="font-body text-xs text-text-gray">
          {book.pageCount} {t("pages")} · {book.fileSize}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={() => onDownload(book)}
            className={cn(
              "inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 py-2",
              "font-body text-sm font-semibold text-white transition-colors"
            )}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t("download")}
          </button>
          <button
            type="button"
            onClick={() => onView(book)}
            className={cn(
              "inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-primary bg-white px-5 py-2",
              "font-body text-sm font-semibold text-primary transition-colors",
              "hover:bg-primary hover:text-white"
            )}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            {t("view")}
          </button>
        </div>
      </div>
    </article>
  );
}
