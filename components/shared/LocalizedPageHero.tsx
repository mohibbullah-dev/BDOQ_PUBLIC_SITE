import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/PageHero";

interface ILocalizedPageHeroProps {
  pageKey: string;
  centered?: boolean;
  titleAs?: "h1" | "h2";
  containerClassName?: string;
}

export async function LocalizedPageHero({
  pageKey,
  centered,
  titleAs = "h1",
  containerClassName,
}: ILocalizedPageHeroProps) {
  const t = await getTranslations(`pages.${pageKey}`);

  return (
    <PageHero
      eyebrow={t.has("eyebrow") ? t("eyebrow") : undefined}
      title={t("title")}
      subtitle={t("subtitle")}
      centered={centered}
      titleAs={titleAs}
      containerClassName={containerClassName}
    />
  );
}
