"use client";

import Image from "next/image";
import { Mic, Play, Quote, Star } from "lucide-react";
import type { ITestimonial } from "@/lib/types";
import { resolveCountryCode } from "@/lib/resolveCountryCode";
import { ReviewAvatar } from "@/components/shared/ReviewAvatar";
import { CountryFlag } from "@/components/shared/CountryFlag";
import { getTestimonialVideoThumbnail } from "@/components/shared/TestimonialReviewModal";
import { cn } from "@/lib/cn";

interface ITestimonialReviewCardProps {
  testimonial: ITestimonial;
  onClick: () => void;
  className?: string;
}

export function TestimonialReviewCard({
  testimonial,
  onClick,
  className,
}: ITestimonialReviewCardProps) {
  const rating = Math.min(5, Math.max(1, testimonial.rating || 5));
  const flagCode = resolveCountryCode(testimonial.location);
  const mediaType = testimonial.mediaType ?? "text";
  const locationLabel = [testimonial.role, testimonial.location]
    .filter(Boolean)
    .join(" · ");
  const videoThumbnail = getTestimonialVideoThumbnail(testimonial);

  function handleKeyDown(e: React.KeyboardEvent): void {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full shrink-0 cursor-pointer flex-col rounded-2xl border border-gray-100 bg-white p-5 text-left sm:p-6",
        "shadow-[0_10px_28px_-20px_rgba(15,23,42,0.16)]",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20",
        "hover:shadow-[0_16px_40px_-18px_rgba(38,155,111,0.24)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className="flex items-center gap-0.5"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, starIndex) => (
            <Star
              key={`${testimonial.id}-star-${starIndex}`}
              className={cn(
                "size-4",
                starIndex < rating
                  ? "fill-[#D4A853] text-[#D4A853]"
                  : "fill-none text-gray-200"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <Quote
          className="size-6 shrink-0 text-primary/30"
          aria-hidden="true"
        />
      </div>

      {mediaType === "video" ? (
        <div className="relative mb-4 overflow-hidden rounded-xl bg-[#E8FAF2]">
          {videoThumbnail ? (
            <Image
              src={videoThumbnail}
              alt=""
              width={640}
              height={360}
              className="aspect-video w-full object-cover"
              unoptimized
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-[#E8FAF2] to-[#D1F5E8]">
              <Play className="size-10 text-primary/40" aria-hidden="true" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-lg">
              <Play className="ml-0.5 size-5 fill-current" aria-hidden="true" />
            </span>
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-primary-dark">
            Video
          </span>
        </div>
      ) : null}

      {mediaType === "audio" ? (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-primary/15 bg-[#F0FBF6] px-4 py-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Mic className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-body text-sm font-semibold text-primary-dark">
              Audio review
            </p>
            <p className="font-body text-xs text-text-dark/70">Tap to listen</p>
          </div>
        </div>
      ) : null}

      <blockquote className="line-clamp-4 flex-1 font-body text-[15px] leading-relaxed text-text-dark/90 sm:text-base sm:leading-relaxed">
        {testimonial.content}
      </blockquote>

      <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
        <ReviewAvatar testimonial={testimonial} size={44} />
        <div className="min-w-0">
          <p className="truncate font-body text-sm font-semibold text-primary-dark sm:text-base">
            {testimonial.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate font-body text-xs text-text-dark sm:text-sm">
            {flagCode ? (
              <CountryFlag
                code={flagCode}
                name={testimonial.location}
                size="sm"
              />
            ) : null}
            <span className="truncate">{locationLabel}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
