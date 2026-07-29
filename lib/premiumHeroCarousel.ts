export type PremiumHeroCarouselTheme = "light" | "dark";

export interface IPremiumHeroCarouselSlideMeta {
  id: string;
  theme: PremiumHeroCarouselTheme;
  image: string;
  imageObjectPosition?: string;
  imageScale?: number;
  primaryHref: string;
  secondaryHref: string;
}

/** Client hero brief — 4 slides, clean copy, distinct images */
export const PREMIUM_HERO_CAROUSEL_SLIDES: IPremiumHeroCarouselSlideMeta[] = [
  {
    id: "slide-1",
    theme: "light",
    image: "/images/hero/slide-1-global.webp",
    imageObjectPosition: "50% 40%",
    imageScale: 100,
    primaryHref: "/free-class",
    secondaryHref: "/courses",
  },
  {
    id: "slide-2",
    theme: "light",
    image: "/images/hero/slide-2-teachers.webp",
    imageObjectPosition: "50% 18%",
    imageScale: 94,
    primaryHref: "/teachers",
    secondaryHref: "/free-class",
  },
  {
    id: "slide-3",
    theme: "light",
    image: "/images/hero/slide-3-courses.webp",
    imageObjectPosition: "45% 45%",
    imageScale: 100,
    primaryHref: "/courses",
    secondaryHref: "/#learning-plans",
  },
  {
    id: "slide-4",
    theme: "light",
    image: "/images/hero/slide-4-journey.webp",
    imageObjectPosition: "50% 45%",
    imageScale: 100,
    primaryHref: "/free-class",
    secondaryHref: "/#how-to-start",
  },
];
