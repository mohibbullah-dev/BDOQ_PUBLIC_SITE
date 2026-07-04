"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ICoursesEmptyStateProps {
  categoryLabel: string;
}

export function CoursesEmptyState({ categoryLabel }: ICoursesEmptyStateProps) {
  const t = useTranslations("content.courses.empty");
  const tCta = useTranslations("cta");

  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 bg-bg-light px-6 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <BookOpen className="h-10 w-10 text-primary" aria-hidden="true" />
      </div>
      <h3 className="font-inter text-xl font-semibold text-primary-dark mb-3">
        {t("title")}
      </h3>
      <p className="font-inter text-sm text-text-gray max-w-md mb-6 leading-relaxed">
        {t("description", { category: categoryLabel })}
      </p>
      <Link
        href="/free-class"
        className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 transition-all duration-300"
      >
        {tCta("bookFreeTrial")}
      </Link>
    </div>
  );
}
