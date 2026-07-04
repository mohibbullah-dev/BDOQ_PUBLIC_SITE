import type { Metadata } from "next";
import { Suspense } from "react";
import { getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { getCourses } from "@/lib/courses";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getCoursesListClientMessages } from "@/lib/i18n/clientShellMessages";
import { CoursesPageClient } from "@/components/courses/CoursesPageClient";

export const metadata: Metadata = {
  title: "All Courses",
  description:
    "Explore Quran courses at BD Online Quran Academy — Noorani Qaida, Tajweed, Hifz, private one-to-one classes, and free learning options.",
  keywords: [
    "quran courses",
    "online quran classes",
    "noorani qaida",
    "tajweed course",
    "hifz course",
    "BDOQ Academy courses",
  ],
  openGraph: {
    title: "All Courses | BD Online Quran Academy",
    description:
      "Explore Quran courses at BD Online Quran Academy — Noorani Qaida, Tajweed, Hifz, and more.",
    url: `${SITE_URL}/courses`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/courses`,
  },
};

export default async function CoursesPage() {
  const messages = await getMessages();
  const clientMessages = getCoursesListClientMessages(
    messages as Record<string, unknown>
  );
  const courses = await getCourses();

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <Suspense
        fallback={
          <div className="py-24 text-center font-inter text-text-gray">
            Loading courses...
          </div>
        }
      >
        <CoursesPageClient allCourses={courses} />
      </Suspense>
    </ClientMessagesProvider>
  );
}
