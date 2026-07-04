import { apiFetch } from "./api";
import type { IFAQItem } from "./types";

const FAQ_REVALIDATE = 3600;

interface IApiFaqResponse {
  success: boolean;
  data: { items: IFAQItem[] };
}

export async function getFaqItems(): Promise<IFAQItem[]> {
  try {
    const response = await apiFetch<IApiFaqResponse>("/public/faq", {
      next: { revalidate: FAQ_REVALIDATE },
    });
    return response.data?.items ?? [];
  } catch {
    return [];
  }
}
