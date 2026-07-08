import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { ACADEMY_INFO, SITE_URL } from "@/lib/constants";
import { getFaqItems } from "@/lib/faq";
import { getTestimonials } from "@/lib/testimonials";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getAboutClientMessages } from "@/lib/i18n/clientShellMessages";
import { AboutPageVideoSection } from "@/components/about/AboutPageVideoSection";
import {
  ClassSystemSection,
  MissionVisionSection,
} from "@/components/about/AboutSections";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { GlobalPresenceSection } from "@/components/home/GlobalPresenceSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";

export const metadata: Metadata = {
  title: "About Us",
  description: ACADEMY_INFO.mission,
  keywords: [
    "about BDOQ Academy",
    "BD Online Quran Academy",
    "online quran school",
    "quran education bangladesh",
  ],
  openGraph: {
    title: "About Us | BD Online Quran Academy",
    description: ACADEMY_INFO.tagline,
    url: `${SITE_URL}/about`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default async function AboutPage() {
  const [messages, testimonials] = await Promise.all([
    getMessages(),
    getTestimonials(),
  ]);
  const faqItems = getFaqItems();
  const clientMessages = getAboutClientMessages(
    messages as Record<string, unknown>
  );

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <AboutPageVideoSection />
      <MissionVisionSection />
      <ClassSystemSection />
      <WhyChooseUsSection />
      <GlobalPresenceSection />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection items={faqItems} />
    </ClientMessagesProvider>
  );
}
