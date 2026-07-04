import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { getGalleryItems } from "@/lib/gallery";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getGalleryClientMessages } from "@/lib/i18n/clientShellMessages";
import { GalleryPageContent } from "@/components/gallery/GalleryPageContent";

export const metadata: Metadata = {
  title: "Our Gallery",
  description:
    "Photo gallery of BD Online Quran Academy classes, events, teachers, and student community.",
  keywords: [
    "BDOQ Academy gallery",
    "quran academy photos",
    "online quran classes",
  ],
  openGraph: {
    title: "Our Gallery | BD Online Quran Academy",
    description: "Moments from BDOQ Academy classes and community events.",
    url: `${SITE_URL}/gallery`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
};

export default async function GalleryPage() {
  const messages = await getMessages();
  const clientMessages = getGalleryClientMessages(
    messages as Record<string, unknown>
  );
  const items = await getGalleryItems();

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <GalleryPageContent items={items} />
    </ClientMessagesProvider>
  );
}
