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
        <div className="mb-2 flex items-center gap-1.5 font-inter text-[11px] font-semibold uppercase tracking-wide text-[#1B6B44]">
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
            "mt-3 flex w-full items-center justify-center gap-2 rounded-xl",
            "border border-[#1B6B44]/15 bg-[#F0FBF6] px-3 py-2.5",
            "font-inter text-xs font-semibold text-[#0D4A2F]",
            "transition-colors hover:bg-[#E8F5EE]",
            className
          )}
        >
          <Play className="h-4 w-4 fill-current" aria-hidden="true" />
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
