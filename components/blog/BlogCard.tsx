"use client";

import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { IBlogPost } from "@/lib/types";
import { formatBlogDate, getBlogImageGradient } from "@/lib/blog";
import type { LocaleType } from "@/i18n/routing";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";

interface IBlogCardProps {
  post: IBlogPost;
}

export function BlogCard({ post }: IBlogCardProps) {
  const locale = useLocale() as LocaleType;
  const t = useTranslations("content.blog");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <span className="site-card-hover-overlay z-0" aria-hidden="true" />
      <Link href={`/blog/${post.slug}`} className="block">
        <GradientPlaceholder
          gradient={getBlogImageGradient(post.image)}
          className="h-48 rounded-none group-hover:opacity-95 transition-opacity"
          label={post.title}
        />
      </Link>
      <div className="relative z-[1] flex flex-col flex-1 p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-bg-light px-2.5 py-0.5 font-inter text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-inter text-lg font-semibold text-primary-dark line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="font-inter text-sm text-text-gray leading-relaxed mt-2 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 mt-4 font-inter text-xs text-text-gray">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {formatBlogDate(post.publishedAt, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            {post.author}
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex min-h-[44px] items-center gap-2 mt-4 font-inter text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          {t("readMore")}
          <ArrowRight
            className="h-4 w-4 group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
