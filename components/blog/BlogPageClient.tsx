"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LayoutGrid, RefreshCw, Search } from "lucide-react";
import type { IBlogPost } from "@/lib/types";
import {
  formatBlogDate,
  getBlogImageGradient,
} from "@/lib/blog";
import type { LocaleType } from "@/i18n/routing";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { BlogNewsletterCard } from "@/components/blog/BlogNewsletterCard";
import { SearchEmptyState } from "@/components/search/SearchEmptyState";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import { collectBlogTags, filterBlogPosts } from "@/lib/search";
import { cn } from "@/lib/cn";

interface IBlogPageClientProps {
  posts: IBlogPost[];
}

const ALL_TOPICS_ID = "__all__";
const FEATURED_COUNT = 3;

const SEARCH_PLACEHOLDERS = {
  en: "Search articles by title, topic...",
  bn: "শিরোনাম বা বিষয় দিয়ে খুঁজুন...",
} as const;

export function BlogPageClient({ posts }: IBlogPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale() as LocaleType;
  const t = useTranslations("content.blog");
  const tCta = useTranslations("cta");
  const localeKey = locale === "bn" ? "bn" : "en";

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [activeTag, setActiveTag] = useState<string | null>(() =>
    searchParams.get("tag")
  );
  const [showAllFeatured, setShowAllFeatured] = useState(false);

  const tags = useMemo(() => collectBlogTags(posts), [posts]);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
    setActiveTag(searchParams.get("tag"));
  }, [searchParams]);

  const updateUrl = useCallback(
    (query: string, tag: string | null): void => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim()) params.set("q", query.trim());
      else params.delete("q");

      if (tag) params.set("tag", tag);
      else params.delete("tag");

      const queryString = params.toString();
      router.replace(queryString ? `/blog?${queryString}` : "/blog", {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  const handleSearchChange = useCallback(
    (value: string): void => {
      setSearchQuery(value);
      setShowAllFeatured(false);
      updateUrl(value, activeTag);
    },
    [activeTag, updateUrl]
  );

  const handleTagChange = useCallback(
    (tag: string | null): void => {
      setActiveTag(tag);
      setShowAllFeatured(false);
      updateUrl(searchQuery, tag);
    },
    [searchQuery, updateUrl]
  );

  const tagTabs = useMemo(
    () => [
      {
        id: ALL_TOPICS_ID,
        label: t("allTopics"),
        icon: LayoutGrid as typeof LayoutGrid | undefined,
        count: posts.length,
      },
      ...tags.map((tag) => ({
        id: tag,
        label: tag,
        icon: undefined as typeof LayoutGrid | undefined,
        count: posts.filter((post) => post.tags.includes(tag)).length,
      })),
    ],
    [posts, tags, t]
  );

  const filteredPosts = useMemo(
    () =>
      filterBlogPosts(posts, {
        query: searchQuery,
        tag: activeTag,
      }),
    [activeTag, posts, searchQuery]
  );

  const featuredPosts = useMemo(
    () =>
      showAllFeatured
        ? filteredPosts
        : filteredPosts.slice(0, FEATURED_COUNT),
    [filteredPosts, showAllFeatured]
  );

  const morePosts = useMemo(
    () => (showAllFeatured ? [] : filteredPosts.slice(FEATURED_COUNT)),
    [filteredPosts, showAllFeatured]
  );

  const popularPosts = useMemo(
    () =>
      [...posts]
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
        .slice(0, 4),
    [posts]
  );

  if (posts.length === 0) {
    return <BlogEmptyState />;
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {tags.length > 0 ? (
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label={t("filterAria")}
          >
            {tagTabs.map((tab) => {
              const isActive = (activeTag ?? ALL_TOPICS_ID) === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() =>
                    handleTagChange(
                      tab.id === ALL_TOPICS_ID ? null : tab.id
                    )
                  }
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-body text-sm font-semibold transition-all",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "border border-gray-200 bg-white text-primary-dark hover:border-primary/30"
                  )}
                >
                  {Icon ? (
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : null}
                  {tab.label}
                  <span
                    className={cn(
                      "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-bg-light text-primary"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div />
        )}

        <label className="relative w-full max-w-sm shrink-0 lg:ml-auto">
          <span className="sr-only">{t("searchAria")}</span>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray"
            aria-hidden="true"
          />
          <input
            id="blog-search"
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={SEARCH_PLACEHOLDERS[localeKey]}
            className={cn(
              "w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4",
              "font-body text-sm text-primary-dark outline-none",
              "placeholder:text-text-gray/70 focus:border-primary"
            )}
          />
        </label>
      </div>

      {filteredPosts.length === 0 ? (
        <SearchEmptyState
          query={searchQuery || activeTag || ""}
          title={t("noArticles")}
          description={t("noArticlesDesc")}
          ctaHref="/free-class"
          ctaLabel={tCta("freeTrialClass")}
        />
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-10">
            <section>
              <h2 className="mb-5 font-playfair text-xl font-bold text-primary-dark md:text-2xl">
                ✦ {t("featuredArticles")}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {featuredPosts.map((post, index) => (
                  <ScrollReveal key={post.slug} delay={index * 0.05}>
                    <BlogCard post={post} />
                  </ScrollReveal>
                ))}
              </div>

              {!showAllFeatured && filteredPosts.length > FEATURED_COUNT ? (
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAllFeatured(true)}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-white px-6 py-2.5 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    {t("viewAllArticles")}
                  </button>
                </div>
              ) : null}
            </section>

            {morePosts.length > 0 ? (
              <section>
                <h2 className="mb-5 font-playfair text-xl font-bold text-primary-dark md:text-2xl">
                  ✦ {t("moreArticles")}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {morePosts.map((post, index) => (
                    <ScrollReveal key={post.slug} delay={index * 0.05}>
                      <BlogCard post={post} />
                    </ScrollReveal>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="site-card rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-playfair text-lg font-bold text-primary-dark">
                {t("popularArticles")}
              </h2>
              <ul className="mt-4 space-y-3">
                {popularPosts.map((post, index) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex items-start gap-3 rounded-xl p-1.5 transition-colors hover:bg-bg-light"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-light font-body text-xs font-bold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <GradientPlaceholder
                          gradient={getBlogImageGradient(post.image)}
                          className="absolute inset-0 rounded-lg"
                          label={post.title}
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 font-body text-sm font-semibold text-primary-dark group-hover:text-primary">
                          {post.title}
                        </span>
                        <span className="mt-1 flex flex-wrap items-center gap-x-2 font-body text-[11px] text-text-gray">
                          <span className="text-primary">
                            {post.tags[0] ?? t("articleFallback")}
                          </span>
                          <span>
                            {formatBlogDate(post.publishedAt, locale)}
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <BlogNewsletterCard />
          </aside>
        </div>
      )}
    </div>
  );
}
