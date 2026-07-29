"use client";

import { useTranslations } from "next-intl";
import type { ISectionHeaderContent } from "@/lib/types";

type SectionHeaderField =
  | "eyebrow"
  | "title"
  | "subtitle"
  | "titleHighlight"
  | "titleAccent"
  | "intro";

export function useSectionHeaderText(
  namespace: string,
  header: ISectionHeaderContent | undefined,
  fields: readonly SectionHeaderField[]
): ISectionHeaderContent {
  const t = useTranslations(namespace);

  const read = (field: SectionHeaderField): string | undefined => {
    const cmsValue = header?.[field];
    if (cmsValue && cmsValue.trim()) return cmsValue;
    if (t.has(field)) return t(field);
    return undefined;
  };

  return {
    eyebrow: fields.includes("eyebrow") ? read("eyebrow") : undefined,
    title: read("title") ?? t("title"),
    subtitle: fields.includes("subtitle") ? read("subtitle") : undefined,
    titleHighlight: fields.includes("titleHighlight")
      ? read("titleHighlight")
      : undefined,
    titleAccent: fields.includes("titleAccent")
      ? read("titleAccent")
      : undefined,
    intro: fields.includes("intro") ? read("intro") : undefined,
  };
}
