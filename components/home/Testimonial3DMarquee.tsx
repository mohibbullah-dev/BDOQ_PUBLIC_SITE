"use client";

import type { ITestimonial } from "@/lib/types";
import { Marquee } from "@/components/ui/marquee";
import { Testimonial3DCard } from "@/components/home/Testimonial3DCard";
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

interface ITestimonial3DMarqueeProps {
  testimonials: ITestimonial[];
  className?: string;
}

/** Skewed multi-column vertical marquee — bottom → top */
export function Testimonial3DMarquee({
  testimonials,
  className,
}: ITestimonial3DMarqueeProps) {
  const columns = buildColumns(testimonials);

  if (columns.length === 0) return null;

  return (
    <div
      className={cn(
        "relative mx-auto flex h-[380px] w-full max-w-full items-center justify-center overflow-hidden sm:h-[420px] md:h-[480px]",
        "[mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent),linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]",
        className
      )}
      role="region"
      aria-label="Student reviews marquee"
    >
      <div
        className={cn(
          "flex w-full items-center justify-center gap-3 md:gap-5",
          "[perspective:1200px] [transform-style:preserve-3d]"
        )}
      >
        <div
          className={cn(
            "flex flex-row items-center justify-center gap-3 md:gap-5",
            "[transform-style:preserve-3d]",
            "[transform:rotateX(22deg)_rotateZ(-8deg)_scale(0.9)]",
            "sm:[transform:rotateX(26deg)_rotateZ(-10deg)_scale(0.92)]",
            "md:[transform:rotateX(30deg)_rotateZ(-12deg)_scale(0.95)]"
          )}
        >
          {columns.map((column, columnIndex) => (
            <Marquee
              key={`testimonial-column-${columnIndex}`}
              vertical
              reverse={columnIndex % 2 === 1}
              pauseOnHover
              repeat={2}
              durationSeconds={38 + columnIndex * 5}
              className={cn(
                "h-[560px] w-[240px] [--gap:0.85rem] sm:w-[260px]",
                columnIndex < 2 ? "flex" : "hidden",
                columnIndex === 2 && "md:flex",
                columnIndex === 3 && "lg:flex",
                columnIndex % 2 === 0 ? "mt-0" : "-mt-8 md:-mt-12"
              )}
            >
              {column.map((testimonial, itemIndex) => (
                <Testimonial3DCard
                  key={`${testimonial.id}-${columnIndex}-${itemIndex}`}
                  testimonial={testimonial}
                />
              ))}
            </Marquee>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
