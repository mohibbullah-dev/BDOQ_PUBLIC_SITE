"use client";

import Link from "next/link";
import { Calendar, Clock3 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { IBlogPost } from "@/lib/types";
import {
  formatBlogDate,
  getBlogImageGradient,
  getReadingTimeMinutes,
} from "@/lib/blog";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import type { LocaleType } from "@/i18n/routing";
import { cn } from "@/lib/cn";

interface IBlogRelatedCardProps {
  post: IBlogPost;
  variant?: "compact" | "grid";
}

export function BlogRelatedCard({
  post,
  variant = "compact",
}: IBlogRelatedCardProps) {
  const locale = useLocale() as LocaleType;
  const t = useTranslations("content.blog");
  const primaryTag = post.tags[0] ?? t("articleFallback");
  const minutes = getReadingTimeMinutes(post.content);

  if (variant === "grid") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "site-card group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white",
          "transition-shadow duration-200 hover:shadow-md"
        )}
      >
        <div className="relative overflow-hidden">
          <GradientPlaceholder
            gradient={getBlogImageGradient(post.image)}
            className="h-36 rounded-none"
            label={post.title}
          />
          <span className="absolute bottom-2.5 left-2.5 rounded-md bg-primary-dark/80 px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider text-white">
            {primaryTag}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 font-playfair text-base font-bold text-primary-dark group-hover:text-primary">
            {post.title}
          </h3>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-3 font-body text-[11px] text-text-gray">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3 text-primary" aria-hidden="true" />
              {formatBlogDate(post.publishedAt, locale)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3 w-3 text-primary" aria-hidden="true" />
              {t("minRead", { minutes })}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-3 rounded-xl p-1.5 transition-colors hover:bg-bg-light"
    >
      <GradientPlaceholder
        gradient={getBlogImageGradient(post.image)}
        className="h-14 w-14 shrink-0 rounded-lg"
        label={post.title}
      />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 font-body text-sm font-semibold text-primary-dark transition-colors group-hover:text-primary">
          {post.title}
        </p>
        <p className="mt-1 font-body text-[11px] text-text-gray">
          {formatBlogDate(post.publishedAt, locale)}
        </p>
      </div>
    </Link>
  );
}
