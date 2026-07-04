import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { LocalizedPageHero } from "@/components/shared/LocalizedPageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for BD Online Quran Academy website and online Quran learning services.",
  alternates: {
    canonical: `${SITE_URL}/terms-of-use`,
  },
};

export default function TermsOfUsePage() {
  return (
    <>
      <LocalizedPageHero pageKey="terms" containerClassName="max-w-3xl" />

      <section className="pb-16 md:pb-24 bg-bg-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="space-y-6 font-inter text-base text-text-dark leading-relaxed">
            <p>
              By using the BD Online Quran Academy website and enrolling in our
              courses, you agree to these terms. BDOQ Academy provides online
              Quran education including Noorani Qaida, Tajweed, and Hifz through
              live one-to-one and group classes.
            </p>
            <p>
              Students and parents are expected to attend scheduled classes on
              time, maintain respectful communication with teachers, and use
              approved platforms for online sessions. Payment terms for monthly
              packages are agreed upon at enrollment.
            </p>
            <p>
              Teachers registered with BDOQ Academy agree to uphold Islamic adab,
              maintain student confidentiality, and deliver lessons according to
              academy standards.
            </p>
            <p>
              BDOQ Academy reserves the right to update these terms. Continued
              use of our services constitutes acceptance of any revisions.
              Contact{" "}
              <a
                href="mailto:contact@bdonlinequranacademy.com"
                className="text-primary hover:text-primary-dark"
              >
                contact@bdonlinequranacademy.com
              </a>{" "}
              with questions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
