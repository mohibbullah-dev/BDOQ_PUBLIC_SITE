import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { getPricingPackages } from "@/lib/pricing";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getPricingClientMessages } from "@/lib/i18n/clientShellMessages";
import { PricingPageContent } from "@/components/pricing/PricingPageContent";

export const metadata: Metadata = {
  title: "Pricing Packages",
  description:
    "Affordable monthly Quran learning packages at BD Online Quran Academy — Basic ৳2,000, Standard ৳3,000, Advance ৳4,000, Premium ৳5,000.",
  keywords: [
    "quran class price",
    "online quran tuition",
    "BDOQ Academy pricing",
    "quran learning packages",
  ],
  openGraph: {
    title: "Pricing Packages | BD Online Quran Academy",
    description:
      "Choose from Basic, Standard, Advance, or Premium monthly Quran learning packages.",
    url: `${SITE_URL}/pricing`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
};

export default async function PricingPage() {
  const messages = await getMessages();
  const clientMessages = getPricingClientMessages(
    messages as Record<string, unknown>
  );
  const packages = await getPricingPackages();

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <PricingPageContent packages={packages} />
    </ClientMessagesProvider>
  );
}
