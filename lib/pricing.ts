import { apiFetch } from "./api";
import { PACKAGES } from "./constants";
import type { IPackage } from "./types";

const PRICING_REVALIDATE = 3600;
const MIN_HEALTHY_PACKAGES = 2;

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

/** Reject thin/demo rows so one incomplete CMS entry cannot wipe the catalog. */
function isHealthyPackage(pkg: IApiPackage): boolean {
  const features = Array.isArray(pkg.features) ? pkg.features : [];
  return (
    Boolean(pkg.name?.trim()) &&
    features.length >= 2 &&
    typeof pkg.price?.bdt === "number" &&
    pkg.price.bdt > 0 &&
    typeof pkg.price?.usd === "number" &&
    pkg.price.usd > 0
  );
}

export async function getPricingPackages(): Promise<IPackage[]> {
  try {
    const response = await apiFetch<IApiPricingResponse>("/public/pricing", {
      next: { revalidate: PRICING_REVALIDATE },
    });
    const healthy = (response.data?.packages ?? []).filter(isHealthyPackage);
    return healthy.length >= MIN_HEALTHY_PACKAGES
      ? healthy.map(mapApiPackage)
      : PACKAGES;
  } catch {
    return PACKAGES;
  }
}
