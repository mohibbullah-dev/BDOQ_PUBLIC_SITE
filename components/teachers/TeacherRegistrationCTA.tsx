"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function TeacherRegistrationCTA() {
  const t = useTranslations("pages.teachers.registrationCta");

  return (
    <section className="py-16 md:py-24 bg-primary-dark text-white">
      <div className="site-container text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-amiri text-2xl md:text-3xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="font-body text-sm text-white/85 mb-8 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/teacher-registration"
              className="inline-flex items-center justify-center rounded-full bg-primary text-white font-semibold px-8 py-3 transition-all duration-300"
            >
              {t("primaryBtn")}
            </Link>
            <Link
              href="/teacher-registration"
              className="inline-flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 transition-all duration-300"
            >
              {t("secondaryBtn")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
