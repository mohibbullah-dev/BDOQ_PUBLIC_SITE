import { apiFetch } from "./api";
import { GALLERY_ITEMS } from "./constants";
import type { GalleryAlbumType, GalleryMediaType, IGalleryItem } from "./types";

const GALLERY_REVALIDATE = 3600;

interface IApiGalleryResponse {
  success: boolean;
  data: {
    items: Array<
      IGalleryItem & {
        imageUrl?: string;
      }
    >;
  };
}

export const GALLERY_ALBUMS = [
  { id: "all" as const, label: "All" },
  { id: "gallery-01" as const, label: "Gallery 01" },
  { id: "gallery-02" as const, label: "Gallery 02" },
  { id: "gallery-03" as const, label: "Gallery 03" },
];

function mapGalleryItem(
  item: IGalleryItem & { imageUrl?: string }
): IGalleryItem {
  const mediaUrl = item.mediaUrl?.trim() || item.imageUrl?.trim() || undefined;

  return {
    id: item.id,
    title: item.title,
    description: item.description,
    album: item.album as GalleryAlbumType,
    mediaType: (item.mediaType as GalleryMediaType | undefined) ?? "photo",
    mediaUrl,
    youtubeId: item.youtubeId?.trim() || undefined,
    coverGradient: item.coverGradient,
    heightClass: item.heightClass,
  };
}

export async function getGalleryItems(): Promise<IGalleryItem[]> {
  try {
    const response = await apiFetch<IApiGalleryResponse>("/public/gallery", {
      next: { revalidate: GALLERY_REVALIDATE },
    });

    const apiItems = (response.data?.items ?? []).map(mapGalleryItem);
    return apiItems.length > 0 ? apiItems : GALLERY_ITEMS;
  } catch {
    return GALLERY_ITEMS;
  }
}
