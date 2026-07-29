"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, Play, Quote, Star, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { ITestimonial } from "@/lib/types";
import { ReviewAvatar } from "@/components/shared/ReviewAvatar";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { cn } from "@/lib/cn";

interface ITestimonialReviewModalProps {
  testimonial: ITestimonial | null;
  isOpen: boolean;
  onClose: () => void;
}

function getVideoSource(
  testimonial: ITestimonial
): { type: "youtube"; id: string } | { type: "url"; url: string } | null {
  if (testimonial.youtubeId?.trim()) {
    return { type: "youtube", id: testimonial.youtubeId.trim() };
  }
  if (testimonial.mediaType === "video" && testimonial.mediaUrl?.trim()) {
    return { type: "url", url: testimonial.mediaUrl.trim() };
  }
  return null;
}

export function TestimonialReviewModal({
  testimonial,
  isOpen,
  onClose,
}: ITestimonialReviewModalProps) {
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

  if (!testimonial) return null;

  const rating = Math.min(5, Math.max(1, testimonial.rating || 5));
  const mediaType = testimonial.mediaType ?? "text";
  const videoSource = getVideoSource(testimonial);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1628]/85 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Review by ${testimonial.name}`}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10",
              "bg-white shadow-[0_32px_80px_-20px_rgba(0,0,0,0.55)] sm:rounded-3xl"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative shrink-0 bg-[var(--green-primary)] px-5 py-5 text-white sm:px-6">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close review"
                className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-4 pr-12">
                <ReviewAvatar testimonial={testimonial} size={56} />
                <div className="min-w-0">
                  <p className="font-body text-lg font-bold text-white sm:text-xl">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 font-body text-sm text-white/80">
                    {testimonial.role} · {testimonial.location}
                  </p>
                  <div
                    className="mt-2 flex items-center gap-0.5"
                    aria-label={`${rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={`modal-star-${index}`}
                        className={cn(
                          "size-4",
                          index < rating
                            ? "fill-[#D4A853] text-[#D4A853]"
                            : "fill-none text-white/30"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {mediaType === "video" && videoSource ? (
                <div className="bg-[#0A1628] p-3 sm:p-4">
                  {videoSource.type === "youtube" ? (
                    <YouTubeEmbed
                      key={videoSource.id}
                      videoId={videoSource.id}
                      title={`${testimonial.name} — video review`}
                      lazy={false}
                      autoplay
                      className="rounded-xl sm:rounded-2xl"
                    />
                  ) : (
                    <video
                      key={videoSource.url}
                      controls
                      autoPlay
                      playsInline
                      className="aspect-video w-full rounded-xl bg-black sm:rounded-2xl"
                      src={videoSource.url}
                    >
                      Your browser does not support video playback.
                    </video>
                  )}
                </div>
              ) : null}

              {mediaType === "audio" && testimonial.mediaUrl ? (
                <div className="border-b border-gray-100 bg-[#F0FBF6] px-5 py-6 sm:px-8">
                  <div className="mb-3 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-wide text-primary">
                    <Mic className="size-4" aria-hidden="true" />
                    Audio review
                  </div>
                  <audio
                    controls
                    autoPlay
                    preload="metadata"
                    src={testimonial.mediaUrl}
                    className="w-full"
                  >
                    Your browser does not support audio playback.
                  </audio>
                </div>
              ) : null}

              <div className="px-5 py-6 sm:px-8 sm:py-8">
                {mediaType === "text" ? (
                  <Quote
                    className="mb-4 size-8 text-primary/30"
                    aria-hidden="true"
                  />
                ) : null}
                <blockquote className="font-playfair text-lg italic leading-relaxed text-text-dark/95 sm:text-xl sm:leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-5 py-3 sm:px-6">
              <p className="font-body text-xs text-text-gray">
                Press{" "}
                <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary-dark">
                  Esc
                </kbd>{" "}
                to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function getTestimonialVideoThumbnail(
  testimonial: ITestimonial
): string | null {
  if (testimonial.youtubeId?.trim()) {
    return `https://img.youtube.com/vi/${testimonial.youtubeId.trim()}/mqdefault.jpg`;
  }
  return null;
}
