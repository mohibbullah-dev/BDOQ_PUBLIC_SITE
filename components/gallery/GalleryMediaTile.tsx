"use client";

import Image from "next/image";
import { ImageIcon, Mic, Video } from "lucide-react";
import type { GalleryMediaType, IGalleryItem } from "@/lib/types";
import { isCloudinaryUrl } from "@/lib/cloudinary";
import { resolveGalleryMediaType } from "@/lib/galleryTabs";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import { VideoPlayIcon } from "@/components/shared/VideoPlayIcon";
import { cn } from "@/lib/cn";

interface IGalleryMediaTileProps {
  item: IGalleryItem;
  title: string;
  mediaLabel: string;
  className?: string;
}

const MEDIA_BADGE: Record<
  GalleryMediaType,
  { icon: typeof Mic; className: string }
> = {
  photo: {
    icon: ImageIcon,
    className: "bg-emerald-500/90 text-white",
  },
  video: {
    icon: Video,
    className: "bg-violet-500/90 text-white",
  },
  audio: {
    icon: Mic,
    className: "bg-sky-500/90 text-white",
  },
};

export function GalleryMediaTile({
  item,
  title,
  mediaLabel,
  className,
}: IGalleryMediaTileProps) {
  const mediaType = resolveGalleryMediaType(item);
  const badge = MEDIA_BADGE[mediaType];
  const BadgeIcon = badge.icon;

  function renderMedia(): React.ReactNode {
    if (mediaType === "photo" && item.mediaUrl) {
      return (
        <Image
          src={item.mediaUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={!isCloudinaryUrl(item.mediaUrl)}
        />
      );
    }

    if (mediaType === "video" && item.youtubeId) {
      return (
        <>
          <Image
            src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <VideoPlayIcon size="md" />
          </div>
        </>
      );
    }

    if (mediaType === "video" && item.mediaUrl) {
      return (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-zinc-900" />
          <Video
            className="relative z-[1] h-12 w-12 text-white/70"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <VideoPlayIcon size="md" />
          </div>
        </>
      );
    }

    if (mediaType === "audio") {
      return (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br text-white",
            item.coverGradient
          )}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
            <Mic className="h-8 w-8 opacity-95" aria-hidden />
          </div>
          <span className="mt-3 font-body text-xs font-semibold uppercase tracking-widest opacity-90">
            {mediaLabel}
          </span>
        </div>
      );
    }

    return (
      <GradientPlaceholder
        gradient={item.coverGradient}
        className="absolute inset-0 rounded-none"
        label={title}
      />
    );
  }

  return (
    <div
      className={cn(
        "site-card group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200",
        "transition-shadow duration-200 hover:shadow-md",
        className
      )}
    >
      <div className={cn("relative w-full overflow-hidden", item.heightClass)}>
        {renderMedia()}
        <span
          className={cn(
            "absolute left-3 top-3 z-[3] inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm",
            badge.className
          )}
        >
          <BadgeIcon className="h-3 w-3" aria-hidden />
          {mediaLabel}
        </span>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden
        >
          <p className="font-body text-sm font-semibold text-white line-clamp-2">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
