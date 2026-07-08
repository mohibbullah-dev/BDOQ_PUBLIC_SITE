"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Crown } from "lucide-react";
import type { IPackage } from "@/lib/types";
import {
  useLocalizedPackage,
  usePricingLabels,
} from "@/lib/i18n/useLocalizedPackage";
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
            "bg-[linear-gradient(135deg,#E84B3A,#C62828)] font-inter text-[11px] font-bold uppercase tracking-wider text-white",
            "shadow-[0_8px_20px_-6px_rgba(232,75,58,0.45)]"
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
                "bg-gradient-to-b from-primary-dark via-[#145c38] to-primary",
                "text-white shadow-[0_32px_64px_-24px_rgba(13,74,47,0.5)]",
                "ring-1 ring-white/15",
              ]
            : [
                "border border-gray-100 bg-white text-text-dark",
                "shadow-[0_16px_40px_-20px_rgba(50,201,145,0.15)]",
                "hover:-translate-y-2 hover:border-primary/25",
                "hover:shadow-[0_28px_56px_-20px_rgba(50,201,145,0.22)]",
              ]
        )}
      >
        {!isPopular && (
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 group-hover:scale-x-100"
            aria-hidden="true"
          />
        )}

        {isPopular && (
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/[0.07] blur-2xl"
            aria-hidden="true"
          />
        )}

        <div className="relative px-6 pb-2 pt-7 md:px-7 md:pt-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className={cn(
                  "font-inter text-xs font-semibold uppercase tracking-widest",
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
                "font-inter text-3xl font-bold tracking-tight md:text-[2rem]",
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
                "mt-1 font-inter text-sm",
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
                  "font-inter text-sm leading-snug",
                  isPopular ? "text-white/90" : "text-text-gray"
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative p-6 pt-5 md:p-7 md:pt-6">
          <Link
            href="/student-admission"
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5",
              "font-inter text-sm font-semibold transition-all duration-300",
              isPopular
                ? "bg-white text-primary hover:bg-bg-light hover:shadow-lg"
                : "bg-primary text-white hover:bg-primary-dark hover:shadow-md"
            )}
          >
            {labels.getStarted(priceFormatted)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
