"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Crown } from "lucide-react";
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

export function PackageCard({ pkg, index = 0 }: IPackageCardProps) {
  const localized = useLocalizedPackage(pkg);
  const labels = usePricingLabels();
  const isPopular = pkg.popular === true;
  const priceFormatted = pkg.price.bdt.toLocaleString("en-BD");

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: revealEase }}
      className={cn(
        "group relative flex h-full flex-col",
        isPopular && "lg:-mt-4 lg:mb-4 lg:scale-[1.03] z-10"
      )}
    >
      {isPopular && (
        <span
          className={cn(
            "absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1",
            "bg-[linear-gradient(135deg,#CD443F,#A83530)] font-body text-[11px] font-bold uppercase tracking-wider text-white",
            "shadow-[0_8px_20px_-6px_rgba(205,68,63,0.45)]"
          )}
        >
          {labels.mostPopular}
        </span>
      )}

      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500",
          isPopular
            ? [
                "bg-[linear-gradient(160deg,#32C991_0%,#269B6F_50%,#CD443F_100%)]",
                "text-white shadow-md",
              ]
            : [
                "site-card border border-gray-200 bg-white text-text-dark",
                "transition-shadow duration-200 hover:shadow-md",
              ]
        )}
      >

        <div className="relative px-6 pb-2 pt-7 md:px-7 md:pt-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className={cn(
                  "font-body text-xs font-semibold uppercase tracking-widest",
                  isPopular ? "text-teal/90" : "text-primary"
                )}
              >
                {pkg.period}
              </p>
              <h3
                className={cn(
                  "mt-1 font-playfair text-2xl font-bold md:text-[1.65rem]",
                  isPopular ? "text-white" : "text-primary-dark"
                )}
              >
                {localized.name}
              </h3>
            </div>

            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                isPopular
                  ? "bg-white/15 text-white ring-1 ring-white/20"
                  : "bg-bg-light text-primary"
              )}
            >
              <Crown
                className="h-5 w-5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </div>
          </div>

          <div
            className={cn(
              "mt-5 border-b border-dashed pb-5",
              isPopular ? "border-white/15" : "border-gray-200"
            )}
          >
            <p
              className={cn(
                "font-body text-3xl font-bold tracking-tight md:text-[2rem]",
                isPopular ? "text-white" : "text-primary-dark"
              )}
            >
              ৳{priceFormatted}
              <span
                className={cn(
                  "ml-1 text-base font-medium",
                  isPopular ? "text-white/65" : "text-text-gray"
                )}
              >
                {labels.perMonth}
              </span>
            </p>
            <p
              className={cn(
                "mt-1 font-body text-sm",
                isPopular ? "text-white/70" : "text-text-gray"
              )}
            >
              {labels.usdMonthly(pkg.price.usd, labels.month)}
            </p>
          </div>
        </div>

        <ul className="relative flex-1 space-y-2.5 px-6 md:px-7">
          {localized.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  isPopular
                    ? "bg-white/15 text-teal"
                    : "bg-primary/10 text-primary"
                )}
              >
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              <span
                className={cn(
                  "font-body text-sm leading-snug",
                  isPopular ? "text-white/90" : "text-text-gray"
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative p-6 pt-5 md:p-7 md:pt-6">
          <SiteCta
            href="/student-admission"
            variant={isPopular ? "secondary" : "primary"}
            size="sm"
            className={cn(
              "w-full",
              isPopular &&
                "border-white/40 bg-white text-primary hover:bg-bg-light hover:text-primary"
            )}
          >
            {labels.getStarted(priceFormatted)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </SiteCta>
        </div>
      </div>
    </motion.article>
  );
}
