import type { Metadata } from "next";
import {
  Inter,
  Amiri,
  Playfair_Display,
  Hind_Siliguri,
  Tiro_Bangla,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { QuranVerseMarquee } from "@/components/layout/QuranVerseMarquee";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeaderThemeProvider } from "@/components/layout/HeaderThemeContext";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { TopProgressBar } from "@/components/layout/TopProgressBar";
import { SkipToMainLink } from "@/components/layout/SkipToMainLink";
import { DeferredShellWidgets } from "@/components/layout/DeferredShellWidgets";
import { SITE_URL } from "@/lib/constants";
import { getClientShellMessages } from "@/lib/i18n/clientShellMessages";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import "./globals.css";
import { cn } from "@/lib/cn";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const amiri = Amiri({
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-bengali-display",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BD Online Quran Academy",
    template: "%s | BD Online Quran Academy",
  },
  description:
    "A reliable virtual classroom for online Quran teachers and students. Live Tajweed, Hifz, and Noorani Qaida classes with experienced Hafiz and scholars.",
  keywords: [
    "quran",
    "online quran",
    "tajweed",
    "hifz",
    "noorani qaida",
    "BDOQ Academy",
    "BD Online Quran Academy",
  ],
  openGraph: {
    title: "BD Online Quran Academy",
    description:
      "A reliable virtual classroom for online Quran teachers and students",
    url: "https://bdonlinequranacademy.com",
    siteName: "BD Online Quran Academy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BD Online Quran Academy",
    description:
      "A reliable virtual classroom for online Quran teachers and students",
  },
  alternates: {
    canonical: "https://bdonlinequranacademy.com",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const clientMessages = getClientShellMessages(
    messages as Record<string, unknown>
  );

  // #region agent log
  fetch("http://127.0.0.1:7416/ingest/ebf5acf2-f99a-40e3-88a0-a4b533c78c2b", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "1c0f9f",
    },
    body: JSON.stringify({
      sessionId: "1c0f9f",
      runId: "post-fix",
      hypothesisId: "A",
      location: "app/layout.tsx:RootLayout",
      message: "getLocale in root layout",
      data: {
        locale,
        hasLocale: Boolean(locale),
        passesLocaleToProvider: true,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return (
    <html lang={locale}>
      <body
        className={cn(
          inter.variable,
          amiri.variable,
          playfair.variable,
          hindSiliguri.variable,
          tiroBangla.variable,
          "antialiased"
        )}
      >
        <OrganizationJsonLd />
        <TopProgressBar />
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <SkipToMainLink />
          <SiteHeader>
            <HeaderThemeProvider>
              <TopBar />
              <Navbar />
              <QuranVerseMarquee />
            </HeaderThemeProvider>
          </SiteHeader>
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <DeferredShellWidgets />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
