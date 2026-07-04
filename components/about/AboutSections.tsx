"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function MissionVisionSection() {
  const t = useTranslations("content.about");
  const missionPoints = t.raw("missionPoints") as string[];
  const visionPoints = t.raw("visionPoints") as string[];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h2 className="font-amiri text-2xl md:text-3xl font-bold text-primary-dark mb-6">
              {t("mission")}
            </h2>
            <ul className="space-y-3">
              {missionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-5 w-5 text-primary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="font-inter text-sm text-text-gray leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-amiri text-2xl md:text-3xl font-bold text-primary-dark mb-6">
              {t("vision")}
            </h2>
            <ul className="space-y-3">
              {visionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-5 w-5 text-gold shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="font-inter text-sm text-text-gray leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClassSystemSection() {
  const t = useTranslations("content.about");

  return (
    <section className="py-12 md:py-16 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-inter text-xl font-semibold text-primary-dark mb-6">
          {t("classSystemTitle")}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/courses?type=private"
            className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 transition-all duration-300"
          >
            {t("classSystem")}
          </Link>
          <Link
            href="/about#our-promise"
            className="inline-flex items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 transition-all duration-300"
          >
            {t("ourPromise")}
          </Link>
        </div>
        <p
          id="our-promise"
          className="font-inter text-sm text-text-gray max-w-2xl mx-auto mt-8 leading-relaxed"
        >
          {t("promiseText")}
        </p>
      </div>
    </section>
  );
}
