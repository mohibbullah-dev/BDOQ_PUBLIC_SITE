import type { LocaleType } from "@/i18n/routing";

export interface IHeroMarqueeItem {
  id: string;
  arabic: string;
  translationEn: string;
  translationBn: string;
  reference: string;
  referenceBn: string;
}

/** Quran & Hadith on the dignity of the Book — for hero quote banner */
export const HERO_MARQUEE_ITEMS: IHeroMarqueeItem[] = [
  {
    id: "sakina",
    arabic: "هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ",
    translationEn:
      "He is the One who sent down tranquility into the hearts of the believers.",
    translationBn: "তিনিই মুমিনদের অন্তরে প্রশান্তি নাযিল করেছেন।",
    reference: "SURAH AL-FATH 48:4",
    referenceBn: "সূরা আল-ফাতহ ৪৮:৪",
  },
  {
    id: "quran_intercedes",
    arabic:
      "اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ",
    translationEn:
      "Recite the Qur'an — on the Day of Judgment it will intercede for its companions.",
    translationBn:
      "কুরআন পাঠ করো — কিয়ামতের দিন এটি তার সাহাবীদের জন্য সুপারিশকারী হবে।",
    reference: "HADITH — MUSLIM",
    referenceBn: "হাদিস — মুসলিম",
  },
  {
    id: "best_learn_teach",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translationEn:
      "The best among you are those who learn the Qur'an and teach it.",
    translationBn:
      "তোমাদের মধ্যে সর্বোত্তম সে, যে কুরআন শেখে ও অন্যকে শেখায়।",
    reference: "HADITH — BUKHARI",
    referenceBn: "হাদিস — বুখারী",
  },
  {
    id: "people_of_quran",
    arabic: "أَهْلُ الْقُرْآنِ هُمْ أَهْلُ اللَّهِ وَخَاصَّتُهُ",
    translationEn:
      "The people of the Qur'an are the people of Allah and His chosen ones.",
    translationBn: "কুরআনের লোকেরাই আল্লাহর লোক এবং তাঁর বিশেষ বান্দা।",
    reference: "HADITH — AHMAD",
    referenceBn: "হাদিস — আহমাদ",
  },
  {
    id: "letter_reward",
    arabic:
      "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ وَالْحَسَنَةُ بِعَشْرِ أَمْثَالِهَا",
    translationEn:
      "Whoever reads a letter from the Book of Allah receives a good deed — and each good deed is multiplied by ten.",
    translationBn:
      "যে আল্লাহর কিতাবের এক হরফ পড়ে, তার জন্য এক নেকী — আর প্রত্যেক নেকী দশগুণ।",
    reference: "HADITH — TIRMIDHI",
    referenceBn: "হাদিস — তিরমিজি",
  },
  {
    id: "quran_guides",
    arabic: "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ",
    translationEn:
      "Indeed, this Qur'an guides to that which is most upright.",
    translationBn: "নিশ্চয় এই কুরআন সেই পথের দিকে হিদায়েত করে, যা সবচেয়ে সোজা।",
    reference: "SURAH AL-ISRA 17:9",
    referenceBn: "সূরা আল-ইসরা ১৭:৯",
  },
  {
    id: "healing_mercy",
    arabic:
      "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ",
    translationEn:
      "We send down of the Qur'an that which is a healing and a mercy for the believers.",
    translationBn:
      "আমি কুরআন থেকে নাযিল করি যা মুমিনদের জন্য আরোগ্য ও রহমত।",
    reference: "SURAH AL-ISRA 17:82",
    referenceBn: "সূরা আল-ইসরা ১৭:৮২",
  },
  {
    id: "mountain_humbled",
    arabic:
      "لَوْ أَنزَلْنَا هَٰذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ اللَّهِ",
    translationEn:
      "Had We sent this Qur'an upon a mountain, you would have seen it humbled and split from fear of Allah.",
    translationBn:
      "আমি এই কুরআন কোনো পর্বতে নাযিল করলে তুমি দেখতে, তা আল্লাহর ভয়ে বিনীত ও বিদীর্ণ হয়ে যেত।",
    reference: "SURAH AL-HASHR 59:21",
    referenceBn: "সূরা আল-হাশর ৫৯:২১",
  },
  {
    id: "blessed_book",
    arabic: "كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ",
    translationEn:
      "This is a blessed Book We have revealed to you, so that they may reflect upon its verses.",
    translationBn:
      "এটি এক বরকতময় কিতাব, যা আমি তোমার প্রতি নাযিল করেছি — যাতে তারা এর আয়াত নিয়ে চিন্তা করে।",
    reference: "SURAH SAD 38:29",
    referenceBn: "সূরা সাদ ৩৮:২৯",
  },
  {
    id: "hearts_find_rest",
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    translationEn:
      "Truly, in the remembrance of Allah do hearts find peace.",
    translationBn: "জেনে রাখো, আল্লাহর স্মরণেই অন্তরসমূহ প্রশান্তি পায়।",
    reference: "SURAH AR-RA'D 13:28",
    referenceBn: "সূরা আর-রাদ ১৩:২৮",
  },
  {
    id: "envy_quran",
    arabic:
      "لَا حَسَدَ إِلَّا فِي اثْنَتَيْنِ: رَجُلٌ آتَاهُ اللَّهُ الْقُرْآنَ فَهُوَ يَقُومُ بِهِ",
    translationEn:
      "There is no envy except in two: a person whom Allah has given the Qur'an and who stands with it (in prayer).",
    translationBn:
      "ঈর্ষা কেবল দুই ক্ষেত্রে — যাকে আল্লাহ কুরআন দিয়েছেন এবং সে তা নিয়ে দাঁড়ায়।",
    reference: "HADITH — BUKHARI",
    referenceBn: "হাদিস — বুখারী",
  },
  {
    id: "light_younus",
    arabic:
      "يَا أَيُّهَا النَّاسُ قَدْ جَاءَتْكُم مَّوْعِظَةٌ مِّن رَّبِّكُمْ وَشِفَاءٌ لِّمَا فِي الصُّدُورِ",
    translationEn:
      "O mankind — there has come to you an admonition from your Lord and a healing for what is in the hearts.",
    translationBn:
      "হে মানবজাতি — তোমাদের রবের পক্ষ থেকে উপদেশ এসেছে এবং অন্তরের আরোগ্য।",
    reference: "SURAH YUNUS 10:57",
    referenceBn: "সূরা ইউনুস ১০:৫৭",
  },
];

export function getMarqueeTranslation(
  item: IHeroMarqueeItem,
  locale: LocaleType
): string {
  return locale === "bn" ? item.translationBn : item.translationEn;
}

export function getMarqueeReference(
  item: IHeroMarqueeItem,
  locale: LocaleType
): string {
  return locale === "bn" ? item.referenceBn : item.reference;
}
