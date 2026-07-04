"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ICourse } from "@/lib/types";

interface ICourseHeroProps {
  course: ICourse;
}

export function CourseHero({ course }: ICourseHeroProps) {
  const t = useTranslations("courseDetails.ui.breadcrumb");

  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/80 to-teal/70"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: "var(--islamic-pattern)",
          backgroundRepeat: "repeat",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 font-inter text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                {t("home")}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link
                href="/courses"
                className="hover:text-white transition-colors"
              >
                {t("courses")}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="text-white font-medium">{course.title}</li>
          </ol>
        </nav>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl" role="img" aria-label={course.title}>
            {course.icon}
          </span>
          {course.target && (
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
              {course.target}
            </span>
          )}
        </div>

        <h1 className="font-amiri text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
          {course.title}
        </h1>
        <p className="font-inter text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
          {course.description}
        </p>
      </div>
    </section>
  );
}
