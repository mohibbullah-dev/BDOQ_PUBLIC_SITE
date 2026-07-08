import { FAQ_ITEMS } from "./constants";
import type { IFAQItem } from "./types";

/**
 * Public-site FAQ list (home + about).
 * Hardcoded for reliability and i18n (`home.faq.items.*`).
 * CMS `/public/faq` may still exist for admin/portal — this site does not depend on it.
 */
export function getFaqItems(): IFAQItem[] {
  return FAQ_ITEMS;
}
