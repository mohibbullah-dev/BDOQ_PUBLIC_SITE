"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ICourse } from "@/lib/types";
import { useLocalizedCourse } from "@/lib/i18n/useLocalizedCourse";
import { cn } from "@/lib/cn";

export type CourseCardVariantType = "default" | "featured";

export interface ICourseCardProps {
  course: ICourse;
  variant?: CourseCardVariantType;
}

const GRADIENT_MAP: Record<string, string> = {
  "noorani-qaida": "from-primary to-teal",
  "quran-hifz-male": "from-primary-dark to-primary",
  "quran-hifz-female": "from-teal to-primary-dark",
  "tajweed-male": "from-primary to-primary-dark",
  "tajweed-female": "from-teal-accent/80 to-primary",
  "free-learning": "from-gold/80 to-primary",
};

function getCourseGradient(slug: string): string {
  return GRADIENT_MAP[slug] ?? "from-primary to-teal";
}

export function CourseCard({ course, variant = "default" }: ICourseCardProps) {
  const localized = useLocalizedCourse(course);
  const tCta = useTranslations("cta");
  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        "flex flex-col h-full rounded-2xl bg-white border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        isFeatured
          ? "border-gold shadow-lg ring-2 ring-gold/30"
          : "border-gray-100 shadow-md"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br min-h-[140px]",
          getCourseGradient(course.slug)
        )}
      >
        <span className="text-5xl" role="img" aria-label={localized.title}>
          {course.icon}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6">
        {localized.target && (
          <span className="inline-block self-start rounded-full bg-bg-light px-2.5 py-0.5 text-xs font-medium text-primary mb-3">
            {localized.target}
          </span>
        )}
        <h3 className="font-inter text-lg font-bold text-primary-dark mb-2">
          {localized.title}
        </h3>
        <p className="font-inter text-sm text-text-gray leading-relaxed flex-1 mb-5">
          {localized.description}
        </p>
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 text-sm transition-all duration-300"
        >
          {tCta("enrollNow")}
        </Link>
      </div>
    </article>
  );
}
