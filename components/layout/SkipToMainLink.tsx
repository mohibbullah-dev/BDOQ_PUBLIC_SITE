"use client";

import { useTranslations } from "next-intl";

export function SkipToMainLink() {
  const t = useTranslations("a11y");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
    >
      {t("skipToMain")}
    </a>
  );
}
