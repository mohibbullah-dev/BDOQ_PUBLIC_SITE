"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock3,
  User,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { IBlogPost } from "@/lib/types";
import {
  formatBlogDate,
  getBlogImageGradient,
  getReadingTimeMinutes,
} from "@/lib/blog";
import type { LocaleType } from "@/i18n/routing";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import { cn } from "@/lib/cn";

interface IBlogCardProps {
  post: IBlogPost;
}

export function BlogCard({ post }: IBlogCardProps) {
  const locale = useLocale() as LocaleType;
  const t = useTranslations("content.blog");
  const primaryTag = post.tags[0] ?? t("articleFallback");
  const minutes = getReadingTimeMinutes(post.content);

  return (
    <article
      className={cn(
        "site-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white",
        "transition-shadow duration-200 hover:shadow-md"
      )}
    >
      <Link href={`/blog/${post.slug}`} className="relative z-[1] block">
        <div className="relative overflow-hidden rounded-t-2xl">
          <GradientPlaceholder
            gradient={getBlogImageGradient(post.image)}
            className="h-44 rounded-none transition-opacity group-hover:opacity-95"
            label={post.title}
          />
          <span className="absolute left-3 top-3 rounded-md bg-primary-dark/80 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {primaryTag}
          </span>
        </div>
      </Link>

      <div className="relative z-[1] flex flex-1 flex-col p-5">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="line-clamp-2 font-playfair text-lg font-bold text-primary-dark transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-3 flex-1 font-body text-sm leading-relaxed text-text-gray">
          {post.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-body text-xs text-text-gray">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {formatBlogDate(post.publishedAt, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="line-clamp-1 max-w-[10rem]">{post.author}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {t("minRead", { minutes })}
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex min-h-10 items-center gap-1.5 font-body text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          {t("readMore")}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
