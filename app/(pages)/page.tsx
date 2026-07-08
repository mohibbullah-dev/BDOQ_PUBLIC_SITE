import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ACADEMY_INFO, SITE_URL } from "@/lib/constants";
import { getHomeClientMessages } from "@/lib/i18n/clientShellMessages";
import { getFaqItems } from "@/lib/faq";
import { getFeaturedTeachers } from "@/lib/teachers";
import { getTestimonials } from "@/lib/testimonials";
import { HomeHeroGroup } from "@/components/home/HomeHeroGroup";
import { QuickNavSection } from "@/components/home/QuickNavSection";
import { AboutSection } from "@/components/home/AboutSection";
import { SectionSkeleton } from "@/components/shared/SectionSkeleton";

const TopicsSection = dynamic(
  () =>
    import("@/components/home/TopicsSection").then((m) => ({
      default: m.TopicsSection,
    })),
  { loading: () => <SectionSkeleton /> }
);

const LearningPlansSection = dynamic(
  () =>
    import("@/components/home/LearningPlansSection").then((m) => ({
      default: m.LearningPlansSection,
    })),
  { loading: () => <SectionSkeleton /> }
);

const HowToStartSection = dynamic(
  () =>
    import("@/components/home/HowToStartSection").then((m) => ({
      default: m.HowToStartSection,
    })),
  { loading: () => <SectionSkeleton /> }
);

const WhyChooseUsSection = dynamic(
  () =>
    import("@/components/home/WhyChooseUsSection").then((m) => ({
      default: m.WhyChooseUsSection,
    })),
  { loading: () => <SectionSkeleton /> }
);

const TeachersPreviewSection = dynamic(
  () =>
    import("@/components/home/TeachersPreviewSection").then((m) => ({
      default: m.TeachersPreviewSection,
    })),
  { loading: () => <SectionSkeleton /> }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/home/TestimonialsSection").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: () => <SectionSkeleton /> }
);

const FAQSection = dynamic(
  () =>
    import("@/components/home/FAQSection").then((m) => ({
      default: m.FAQSection,
    })),
  { loading: () => <SectionSkeleton /> }
);

const WelcomeModal = dynamic(
  () =>
    import("@/components/home/WelcomeModal").then((m) => ({
      default: m.WelcomeModal,
    })),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Home",
  description: ACADEMY_INFO.tagline,
  keywords: [
    "quran",
    "online quran",
    "tajweed",
    "hifz",
    "noorani qaida",
    "BDOQ Academy",
    "BD Online Quran Academy",
    "online quran classes",
    "quran teacher",
  ],
  openGraph: {
    title: "BD Online Quran Academy",
    description: ACADEMY_INFO.tagline,
    url: SITE_URL,
    siteName: ACADEMY_INFO.name,
    locale: "en_US",
    type: "website",
    images: ["/og-images/home.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BD Online Quran Academy",
    description: ACADEMY_INFO.tagline,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function HomePage() {
  const locale = await getLocale();
  const messages = await getMessages();
  const homeMessages = getHomeClientMessages(
    messages as Record<string, unknown>
  );
  const [featuredTeachers, testimonials, faqItems] = await Promise.all([
    getFeaturedTeachers(),
    getTestimonials(),
    getFaqItems(),
  ]);

  return (
    <NextIntlClientProvider locale={locale} messages={homeMessages}>
      <WelcomeModal />
      <HomeHeroGroup />
      <QuickNavSection />
      <AboutSection />
      <TopicsSection />
      <LearningPlansSection />
      <HowToStartSection />
      <WhyChooseUsSection />
      <TeachersPreviewSection teachers={featuredTeachers} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection items={faqItems} />
    </NextIntlClientProvider>
  );
}
