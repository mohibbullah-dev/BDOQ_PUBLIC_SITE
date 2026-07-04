import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { LocalizedPageHero } from "@/components/shared/LocalizedPageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for BD Online Quran Academy — how we collect, use, and protect your information.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <LocalizedPageHero pageKey="privacy" containerClassName="max-w-3xl" />

      <section className="pb-16 md:pb-24 bg-bg-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="space-y-6 font-inter text-base text-text-dark leading-relaxed">
            <p>
              BD Online Quran Academy (&quot;BDOQ Academy&quot;) collects
              personal information you provide when registering for classes,
              submitting forms, or contacting us. This may include your name,
              email, phone number, address, and learning preferences.
            </p>
            <p>
              We use this information solely to deliver Quran education
              services, communicate about your classes, and improve our academy
              operations. We do not sell your personal data to third parties.
            </p>
            <p>
              Student privacy is a core value — especially for women and
              children. Class recordings, contact details, and academic records
              are handled with strict confidentiality.
            </p>
            <p>
              For questions about this policy, contact us at{" "}
              <a
                href="mailto:contact@bdonlinequranacademy.com"
                className="text-primary hover:text-primary-dark"
              >
                contact@bdonlinequranacademy.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
