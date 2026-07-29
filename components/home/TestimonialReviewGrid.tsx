"use client";

import { useState } from "react";
import type { ITestimonial } from "@/lib/types";
import { TestimonialReviewCard } from "@/components/home/TestimonialReviewCard";
import { TestimonialReviewModal } from "@/components/shared/TestimonialReviewModal";
import { cn } from "@/lib/cn";

interface ITestimonialReviewGridProps {
  testimonials: ITestimonial[];
  className?: string;
  limit?: number;
}

export function TestimonialReviewGrid({
  testimonials,
  className,
  limit,
}: ITestimonialReviewGridProps) {
  const [activeReview, setActiveReview] = useState<ITestimonial | null>(null);
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <>
      <div
        className={cn(
          "grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4",
          className
        )}
      >
        {items.map((testimonial) => (
          <TestimonialReviewCard
            key={testimonial.id}
            testimonial={testimonial}
            onClick={() => setActiveReview(testimonial)}
          />
        ))}
      </div>

      <TestimonialReviewModal
        testimonial={activeReview}
        isOpen={activeReview !== null}
        onClose={() => setActiveReview(null)}
      />
    </>
  );
}
