import type { Metadata } from "next";
import { Suspense } from "react";
import { getLocale, getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { getBlogPosts } from "@/lib/blog";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getBlogClientMessages } from "@/lib/i18n/clientShellMessages";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { LocalizedPageHero } from "@/components/shared/LocalizedPageHero";

export const metadata: Metadata = {
  title: "Read Our Blog",
  description:
    "Articles and insights about Quran education, Tajweed, Hifz, and online Islamic learning from BDOQ Academy.",
  keywords: [
    "quran blog",
    "islamic education",
    "tajweed articles",
    "BDOQ Academy blog",
  ],
  openGraph: {
    title: "Read Our Blog | BD Online Quran Academy",
    description: "Articles about Quran education and online Islamic learning.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

function BlogListFallback() {
  return (
    <div className="space-y-6">
      <div className="mx-auto h-12 max-w-xl animate-pulse rounded-xl bg-gray-200" />
      <div className="flex justify-center gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-9 w-20 animate-pulse rounded-full bg-gray-100"
          />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = await getBlogPosts(locale as "en" | "bn");
  const messages = await getMessages();
  const clientMessages = getBlogClientMessages(
    messages as Record<string, unknown>
  );

  return (
    <>
      <LocalizedPageHero pageKey="blog" centered />

      <section className="pb-16 md:pb-24 bg-bg-light">
        <div className="site-container pt-12 md:pt-16">
          <ClientMessagesProvider messages={clientMessages}>
            <Suspense fallback={<BlogListFallback />}>
              <BlogPageClient posts={posts} />
            </Suspense>
          </ClientMessagesProvider>
        </div>
      </section>
    </>
  );
}
