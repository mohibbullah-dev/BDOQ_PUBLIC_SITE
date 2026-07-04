"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { IGalleryItem } from "@/lib/types";
import { isCloudinaryUrl } from "@/lib/cloudinary";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";

interface IGalleryLightboxProps {
  items: IGalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  getTitle: (id: string) => string;
}

export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
  getTitle,
}: IGalleryLightboxProps) {
  const t = useTranslations("content.gallery.lightbox");
  const item = items[activeIndex];
  const title = item ? getTitle(item.id) : "";
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;
  const mediaType = item?.mediaType ?? "photo";

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(activeIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(activeIndex + 1);
    },
    [activeIndex, hasPrev, hasNext, onClose, onNavigate]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!item) return null;

  function renderMedia(): React.ReactNode {
    if (mediaType === "photo" && item.mediaUrl) {
      return (
        <div className="relative mx-auto h-[60vh] max-h-[70vh] w-full max-w-4xl">
          <Image
            src={item.mediaUrl}
            alt={title}
            fill
            className="rounded-2xl object-contain"
            sizes="(max-width: 1024px) 100vw, 896px"
            unoptimized={!isCloudinaryUrl(item.mediaUrl)}
            priority
          />
        </div>
      );
    }

    if (mediaType === "video" && item.youtubeId) {
      return (
        <div className="mx-auto w-full max-w-4xl">
          <YouTubeEmbed
            videoId={item.youtubeId}
            title={title}
            lazy={false}
            autoplay
          />
        </div>
      );
    }

    if (mediaType === "video" && item.mediaUrl) {
      return (
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-black">
          <video
            src={item.mediaUrl}
            controls
            autoPlay
            className="max-h-[70vh] w-full"
          >
            <track kind="captions" />
          </video>
        </div>
      );
    }

    if (mediaType === "audio" && item.mediaUrl) {
      return (
        <div className="mx-auto w-full max-w-xl rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
          <audio src={item.mediaUrl} controls autoPlay className="w-full">
            <track kind="captions" />
          </audio>
        </div>
      );
    }

    return (
      <GradientPlaceholder
        gradient={item.coverGradient}
        className="mx-auto h-[60vh] max-h-[70vh] w-full max-w-4xl"
        label={title}
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>

        {hasPrev && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(activeIndex - 1);
            }}
            aria-label={t("previous")}
            className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
        )}

        {hasNext && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(activeIndex + 1);
            }}
            aria-label={t("next")}
            className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        )}

        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {renderMedia()}
          <p className="font-inter text-center text-white mt-4 text-lg">
            {title}
          </p>
          {item.description && (
            <p className="font-inter text-center text-white/70 mt-2 text-sm max-w-2xl mx-auto">
              {item.description}
            </p>
          )}
          <p className="font-inter text-center text-white/60 text-sm mt-1">
            {t("of", { current: activeIndex + 1, total: items.length })}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
