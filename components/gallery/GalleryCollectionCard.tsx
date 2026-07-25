"use client";

import {
  GALLERY_COLLECTION_ICONS,
  type IGalleryCollection,
} from "@/lib/galleryCollections";
import { GradientPlaceholder } from "@/components/shared/GradientPlaceholder";
import { cn } from "@/lib/cn";

interface IGalleryCollectionCardProps {
  collection: IGalleryCollection;
  title: string;
  itemsLabel: string;
  onClick: () => void;
}

export function GalleryCollectionCard({
  collection,
  title,
  itemsLabel,
  onClick,
}: IGalleryCollectionCardProps) {
  const Icon = GALLERY_COLLECTION_ICONS[collection.icon];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "site-card group flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left",
        "shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      )}
      aria-label={`${title} — ${itemsLabel}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <GradientPlaceholder
          gradient={collection.coverGradient}
          className="absolute inset-0 rounded-none transition-transform duration-300 group-hover:scale-[1.03]"
          label={title}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_50%)]"
          aria-hidden="true"
        />
      </div>

      <div className="flex items-center gap-3 px-3.5 py-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-light text-primary">
          <Icon className="h-4.5 w-4.5 h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block font-body text-sm font-semibold text-primary-dark line-clamp-1">
            {title}
          </span>
          <span className="mt-0.5 block font-body text-xs text-text-gray">
            {itemsLabel}
          </span>
        </span>
      </div>
    </button>
  );
}
