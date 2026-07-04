import Image from "next/image";
import { Star } from "lucide-react";
import type { ITestimonial } from "@/lib/types";
import { cn } from "@/lib/cn";

interface ITestimonialMarqueeCardProps {
  testimonial: ITestimonial;
  className?: string;
}

import { getTestimonialAvatar } from "@/lib/testimonialAvatars";

export function TestimonialMarqueeCard({
  testimonial,
  className,
}: ITestimonialMarqueeCardProps) {
  const avatarSrc = getTestimonialAvatar(testimonial);

  return (
    <figure
      className={cn(
        "relative w-[340px] shrink-0 overflow-hidden rounded-2xl border border-white/20",
        "bg-white/95 p-6 shadow-[0_20px_50px_rgba(10,22,40,0.18)] backdrop-blur-sm",
        "transition-transform duration-300 hover:-translate-y-1",
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

      <blockquote className="font-playfair text-[15px] italic leading-relaxed text-[#1A1A2E]/90">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-[#1B6B44]/10 pt-4">
        <Image
          src={avatarSrc}
          alt={testimonial.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border-2 border-[#1B6B44]/15 object-cover"
          unoptimized={avatarSrc.includes("res.cloudinary.com") === false}
        />
        <div className="min-w-0 text-left">
          <p className="truncate font-inter text-sm font-bold text-[#0D4A2F]">
            {testimonial.name}
          </p>
          <p className="truncate font-inter text-xs text-[#6B7280]">
            {testimonial.location}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
