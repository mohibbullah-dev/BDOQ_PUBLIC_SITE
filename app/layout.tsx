import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Amiri,
  Playfair_Display,
  Hind_Siliguri,
  Tiro_Bangla,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeaderThemeProvider } from "@/components/layout/HeaderThemeContext";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { TopProgressBar } from "@/components/layout/TopProgressBar";
import { SkipToMainLink } from "@/components/layout/SkipToMainLink";
import { DeferredShellWidgets } from "@/components/layout/DeferredShellWidgets";
import { SitePageSurface } from "@/components/layout/SitePageSurface";
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

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
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

  return (
    <html lang={locale}>
      <body
        className={cn(
          plusJakarta.variable,
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
            </HeaderThemeProvider>
          </SiteHeader>
          <main id="main-content">
            <SitePageSurface>
              <PageTransition>{children}</PageTransition>
            </SitePageSurface>
          </main>
          <Footer />
          <DeferredShellWidgets />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
