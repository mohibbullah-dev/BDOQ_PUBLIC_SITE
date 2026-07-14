"use client";

import { useState } from "react";
import { Mic, Play } from "lucide-react";
import type { ITestimonial } from "@/lib/types";
import { VideoPlayerModal } from "@/components/shared/VideoPlayerModal";
import { cn } from "@/lib/cn";

interface ITestimonialMediaProps {
  testimonial: ITestimonial;
  compact?: boolean;
  className?: string;
}

export function TestimonialMedia({
  testimonial,
  compact = false,
  className,
}: ITestimonialMediaProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const mediaType = testimonial.mediaType ?? "text";

  if (mediaType === "audio" && testimonial.mediaUrl) {
    return (
      <div className={cn("mt-3", className)}>
        <div className="mb-2 flex items-center gap-1.5 font-inter text-[11px] font-semibold uppercase tracking-wide text-[#32C991]">
          <Mic className="h-3.5 w-3.5" aria-hidden="true" />
          Audio review
        </div>
        <audio
          controls
          preload="none"
          src={testimonial.mediaUrl}
          className={cn("w-full rounded-xl", compact ? "h-8" : "h-10")}
        >
          Your browser does not support audio playback.
        </audio>
      </div>
    );
  }

  if (mediaType === "video" && testimonial.youtubeId) {
    return (
      <>
        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          className={cn(
            "group relative mt-3 flex w-full items-center justify-center gap-2 rounded-xl",
            "border border-[#32C991]/15 bg-[#E8FAF2] px-3 py-2.5",
            "font-inter text-xs font-semibold text-[#32C991]",
            "transition-colors hover:bg-[#E8FAF2]",
            className
          )}
        >
          <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
            <span
              className="absolute inset-0 rounded-full bg-[var(--green-primary)] animate-ping opacity-30"
              aria-hidden="true"
            />
            <span className="relative flex size-6 items-center justify-center rounded-full bg-white text-[var(--green-primary)] shadow-sm ring-1 ring-[var(--green-primary)]/20">
              <Play className="ml-px size-3 fill-current" aria-hidden="true" />
            </span>
          </span>
          Watch video review
        </button>
        <VideoPlayerModal
          isOpen={videoOpen}
          onClose={() => setVideoOpen(false)}
          videoId={testimonial.youtubeId}
          title={`${testimonial.name} — video review`}
        />
      </>
    );
  }

  return null;
}
