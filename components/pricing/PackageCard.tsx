"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Check,
  Crown,
  Gem,
  Star,
  User,
  type LucideIcon,
} from "lucide-react";
import type { IPackage } from "@/lib/types";
import {
  useLocalizedPackage,
  usePricingLabels,
} from "@/lib/i18n/useLocalizedPackage";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";

export interface IPackageCardProps {
  pkg: IPackage;
  index?: number;
}

const revealEase = [0.22, 1, 0.36, 1] as const;

const PACKAGE_ICONS: Record<string, LucideIcon> = {
  basic: User,
  standard: Crown,
  advance: Award,
  premium: Gem,
};

export function PackageCard({ pkg, index = 0 }: IPackageCardProps) {
  const localized = useLocalizedPackage(pkg);
  const labels = usePricingLabels();
  const isPopular = pkg.popular === true;
  const priceBdt = pkg.price.bdt.toLocaleString("en-BD");
  const Icon = PACKAGE_ICONS[pkg.name.toLowerCase()] ?? Crown;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: revealEase }}
      className={cn(
        "group relative flex h-full flex-col pt-4",
        isPopular && "z-10 lg:-mt-2 lg:mb-2 lg:scale-[1.02]"
      )}
    >
      <div
        className={cn(
          "site-card relative flex h-full flex-col overflow-hidden rounded-2xl bg-white",
          "border shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)]",
          "transition-shadow duration-200 hover:shadow-[0_18px_48px_-16px_rgba(38,155,111,0.22)]",
          isPopular ? "border-primary/45 ring-1 ring-primary/25" : "border-gray-200"
        )}
      >
        {isPopular ? (
          <div className="flex items-center justify-center gap-1.5 bg-primary px-4 py-2 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
            {labels.mostPopular}
          </div>
        ) : null}

        <div
          className={cn(
            "relative px-6 pb-1 md:px-7",
            isPopular ? "pt-6" : "pt-8"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                {pkg.period}
              </p>
              <h3 className="mt-1 font-playfair text-2xl font-bold text-primary-dark md:text-[1.7rem]">
                {localized.name}
              </h3>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-light text-primary">
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </div>

          <div className="mt-5">
            <p className="font-playfair text-4xl font-bold tracking-tight text-primary-dark md:text-[2.5rem]">
              ৳{priceBdt}
              <span className="ml-1 font-body text-base font-medium text-text-gray">
                {labels.perMonth}
              </span>
            </p>
            <p className="mt-1 font-body text-sm text-text-gray">
              {labels.usdMonthly(pkg.price.usd, labels.month)}
            </p>
          </div>

          <div className="my-5 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <span className="h-2 w-2 rotate-45 rounded-[1px] bg-gold" />
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
          </div>
        </div>

        <ul className="relative flex-1 space-y-3 px-6 md:px-7">
          {localized.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="font-body text-sm leading-snug text-text-gray">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative p-6 pt-6 md:px-7 md:pb-7">
          <SiteCta
            href="/student-admission"
            variant="primary"
            size="sm"
            className="w-full"
          >
            {labels.getStarted(priceBdt)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </SiteCta>
        </div>
      </div>
    </motion.article>
  );
}
