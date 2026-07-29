import { apiFetch } from "./api";
import type { IPremiumHeroCarouselSlide } from "./i18n/usePremiumHeroCarouselSlides";

const HOME_HERO_REVALIDATE = 300;

interface IApiHomeHeroResponse {
  success: boolean;
  data: { slides: IPremiumHeroCarouselSlide[] };
}

function mapApiSlide(
  slide: IPremiumHeroCarouselSlide & { image?: string }
): IPremiumHeroCarouselSlide {
  return {
    id: slide.id ?? slide.slideId ?? "",
    theme: slide.theme ?? "light",
    image: slide.image,
    imageObjectPosition: slide.imageObjectPosition ?? "50% 25%",
    imageScale: slide.imageScale ?? 100,
    primaryHref: slide.primaryHref,
    secondaryHref: slide.secondaryHref,
    badge: slide.badge,
    title: slide.title,
    titleHighlight: slide.titleHighlight,
    subtitle: slide.subtitle,
    imageAlt: slide.imageAlt,
    primaryCta: slide.primaryCta,
    secondaryCta: slide.secondaryCta,
  };
}

/**
 * Home hero carousel slides from CMS.
 * Returns null when API is empty/unavailable so callers can fall back to i18n.
 */
export async function getHomeHeroSlides(
  locale: string
): Promise<IPremiumHeroCarouselSlide[] | null> {
  try {
    const response = await apiFetch<IApiHomeHeroResponse>(
      `/public/home-hero?locale=${locale}`,
      { next: { revalidate: HOME_HERO_REVALIDATE } }
    );
    const apiSlides = response.data?.slides ?? [];
    if (apiSlides.length === 0) return null;

    return apiSlides.map((slide) =>
      mapApiSlide(slide as IPremiumHeroCarouselSlide & { image?: string })
    );
  } catch {
    return null;
  }
}
