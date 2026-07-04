import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { LocalizedPageHero } from "@/components/shared/LocalizedPageHero";
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

export default function LoginPage() {
  return (
    <>
      <LocalizedPageHero pageKey="login" centered />
      <LoginPageContent />
    </>
  );
}
