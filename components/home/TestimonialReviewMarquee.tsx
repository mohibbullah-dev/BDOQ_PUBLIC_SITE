"use client";

import { useState } from "react";
import type { ITestimonial } from "@/lib/types";
import { Marquee } from "@/components/ui/marquee";
import { TestimonialReviewCard } from "@/components/home/TestimonialReviewCard";
import { TestimonialReviewModal } from "@/components/shared/TestimonialReviewModal";
import { cn } from "@/lib/cn";

const COLUMN_COUNT = 4;
const MIN_PER_COLUMN = 4;

function buildColumns(testimonials: ITestimonial[]): ITestimonial[][] {
  if (testimonials.length === 0) return [];

  const columns: ITestimonial[][] = Array.from(
    { length: COLUMN_COUNT },
    () => []
  );

  testimonials.forEach((testimonial, index) => {
    columns[index % COLUMN_COUNT]!.push(testimonial);
  });

  return columns.map((column) => {
    const seed = column.length > 0 ? column : testimonials;
    const filled = [...seed];
    let i = 0;
    while (filled.length < MIN_PER_COLUMN) {
      filled.push(seed[i % seed.length]!);
      i += 1;
    }
    return filled;
  });
}

interface ITestimonialReviewMarqueeProps {
  testimonials: ITestimonial[];
  className?: string;
}

/** Straight multi-column marquee — subtle bottom → top scroll, clickable cards */
export function TestimonialReviewMarquee({
  testimonials,
  className,
}: ITestimonialReviewMarqueeProps) {
  const [activeReview, setActiveReview] = useState<ITestimonial | null>(null);
  const columns = buildColumns(testimonials);

  if (columns.length === 0) return null;

  return (
    <>
      <div
        className={cn(
          "relative mx-auto flex h-[400px] w-full max-w-6xl items-center justify-center overflow-hidden sm:h-[440px] md:h-[500px] lg:h-[520px]",
          "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
          className
        )}
        role="region"
        aria-label="Student reviews"
      >
        <div className="flex w-full items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {columns.map((column, columnIndex) => (
            <Marquee
              key={`review-marquee-${columnIndex}`}
              vertical
              pauseOnHover
              repeat={2}
              durationSeconds={85 + columnIndex * 12}
              className={cn(
                "h-[680px] w-[260px] [--gap:1.25rem] sm:w-[280px] md:w-[300px] lg:w-[320px]",
                columnIndex < 2 ? "flex" : "hidden",
                columnIndex === 2 && "md:flex",
                columnIndex === 3 && "lg:flex",
                columnIndex % 2 === 1 && "-mt-8 sm:-mt-10 md:-mt-12"
              )}
            >
              {column.map((testimonial, itemIndex) => (
                <TestimonialReviewCard
                  key={`${testimonial.id}-${columnIndex}-${itemIndex}`}
                  testimonial={testimonial}
                  onClick={() => setActiveReview(testimonial)}
                  className="min-h-[260px] w-full shrink-0"
                />
              ))}
            </Marquee>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent sm:h-16"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent sm:h-16"
          aria-hidden="true"
        />
      </div>

      <TestimonialReviewModal
        testimonial={activeReview}
        isOpen={activeReview !== null}
        onClose={() => setActiveReview(null)}
      />
    </>
  );
}
