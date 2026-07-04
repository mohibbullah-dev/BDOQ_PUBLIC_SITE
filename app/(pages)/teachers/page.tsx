import type { Metadata } from "next";
import { Suspense } from "react";
import { getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getTeachersClientMessages } from "@/lib/i18n/clientShellMessages";
import { LocalizedPageHero } from "@/components/shared/LocalizedPageHero";
import { FounderSection } from "@/components/teachers/FounderSection";
import { TeacherRegistrationCTA } from "@/components/teachers/TeacherRegistrationCTA";
import { TeachersPageClient } from "@/components/teachers/TeachersPageClient";
import { getAllTeachers } from "@/lib/teachers";
import { buildTeacherGenderTabs } from "@/lib/teachersPage";

export const metadata: Metadata = {
  title: "Teachers and Mentors",
  description:
    "Meet the experienced Hafiz and scholars at BD Online Quran Academy — founded by Hafez Mawlana Mufti Abdul Mumin Khan.",
  keywords: [
    "quran teachers",
    "online hafiz",
    "female quran teacher",
    "BDOQ Academy teachers",
  ],
  openGraph: {
    title: "Teachers | BD Online Quran Academy",
    description:
      "Quran learning under the supervision of experienced, trained and trusted scholars.",
    url: `${SITE_URL}/teachers`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/teachers`,
  },
};

function TeachersTabsFallback() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 h-14 max-w-2xl animate-pulse rounded-2xl bg-gray-200" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function TeachersPage() {
  const messages = await getMessages();
  const clientMessages = getTeachersClientMessages(
    messages as Record<string, unknown>
  );
  const allTeachers = await getAllTeachers();
  const tabs = buildTeacherGenderTabs(allTeachers);

  return (
    <>
      <LocalizedPageHero pageKey="teachers" centered />

      <FounderSection />

      <ClientMessagesProvider messages={clientMessages}>
        <Suspense fallback={<TeachersTabsFallback />}>
          <TeachersPageClient tabs={tabs} />
        </Suspense>
      </ClientMessagesProvider>

      <TeacherRegistrationCTA />
    </>
  );
}
