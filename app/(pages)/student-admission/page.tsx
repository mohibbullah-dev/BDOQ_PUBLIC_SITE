import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getFormClientMessages } from "@/lib/i18n/clientShellMessages";
import { LocalizedPageHero } from "@/components/shared/LocalizedPageHero";
import { StudentAdmissionWizard } from "@/components/forms/student-admission/StudentAdmissionWizard";

export const metadata: Metadata = {
  title: "Student Admission",
  description:
    "Apply for student admission at BD Online Quran Academy — enroll in one-to-one Quran, Tajweed, and Hifz classes.",
  keywords: [
    "quran student admission",
    "online quran enrollment",
    "BDOQ Academy admission",
    "quran class registration",
  ],
  openGraph: {
    title: "Student Admission | BD Online Quran Academy",
    description:
      "Submit your student admission application for live one-to-one Quran classes.",
    url: `${SITE_URL}/student-admission`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/student-admission`,
  },
};

export default async function StudentAdmissionPage() {
  const messages = await getMessages();
  const clientMessages = getFormClientMessages(
    messages as Record<string, unknown>,
    "studentAdmission"
  );

  return (
    <>
      <LocalizedPageHero pageKey="studentAdmission" centered />

      <section
        id="student-admission-form"
        className="py-12 md:py-16 bg-bg-light"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClientMessagesProvider messages={clientMessages}>
            <StudentAdmissionWizard />
          </ClientMessagesProvider>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <Link
              href="#student-admission-form"
              className="rounded-2xl border border-primary/15 bg-white px-4 py-4 text-center font-inter text-sm font-semibold text-primary-dark shadow-sm"
            >
              Fill out the form above to apply
            </Link>
            <Link
              href="/free-class"
              className="rounded-2xl bg-primary px-4 py-4 text-center font-inter text-sm font-semibold text-white shadow-sm"
            >
              Register for free classes
            </Link>
            <Link
              href="/login"
              className="rounded-2xl border border-primary bg-white px-4 py-4 text-center font-inter text-sm font-semibold text-primary shadow-sm"
            >
              Create student account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
