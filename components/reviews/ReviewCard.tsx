import Image from "next/image";
import { Star } from "lucide-react";
import type { ITestimonial } from "@/lib/types";
import { cn } from "@/lib/cn";

interface IReviewCardProps {
  testimonial: ITestimonial;
  className?: string;
}

import { getTestimonialAvatar } from "@/lib/testimonialAvatars";
import { TestimonialMedia } from "@/components/shared/TestimonialMedia";

export function ReviewCard({ testimonial, className }: IReviewCardProps) {
  const avatarSrc = getTestimonialAvatar(testimonial);

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6",
        "shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      <div
        className="mb-4 flex items-center gap-1"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: testimonial.rating }, (_, index) => (
          <Star
            key={`${testimonial.id}-star-${index}`}
            className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]"
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="flex-1 font-playfair text-base italic leading-relaxed text-[#1A1A2E]/90">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      <TestimonialMedia testimonial={testimonial} />

      <div className="mt-6 flex items-center gap-3 border-t border-[#32C991]/10 pt-5">
        <Image
          src={avatarSrc}
          alt={testimonial.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border-2 border-[#32C991]/15 object-cover"
          unoptimized={!avatarSrc.includes("res.cloudinary.com")}
        />
        <div className="min-w-0">
          <p className="font-inter text-sm font-bold text-[#269B6F]">
            {testimonial.name}
          </p>
          <p className="font-inter text-xs text-[#6B7280]">
            {testimonial.role}
          </p>
          <p className="font-inter text-xs font-medium text-[#32C991]">
            {testimonial.location}
          </p>
        </div>
      </div>
    </article>
  );
}
