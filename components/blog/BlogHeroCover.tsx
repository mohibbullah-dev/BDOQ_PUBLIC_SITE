"use client";

import { BookOpen, Clock3 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { IBlogPost } from "@/lib/types";
import { getBlogImageGradient } from "@/lib/blog";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";

interface IBlogHeroCoverProps {
  post: IBlogPost;
  readTime: number;
}

export function BlogHeroCover({ post, readTime }: IBlogHeroCoverProps) {
  const t = useTranslations("content.blog");
  const primaryTag = post.tags[0] ?? t("articleFallback");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
      <GradientPlaceholder
        gradient={getBlogImageGradient(post.image)}
        className="h-56 w-full rounded-none md:h-64 lg:h-72"
        label={post.title}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "var(--islamic-pattern)",
          backgroundRepeat: "repeat",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 font-inter text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {primaryTag}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 font-inter text-xs font-semibold text-white backdrop-blur-sm">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {t("minRead", { minutes: readTime })}
          </span>
        </div>

        <div className="rounded-xl border border-white/20 bg-black/35 p-4 backdrop-blur-md">
          <div className="mb-2 flex items-center gap-2 text-white/90">
            <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="font-inter text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs">
              {t("academyBlog")}
            </span>
          </div>
          <p className="line-clamp-3 font-amiri text-lg font-bold leading-snug text-white md:text-xl">
            {post.title}
          </p>
        </div>
      </div>
    </div>
  );
}
