import { apiFetch } from "./api";
import type { LocaleType } from "@/i18n/routing";
import {
  mapApiBlogToPost,
  type IApiBlogPost,
} from "@/lib/i18n/localizeBlog";
import type { IBlogPost } from "./types";

const BLOG_REVALIDATE = 300;

interface IApiBlogListResponse {
  success: boolean;
  data: {
    posts: IApiBlogPost[];
  };
}

interface IApiBlogDetailResponse {
  success: boolean;
  data: IApiBlogPost;
}

export async function getBlogPosts(
  locale: LocaleType = "en"
): Promise<IBlogPost[]> {
  try {
    const response = await apiFetch<IApiBlogListResponse>(
      `/blog/posts?locale=${locale}`,
      { next: { revalidate: BLOG_REVALIDATE } }
    );
    const posts = response.data?.posts;
    if (Array.isArray(posts) && posts.length > 0) {
      return posts.map((post) => mapApiBlogToPost(post, locale));
    }
  } catch {
    return [];
  }
  return [];
}

export async function getBlogPost(
  slug: string,
  locale: LocaleType = "en"
): Promise<IBlogPost | null> {
  try {
    const response = await apiFetch<IApiBlogDetailResponse>(
      `/blog/posts/${slug}?locale=${locale}`,
      { next: { revalidate: BLOG_REVALIDATE } }
    );
    if (response.data) {
      return mapApiBlogToPost(response.data, locale);
    }
  } catch {
    return null;
  }
  return null;
}

export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
}

export function formatBlogDate(
  dateString: string,
  locale: LocaleType = "en"
): string {
  return new Date(dateString).toLocaleDateString(
    locale === "bn" ? "bn-BD" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

export const BLOG_IMAGE_GRADIENTS: Record<string, string> = {
  "gradient-tajweed": "from-primary to-primary-dark",
  "gradient-guide": "from-teal to-primary-dark",
  "gradient-benefits": "from-gold/80 to-primary",
};

export function getBlogImageGradient(imageKey: string): string {
  return BLOG_IMAGE_GRADIENTS[imageKey] ?? "from-primary to-teal";
}

export interface IBlogHeading {
  id: string;
  text: string;
}

export function slugifyBlogHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getContentHeadings(content: string): IBlogHeading[] {
  const headings: IBlogHeading[] = [];

  content.split("\n\n").forEach((block) => {
    if (!block.startsWith("**")) return;

    const headingText = block
      .split("**\n")[0]
      .replace(/^\*\*|\*\*$/g, "")
      .replace(/\*\*/g, "")
      .trim();

    if (!headingText) return;

    headings.push({
      id: slugifyBlogHeading(headingText),
      text: headingText,
    });
  });

  return headings;
}

export function getReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getRelatedBlogPosts(
  post: IBlogPost,
  allPosts: IBlogPost[],
  limit = 3
): IBlogPost[] {
  const others = allPosts.filter((item) => item.slug !== post.slug);

  const scored = others
    .map((item) => {
      const sharedTags = item.tags.filter((tag) =>
        post.tags.includes(tag)
      ).length;
      return { item, score: sharedTags };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (
        new Date(b.item.publishedAt).getTime() -
        new Date(a.item.publishedAt).getTime()
      );
    });

  return scored.slice(0, limit).map(({ item }) => item);
}

export function getAdjacentBlogPosts(
  post: IBlogPost,
  allPosts: IBlogPost[]
): { prev: IBlogPost | null; next: IBlogPost | null } {
  const sorted = [...allPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const index = sorted.findIndex((item) => item.slug === post.slug);

  if (index < 0) {
    return { prev: null, next: null };
  }

  return {
    prev: sorted[index + 1] ?? null,
    next: sorted[index - 1] ?? null,
  };
}

export function getAuthorInitials(author: string): string {
  return author
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
