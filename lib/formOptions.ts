import { GLOBAL_COUNTRIES } from "./constants";
import type { ICourse } from "./types";

export interface IFormSelectOption {
  value: string;
  label: string;
}

export function buildFreeClassSubjects(
  courses: ICourse[]
): IFormSelectOption[] {
  return courses.map((course) => ({
    value: course.slug,
    label: course.title,
  }));
}

export const COUNTRY_OPTIONS = GLOBAL_COUNTRIES.map((c) => c.name);

export {
  PHONE_DIAL_CODES,
  DEFAULT_DIAL_CODE,
  type IPhoneDialCode,
} from "./phoneDialCodes";

export {
  TIMEZONE_OPTIONS,
  DEFAULT_TIMEZONE,
  formatTimezoneLabel,
  normalizeTimezoneValue,
  type ITimezoneOption,
} from "./timezoneCatalog";

export const CLASS_TIME_SLOTS = [
  { value: "morning", labelBn: "সকাল", labelEn: "Morning" },
  { value: "noon", labelBn: "দুপুর", labelEn: "Noon" },
  { value: "evening", labelBn: "সন্ধ্যা", labelEn: "Evening" },
  { value: "night", labelBn: "রাত", labelEn: "Night" },
  { value: "other", labelBn: "অন্য সময়", labelEn: "Other time" },
] as const;

export const REFERRAL_SOURCES = [
  { value: "facebook", labelBn: "ফেসবুক", labelEn: "Facebook" },
  { value: "youtube", labelBn: "ইউটিউব", labelEn: "YouTube" },
  { value: "google", labelBn: "গুগল", labelEn: "Google" },
  {
    value: "friend",
    labelBn: "বন্ধু/পরিচিত/আত্মীয়",
    labelEn: "Friend/Family",
  },
] as const;

export const DEVICE_OPTIONS = [
  { value: "mobile", label: "Mobile phone" },
  { value: "tablet", label: "Tablet" },
  { value: "laptop", label: "Laptop / Computer" },
];

export const INTERNET_OPTIONS = [
  { value: "good", label: "Good — stable video calls" },
  { value: "average", label: "Average — occasional issues" },
  { value: "poor", label: "Poor — frequent disconnections" },
];

export const PAYMENT_OPTIONS = [
  { value: "bkash", label: "bKash" },
  { value: "nagad", label: "Nagad" },
  { value: "bank", label: "Bank transfer" },
  { value: "paypal", label: "PayPal / International" },
  { value: "cash", label: "Cash (Bangladesh)" },
];

export const PACKAGE_OPTIONS = [
  { value: "basic", label: "Basic — ৳2,000/month" },
  { value: "standard", label: "Standard — ৳3,000/month" },
  { value: "advance", label: "Advance — ৳4,000/month" },
  { value: "premium", label: "Premium — ৳5,000/month" },
];

export const TEACHER_RULES = [
  "I agree to follow BDOQ Academy teaching policies and Islamic adab during all classes.",
  "I confirm that the information and documents provided are accurate and truthful.",
  "I understand that BDOQ Academy may verify my qualifications before approval.",
  "I agree to maintain student privacy and use approved platforms for online classes.",
];

export const NATIONALITY_OPTIONS = [
  "Bangladeshi",
  "Indian",
  "Pakistani",
  "Saudi",
  "Emirati",
  "British",
  "American",
  "Canadian",
  "Malaysian",
  "Other",
] as const;

export const QURAN_READING_LEVELS = [
  {
    value: "not-started",
    labelBn: "এখনো শুরু করিনি",
    labelEn: "I haven't started",
  },
  {
    value: "letters-only",
    labelBn: "অক্ষর শিখছি",
    labelEn: "Learning letters / basics",
  },
  {
    value: "can-read",
    labelBn: "পড়তে পারি",
    labelEn: "I can read the Quran",
  },
  {
    value: "with-tajweed",
    labelBn: "তাজবিদসহ পড়তে পারি",
    labelEn: "I can read with Tajweed",
  },
] as const;

export const TEACHING_LANGUAGE_OPTIONS = [
  { value: "bengali", labelBn: "বাংলা", labelEn: "Bengali" },
  { value: "english", labelBn: "ইংরেজি", labelEn: "English" },
  { value: "urdu", labelBn: "উর্দু", labelEn: "Urdu" },
  { value: "hindi", labelBn: "হিন্দি", labelEn: "Hindi" },
] as const;

export const TOPIC_INTEREST_OPTIONS = [
  {
    value: "quran-education",
    labelBn: "কুরআন শিক্ষা",
    labelEn: "Quran Education",
  },
  {
    value: "quran-recitation",
    labelBn: "কুরআন তিলাওয়াত",
    labelEn: "Quran Recitation",
  },
  { value: "tafsir", labelBn: "তাফসীরুল কুরআন", labelEn: "Tafsirul Quran" },
  {
    value: "seerah-history",
    labelBn: "সীরাহ ও ইতিহাস",
    labelEn: "Seerah and History",
  },
  {
    value: "islamic-studies",
    labelBn: "ইসলামিক শিক্ষা",
    labelEn: "Islamic Studies",
  },
  { value: "urdu", labelBn: "উর্দু ভাষা", labelEn: "Urdu Language" },
  { value: "tajweed", labelBn: "তাজবিদ", labelEn: "Tajweed" },
  { value: "hifz", labelBn: "হিফজুল কুরআন", labelEn: "Hifzul Quran" },
  {
    value: "surah-memorization",
    labelBn: "সুরা মুখস্থ",
    labelEn: "Surah Memorization",
  },
  { value: "adab", labelBn: "আদব-কায়দা", labelEn: "Adab & Etiquette" },
  { value: "arabic", labelBn: "আরবি ভাষা", labelEn: "Arabic Language" },
  { value: "english", labelBn: "ইংরেজি ভাষা", labelEn: "English Language" },
] as const;

