import type { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { getEbooks } from "@/lib/resources";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getResourcesClientMessages } from "@/lib/i18n/clientShellMessages";
import { EbooksPageContent } from "@/components/resources/EbooksPageContent";

export const metadata: Metadata = {
  title: "Our E-books",
  description:
    "Free Islamic e-books, Tajweed guides, and religious resources from BD Online Quran Academy.",
  keywords: [
    "islamic ebooks",
    "tajweed book",
    "quran resources",
    "BDOQ Academy ebooks",
  ],
  openGraph: {
    title: "Our E-books | BD Online Quran Academy",
    description: "Knowledge, skills, and ideas — all in one place.",
    url: `${SITE_URL}/resources/ebooks`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/resources/ebooks`,
  },
};

export default async function EbooksPage() {
  const locale = (await getLocale()) as "en" | "bn";
  const [messages, ebooks] = await Promise.all([
    getMessages(),
    getEbooks(locale),
  ]);
  const clientMessages = getResourcesClientMessages(
    messages as Record<string, unknown>
  );

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <EbooksPageContent ebooks={ebooks} />
    </ClientMessagesProvider>
  );
}
