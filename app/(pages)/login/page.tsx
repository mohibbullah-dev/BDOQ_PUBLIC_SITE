import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { ClientMessagesProvider } from "@/components/i18n/ClientMessagesProvider";
import { getLoginClientMessages } from "@/lib/i18n/clientShellMessages";
import { LoginPageContent } from "@/components/auth/LoginPageContent";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to the BD Online Quran Academy portal — access your student or teacher dashboard.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sign In | BD Online Quran Academy",
    description: "Access your BDOQ Academy student or teacher portal.",
    url: `${SITE_URL}/login`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/login`,
  },
};

export default async function LoginPage() {
  const messages = await getMessages();
  const clientMessages = getLoginClientMessages(
    messages as Record<string, unknown>
  );

  return (
    <ClientMessagesProvider messages={clientMessages}>
      <LoginPageContent />
    </ClientMessagesProvider>
  );
}
