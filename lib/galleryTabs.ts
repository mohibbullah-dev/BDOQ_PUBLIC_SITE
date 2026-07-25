import type { GalleryMediaType, IGalleryItem } from "@/lib/types";

export type GalleryTabType = "all" | "gallery" | "image" | "video" | "audio";

export const GALLERY_TAB_ORDER: GalleryTabType[] = [
  "all",
  "video",
  "audio",
  "gallery",
  "image",
];

export function resolveGalleryMediaType(item: IGalleryItem): GalleryMediaType {
  return item.mediaType ?? "photo";
}

export function filterGalleryByTab(
  items: IGalleryItem[],
  tab: GalleryTabType
): IGalleryItem[] {
  if (tab === "all" || tab === "gallery") return items;

  const target: GalleryMediaType = tab === "image" ? "photo" : tab;

  return items.filter((item) => resolveGalleryMediaType(item) === target);
}

export function countGalleryByTab(
  items: IGalleryItem[],
  tab: GalleryTabType
): number {
  return filterGalleryByTab(items, tab).length;
}

/** Collection grid for All / Gallery tabs; media tiles for type filters */
export function showsCollectionGrid(tab: GalleryTabType): boolean {
  return tab === "all" || tab === "gallery";
}
