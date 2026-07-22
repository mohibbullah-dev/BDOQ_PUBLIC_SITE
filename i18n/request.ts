import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, locales, type LocaleType } from "./routing";

function isValidLocale(value: string): value is LocaleType {
  return locales.includes(value as LocaleType);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value ?? defaultLocale;
  const locale = isValidLocale(cookieLocale) ? cookieLocale : defaultLocale;

  const messages =
    locale === "bn"
      ? (await import("../messages/bn/index")).default
      : (await import("../messages/en/index")).default;

  return {
    locale,
    messages,
  };
});
