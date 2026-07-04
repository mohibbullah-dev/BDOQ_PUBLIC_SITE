"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { IVideoPageData } from "@/lib/resources";
import type { IVideoItem } from "@/lib/types";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import { cn } from "@/lib/cn";

function VideoThumbnail({
  video,
  onClick,
  isActive,
}: {
  video: IVideoItem;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-xl overflow-hidden border-2 transition-all",
        isActive
          ? "border-primary shadow-md"
          : "border-transparent hover:border-primary/30"
      )}
    >
      <GradientPlaceholder
        gradient="from-primary-dark to-teal"
        className="h-24 rounded-none"
        label={video.title}
      />
      <p className="font-inter text-sm font-medium text-primary-dark p-3 line-clamp-2">
        {video.title}
      </p>
    </button>
  );
}

interface IVideosPageContentProps {
  data: IVideoPageData;
}

export function VideosPageContent({ data }: IVideosPageContentProps) {
  const t = useTranslations("pages.resources");
  const [activePlaylistVideo, setActivePlaylistVideo] = useState<IVideoItem>(
    data.playlist[0] ?? data.featured
  );

  return (
    <>
      <PageHero
        eyebrow={t("videosEyebrow")}
        title={t("videosTitle")}
        subtitle={t("videosSubtitle")}
        centered
      >
        <ScrollReveal delay={0.1} className="mt-10">
          <YouTubeEmbed
            videoId={data.featured.youtubeId}
            title={data.featured.title}
            lazy={false}
            startSeconds={data.featured.startSeconds}
          />
          <p className="font-inter text-sm text-text-gray text-center mt-4">
            {data.featured.description}
          </p>
        </ScrollReveal>
      </PageHero>

      <section className="py-12 md:py-16 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-amiri text-2xl md:text-3xl font-bold text-primary-dark mb-8">
              Other videos
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.gallery.map((video, index) => (
              <ScrollReveal key={video.id} delay={index * 0.05}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <YouTubeEmbed videoId={video.youtubeId} title={video.title} />
                  <p className="font-inter text-sm font-semibold text-primary-dark p-4">
                    {video.title}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-amiri text-2xl md:text-3xl font-bold text-primary-dark mb-8">
              Watch from playlist
            </h2>
          </ScrollReveal>
          <div className="grid lg:grid-cols-3 gap-8">
            <ScrollReveal direction="left" className="lg:col-span-1 space-y-3">
              {data.playlist.map((video) => (
                <VideoThumbnail
                  key={video.id}
                  video={video}
                  isActive={activePlaylistVideo.id === video.id}
                  onClick={() => setActivePlaylistVideo(video)}
                />
              ))}
            </ScrollReveal>
            <ScrollReveal
              direction="right"
              delay={0.1}
              className="lg:col-span-2"
            >
              <YouTubeEmbed
                videoId={activePlaylistVideo.youtubeId}
                title={activePlaylistVideo.title}
              />
              <p className="font-inter text-lg font-semibold text-primary-dark mt-4">
                {activePlaylistVideo.title}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
