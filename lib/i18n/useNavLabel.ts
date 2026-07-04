"use client";

import { useTranslations } from "next-intl";

export function useNavLabel(): (key: string) => string {
  const t = useTranslations("nav");
  return (key: string) => t(key);
}
