import { contentMessages } from "./content";
import { coreMessages } from "./core";
import { courseDetailsMessages } from "./courseDetails";
import { formsMessages } from "./forms";
import { homeMessages } from "./home";
import { pagesMessages } from "./pages";
import { welcomeMessages } from "./welcome";

const heroMarquee = {
  ariaLabel: "কুরআনের আয়াত ও হাদিস",
  bismillah: "পরম করুণাময়, পরম দয়ালু আল্লাহর নামে",
  light_healing:
    "হে মানবজাতি — তোমাদের রবের উপদেশ এসেছে এবং অন্তরের ব্যথার ওষুধ",
  remember_me: "তোমরা আমাকে স্মরণ করো, আমি তোমাদেরকে স্মরণ করব",
  hearts_find_rest:
    "জেনে রাখো, আল্লাহর স্মরণেই অন্তরসমূহ প্রশান্তি ও সান্ত্বনা পায়",
  sakina: "তিনিই মুমিনদের অন্তরে প্রশান্তি (সাকিনাহ) নাযিল করেছেন",
  quran_intercedes:
    "কুরআন পাঠ করো — কিয়ামতের দিন এটি তার সাহাবীদের জন্য সুপারিশকারী হবে",
  people_of_quran: "কুরআনের লোকেরাই আল্লাহর লোক এবং তাঁর বিশেষ বান্দা",
  best_learn_teach: "তোমাদের মধ্যে সর্বোত্তম সে, যে কুরআন শিখে ও অন্যকে শেখায়",
  letter_reward: "আল্লাহর কিতাবের একটি হরফ পড়লেই এক নেকী আমল লেখা হয়",
  call_me: "তোমাদের রব বলেন — আমাকে ডাকো, আমি তোমাদের ডাকে সাড়া দেব",
};

export default {
  ...coreMessages,
  content: contentMessages,
  courseDetails: courseDetailsMessages,
  forms: formsMessages,
  home: homeMessages,
  pages: pagesMessages,
  welcome: welcomeMessages,
  hero: { marquee: heroMarquee },
};
