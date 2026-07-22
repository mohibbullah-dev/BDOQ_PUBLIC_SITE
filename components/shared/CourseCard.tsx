"use client";

import { useTranslations } from "next-intl";
import type { ICourse } from "@/lib/types";
import { useLocalizedCourse } from "@/lib/i18n/useLocalizedCourse";
import { SiteCta } from "@/components/shared/SiteCta";
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
        "site-card group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-shadow duration-200 hover:shadow-md",
        isFeatured
          ? "border-primary/30 shadow-sm ring-1 ring-primary/20"
          : "border-gray-200"
      )}
    >
      <div
        className={cn(
          "relative z-[1] flex min-h-[140px] items-center justify-center bg-gradient-to-br",
          getCourseGradient(course.slug)
        )}
      >
        <span className="text-5xl" role="img" aria-label={localized.title}>
          {course.icon}
        </span>
      </div>

      <div className="relative z-[1] flex flex-1 flex-col p-6">
        {localized.target && (
          <span className="inline-block self-start rounded-full bg-bg-light px-2.5 py-0.5 text-xs font-medium text-primary mb-3">
            {localized.target}
          </span>
        )}
        <h3 className="mb-2 font-playfair text-lg font-bold tracking-tight text-primary-dark">
          {localized.title}
        </h3>
        <p className="mb-5 flex-1 font-body text-sm leading-relaxed text-text-gray">
          {localized.description}
        </p>
        <SiteCta
          href={`/courses/${course.slug}`}
          variant="primary"
          size="sm"
          className="w-full"
        >
          {tCta("enrollNow")}
        </SiteCta>
      </div>
    </article>
  );
}
