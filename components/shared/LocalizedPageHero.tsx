import { getTranslations } from "next-intl/server";
import { PageHero, type IPageHeroProps } from "@/components/shared/PageHero";

interface ILocalizedPageHeroProps {
  pageKey: string;
  centered?: boolean;
  titleAs?: "h1" | "h2";
  containerClassName?: string;
  heroOverlay?: IPageHeroProps["heroOverlay"];
}

export async function LocalizedPageHero({
  pageKey,
  centered,
  titleAs = "h1",
  containerClassName,
  heroOverlay,
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
      heroOverlay={heroOverlay}
    />
  );
}
