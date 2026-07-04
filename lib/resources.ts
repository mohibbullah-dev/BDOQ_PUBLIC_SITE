import type { LocaleType } from "@/i18n/routing";
import { apiFetch } from "./api";
import {
  FEATURED_VIDEO,
  VIDEO_GALLERY_ITEMS,
  VIDEO_PLAYLIST,
} from "./constants";
import type {
  IAudioRecitation,
  IAudioVerse,
  IEbook,
  IVideoItem,
} from "./types";

const RESOURCES_REVALIDATE = 3600;
const PLACEHOLDER_VIDEO_ID = "dQw4w9WgXcQ";

function isValidVideoId(youtubeId: string | undefined): boolean {
  const id = youtubeId?.trim() ?? "";
  return id.length > 0 && id !== PLACEHOLDER_VIDEO_ID;
}

function resolveVideoItems(
  apiItems: IVideoItem[],
  fallback: IVideoItem[]
): IVideoItem[] {
  if (apiItems.length === 0) return fallback;
  if (apiItems.some((item) => !isValidVideoId(item.youtubeId))) return fallback;
  return apiItems;
}

export interface IApiResource {
  id: string;
  type: "ebook" | "audio" | "video";
  section: string;
  slug: string;
  title: string;
  description?: string;
  featured?: boolean;
  sortOrder?: number;
  category?: IEbook["category"];
  coverGradient?: string;
  coverUrl?: string;
  pdfUrl?: string;
  fileSize?: string;
  pageCount?: number;
  language?: IEbook["language"];
  author?: string;
  audioUrl?: string;
  duration?: string;
  paraInfo?: string;
  surahName?: string;
  progress?: number;
  verses?: Array<{ arabic: string; translation: string }>;
  youtubeId?: string;
  startSeconds?: number;
}

interface IApiResourceListResponse {
  success: boolean;
  data: { items: IApiResource[] };
}

function sortByFeaturedThenOrder<T extends { featured?: boolean; sortOrder?: number }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    const aFeatured = a.featured ? 1 : 0;
    const bFeatured = b.featured ? 1 : 0;
    if (bFeatured !== aFeatured) return bFeatured - aFeatured;
    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
  });
}

function pickFeaturedAudio(items: IApiResource[]): IApiResource | undefined {
  const byFlag = sortByFeaturedThenOrder(
    items.filter((i) => i.featured && i.audioUrl?.trim())
  )[0];
  if (byFlag) return byFlag;
  return items.find((i) => i.section === "featured" && i.audioUrl?.trim());
}

function pickFeaturedVideo(items: IApiResource[]): IApiResource | undefined {
  const byFlag = sortByFeaturedThenOrder(
    items.filter((i) => i.featured && i.youtubeId?.trim())
  )[0];
  if (byFlag) return byFlag;
  return items.find((i) => i.section === "featured" && i.youtubeId?.trim());
}

function mapApiEbook(api: IApiResource): IEbook {
  return {
    id: api.id,
    slug: api.slug,
    title: api.title,
    category: api.category ?? "tajweed",
    description: api.description ?? "",
    coverGradient: api.coverGradient ?? "from-primary to-primary-dark",
    pdfUrl: api.pdfUrl ?? "",
    fileSize: api.fileSize ?? "",
    pageCount: api.pageCount ?? 0,
    language: api.language ?? "en",
    author: api.author ?? "BDOQ Academy",
    featured: api.featured ?? false,
    sortOrder: api.sortOrder ?? 0,
  };
}

function mapApiRecitation(api: IApiResource): IAudioRecitation {
  return {
    id: api.id,
    surahName: api.surahName ?? api.title,
    paraInfo: api.paraInfo ?? "",
    duration: api.duration ?? "",
    progress: api.progress ?? 0,
  };
}

function mapApiVerse(api: IApiResource, index: number): IAudioVerse {
  const verse = api.verses?.[index];
  return {
    id: `${api.id}-v${index + 1}`,
    arabic: verse?.arabic ?? "",
    translation: verse?.translation ?? "",
  };
}

function mapApiVideo(api: IApiResource): IVideoItem {
  return {
    id: api.id,
    title: api.title,
    youtubeId: api.youtubeId ?? "",
    description: api.description,
    startSeconds: api.startSeconds,
  };
}

async function fetchResources(
  type: IApiResource["type"],
  locale: LocaleType,
  section?: string
): Promise<IApiResource[]> {
  const params = new URLSearchParams({ locale });
  if (section) params.set("section", section);

  const response = await apiFetch<IApiResourceListResponse>(
    `/resources/${type}?${params.toString()}`,
    { next: { revalidate: RESOURCES_REVALIDATE } }
  );

  return response.data?.items ?? [];
}

export async function getEbooks(locale: LocaleType = "en"): Promise<IEbook[]> {
  try {
    const items = await fetchResources("ebook", locale);
    return sortByFeaturedThenOrder(items.map(mapApiEbook));
  } catch {
    return [];
  }
}

export async function getEbookBySlug(
  slug: string,
  locale: LocaleType = "en"
): Promise<IEbook | null> {
  const ebooks = await getEbooks(locale);
  return ebooks.find((b) => b.slug === slug) ?? null;
}

export interface IAudioPageData {
  featuredSrc: string;
  featuredTitle: string;
  verses: IAudioVerse[];
  recitations: IAudioRecitation[];
}

export async function getAudioPageData(
  locale: LocaleType = "en"
): Promise<IAudioPageData> {
  const items = await fetchResources("audio", locale);
  const featured = pickFeaturedAudio(items);
  const featuredId = featured?.id;
  const verseSet = items.find((i) => i.section === "verses");
  const recitations = items
    .filter((i) => i.section === "recitation" && i.id !== featuredId)
    .map(mapApiRecitation);

  const verses: IAudioVerse[] = verseSet?.verses?.length
    ? verseSet.verses.map((v, idx) => ({
        id: `v${idx + 1}`,
        arabic: v.arabic,
        translation: v.translation,
      }))
    : [];

  return {
    featuredSrc: featured?.audioUrl ?? "",
    featuredTitle: featured?.title ?? "Featured Recitation",
    verses,
    recitations,
  };
}

export interface IVideoPageData {
  featured: IVideoItem;
  gallery: IVideoItem[];
  playlist: IVideoItem[];
}

export async function getVideoPageData(
  locale: LocaleType = "en"
): Promise<IVideoPageData> {
  try {
    const items = await fetchResources("video", locale);
    const featuredItem = pickFeaturedVideo(items);
    const featuredId = featuredItem?.id;
    const galleryFromApi = items
      .filter((i) => i.section === "gallery" && i.id !== featuredId)
      .map(mapApiVideo);
    const playlistFromApi = items
      .filter((i) => i.section === "playlist" && i.id !== featuredId)
      .map(mapApiVideo);

    const featuredFromApi = featuredItem ? mapApiVideo(featuredItem) : null;
    const featured =
      featuredFromApi && isValidVideoId(featuredFromApi.youtubeId)
        ? featuredFromApi
        : FEATURED_VIDEO;

    return {
      featured,
      gallery: resolveVideoItems(galleryFromApi, VIDEO_GALLERY_ITEMS),
      playlist: resolveVideoItems(playlistFromApi, VIDEO_PLAYLIST),
    };
  } catch {
    return {
      featured: FEATURED_VIDEO,
      gallery: VIDEO_GALLERY_ITEMS,
      playlist: VIDEO_PLAYLIST,
    };
  }
}

export async function getEbookSlugs(): Promise<string[]> {
  const ebooks = await getEbooks("en");
  return ebooks.map((b) => b.slug);
}
