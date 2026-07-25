import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getFormClientMessages } from "@/lib/i18n/clientShellMessages";
import { RegistrationPageHero } from "@/components/forms/shared/RegistrationPageHero";
import { TeacherRegistrationWizard } from "@/components/forms/teacher-registration/TeacherRegistrationWizard";

export const metadata: Metadata = {
  title: "Teacher Registration",
  description:
    "Join BD Online Quran Academy as a Quran teacher — register your application with CV and qualifications.",
  keywords: [
    "quran teacher registration",
    "online quran tutor",
    "BDOQ Academy teacher",
    "islamic teacher jobs",
  ],
  openGraph: {
    title: "Teacher Registration | BD Online Quran Academy",
    description:
      "Apply to teach Quran, Tajweed, and Hifz at BD Online Quran Academy.",
    url: `${SITE_URL}/teacher-registration`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/teacher-registration`,
  },
};

export default async function TeacherRegistrationPage() {
  const messages = await getMessages();
  const clientMessages = getFormClientMessages(
    messages as Record<string, unknown>,
    "teacherRegistration"
  );

  return (
    <>
      <RegistrationPageHero pageKey="teacherRegistration" />

      <section className="bg-[#F7FBF8] py-10 md:py-14">
        <div className="site-container">
          <ClientMessagesProvider messages={clientMessages}>
            <TeacherRegistrationWizard />
          </ClientMessagesProvider>
        </div>
      </section>
    </>
  );
}
