import { apiFetch } from "./api";
import { PACKAGES } from "./constants";
import type { IPackage } from "./types";

const PRICING_REVALIDATE = 3600;

interface IApiPackage {
  slug?: string;
  name: string;
  price: { bdt: number; usd: number };
  period: string;
  features: string[];
  popular?: boolean;
}

interface IApiPricingResponse {
  success: boolean;
  data: { packages: IApiPackage[] };
}

function mapApiPackage(pkg: IApiPackage): IPackage {
  return {
    slug: pkg.slug,
    name: pkg.name,
    price: pkg.price,
    period: pkg.period,
    features: pkg.features,
    popular: pkg.popular,
  };
}

export async function getPricingPackages(): Promise<IPackage[]> {
  try {
    const response = await apiFetch<IApiPricingResponse>("/public/pricing", {
      next: { revalidate: PRICING_REVALIDATE },
    });
    const apiItems = response.data?.packages ?? [];
    return apiItems.length > 0 ? apiItems.map(mapApiPackage) : PACKAGES;
  } catch {
    return PACKAGES;
  }
}
