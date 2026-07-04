"use client";

import { useTranslations } from "next-intl";
import type { IPackage } from "@/lib/types";
import { PACKAGE_KEYS } from "@/lib/i18n/contentKeys";

export function useLocalizedPackage(pkg: IPackage) {
  const packageKey = PACKAGE_KEYS[pkg.name.toLowerCase()];
  const t = useTranslations(
    packageKey ? `content.pricing.packages.${packageKey}` : "content.pricing"
  );

  if (!packageKey) {
    return { name: pkg.name, features: pkg.features };
  }

  const features = t.raw("features") as string[];

  return {
    name: t("name"),
    features,
  };
}

export function usePricingLabels() {
  const t = useTranslations("content.pricing");

  return {
    month: t("month"),
    perMonth: t("perMonth"),
    usdMonthly: (usd: number, month: string) => t("usdMonthly", { usd, month }),
    mostPopular: t("mostPopular"),
    getStarted: (price: string) => t("getStarted", { price }),
  };
}
