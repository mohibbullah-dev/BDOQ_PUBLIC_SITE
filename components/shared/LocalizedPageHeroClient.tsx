"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/shared/PageHero";
import type { ISectionHeaderProps } from "@/components/shared/SectionHeader";

interface ILocalizedPageHeroClientProps {
  pageKey: string;
  centered?: boolean;
  titleAs?: ISectionHeaderProps["titleAs"];
  children?: React.ReactNode;
}

export function LocalizedPageHeroClient({
  pageKey,
  centered,
  titleAs = "h1",
  children,
}: ILocalizedPageHeroClientProps) {
  const t = useTranslations(`pages.${pageKey}`);

  return (
    <PageHero
      eyebrow={t.has("eyebrow") ? t("eyebrow") : undefined}
      title={t("title")}
      subtitle={t("subtitle")}
      centered={centered}
      titleAs={titleAs}
    >
      {children}
    </PageHero>
  );
}
