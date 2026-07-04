import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import {
  getAdjacentBlogPosts,
  getBlogPost,
  getBlogPosts,
  getBlogSlugs,
  getRelatedBlogPosts,
} from "@/lib/blog";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getBlogClientMessages } from "@/lib/i18n/clientShellMessages";
import { BlogDetailView } from "@/components/blog/BlogDetailView";

interface IBlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: IBlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getBlogPost(slug, locale as "en" | "bn");

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} | BD Online Quran Academy`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: IBlogDetailPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getBlogPost(slug, locale as "en" | "bn");

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts(locale as "en" | "bn");
  const relatedPosts = getRelatedBlogPosts(post, allPosts);
  const { prev, next } = getAdjacentBlogPosts(post, allPosts);
  const messages = await getMessages();
  const clientMessages = getBlogClientMessages(
    messages as Record<string, unknown>
  );

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <BlogDetailView
        post={post}
        relatedPosts={relatedPosts}
        prevPost={prev}
        nextPost={next}
      />
    </ClientMessagesProvider>
  );
}
