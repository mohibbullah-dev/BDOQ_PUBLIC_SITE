"use client";

import { useState } from "react";
import type { ITestimonial } from "@/lib/types";
import { TestimonialReviewCard } from "@/components/home/TestimonialReviewCard";
import { TestimonialReviewModal } from "@/components/shared/TestimonialReviewModal";
import { cn } from "@/lib/cn";

interface IReviewCardProps {
  testimonial: ITestimonial;
  className?: string;
}

export function ReviewCard({ testimonial, className }: IReviewCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TestimonialReviewCard
        testimonial={testimonial}
        onClick={() => setOpen(true)}
        className={cn("min-h-[280px]", className)}
      />
      <TestimonialReviewModal
        testimonial={testimonial}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
