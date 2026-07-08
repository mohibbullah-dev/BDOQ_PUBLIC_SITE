export type CourseCategoryType = "private" | "record" | "live" | "free";

export type CourseGenderType = "male" | "female" | "children";

export interface ICourse {
  slug: string;
  title: string;
  description: string;
  icon: string;
  target?: string;
  category?: CourseCategoryType;
  gender?: CourseGenderType;
}

export interface ICourseBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ICourseModule {
  id: string;
  title: string;
  topics: string[];
}

export interface ICourseDetail {
  benefits: ICourseBenefit[];
  modules: ICourseModule[];
  audience: string[];
  faqs: IFAQItem[];
  startingPriceBdt: number;
  recommendedPackage: string;
}

export interface ITeacher {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  gender: "male" | "female";
  country?: string;
  featured?: boolean;
  about?: string;
  dateOfBirth?: string;
  age?: string;
  address?: string;
  location?: string;
  qualifications?: string[];
  skills?: string[];
  experience?: string;
  languages?: string[];
  courseSlugs?: string[];
}

export interface IBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  tags: string[];
  author: string;
}

export type EbookCategoryType = "tajweed" | "islamic-history" | "religious";

export type EbookLanguageType = "en" | "bn" | "both";

export interface IEbook {
  id: string;
  slug: string;
  title: string;
  category: EbookCategoryType;
  description: string;
  coverGradient: string;
  pdfUrl: string;
  fileSize: string;
  pageCount: number;
  language: EbookLanguageType;
  author: string;
  featured?: boolean;
  sortOrder?: number;
  /** @deprecated use pdfUrl */
  downloadUrl?: string;
}

export interface IAudioVerse {
  id: string;
  arabic: string;
  translation: string;
}

export interface IAudioRecitation {
  id: string;
  surahName: string;
  paraInfo: string;
  duration: string;
  progress: number;
}

export interface IVideoItem {
  id: string;
  title: string;
  youtubeId: string;
  description?: string;
  startSeconds?: number;
  thumbnailSrc?: string;
}

export type GalleryAlbumType = "gallery-01" | "gallery-02" | "gallery-03";
export type GalleryMediaType = "photo" | "video" | "audio";

export interface IGalleryItem {
  id: string;
  title: string;
  description?: string;
  album: GalleryAlbumType;
  mediaType?: GalleryMediaType;
  mediaUrl?: string;
  youtubeId?: string;
  coverGradient: string;
  heightClass: string;
}

export interface IPackage {
  slug?: string;
  name: string;
  price: { bdt: number; usd: number };
  period: string;
  features: string[];
  popular?: boolean;
}

export type TestimonialMediaType = "text" | "audio" | "video";

export interface ITestimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  image?: string;
  mediaType?: TestimonialMediaType;
  mediaUrl?: string;
  youtubeId?: string;
}

export interface IFAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface IWhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ICountryPresence {
  name: string;
  flag: string;
  code: string;
}

export interface ILearningPlan {
  id: string;
  title: string;
  displayTitle: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export interface ITopic {
  id: string;
  label: string;
  labelBn: string;
  icon: string;
}

export interface ILocalizedText {
  en: string;
  bn: string;
}

export interface ITopicsSectionContent {
  eyebrow: ILocalizedText;
  titleBefore: ILocalizedText;
  titleHighlight: ILocalizedText;
  titleAfter: ILocalizedText;
  subtitle: ILocalizedText;
  bookTrial: ILocalizedText;
  exploreCourses: ILocalizedText;
}

export interface IHowToStartStep {
  step: number;
  title: string;
  description: string;
}

export interface IAcademyInfo {
  name: string;
  shortName: string;
  tagline: string;
  mission: string;
  founded: string;
  contactBD: string;
  contactEG: string;
  email: string;
  whatsapp: string;
  address: string;
  website: string;
  footerMobile: string;
}

export interface IFounder {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface IStat {
  value: string;
  label: string;
}

export interface ISocialLink {
  name: string;
  url: string;
  icon: string;
}

export type QuickNavIconType =
  | "users"
  | "user-round"
  | "book-open"
  | "newspaper"
  | "tag"
  | "gift"
  | "graduation-cap"
  | "images"
  | "library"
  | "phone";

export interface IQuickNavItem {
  id: string;
  label: string;
  href: string;
  description: string;
  icon: QuickNavIconType;
}
