import type { LocaleType } from "@/i18n/routing";

export interface IHeroMarqueeItem {
  id: string;
  arabic: string;
  translationEn: string;
  translationBn: string;
  reference: string;
}

/** Curated Quranic verses & Hadith for the navbar ticker — emotional, learning-focused. */
export const HERO_MARQUEE_ITEMS: IHeroMarqueeItem[] = [
  {
    id: "bismillah",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translationEn:
      "In the name of Allah, the Most Merciful, the Especially Merciful",
    translationBn: "পরম করুণাময়, পরম দয়ালু আল্লাহর নামে",
    reference: "SURAH AL-FATIHA 1:1",
  },
  {
    id: "light_healing",
    arabic:
      "يَا أَيُّهَا النَّاسُ قَدْ جَاءَتْكُم مَّوْعِظَةٌ مِّن رَّبِّكُمْ وَشِفَاءٌ لِّمَا فِي الصُّدُورِ",
    translationEn:
      "O mankind — guidance from your Lord and healing for what weighs on the heart",
    translationBn:
      "হে মানবজাতি — তোমাদের রবের উপদেশ এসেছে এবং অন্তরের ব্যথার ওষুধ",
    reference: "SURAH YUNUS 10:57",
  },
  {
    id: "remember_me",
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    translationEn: "Remember Me, and I will remember you",
    translationBn: "তোমরা আমাকে স্মরণ করো, আমি তোমাদেরকে স্মরণ করব",
    reference: "SURAH AL-BAQARAH 2:152",
  },
  {
    id: "hearts_find_rest",
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    translationEn:
      "Truly, in the remembrance of Allah do hearts find peace and tranquility",
    translationBn:
      "জেনে রাখো, আল্লাহর স্মরণেই অন্তরসমূহ প্রশান্তি ও সান্ত্বনা পায়",
    reference: "SURAH AR-RA'D 13:28",
  },
  {
    id: "sakina",
    arabic: "هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ",
    translationEn: "He sent down tranquility into the hearts of the believers",
    translationBn: "তিনিই মুমিনদের অন্তরে প্রশান্তি (সাকিনাহ) নাযিল করেছেন",
    reference: "SURAH AL-FATH 48:4",
  },
  {
    id: "quran_intercedes",
    arabic:
      "اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ",
    translationEn:
      "Recite the Qur'an — on the Day of Judgment it will intercede for its companions",
    translationBn:
      "কুরআন পাঠ করো — কিয়ামতের দিন এটি তার সাহাবীদের জন্য সুপারিশকারী হবে",
    reference: "HADITH — MUSLIM",
  },
  {
    id: "people_of_quran",
    arabic: "أَهْلُ الْقُرْآنِ هُمْ أَهْلُ اللَّهِ وَخَاصَّتُهُ",
    translationEn:
      "The people of the Qur'an are the people of Allah and those closest to Him",
    translationBn: "কুরআনের লোকেরাই আল্লাহর লোক এবং তাঁর বিশেষ বান্দা",
    reference: "HADITH — AHMAD",
  },
  {
    id: "best_learn_teach",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translationEn:
      "The best among you are those who learn the Qur'an and teach it to others",
    translationBn: "তোমাদের মধ্যে সর্বোত্তম সে, যে কুরআন শিখে ও অন্যকে শেখায়",
    reference: "HADITH — BUKHARI",
  },
  {
    id: "letter_reward",
    arabic: "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ",
    translationEn:
      "Whoever reads a letter of Allah's Book receives a good deed for it",
    translationBn: "আল্লাহর কিতাবের একটি হরফ পড়লেই এক নেকী আমল লেখা হয়",
    reference: "HADITH — TIRMIDHI",
  },
  {
    id: "call_me",
    arabic: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ",
    translationEn: "Your Lord says: Call upon Me — I will answer you",
    translationBn: "তোমাদের রব বলেন — আমাকে ডাকো, আমি তোমাদের ডাকে সাড়া দেব",
    reference: "SURAH GHAFIR 40:60",
  },
];

export function getMarqueeTranslation(
  item: IHeroMarqueeItem,
  locale: LocaleType
): string {
  return locale === "bn" ? item.translationBn : item.translationEn;
}
