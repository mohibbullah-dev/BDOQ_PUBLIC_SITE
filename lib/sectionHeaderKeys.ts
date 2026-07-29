import type { ISectionHeaderContent } from "./types";

export type SectionHeaderKey =
  | "home.teachers"
  | "home.whyChoose"
  | "home.testimonials"
  | "home.faq"
  | "home.about"
  | "home.globalPresence"
  | "home.liveAcademy"
  | "pages.pricing"
  | "pages.gallery"
  | "pages.courses"
  | "pages.teachers"
  | "pages.reviews";

export type SectionHeadersMap = Partial<
  Record<SectionHeaderKey, ISectionHeaderContent>
>;

export const HOME_SECTION_HEADER_KEYS: SectionHeaderKey[] = [
  "home.about",
  "home.liveAcademy",
  "home.whyChoose",
  "home.globalPresence",
  "home.teachers",
  "home.testimonials",
  "home.faq",
];

export const PAGE_SECTION_HEADER_KEYS: SectionHeaderKey[] = [
  "pages.pricing",
  "pages.gallery",
  "pages.courses",
  "pages.teachers",
  "pages.reviews",
];
