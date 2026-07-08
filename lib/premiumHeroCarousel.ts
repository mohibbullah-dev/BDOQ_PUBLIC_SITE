export type PremiumHeroCarouselTheme = "light" | "dark";

export interface IPremiumHeroCarouselSlideMeta {
  id: string;
  theme: PremiumHeroCarouselTheme;
  image: string;
  imageClassName?: string;
}

export const PREMIUM_HERO_CAROUSEL_SLIDES: IPremiumHeroCarouselSlideMeta[] = [
  {
    id: "slide-1",
    theme: "light",
    image: "/images/hero/slide-1.png",
    imageClassName: "object-cover object-[50%_35%]",
  },
  {
    id: "slide-2",
    theme: "light",
    image: "/images/hero/slide-2.png",
    imageClassName: "object-cover object-center",
  },
  {
    id: "slide-3",
    theme: "light",
    image: "/images/hero/slide-3.png",
    imageClassName: "object-cover object-[45%_50%]",
  },
];
