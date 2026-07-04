import type { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { getVideoPageData } from "@/lib/resources";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getResourcesClientMessages } from "@/lib/i18n/clientShellMessages";
import { VideosPageContent } from "@/components/resources/VideosPageContent";

export const metadata: Metadata = {
  title: "Video Gallery",
  description:
    "Watch Quran learning videos, tutorials, and academy updates from BD Online Quran Academy.",
  keywords: [
    "quran videos",
    "online quran lessons",
    "BDOQ Academy videos",
    "islamic videos",
  ],
  openGraph: {
    title: "Our Video Gallery | BD Online Quran Academy",
    description:
      "Welcome to our video gallery — Quran education and academy highlights.",
    url: `${SITE_URL}/resources/videos`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/resources/videos`,
  },
};

export default async function VideosPage() {
  const locale = (await getLocale()) as "en" | "bn";
  const [messages, data] = await Promise.all([
    getMessages(),
    getVideoPageData(locale),
  ]);
  const clientMessages = getResourcesClientMessages(
    messages as Record<string, unknown>
  );

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <VideosPageContent data={data} />
    </ClientMessagesProvider>
  );
}
