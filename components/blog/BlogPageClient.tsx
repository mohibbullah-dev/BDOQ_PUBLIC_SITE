"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LayoutGrid } from "lucide-react";
import type { IBlogPost } from "@/lib/types";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { SearchEmptyState } from "@/components/search/SearchEmptyState";
import { SearchField } from "@/components/search/SearchField";
import { SegmentedTabBar } from "@/components/shared/SegmentedTabBar";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { collectBlogTags, filterBlogPosts } from "@/lib/search";

interface IBlogPageClientProps {
  posts: IBlogPost[];
}

const ALL_TOPICS_ID = "__all__";

const SEARCH_PLACEHOLDERS = {
  en: "Search articles by title, topic, or tag…",
  bn: "শিরোনাম, বিষয় বা ট্যাগ দিয়ে খুঁজুন…",
} as const;

export function BlogPageClient({ posts }: IBlogPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("content.blog");
  const tCta = useTranslations("cta");
  const localeKey = locale === "bn" ? "bn" : "en";

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [activeTag, setActiveTag] = useState<string | null>(() =>
    searchParams.get("tag")
  );

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
      updateUrl(value, activeTag);
    },
    [activeTag, updateUrl]
  );

  const handleTagChange = useCallback(
    (tag: string | null): void => {
      setActiveTag(tag);
      updateUrl(searchQuery, tag);
    },
    [searchQuery, updateUrl]
  );

  const tagTabs = useMemo(
    () => [
      {
        id: ALL_TOPICS_ID,
        label: t("allTopics"),
        icon: LayoutGrid,
        count: posts.length,
      },
      ...tags.map((tag) => ({
        id: tag,
        label: tag,
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

  if (posts.length === 0) {
    return <BlogEmptyState />;
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <SearchField
          id="blog-search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={SEARCH_PLACEHOLDERS[localeKey]}
          ariaLabel={t("searchAria")}
          className="mx-auto max-w-xl"
        />

        {tags.length > 0 && (
          <SegmentedTabBar
            tabs={tagTabs}
            activeTab={activeTag ?? ALL_TOPICS_ID}
            onChange={(tabId) =>
              handleTagChange(tabId === ALL_TOPICS_ID ? null : tabId)
            }
            ariaLabel={t("searchAria")}
            layoutId="blog-tag-tab-indicator"
            panelIdPrefix="blog-panel"
            maxWidthClass="max-w-5xl"
            wrap
          />
        )}
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.05}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  );
}
