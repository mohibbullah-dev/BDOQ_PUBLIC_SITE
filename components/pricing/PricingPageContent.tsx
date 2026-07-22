"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { IPackage } from "@/lib/types";
import { PackageCard } from "@/components/pricing/PackageCard";
import { LocalizedPageHeroClient } from "@/components/shared/LocalizedPageHeroClient";

export function PricingPageContent({ packages }: { packages: IPackage[] }) {
  const t = useTranslations("content.pricing");
  const tPages = useTranslations("pages.pricing");

  return (
    <>
      <LocalizedPageHeroClient pageKey="pricing" centered />

      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(50,201,145,0.06),transparent_55%)]"
          aria-hidden="true"
        />

        <div className="site-container relative">
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4">
            {packages.map((pkg, index) => (
              <PackageCard key={pkg.slug ?? pkg.name} pkg={pkg} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-bg-light">
        <div className="site-container text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-body text-xl font-semibold text-primary-dark mb-4">
              {tPages("familyDiscount")}
            </h2>
            <p className="font-body text-sm text-text-gray leading-relaxed mb-4">
              {t("familyIntro")}
            </p>
            <p className="font-body text-sm font-medium text-primary leading-relaxed">
              {t("familyDetail")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary-dark text-white">
        <div className="site-container text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-amiri text-2xl md:text-3xl font-bold mb-3">
              {tPages("cantDecide")}
            </h2>
            <p className="font-body text-base text-white/85 mb-8">
              {tPages("cantDecideDesc")}
            </p>
            <Link
              href="/free-class"
              className="inline-flex items-center justify-center rounded-full bg-primary text-white font-bold px-8 py-3.5 text-sm tracking-wide transition-all duration-300 hover:shadow-lg"
            >
              {tPages("registerFree")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
