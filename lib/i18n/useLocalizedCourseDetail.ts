"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ICourseDetail } from "@/lib/types";

export function useLocalizedCourseDetailFromBase(
  slug: string,
  base: ICourseDetail
): ICourseDetail {
  const locale = useLocale();
  const t = useTranslations(`courseDetails.courses.${slug}`);

  if (locale === "en") return base;

  const benefits = base.benefits.map((benefit) => ({
    ...benefit,
    title: t(`benefits.${benefit.id}.title`),
    description: t(`benefits.${benefit.id}.description`),
  }));

  const modules = base.modules.map((module) => ({
    ...module,
    title: t(`modules.${module.id}.title`),
    topics: t.raw(`modules.${module.id}.topics`) as string[],
  }));

  const audience = t.raw("audience") as string[];

  const faqs = base.faqs.map((faq) => ({
    ...faq,
    question: t(`faqs.${faq.id}.question`),
    answer: t(`faqs.${faq.id}.answer`),
  }));

  return {
    ...base,
    benefits,
    modules,
    audience,
    faqs,
    recommendedPackage: t("recommendedPackage"),
  };
}

export function useCourseDetailUi() {
  return useTranslations("courseDetails.ui");
}

export function useWhyBdoqItems(): string[] {
  const t = useTranslations("courseDetails");
  return t.raw("whyBdoq") as string[];
}
