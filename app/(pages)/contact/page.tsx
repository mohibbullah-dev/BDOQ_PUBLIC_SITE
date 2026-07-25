import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getContactClientMessages } from "@/lib/i18n/clientShellMessages";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactGlobalMap } from "@/components/contact/ContactGlobalMap";
import { ContactPageHero } from "@/components/contact/ContactPageHero";
import { ContactQuickCards } from "@/components/contact/ContactQuickCards";

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
  const messages = await getMessages();
  const clientMessages = getContactClientMessages(
    messages as Record<string, unknown>
  );

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <ContactPageHero />

      <section className="bg-[#F9FBF9] pb-16 md:pb-24">
        <div className="site-container pt-2 md:pt-4">
          <ContactQuickCards />

          <div className="mt-12 grid items-start gap-10 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-8 lg:mt-14 lg:grid-cols-2 lg:gap-12">
            <ContactInfo />
            <ContactForm />
          </div>

          <ContactGlobalMap />
        </div>
      </section>
    </ClientMessagesProvider>
  );
}
