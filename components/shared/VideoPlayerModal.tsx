"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Play, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { ACADEMY_INFO } from "@/lib/constants";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { cn } from "@/lib/cn";

export interface IVideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
  description?: string;
  startSeconds?: number;
}

export function VideoPlayerModal({
  isOpen,
  onClose,
  videoId,
  title,
  description,
  startSeconds,
}: IVideoPlayerModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  const youtubeWatchUrl =
    startSeconds !== undefined && startSeconds > 0
      ? `https://www.youtube.com/watch?v=${videoId}&t=${startSeconds}s`
      : `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1628]/85 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Video: ${title}`}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10",
              "bg-white shadow-[0_32px_80px_-20px_rgba(0,0,0,0.55)] sm:rounded-3xl"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-on-dark relative overflow-hidden bg-[linear-gradient(135deg,#0D4A2F_0%,#1B6B44_55%,#0D9488_100%)] px-5 py-5 text-white sm:px-6 sm:py-6">
              <div
                className="pointer-events-none absolute inset-0 opacity-100"
                style={{
                  backgroundImage: "var(--islamic-pattern)",
                  backgroundRepeat: "repeat",
                  backgroundSize: "60px 60px",
                }}
                aria-hidden="true"
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm sm:h-12 sm:w-12">
                    <Play
                      className="ml-0.5 h-5 w-5 text-white"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                      {ACADEMY_INFO.shortName} · Academy Video
                    </p>
                    <p className="mt-1 font-inter text-xl font-bold leading-snug text-white sm:text-2xl">
                      {title}
                    </p>
                    {description && (
                      <p className="mt-2 line-clamp-2 font-inter text-sm leading-relaxed text-white/80">
                        {description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close video"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="bg-[#0A1628] p-3 sm:p-4">
              <YouTubeEmbed
                key={videoId}
                videoId={videoId}
                title={title}
                lazy={false}
                autoplay
                startSeconds={startSeconds}
                className="rounded-xl sm:rounded-2xl"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-white px-4 py-4 sm:px-6">
              <p className="font-inter text-xs text-text-gray sm:text-sm">
                Press{" "}
                <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary-dark">
                  Esc
                </kbd>{" "}
                to close
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-gray-200 px-4 py-2",
                    "font-inter text-sm font-semibold text-text-dark transition-colors hover:border-primary hover:text-primary"
                  )}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  YouTube
                </a>
                <Link
                  href="/free-class"
                  onClick={onClose}
                  className={cn(
                    "inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-primary px-5 py-2",
                    "font-inter text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  )}
                >
                  Book free trial class
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
