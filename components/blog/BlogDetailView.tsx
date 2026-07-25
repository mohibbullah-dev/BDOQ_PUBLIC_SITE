"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock3,
  Landmark,
  PenLine,
  Quote,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { IBlogPost } from "@/lib/types";
import type { LocaleType } from "@/i18n/routing";
import {
  formatBlogDate,
  getAuthorInitials,
  getBlogImageGradient,
  getContentHeadings,
  getReadingTimeMinutes,
} from "@/lib/blog";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import { BlogNewsletterCard } from "@/components/blog/BlogNewsletterCard";
import { BlogReadingProgress } from "@/components/blog/BlogReadingProgress";
import { BlogRelatedCard } from "@/components/blog/BlogRelatedCard";
import { BlogShareBar } from "@/components/blog/BlogShareBar";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";

interface IBlogDetailViewProps {
  post: IBlogPost;
  relatedPosts: IBlogPost[];
  popularPosts: IBlogPost[];
  prevPost: IBlogPost | null;
  nextPost: IBlogPost | null;
}

export function BlogDetailView({
  post,
  relatedPosts,
  popularPosts,
  prevPost,
  nextPost,
}: IBlogDetailViewProps) {
  const locale = useLocale() as LocaleType;
  const t = useTranslations("content.blog");
  const headings = getContentHeadings(post.content);
  const readTime = getReadingTimeMinutes(post.content);
  const authorInitials = getAuthorInitials(post.author);
  const primaryTag = post.tags[0] ?? t("articleFallback");

  return (
    <>
      <BlogReadingProgress />

      <section className="relative overflow-hidden border-b border-primary/10 bg-[#FCFBF7]">
        <IslamicShapeBackdrop overlay="page" className="opacity-65" />
        <Image
          src="/brand/footer-lantern.svg"
          alt=""
          width={64}
          height={88}
          className="pointer-events-none absolute left-4 top-8 hidden opacity-90 sm:left-10 md:block"
          aria-hidden="true"
        />
        <Image
          src="/brand/footer-lantern.svg"
          alt=""
          width={56}
          height={76}
          className="pointer-events-none absolute right-4 top-10 hidden opacity-75 sm:right-10 md:block"
          aria-hidden="true"
        />

        <div className="site-container relative z-[1] pb-12 pt-8 text-center md:pb-16 md:pt-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 font-body text-sm text-text-gray">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  {t("home")}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-primary"
                >
                  {t("blog")}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <span className="text-primary">{primaryTag}</span>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="line-clamp-1 max-w-[14rem] text-primary-dark sm:max-w-xs">
                {post.title}
              </li>
            </ol>
          </nav>

          <span className="inline-flex rounded-full bg-primary px-3.5 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-white">
            {primaryTag}
          </span>

          <h1 className="mx-auto mt-4 max-w-4xl font-playfair text-3xl font-bold leading-tight text-primary-dark md:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-text-gray md:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 font-body text-sm text-text-gray">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {authorInitials}
              </span>
              <span className="font-semibold text-primary-dark">
                {post.author}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
              {formatBlogDate(post.publishedAt, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
              {t("minRead", { minutes: readTime })}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-14">
        <div className="site-container">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-12">
            <article className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <GradientPlaceholder
                  gradient={getBlogImageGradient(post.image)}
                  className="aspect-[16/9] w-full rounded-none md:aspect-[2/1]"
                  label={post.title}
                />
              </div>

              <blockquote className="mt-8 rounded-2xl border border-primary/10 bg-bg-light px-5 py-6 md:px-7 md:py-7">
                <Quote
                  className="h-8 w-8 text-primary/40"
                  aria-hidden="true"
                />
                <p className="mt-3 font-playfair text-lg font-semibold leading-relaxed text-primary-dark md:text-xl">
                  {t("articleQuote")}
                </p>
                <footer className="mt-3 font-body text-sm text-text-gray">
                  — {t("articleQuoteSource")}
                </footer>
              </blockquote>

              <div className="mt-8">
                <BlogArticleBody content={post.content} />
              </div>

              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-primary/15 bg-bg-light px-5 py-5 md:px-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <Landmark className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-playfair text-lg font-bold text-primary-dark">
                    {t("academyCalloutTitle")}
                  </p>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-text-gray">
                    {t("academyCalloutDesc")}
                  </p>
                  <Link
                    href="/free-class"
                    className="mt-3 inline-flex font-body text-sm font-semibold text-primary hover:text-primary-dark"
                  >
                    {t("academyCalloutCta")} →
                  </Link>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-100 pt-8">
                <BlogShareBar post={post} variant="inline" />
              </div>

              {(prevPost || nextPost) && (
                <div className="mt-8 grid gap-4 border-t border-gray-100 pt-8 sm:grid-cols-2">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="site-card group rounded-2xl border border-gray-200 bg-[#FCFBF7] p-5 transition-shadow hover:shadow-md"
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
                      className="site-card group rounded-2xl border border-gray-200 bg-[#FCFBF7] p-5 text-right transition-shadow hover:shadow-md"
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

            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="site-card rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {authorInitials}
                  </span>
                  <div>
                    <p className="font-body text-sm font-semibold text-primary">
                      {post.author}
                    </p>
                    <p className="font-body text-xs text-text-gray">
                      {t("contributor")}
                    </p>
                  </div>
                </div>
                <p className="mt-3 font-body text-sm leading-relaxed text-text-gray">
                  {t("contributorBio")}
                </p>
              </div>

              {headings.length > 0 ? (
                <div className="site-card rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <BlogTableOfContents headings={headings} />
                </div>
              ) : null}

              {popularPosts.length > 0 ? (
                <div className="site-card rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="font-playfair text-lg font-bold text-primary-dark">
                    {t("popularArticles")}
                  </h2>
                  <div className="mt-4 space-y-2">
                    {popularPosts.map((related) => (
                      <BlogRelatedCard
                        key={related.slug}
                        post={related}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              <BlogNewsletterCard />
            </aside>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="border-t border-gray-100 bg-[#FCFBF7] py-12 md:py-16">
          <div className="site-container">
            <h2 className="mb-7 text-center font-playfair text-2xl font-bold text-primary-dark md:text-3xl">
              ✦ {t("youMayAlsoLike")}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.map((related) => (
                <BlogRelatedCard
                  key={related.slug}
                  post={related}
                  variant="grid"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-10 md:py-14">
        <div className="site-container">
          <div
            className={cn(
              "flex flex-col items-center gap-5 rounded-2xl border border-primary/10 bg-bg-light",
              "px-5 py-6 text-center sm:flex-row sm:justify-between sm:px-8 sm:py-7 sm:text-left"
            )}
          >
            <div className="flex items-start gap-4">
              <span className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/25 sm:mx-0">
                <PenLine className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-playfair text-xl font-bold text-primary-dark md:text-2xl">
                  {t("shareStoryTitle")}
                </h2>
                <p className="mt-1 font-body text-sm leading-relaxed text-text-gray">
                  {t("shareStoryDesc")}
                </p>
              </div>
            </div>
            <SiteCta href="/contact" size="sm" className="shrink-0">
              <PenLine className="h-4 w-4" aria-hidden="true" />
              {t("shareStoryCta")}
            </SiteCta>
          </div>
        </div>
      </section>
    </>
  );
}
