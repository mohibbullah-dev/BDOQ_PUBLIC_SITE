import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { EbookDetailView } from "@/components/resources/EbookDetailView";
import { SITE_URL } from "@/lib/constants";
import { getRelatedEbooks } from "@/lib/ebooks";
import { getEbookBySlug, getEbookSlugs, getEbooks } from "@/lib/resources";

interface IEbookDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return (await getEbookSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: IEbookDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as "en" | "bn";
  const book = await getEbookBySlug(slug, locale);

  if (!book) {
    return { title: "E-book Not Found | BD Online Quran Academy" };
  }

  return {
    title: `${book.title} | E-books`,
    description: book.description,
    keywords: [
      "islamic ebook",
      book.category,
      "BDOQ Academy",
      book.title.toLowerCase(),
    ],
    openGraph: {
      title: `${book.title} | BD Online Quran Academy`,
      description: book.description,
      url: `${SITE_URL}/resources/ebooks/${book.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `${SITE_URL}/resources/ebooks/${book.slug}`,
    },
  };
}

export default async function EbookDetailPage({
  params,
}: IEbookDetailPageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as "en" | "bn";
  const [book, allEbooks] = await Promise.all([
    getEbookBySlug(slug, locale),
    getEbooks(locale),
  ]);

  if (!book) {
    notFound();
  }

  const related = getRelatedEbooks(book, allEbooks);

  return <EbookDetailView book={book} relatedEbooks={related} />;
}
