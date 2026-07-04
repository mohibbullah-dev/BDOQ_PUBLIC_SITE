export type HeroSlideVisualType =
  | "live-queue"
  | "global-presence"
  | "hifz-journey"
  | "privacy"
  | "free-trial"
  | "video-classroom"
  | "personal-schedule"
  | "orbiting"
  | "personal-care";

export interface IHeroSlide {
  id: string;
  eyebrow: string;
  headline: [string, string, string];
  gradientLineIndex: 0 | 1 | 2;
  subtext: string;
  trustItems: string[];
  visual: HeroSlideVisualType;
}

/** Static slide structure — copy comes from `home.hero.slides` messages via useHeroSlides */
export const HERO_SLIDE_META = [
  {
    id: "live-classroom",
    gradientLineIndex: 1 as const,
    visual: "live-queue" as HeroSlideVisualType,
  },
  {
    id: "global-ummah",
    gradientLineIndex: 1 as const,
    visual: "global-presence" as HeroSlideVisualType,
  },
  {
    id: "hifz-path",
    gradientLineIndex: 1 as const,
    visual: "hifz-journey" as HeroSlideVisualType,
  },
  {
    id: "privacy",
    gradientLineIndex: 1 as const,
    visual: "privacy" as HeroSlideVisualType,
  },
  {
    id: "start-now",
    gradientLineIndex: 1 as const,
    visual: "free-trial" as HeroSlideVisualType,
  },
] as const;
