import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getMessages, getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getContactClientMessages } from "@/lib/i18n/clientShellMessages";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactGlobalMap } from "@/components/contact/ContactGlobalMap";
import { LocalizedPageHero } from "@/components/shared/LocalizedPageHero";

const ContactForm = dynamic(
  () =>
    import("@/components/forms/ContactForm").then((m) => ({
      default: m.ContactForm,
    })),
  {
    loading: () => (
      <div
        className="h-[420px] animate-pulse rounded-2xl border border-gray-100 bg-white p-8"
        aria-hidden="true"
      />
    ),
  }
);

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact BD Online Quran Academy — phone, email, WhatsApp, or send a message. Gopalganj, Dhaka, Bangladesh.",
  keywords: [
    "contact BDOQ Academy",
    "quran class inquiry",
    "BD Online Quran Academy contact",
    "whatsapp quran class",
  ],
  openGraph: {
    title: "Contact Us | BD Online Quran Academy",
    description:
      "Reach BD Online Quran Academy by phone, email, WhatsApp, or our contact form.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default async function ContactPage() {
  const t = await getTranslations("pages.contact");
  const messages = await getMessages();
  const clientMessages = getContactClientMessages(
    messages as Record<string, unknown>
  );

  const stats = [
    { label: t("responseTime"), value: t("responseValue") },
    { label: t("studentsWorldwide"), value: t("studentsValue") },
    { label: t("supportChannels"), value: t("supportValue") },
  ];

  return (
    <>
      <LocalizedPageHero pageKey="contact" centered />

      <section className="pb-16 md:pb-24 bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white bg-white/90 px-5 py-4 text-center shadow-sm backdrop-blur-sm"
              >
                <p className="font-inter text-xs font-semibold uppercase tracking-wide text-text-gray">
                  {item.label}
                </p>
                <p className="mt-1 font-inter text-sm font-semibold text-primary-dark">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <ClientMessagesProvider messages={clientMessages}>
              <ContactInfo />
              <ContactForm />
            </ClientMessagesProvider>
          </div>

          <ContactGlobalMap />
        </div>
      </section>
    </>
  );
}