export const CLASS_TYPE_OPTIONS = [
  {
    value: "private",
    labelBn: "প্রাইভেট ওয়ান টু ওয়ান",
    labelEn: "Private One-to-One",
  },
  {
    value: "batch",
    labelBn: "গ্রুপ / ব্যাচ ক্লাস",
    labelEn: "In group / batch classes",
  },
] as const;

export const DEVICE_MULTI_OPTIONS = [
  { value: "laptop", labelBn: "ল্যাপটপ", labelEn: "Laptop" },
  { value: "smartphone", labelBn: "স্মার্টফোন", labelEn: "Smartphone" },
  { value: "tablet", labelBn: "ট্যাব", labelEn: "Tablet" },
] as const;

export const INTERNET_CONNECTION_TYPES = [
  { value: "wifi", labelBn: "ওয়াইফাই", labelEn: "WiFi" },
  { value: "mobile", labelBn: "মোবাইল ডেটা", labelEn: "Mobile data" },
  { value: "both", labelBn: "উভয়", labelEn: "Both" },
] as const;

export const MARITAL_STATUS_OPTIONS = [
  { value: "single", labelBn: "অবিবাহিত", labelEn: "Single" },
  { value: "married", labelBn: "বিবাহিত", labelEn: "Married" },
  { value: "divorced", labelBn: "তালাকপ্রাপ্ত", labelEn: "Divorced" },
  { value: "widowed", labelBn: "বিধবা/বিপত্নীক", labelEn: "Widowed" },
] as const;

export const HAFIZ_OPTIONS = [
  { value: "yes", labelBn: "হ্যাঁ", labelEn: "Yes" },
  { value: "no", labelBn: "না", labelEn: "No" },
] as const;

export const TEACHER_SUBJECT_OPTIONS = [
  {
    value: "quran-education",
    labelBn: "কুরআন শিক্ষা",
    labelEn: "Quran Education",
  },
  {
    value: "quran-recitation",
    labelBn: "কুরআন তিলাওয়াত",
    labelEn: "Quran Recitation",
  },
  { value: "tajweed", labelBn: "তাজবিদ", labelEn: "Tajweed" },
  { value: "hifz", labelBn: "হিফজ", labelEn: "Hifz" },
  {
    value: "surah-memorization",
    labelBn: "সুরা মুখস্থ",
    labelEn: "Surah Memorization",
  },
  {
    value: "islamic-studies",
    labelBn: "ইসলামিক শিক্ষা",
    labelEn: "Islamic Studies",
  },
  { value: "tafsir", labelBn: "তাফসীর", labelEn: "Tafsir" },
  {
    value: "seerah-history",
    labelBn: "সীরাহ ও ইতিহাস",
    labelEn: "Seerah & History",
  },
  { value: "arabic", labelBn: "আরবি", labelEn: "Arabic Language" },
  { value: "urdu", labelBn: "উর্দু", labelEn: "Urdu" },
  { value: "english", labelBn: "ইংরেজি", labelEn: "English" },
  { value: "adab", labelBn: "আদব", labelEn: "Adab & Etiquette" },
] as const;

export const WEEKDAY_OPTIONS = [
  { value: "saturday", labelBn: "শনিবার", labelEn: "Saturday" },
  { value: "sunday", labelBn: "রবিবার", labelEn: "Sunday" },
  { value: "monday", labelBn: "সোমবার", labelEn: "Monday" },
  { value: "tuesday", labelBn: "মঙ্গলবার", labelEn: "Tuesday" },
  { value: "wednesday", labelBn: "বুধবার", labelEn: "Wednesday" },
  { value: "thursday", labelBn: "বৃহস্পতিবার", labelEn: "Thursday" },
  { value: "friday", labelBn: "শুক্রবার", labelEn: "Friday" },
] as const;

export const TEACHER_LANGUAGE_OPTIONS = [
  { value: "bengali", labelBn: "বাংলা", labelEn: "Bengali" },
  { value: "english", labelBn: "ইংরেজি", labelEn: "English" },
  { value: "arabic", labelBn: "আরবি", labelEn: "Arabic" },
  { value: "urdu", labelBn: "উর্দু", labelEn: "Urdu" },
] as const;

export const TEACHING_DEVICE_OPTIONS = [
  { value: "laptop", labelBn: "ল্যাপটপ", labelEn: "Laptop" },
  { value: "desktop", labelBn: "ডেস্কটপ", labelEn: "Desktop" },
  { value: "tablet", labelBn: "ট্যাবলেট", labelEn: "Tablet" },
  { value: "mobile", labelBn: "মোবাইল", labelEn: "Mobile" },
] as const;

export const HOUR_OPTIONS = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0")
);

export const MINUTE_OPTIONS = ["00", "15", "30", "45"];

