import { Star } from "lucide-react";
import type { ITestimonial } from "@/lib/types";
import { ReviewAvatar } from "@/components/shared/ReviewAvatar";
import { TestimonialMedia } from "@/components/shared/TestimonialMedia";
import { cn } from "@/lib/cn";

interface ITestimonial3DCardProps {
  testimonial: ITestimonial;
  className?: string;
}

export function Testimonial3DCard({
  testimonial,
  className,
}: ITestimonial3DCardProps) {
  return (
    <figure
      className={cn(
        "w-[260px] shrink-0 rounded-2xl border border-primary/10 bg-white p-4",
        "shadow-[0_12px_40px_rgba(10,22,40,0.12)]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(10,22,40,0.18)]",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <ReviewAvatar testimonial={testimonial} size={40} />
        <div className="min-w-0 text-left">
          <p className="truncate font-body text-sm font-bold text-primary-dark">
            {testimonial.name}
          </p>
          <p className="truncate font-body text-xs text-text-gray">
            {testimonial.location}
          </p>
        </div>
      </div>

      <blockquote className="mt-3 line-clamp-4 font-body text-[13px] leading-relaxed text-text-dark/85">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      <TestimonialMedia testimonial={testimonial} compact />

      <div className="mt-3 flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: testimonial.rating }, (_, index) => (
          <Star
            key={`${testimonial.id}-star-${index}`}
            className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]"
          />
        ))}
      </div>
    </figure>
  );
}
