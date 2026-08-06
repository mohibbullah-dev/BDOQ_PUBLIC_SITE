import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getMessages, getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getFormClientMessages } from "@/lib/i18n/clientShellMessages";
import { RegistrationPageHero } from "@/components/forms/shared/RegistrationPageHero";
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
  const [messages, t] = await Promise.all([
    getMessages(),
    getTranslations("pages.studentAdmission"),
  ]);
  const clientMessages = getFormClientMessages(
    messages as Record<string, unknown>,
    "studentAdmission"
  );

  return (
    <>
      <RegistrationPageHero pageKey="studentAdmission" />

      <section
        id="student-admission-form"
        className="bg-[#F7FBF8] py-10 md:py-14"
      >
        <div className="site-container">
          <ClientMessagesProvider messages={clientMessages}>
            <Suspense fallback={null}>
              <StudentAdmissionWizard />
            </Suspense>
          </ClientMessagesProvider>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <Link
              href="#student-admission-form"
              className="rounded-2xl border border-primary/15 bg-white px-4 py-4 text-center font-body text-sm font-semibold text-primary-dark shadow-sm"
            >
              {t("ctaApply")}
            </Link>
            <Link
              href="/free-class"
              className="rounded-2xl bg-primary px-4 py-4 text-center font-body text-sm font-semibold text-white shadow-sm"
            >
              {t("ctaFree")}
            </Link>
            <Link
              href="/login"
              className="rounded-2xl border border-primary bg-white px-4 py-4 text-center font-body text-sm font-semibold text-primary shadow-sm"
            >
              {t("ctaAccount")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
