import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { getTestimonials } from "@/lib/testimonials";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getReviewsClientMessages } from "@/lib/i18n/clientShellMessages";
import { AllReviewsView } from "@/components/reviews/AllReviewsView";

export const metadata: Metadata = {
  title: "All Reviews",
  description:
    "Read student and parent reviews of BD Online Quran Academy — trusted Quran learning with experienced teachers worldwide.",
  keywords: [
    "BDOQ Academy reviews",
    "quran academy testimonials",
    "online quran student reviews",
    "BD Online Quran Academy",
  ],
  openGraph: {
    title: "All Reviews | BD Online Quran Academy",
    description:
      "See what students and parents say about learning Quran with BDOQ Academy.",
    url: `${SITE_URL}/reviews`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/reviews`,
  },
};

export default async function ReviewsPage() {
  const messages = await getMessages();
  const clientMessages = getReviewsClientMessages(
    messages as Record<string, unknown>
  );
  const testimonials = await getTestimonials();

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <AllReviewsView testimonials={testimonials} />
    </ClientMessagesProvider>
  );
}
