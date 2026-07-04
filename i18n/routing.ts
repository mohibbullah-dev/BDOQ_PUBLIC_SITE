import { defineRouting } from "next-intl/routing";

export const locales = ["en", "bn"] as const;

export type LocaleType = (typeof locales)[number];

export const defaultLocale: LocaleType = "en";

export const LOCALE_STORAGE_KEY = "boq-locale";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "never",
});
