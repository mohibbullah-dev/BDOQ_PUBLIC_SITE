"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function BlogEmptyState() {
  const t = useTranslations("content.blog");

  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-bg-light text-primary mb-6">
        <BookOpen className="h-8 w-8" aria-hidden="true" />
      </div>
      <h2 className="font-amiri text-2xl font-bold text-primary-dark mb-3">
        {t("emptyPostsTitle")}
      </h2>
      <p className="font-body text-text-gray max-w-md mx-auto leading-relaxed mb-6">
        {t("emptyPostsDesc")}
      </p>
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary text-white font-semibold px-8 py-3 hover:bg-primary-dark transition-colors"
      >
        {t("returnHome")}
      </Link>
    </div>
  );
}
