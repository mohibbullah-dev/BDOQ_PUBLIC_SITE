"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export { MissionVisionSection } from "@/components/about/MissionVisionSection";

export function ClassSystemSection() {
  const t = useTranslations("content.about");

  return (
    <section className="py-12 md:py-16 bg-bg-light">
      <div className="site-container text-center">
        <h2 className="font-body text-xl font-semibold text-primary-dark mb-6">
          {t("classSystemTitle")}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/courses?type=private"
            className="inline-flex items-center justify-center rounded-full bg-primary text-white font-semibold px-8 py-3 transition-all duration-300"
          >
            {t("classSystem")}
          </Link>
          <Link
            href="/about#our-promise"
            className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-white px-8 py-3 font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
          >
            {t("ourPromise")}
          </Link>
        </div>
        <p
          id="our-promise"
          className="font-body text-sm text-text-gray max-w-2xl mx-auto mt-8 leading-relaxed"
        >
          {t("promiseText")}
        </p>
      </div>
    </section>
  );
}
