export type PremiumHeroCarouselTheme = "light" | "dark";

export interface IPremiumHeroCarouselSlideMeta {
  id: string;
  theme: PremiumHeroCarouselTheme;
  image: string;
  imageClassName?: string;
  primaryHref: string;
  secondaryHref: string;
}

/** Client hero brief — 4 slides, clean copy, distinct images */
export const PREMIUM_HERO_CAROUSEL_SLIDES: IPremiumHeroCarouselSlideMeta[] = [
  {
    id: "slide-1",
    theme: "light",
    image: "/images/hero/slide-1-global.webp",
    imageClassName: "object-cover object-[50%_40%]",
    primaryHref: "/free-class",
    secondaryHref: "/courses",
  },
  {
    id: "slide-2",
    theme: "light",
    image: "/images/hero/slide-2-teachers.webp",
    imageClassName: "object-cover object-center",
    primaryHref: "/teachers",
    secondaryHref: "/free-class",
  },
  {
    id: "slide-3",
    theme: "light",
    image: "/images/hero/slide-3-courses.webp",
    imageClassName: "object-cover object-[45%_45%]",
    primaryHref: "/courses",
    secondaryHref: "/#learning-plans",
  },
  {
    id: "slide-4",
    theme: "light",
    image: "/images/hero/slide-4-journey.webp",
    imageClassName: "object-cover object-[50%_45%]",
    primaryHref: "/free-class",
    secondaryHref: "/#how-to-start",
  },
];
