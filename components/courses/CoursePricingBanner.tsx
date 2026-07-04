"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

interface ICoursePricingBannerProps {
  startingPriceBdt: number;
  recommendedPackage: string;
}

export function CoursePricingBanner({
  startingPriceBdt,
  recommendedPackage,
}: ICoursePricingBannerProps) {
  const t = useTranslations("courseDetails.ui.pricingBanner");
  const isFree = startingPriceBdt === 0;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-primary-dark via-primary to-gold/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="font-inter text-sm uppercase tracking-widest text-white/80 mb-2">
              {t("recommendedLabel", { package: recommendedPackage })}
            </p>
            <h2 className="font-amiri text-2xl md:text-3xl font-bold">
              {isFree
                ? t("startLearningFree")
                : t("startLearningMonthly", {
                    price: startingPriceBdt.toLocaleString("en-BD"),
                  })}
            </h2>
            <p className="font-inter text-sm text-white/85 mt-2 max-w-xl">
              {t("description")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/student-admission"
              className="inline-flex items-center justify-center rounded-full bg-white text-primary-dark font-semibold px-8 py-3 hover:bg-bg-light transition-all duration-300"
            >
              {t("enrollNow")}
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border-2 border-white text-white font-semibold px-8 py-3 hover:bg-white/10 transition-all duration-300"
            >
              {t("viewAllPackages")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
