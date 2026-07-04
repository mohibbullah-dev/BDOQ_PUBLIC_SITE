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

  // #region agent log
  fetch("http://127.0.0.1:7416/ingest/ebf5acf2-f99a-40e3-88a0-a4b533c78c2b", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "1c0f9f",
    },
    body: JSON.stringify({
      sessionId: "1c0f9f",
      runId: "pre-fix",
      hypothesisId: "C",
      location: "i18n/request.ts:getRequestConfig",
      message: "resolved request locale",
      data: {
        cookieLocale,
        locale,
        defaultLocale,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  const messages =
    locale === "bn"
      ? (await import("../messages/bn/index")).default
      : (await import("../messages/en/index")).default;

  return {
    locale,
    messages,
  };
});
