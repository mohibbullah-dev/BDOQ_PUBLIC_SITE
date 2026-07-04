import type { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { getAudioPageData } from "@/lib/resources";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getResourcesClientMessages } from "@/lib/i18n/clientShellMessages";
import { AudioPageContent } from "@/components/resources/AudioPageContent";

export const metadata: Metadata = {
  title: "Our Audio",
  description:
    "Listen to Quran recitations and audio learning resources from BD Online Quran Academy.",
  keywords: [
    "quran audio",
    "surah recitation",
    "quran listening",
    "BDOQ Academy audio",
  ],
  openGraph: {
    title: "Our Audio | BD Online Quran Academy",
    description: "Beautiful Quran recitations and learning audio.",
    url: `${SITE_URL}/resources/audio`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/resources/audio`,
  },
};

export default async function AudioPage() {
  const locale = (await getLocale()) as "en" | "bn";
  const [messages, data] = await Promise.all([
    getMessages(),
    getAudioPageData(locale),
  ]);
  const clientMessages = getResourcesClientMessages(
    messages as Record<string, unknown>
  );

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <AudioPageContent data={data} />
    </ClientMessagesProvider>
  );
}
