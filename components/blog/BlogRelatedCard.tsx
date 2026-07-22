"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { useLocale } from "next-intl";
import type { IBlogPost } from "@/lib/types";
import { formatBlogDate, getBlogImageGradient } from "@/lib/blog";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import type { LocaleType } from "@/i18n/routing";

interface IBlogRelatedCardProps {
  post: IBlogPost;
}

export function BlogRelatedCard({ post }: IBlogRelatedCardProps) {
  const locale = useLocale() as LocaleType;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="site-card group flex gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-shadow duration-200 hover:shadow-md"
    >
      <GradientPlaceholder
        gradient={getBlogImageGradient(post.image)}
        className="h-16 w-16 shrink-0 rounded-lg"
        label={post.title}
      />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 font-body text-sm font-semibold text-primary-dark transition-colors group-hover:text-primary">
          {post.title}
        </p>
        <p className="mt-1 flex items-center gap-1 font-body text-[11px] text-text-gray">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          {formatBlogDate(post.publishedAt, locale)}
        </p>
      </div>
      <ArrowRight
        className="mt-1 h-4 w-4 shrink-0 text-text-gray transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        aria-hidden="true"
      />
    </Link>
  );
}
