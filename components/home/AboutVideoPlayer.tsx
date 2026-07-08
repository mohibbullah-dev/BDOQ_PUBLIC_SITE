"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { FEATURED_VIDEO } from "@/lib/constants";
import { API_BASE } from "@/lib/constants";
import { formatStatValue } from "@/lib/stats";
import { VideoPlayerModal } from "@/components/shared/VideoPlayerModal";
import { cn } from "@/lib/cn";

interface IAboutVideoPlayerProps {
  compact?: boolean;
}

interface IApiStatsResponse {
  success: boolean;
  data: {
    yearsExperience: number;
    totalStudents: number;
  };
}

export function AboutVideoPlayer({ compact = false }: IAboutVideoPlayerProps) {
  const tStats = useTranslations("stats");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightStats, setHighlightStats] = useState<
    { value: string; label: string }[]
  >([]);
  const thumbnailSrc =
    FEATURED_VIDEO.thumbnailSrc ??
    `https://img.youtube.com/vi/${FEATURED_VIDEO.youtubeId}/maxresdefault.jpg`;

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      try {
        const response = await fetch(`${API_BASE}/public/stats`);
        if (!response.ok) throw new Error("Failed to load stats");
        const json = (await response.json()) as IApiStatsResponse;
        if (cancelled || !json.data) return;

        setHighlightStats([
          {
            value: formatStatValue(json.data.yearsExperience),
            label: tStats("years"),
          },
          {
            value: formatStatValue(json.data.totalStudents),
            label: tStats("students"),
          },
        ]);
      } catch {
        if (!cancelled) setHighlightStats([]);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [tStats]);

  return (
    <>
      <div className="relative w-full">
        {!compact && (
          <div
            className="pointer-events-none absolute -inset-3 rounded-[8px] bg-gradient-to-br from-[var(--green-primary)]/15 via-transparent to-transparent blur-2xl lg:-inset-4"
            aria-hidden="true"
          />
        )}

        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-[var(--green-primary)]",
            compact
              ? "shadow-lg ring-1 ring-gray-200/80"
              : "shadow-[0_24px_50px_-24px_rgba(50,201,145,0.35)] ring-1 ring-[var(--green-primary)]/10 sm:rounded-3xl"
          )}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative block aspect-[3/2] w-full overflow-hidden"
            aria-label={`Play video: ${FEATURED_VIDEO.title}`}
          >
            <Image
              src={thumbnailSrc}
              alt={FEATURED_VIDEO.title}
              fill
              unoptimized={thumbnailSrc.startsWith("/")}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              priority={compact}
            />
            <div
              className="absolute inset-0 bg-[var(--green-primary)]/10 transition-colors duration-300 group-hover:bg-[var(--green-primary)]/5"
              aria-hidden="true"
            />

            <span
              className={cn(
                "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center",
                "rounded-full bg-white text-[var(--green-primary)] ring-4 ring-white/30",
                "shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--green-primary)] group-hover:text-white group-hover:ring-[var(--green-primary)]/30",
                compact ? "h-14 w-14" : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
              )}
            >
              <Play
                className={cn("ml-0.5", compact ? "h-6 w-6" : "h-7 w-7")}
                fill="currentColor"
                aria-hidden="true"
              />
            </span>

            {/* Keep the preview clean: only play button overlay */}
          </button>
        </div>

        {!compact && highlightStats.length > 0 && (
          <div className="mt-4 flex justify-center gap-3">
            {highlightStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-center shadow-sm"
              >
                <p className="font-inter text-base font-bold text-[var(--green-primary)]">
                  {stat.value}
                </p>
                <p className="font-inter text-[11px] text-[var(--text-gray)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <VideoPlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={FEATURED_VIDEO.youtubeId}
        title={FEATURED_VIDEO.title}
      />
    </>
  );
}
