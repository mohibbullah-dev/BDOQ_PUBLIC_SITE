"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock3,
  User,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { IBlogPost } from "@/lib/types";
import type { LocaleType } from "@/i18n/routing";
import {
  formatBlogDate,
  getAuthorInitials,
  getContentHeadings,
  getReadingTimeMinutes,
} from "@/lib/blog";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import { BlogHeroCover } from "@/components/blog/BlogHeroCover";
import { BlogReadingProgress } from "@/components/blog/BlogReadingProgress";
import { BlogRelatedCard } from "@/components/blog/BlogRelatedCard";
import { BlogShareBar } from "@/components/blog/BlogShareBar";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";

interface IBlogDetailViewProps {
  post: IBlogPost;
  relatedPosts: IBlogPost[];
  prevPost: IBlogPost | null;
  nextPost: IBlogPost | null;
}

export function BlogDetailView({
  post,
  relatedPosts,
  prevPost,
  nextPost,
}: IBlogDetailViewProps) {
  const locale = useLocale() as LocaleType;
  const t = useTranslations("content.blog");
  const tCta = useTranslations("cta");
  const headings = getContentHeadings(post.content);
  const readTime = getReadingTimeMinutes(post.content);
  const authorInitials = getAuthorInitials(post.author);

  return (
    <>
      <BlogReadingProgress />

      <section className="relative overflow-hidden border-b border-primary/10 bg-bg-light text-[var(--green-dark)]">
        <IslamicShapeBackdrop overlay="page" />
        <div className="site-container relative z-[1] pb-12 pt-8 md:pb-16 md:pt-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-body text-sm text-[var(--text-gray)]">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[var(--green-primary)]"
                >
                  {t("home")}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-[var(--green-primary)]"
                >
                  {t("blog")}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="line-clamp-1 text-[var(--green-dark)]">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--green-primary)]/20 bg-white px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-[var(--green-dark)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-playfair text-3xl font-bold leading-tight text-[var(--green-dark)] md:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-[var(--text-gray)] md:text-lg">
                {post.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 font-body text-sm text-[var(--text-gray)]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--green-primary)]/15 bg-white px-3 py-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-bold text-white">
                    {authorInitials}
                  </div>
                  <User className="h-4 w-4" aria-hidden="true" />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {formatBlogDate(post.publishedAt, locale)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  {t("minRead", { minutes: readTime })}
                </span>
              </div>
            </div>

            <BlogHeroCover post={post} readTime={readTime} />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-14">
            <article className="min-w-0">
              <BlogArticleBody content={post.content} />

              <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-bg-light px-3 py-1 font-body text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {(prevPost || nextPost) && (
                <div className="mt-10 grid gap-4 border-t border-gray-100 pt-8 sm:grid-cols-2">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="site-card group rounded-2xl border border-gray-200 bg-bg-light/40 p-5 transition-shadow duration-200 hover:shadow-md"
                    >
                      <p className="mb-2 flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-wider text-text-gray">
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("previous")}
                      </p>
                      <p className="line-clamp-2 font-body text-sm font-semibold text-primary-dark group-hover:text-primary">
                        {prevPost.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="site-card group rounded-2xl border border-gray-200 bg-bg-light/40 p-5 text-right transition-shadow duration-200 hover:shadow-md sm:ml-auto"
                    >
                      <p className="mb-2 flex items-center justify-end gap-1 font-body text-xs font-semibold uppercase tracking-wider text-text-gray">
                        {t("next")}
                        <ArrowRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </p>
                      <p className="line-clamp-2 font-body text-sm font-semibold text-primary-dark group-hover:text-primary">
                        {nextPost.title}
                      </p>
                    </Link>
                  ) : null}
                </div>
              )}
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <BlogTableOfContents headings={headings} />
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <BlogShareBar post={post} />
                </div>

                <div className="rounded-2xl border border-gray-100 bg-bg-light/50 p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {authorInitials}
                    </span>
                    <div>
                      <p className="font-body text-sm font-semibold text-primary-dark">
                        {post.author}
                      </p>
                      <p className="font-body text-xs text-text-gray">
                        {t("contributor")}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-text-gray">
                    {t("contributorBio")}
                  </p>
                </div>

                {relatedPosts.length > 0 && (
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 font-body text-lg font-semibold text-primary-dark">
                      <BookOpen
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                      {t("relatedArticles")}
                    </h2>
                    <div className="space-y-3">
                      {relatedPosts.map((related) => (
                        <BlogRelatedCard key={related.slug} post={related} />
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "overflow-hidden rounded-2xl bg-[var(--green-primary)] p-5 text-white shadow-lg"
                  )}
                >
                  <p className="font-body text-lg font-semibold">
                    {t("startLearning")}
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/80">
                    {t("startLearningDesc")}
                  </p>
                  <Link
                    href="/free-class"
                    className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-5 py-2.5 font-body text-sm font-semibold text-primary transition-colors hover:bg-[#E8FAF2]"
                  >
                    {tCta("freeTrialClass")}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
