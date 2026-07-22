import { Star } from "lucide-react";
import type { ITestimonial } from "@/lib/types";
import { ReviewAvatar } from "@/components/shared/ReviewAvatar";
import { cn } from "@/lib/cn";

interface ITestimonialMarqueeCardProps {
  testimonial: ITestimonial;
  className?: string;
}

export function TestimonialMarqueeCard({
  testimonial,
  className,
}: ITestimonialMarqueeCardProps) {
  return (
    <figure
      className={cn(
        "site-card relative flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 sm:w-[340px] sm:p-6",
        "transition-shadow duration-200 hover:shadow-md",
        className
      )}
    >
      <div
        className="mb-3 flex items-center gap-1"
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

      <blockquote className="line-clamp-4 flex-1 font-playfair text-[15px] italic leading-relaxed text-text-dark/90">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-primary/10 pt-4">
        <ReviewAvatar testimonial={testimonial} size={44} />
        <div className="min-w-0 text-left">
          <p className="truncate font-body text-sm font-bold text-primary-dark">
            {testimonial.name}
          </p>
          <p className="truncate font-body text-xs text-text-gray">
            {testimonial.location}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
