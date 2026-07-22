import { Star } from "lucide-react";
import type { ITestimonial } from "@/lib/types";
import { ReviewAvatar } from "@/components/shared/ReviewAvatar";
import { TestimonialMedia } from "@/components/shared/TestimonialMedia";
import { cn } from "@/lib/cn";

interface IReviewCardProps {
  testimonial: ITestimonial;
  className?: string;
}

export function ReviewCard({ testimonial, className }: IReviewCardProps) {
  return (
    <article
      className={cn(
        "site-card flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6",
        "transition-shadow duration-200 hover:shadow-md",
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

      <blockquote className="flex-1 font-playfair text-base italic leading-relaxed text-text-dark/90">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      <TestimonialMedia testimonial={testimonial} />

      <div className="mt-6 flex items-center gap-3 border-t border-primary/10 pt-5">
        <ReviewAvatar testimonial={testimonial} size={48} />
        <div className="min-w-0">
          <p className="font-body text-sm font-bold text-primary-dark">
            {testimonial.name}
          </p>
          <p className="font-body text-xs text-text-gray">{testimonial.role}</p>
          <p className="font-body text-xs font-medium text-primary">
            {testimonial.location}
          </p>
        </div>
      </div>
    </article>
  );
}
