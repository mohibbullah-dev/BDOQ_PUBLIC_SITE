"use client";

import {
  Clock3,
  Headphones,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { IPackage } from "@/lib/types";
import { WHATSAPP_URL } from "@/lib/constants";
import { PackageCard } from "@/components/pricing/PackageCard";
import { PricingPageHero } from "@/components/pricing/PricingPageHero";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";

const TRUST_ITEMS = [
  { key: "trustSecure", icon: ShieldCheck },
  { key: "trustTeachers", icon: Users },
  { key: "trustSchedule", icon: Clock3 },
  { key: "trustSupport", icon: Headphones },
] as const;

export function PricingPageContent({ packages }: { packages: IPackage[] }) {
  const t = useTranslations("content.pricing");
  const tPages = useTranslations("pages.pricing");

  return (
    <>
      <PricingPageHero />

      <section className="relative overflow-hidden bg-white py-14 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(50,201,145,0.05),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="site-container relative">
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {packages.map((pkg, index) => (
              <PackageCard key={pkg.slug ?? pkg.name} pkg={pkg} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7FBF8] py-10 md:py-14">
        <div className="site-container">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="site-card rounded-2xl border border-primary/15 bg-bg-light px-5 py-6 md:px-7 md:py-7">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <Tag className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-playfair text-xl font-bold text-primary-dark">
                    {tPages("familyDiscount")}
                  </h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-text-gray">
                    {t("familyIntro")}
                  </p>
                </div>
              </div>
            </div>

            <div className="site-card rounded-2xl border border-primary/15 bg-bg-light px-5 py-6 md:px-6 md:py-7">
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                {tPages("additionalDiscount")}
              </p>
              <p className="mt-2 font-body text-sm font-medium leading-relaxed text-primary-dark">
                {t("familyDetail")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white py-6 md:py-8">
        <div className="site-container">
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-0">
            {TRUST_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.key}
                  className={cn(
                    "flex items-center gap-3 px-2 lg:justify-center lg:px-4",
                    index < TRUST_ITEMS.length - 1 &&
                      "lg:border-r lg:border-gray-200"
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-light text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-body text-sm font-semibold text-primary-dark">
                    {tPages(item.key)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-bg-light py-12 md:py-16">
        <div className="site-container text-center">
          <h2 className="font-playfair text-2xl font-bold text-primary-dark md:text-3xl">
            {tPages("cantDecide")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-sm text-text-gray md:text-base">
            {tPages("cantDecideDesc")}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SiteCta href="/free-class">{tPages("registerFree")}</SiteCta>
            <SiteCta href={WHATSAPP_URL} variant="ghost" external>
              {tPages("askUs")}
            </SiteCta>
          </div>
        </div>
      </section>
    </>
  );
}
