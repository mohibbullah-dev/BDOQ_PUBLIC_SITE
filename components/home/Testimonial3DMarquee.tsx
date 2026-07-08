"use client";

import type { ITestimonial } from "@/lib/types";
import { Marquee } from "@/components/ui/marquee";
import { Testimonial3DCard } from "@/components/home/Testimonial3DCard";
import { cn } from "@/lib/cn";

const COLUMN_COUNT = 4;

function buildColumns(testimonials: ITestimonial[]): ITestimonial[][] {
  const columns: ITestimonial[][] = Array.from(
    { length: COLUMN_COUNT },
    () => []
  );

  testimonials.forEach((testimonial, index) => {
    columns[index % COLUMN_COUNT].push(testimonial);
  });

  return columns.map((column) =>
    column.length > 0 ? [...column, ...column, ...column] : column
  );
}

interface ITestimonial3DMarqueeProps {
  testimonials: ITestimonial[];
  className?: string;
}

export function Testimonial3DMarquee({
  testimonials,
  className,
}: ITestimonial3DMarqueeProps) {
  const columns = buildColumns(testimonials);

  return (
    <div
      className={cn(
        "relative mx-auto flex h-[420px] w-full max-w-full items-center justify-center overflow-hidden md:h-[480px]",
        "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent),linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center gap-4 md:gap-5",
          "[perspective:1200px] [transform-style:preserve-3d]"
        )}
      >
        <div
          className={cn(
            "flex flex-row items-center justify-center gap-4 md:gap-5",
            "[transform-style:preserve-3d]",
            "[transform:rotateX(28deg)_rotateZ(-10deg)_scale(0.92)]",
            "md:[transform:rotateX(32deg)_rotateZ(-12deg)_scale(0.95)]"
          )}
        >
          {columns.map((column, columnIndex) => (
            <Marquee
              key={`testimonial-column-${columnIndex}`}
              vertical
              reverse={columnIndex % 2 === 1}
              pauseOnHover
              repeat={2}
              durationSeconds={42 + columnIndex * 6}
              className={cn(
                "h-[560px] w-[260px] [--gap:1rem]",
                columnIndex % 2 === 0 ? "mt-0" : "-mt-10 md:-mt-14"
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(13,74,47,0.85),transparent)]"
        aria-hidden="true"
      />
    </div>
  );
}
