import { apiFetch } from "./api";
import { FAQ_ITEMS } from "./constants";
import type { IFAQItem } from "./types";

const FAQ_REVALIDATE = 3600;

interface IApiFaqResponse {
  success: boolean;
  data: { items: IFAQItem[] };
}

/**
 * Public-site FAQ list (home + about).
 * Prefers CMS `/public/faq` when published items exist; otherwise static FAQ_ITEMS.
 */
export async function getFaqItems(): Promise<IFAQItem[]> {
  try {
    const response = await apiFetch<IApiFaqResponse>("/public/faq", {
      next: { revalidate: FAQ_REVALIDATE },
    });
    const apiItems = response.data?.items ?? [];
    return apiItems.length > 0 ? apiItems : FAQ_ITEMS;
  } catch {
    return FAQ_ITEMS;
  }
}
