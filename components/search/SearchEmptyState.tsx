"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

interface ISearchEmptyStateProps {
  query: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function SearchEmptyState({
  query,
  title,
  description,
  ctaHref = "/free-class",
  ctaLabel,
}: ISearchEmptyStateProps) {
  const t = useTranslations("search");
  const tCta = useTranslations("cta");

  const resolvedTitle = title ?? t("noResults");
  const defaultDescription = query
    ? t("noResultsQuery", { query })
    : t("noResultsFilter");
  const resolvedCtaLabel = ctaLabel ?? tCta("freeTrialClass");

  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 bg-white px-6 py-14 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <SearchX className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-body text-xl font-semibold text-primary-dark">
        {resolvedTitle}
      </h3>
      <p className="mb-6 max-w-md font-body text-sm leading-relaxed text-text-gray">
        {description ?? defaultDescription}
      </p>
      <Link
        href={ctaHref}
        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary-dark"
      >
        {resolvedCtaLabel}
      </Link>
    </div>
  );
}
