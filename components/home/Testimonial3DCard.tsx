import { Quote, Star } from "lucide-react";
import type { ITestimonial } from "@/lib/types";
import { resolveCountryCode } from "@/lib/resolveCountryCode";
import { ReviewAvatar } from "@/components/shared/ReviewAvatar";
import { CountryFlag } from "@/components/shared/CountryFlag";
import { cn } from "@/lib/cn";

interface ITestimonial3DCardProps {
  testimonial: ITestimonial;
  className?: string;
}

export function Testimonial3DCard({
  testimonial,
  className,
}: ITestimonial3DCardProps) {
  const rating = Math.min(5, Math.max(1, testimonial.rating || 5));
  const flagCode = resolveCountryCode(testimonial.location);
  const locationLabel = [testimonial.role, testimonial.location]
    .filter(Boolean)
    .join(" · ");

  return (
    <figure
      className={cn(
        "site-card flex w-[240px] shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-4 sm:w-[260px]",
        "shadow-[0_10px_28px_-20px_rgba(15,23,42,0.16)]",
        "transition-shadow duration-300 hover:shadow-[0_14px_32px_-18px_rgba(38,155,111,0.22)]",
        className
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div
          className="flex items-center gap-0.5"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, starIndex) => (
            <Star
              key={`${testimonial.id}-star-${starIndex}`}
              className={cn(
                "h-3.5 w-3.5",
                starIndex < rating
                  ? "fill-[#D4A853] text-[#D4A853]"
                  : "fill-none text-gray-200"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <Quote
          className="h-5 w-5 shrink-0 text-primary/35"
          aria-hidden="true"
        />
      </div>

      <blockquote className="line-clamp-4 flex-1 font-body text-sm leading-relaxed text-text-gray">
        {testimonial.content}
      </blockquote>

      <figcaption className="mt-4 flex items-center gap-2.5 border-t border-gray-100 pt-3">
        <ReviewAvatar testimonial={testimonial} size={36} />
        <div className="min-w-0">
          <p className="truncate font-body text-sm font-semibold text-primary-dark">
            {testimonial.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate font-body text-[11px] text-text-gray">
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
      </figcaption>
    </figure>
  );
}
