"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Clock3,
  Eye,
  GraduationCap,
  Layers,
  Mic2,
  RefreshCw,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { VIDEO_CATEGORIES } from "@/lib/constants";
import type { IVideoPageData } from "@/lib/resources";
import type { IVideoItem, VideoCategoryType } from "@/lib/types";
import { VideosPageHero } from "@/components/resources/VideosPageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { VideoPlayIcon } from "@/components/shared/VideoPlayIcon";
import { cn } from "@/lib/cn";

type FilterType = "all" | VideoCategoryType;
type SortType = "latest" | "popular" | "title";

const INITIAL_VISIBLE = 6;

const FILTER_ICONS = {
  all: Layers,
  "quran-learning": BookOpen,
  tajweed: Mic2,
  courses: GraduationCap,
  "student-stories": Users,
} as const;

function youtubeThumb(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function categoryKey(category?: VideoCategoryType): string {
  if (!category) return "quranLearning";
  if (category === "quran-learning") return "quranLearning";
  if (category === "student-stories") return "studentStories";
  return category;
}

interface IVideosPageContentProps {
  data: IVideoPageData;
}

export function VideosPageContent({ data }: IVideosPageContentProps) {
  const t = useTranslations("content.videos");
  const playlist = data.playlist.length > 0 ? data.playlist : [data.featured];
  const [activeVideo, setActiveVideo] = useState<IVideoItem>(
    data.featured.youtubeId ? data.featured : playlist[0]
  );
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const galleryVideos = useMemo(() => {
    const list =
      filter === "all"
        ? data.gallery
        : data.gallery.filter((video) => video.category === filter);

    return [...list].sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "popular") {
        const aViews = Number((a.viewsLabel ?? "0").replace(/[^\d.]/g, "")) || 0;
        const bViews = Number((b.viewsLabel ?? "0").replace(/[^\d.]/g, "")) || 0;
        return bViews - aViews;
      }
      return 0;
    });
  }, [data.gallery, filter, sortBy]);

  const visibleVideos = galleryVideos.slice(0, visibleCount);
  const hasMore = visibleCount < galleryVideos.length;

  return (
    <>
      <VideosPageHero />

      <section className="bg-[#F9FBF9] pb-10 md:pb-14">
        <div className="site-container">
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
            <ScrollReveal direction="left">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-lg shadow-primary/10">
                <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
                  {t("featuredBadge")}
                </span>
                <YouTubeEmbed
                  videoId={activeVideo.youtubeId}
                  title={activeVideo.title}
                  lazy={false}
                  startSeconds={activeVideo.startSeconds}
                  className="rounded-none"
                />
              </div>
              <div className="mt-4">
                <h2 className="font-playfair text-xl font-bold text-primary-dark md:text-2xl">
                  {activeVideo.title}
                </h2>
                {activeVideo.description ? (
                  <p className="mt-2 font-body text-sm leading-relaxed text-text-gray">
                    {activeVideo.description}
                  </p>
                ) : null}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.08}>
              <aside className="site-card rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="font-playfair text-lg font-bold text-primary-dark">
                    {t("playlist")}
                  </h3>
                  <a
                    href="#other-videos"
                    className="font-body text-sm font-semibold text-primary hover:text-primary-dark"
                  >
                    {t("viewAll")}
                  </a>
                </div>
                <ul className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                  {playlist.map((video, index) => {
                    const isActive = video.id === activeVideo.id;
                    return (
                      <li key={video.id}>
                        <button
                          type="button"
                          onClick={() => setActiveVideo(video)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl border px-2.5 py-2.5 text-left transition-all",
                            isActive
                              ? "border-primary/25 bg-bg-light"
                              : "border-transparent hover:border-gray-100 hover:bg-[#F9FBF9]"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-body text-xs font-bold",
                              isActive
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-text-gray"
                            )}
                          >
                            {index + 1}
                          </span>
                          <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-primary-dark">
                            <Image
                              src={youtubeThumb(video.youtubeId)}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="64px"
                              unoptimized
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="line-clamp-2 font-body text-sm font-semibold text-primary-dark">
                              {video.title}
                            </span>
                            <span className="mt-0.5 flex items-center gap-2 font-body text-[11px] text-text-gray">
                              <span className="text-primary">
                                {t(`categories.${categoryKey(video.category)}`)}
                              </span>
                              <span>{video.duration ?? "—"}</span>
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="other-videos" className="bg-white py-12 md:py-16">
        <div className="site-container">
          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-playfair text-2xl font-bold text-primary-dark md:text-3xl">
              {t("otherVideos")}
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label={t("filterLabel")}
              >
                {VIDEO_CATEGORIES.map((cat) => {
                  const isActive = filter === cat.id;
                  const Icon = FILTER_ICONS[cat.id];
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        setFilter(cat.id);
                        setVisibleCount(INITIAL_VISIBLE);
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-body text-sm font-semibold transition-all",
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/25"
                          : "bg-[#F3F5F4] text-primary-dark hover:bg-bg-light"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {t(`categories.${cat.labelKey}`)}
                    </button>
                  );
                })}
              </div>

              <label className="inline-flex items-center gap-2 font-body text-sm text-text-gray">
                <span className="whitespace-nowrap">{t("sortBy")}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                  className="rounded-full border border-gray-200 bg-[#F9FBF9] px-3 py-2 font-body text-sm font-medium text-primary-dark outline-none focus:border-primary"
                >
                  <option value="latest">{t("sortLatest")}</option>
                  <option value="popular">{t("sortPopular")}</option>
                  <option value="title">{t("sortTitle")}</option>
                </select>
              </label>
            </div>
          </div>

          {visibleVideos.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleVideos.map((video, index) => (
                <ScrollReveal key={video.id} delay={index * 0.04}>
                  <article className="site-card group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveVideo(video);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="relative block w-full overflow-hidden"
                    >
                      <div className="relative aspect-video bg-primary-dark">
                        <Image
                          src={youtubeThumb(video.youtubeId)}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized
                        />
                        <VideoPlayIcon size="md" tone="white" />
                        {video.duration ? (
                          <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/75 px-2 py-0.5 font-body text-[11px] font-semibold text-white">
                            {video.duration}
                          </span>
                        ) : null}
                      </div>
                    </button>
                    <div className="p-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-bg-light px-2.5 py-1 font-body text-[11px] font-semibold text-primary">
                        <Sparkles className="h-3 w-3" aria-hidden="true" />
                        {t(`categories.${categoryKey(video.category)}`)}
                      </span>
                      <h3 className="mt-2 line-clamp-2 font-body text-base font-semibold text-primary-dark">
                        {video.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap items-center gap-3 font-body text-xs text-text-gray">
                        <span className="inline-flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                          {t("views", { count: video.viewsLabel ?? "—" })}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                          {video.publishedLabel ?? t("recent")}
                        </span>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-gray-200 bg-[#F9FBF9] px-6 py-12 text-center font-body text-sm text-text-gray">
              {t("emptyCategory")}
            </p>
          )}

          {hasMore ? (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + INITIAL_VISIBLE)}
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-2.5 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {t("loadMore")}
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
