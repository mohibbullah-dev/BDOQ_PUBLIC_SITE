import type { Metadata } from "next";
import { Suspense } from "react";
import { getLocale, getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { getBlogPosts } from "@/lib/blog";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getBlogClientMessages } from "@/lib/i18n/clientShellMessages";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { BlogPageHero } from "@/components/blog/BlogPageHero";

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
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-24 animate-pulse rounded-full bg-gray-100"
          />
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-96 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
        <div className="h-80 animate-pulse rounded-2xl bg-gray-100" />
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
      <ClientMessagesProvider messages={clientMessages}>
        <BlogPageHero />
      </ClientMessagesProvider>

      <section className="bg-[#FCFBF7] pb-16 md:pb-24">
        <div className="site-container pt-8 md:pt-10">
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
