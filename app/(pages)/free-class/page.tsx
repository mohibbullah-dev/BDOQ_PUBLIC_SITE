import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getFormClientMessages } from "@/lib/i18n/clientShellMessages";
import { LocalizedPageHero } from "@/components/shared/LocalizedPageHero";
import { FreeClassForm } from "@/components/forms/FreeClassForm";
import { getCourses } from "@/lib/courses";
import { buildFreeClassSubjects } from "@/lib/formOptions";

export const metadata: Metadata = {
  title: "Free Trial Class",
  description:
    "Register for a free trial Quran class at BD Online Quran Academy — one-to-one online classes with experienced Hafiz teachers.",
  keywords: [
    "free quran class",
    "trial quran lesson",
    "online quran trial",
    "BDOQ Academy free class",
  ],
  openGraph: {
    title: "Free Trial Class | BD Online Quran Academy",
    description:
      "Book your free trial Quran class — Tajweed, Hifz, and Noorani Qaida with one-to-one teachers.",
    url: `${SITE_URL}/free-class`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/free-class`,
  },
};

export default async function FreeClassPage() {
  const [messages, courses] = await Promise.all([
    getMessages(),
    getCourses(),
  ]);
  const subjectOptions = buildFreeClassSubjects(courses);
  const clientMessages = getFormClientMessages(
    messages as Record<string, unknown>,
    "freeClass"
  );

  return (
    <>
      <LocalizedPageHero pageKey="freeClass" centered />

      <section className="py-12 md:py-16 bg-bg-light">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ClientMessagesProvider messages={clientMessages}>
            <FreeClassForm subjects={subjectOptions} />
          </ClientMessagesProvider>
        </div>
      </section>
    </>
  );
}
