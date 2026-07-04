"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Share2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { IEbook } from "@/lib/types";
import { ACADEMY_INFO, SITE_URL } from "@/lib/constants";
import { getEbookPdfUrl, triggerEbookDownload } from "@/lib/ebooks";
import { cn } from "@/lib/cn";

interface IEbookViewerModalProps {
  book: IEbook | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (direction: "prev" | "next") => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function EbookViewerModal({
  book,
  isOpen,
  onClose,
  onNavigate,
  hasPrev = false,
  hasNext = false,
}: IEbookViewerModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("content.ebooks");
  const tReader = useTranslations("content.ebooks.reader");
  const itemSlug = book?.slug ?? "tajweed-made-easy";
  const tItem = useTranslations(`content.ebooks.items.${itemSlug}`);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate?.("prev");
      if (e.key === "ArrowRight" && hasNext) onNavigate?.("next");
    },
    [hasNext, hasPrev, onClose, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen, book?.id]);

  if (!book) return null;

  const pdfUrl = getEbookPdfUrl(book);
  const detailUrl = `${SITE_URL}/resources/ebooks/${book.slug}`;
  const displayTitle = tItem("title");
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1628]/80 p-3 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={tReader("reading", { title: displayTitle })}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(92vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-1.5 w-full bg-gradient-to-r from-teal-accent via-primary to-primary-dark"
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
              <div className="min-w-0 flex-1 pr-2">
                <p className="font-inter text-[10px] font-bold uppercase tracking-wider text-primary">
                  {tReader("eyebrow")}
                </p>
                <h2 className="font-inter text-lg font-bold text-primary-dark sm:text-xl">
                  {displayTitle}
                </h2>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-inter text-xs text-text-gray">
                  <span>
                    {book.pageCount} {t("pages")}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{book.fileSize}</span>
                  <span aria-hidden="true">·</span>
                  <span>{languageLabel}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={tReader("close")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-text-gray transition-colors hover:border-primary hover:text-primary"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 bg-[#F3F4F6]">
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#F3F4F6]">
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
                key={book.id}
                src={`${pdfUrl}#toolbar=1&navpanes=0`}
                title={`PDF: ${displayTitle}`}
                className="h-full w-full border-0"
                onLoad={() => setIsLoading(false)}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 bg-white px-4 py-3 sm:px-5">
              <div className="flex flex-wrap items-center gap-2">
                {onNavigate && hasPrev && (
                  <button
                    type="button"
                    onClick={() => onNavigate("prev")}
                    aria-label={tReader("previousBook")}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-text-gray transition-colors hover:border-primary hover:text-primary"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
                {onNavigate && hasNext && (
                  <button
                    type="button"
                    onClick={() => onNavigate("next")}
                    aria-label={tReader("nextBook")}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-text-gray transition-colors hover:border-primary hover:text-primary"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
                <Link
                  href={`/resources/ebooks/${book.slug}`}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 py-2 font-inter text-sm font-medium text-text-gray transition-colors hover:text-primary"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  {tReader("fullPage")}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={whatsappShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-gray-200 px-4 py-2",
                    "font-inter text-sm font-semibold text-text-dark transition-colors hover:border-primary hover:text-primary"
                  )}
                >
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                  {tReader("share")}
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-primary px-4 py-2",
                    "font-inter text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  )}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  {tReader("open")}
                </a>
                <button
                  type="button"
                  onClick={() => triggerEbookDownload(book)}
                  className={cn(
                    "inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-primary px-4 py-2",
                    "font-inter text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  )}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t("download")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
