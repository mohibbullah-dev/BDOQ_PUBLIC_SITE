import type { LocaleType } from "@/i18n/routing";
import type { IBlogPost } from "@/lib/types";
import { contentMessages as enContent } from "@/messages/en/content";
import { contentMessages as bnContent } from "@/messages/bn/content";

type BlogPostContent = {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
};

function getStaticBlogTranslation(
  slug: string,
  locale: LocaleType
): BlogPostContent | null {
  if (locale !== "bn") return null;
  const posts = bnContent.blog.posts as unknown as Record<
    string,
    BlogPostContent
  >;
  const entry = posts[slug];
  if (!entry) return null;
  return {
    ...entry,
    tags: [...entry.tags],
  };
}

export function localizeBlogPost(
  post: IBlogPost,
  locale: LocaleType
): IBlogPost {
  if (locale === "en") return post;

  const translated = getStaticBlogTranslation(post.slug, locale);
  if (!translated) return post;

  return {
    ...post,
    title: translated.title,
    excerpt: translated.excerpt,
    content: translated.content,
    tags: translated.tags,
  };
}

export function localizeBlogPosts(
  posts: IBlogPost[],
  locale: LocaleType
): IBlogPost[] {
  return posts.map((post) => localizeBlogPost(post, locale));
}

/** API post shape from My-Academy backend */
export interface IApiBlogAuthor {
  name: string;
  role?: string;
}

export interface IApiBlogPost {
  slug: string;
  title: string;
  description: string;
  body?: string;
  pubDate: string;
  tags: string[];
  author: IApiBlogAuthor | string;
  translations?: {
    bn?: {
      title?: string;
      description?: string;
      body?: string;
      tags?: string[];
    };
  };
}

export function mapApiBlogToPost(
  api: IApiBlogPost,
  locale: LocaleType
): IBlogPost {
  const bn = locale === "bn" ? api.translations?.bn : undefined;
  const authorName =
    typeof api.author === "string" ? api.author : api.author.name;

  const post: IBlogPost = {
    slug: api.slug,
    title: bn?.title ?? api.title,
    excerpt: bn?.description ?? api.description,
    content: bn?.body ?? api.body ?? "",
    image: "gradient-guide",
    publishedAt:
      typeof api.pubDate === "string"
        ? api.pubDate.slice(0, 10)
        : new Date(api.pubDate).toISOString().slice(0, 10),
    tags: bn?.tags ?? api.tags,
    author: authorName,
  };

  return localizeBlogPost(post, locale);
}

export function getBlogUiStrings(locale: LocaleType) {
  return locale === "bn" ? bnContent.blog : enContent.blog;
}
