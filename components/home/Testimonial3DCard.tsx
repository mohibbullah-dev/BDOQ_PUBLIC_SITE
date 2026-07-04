import Image from "next/image";
import { Star } from "lucide-react";
import type { ITestimonial } from "@/lib/types";
import { getTestimonialAvatar } from "@/lib/testimonialAvatars";
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
  const avatarSrc = getTestimonialAvatar(testimonial);

  return (
    <figure
      className={cn(
        "w-[260px] shrink-0 rounded-2xl border border-[#1B6B44]/10 bg-white p-4",
        "shadow-[0_12px_40px_rgba(10,22,40,0.12)]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(10,22,40,0.18)]",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src={avatarSrc}
          alt={testimonial.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border-2 border-[#1B6B44]/15 object-cover"
          unoptimized={!avatarSrc.includes("res.cloudinary.com")}
        />
        <div className="min-w-0 text-left">
          <p className="truncate font-inter text-sm font-bold text-[#0D4A2F]">
            {testimonial.name}
          </p>
          <p className="truncate font-inter text-xs text-[#6B7280]">
            {testimonial.location}
          </p>
        </div>
      </div>

      <blockquote className="mt-3 line-clamp-4 font-inter text-[13px] leading-relaxed text-[#1A1A2E]/85">
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
