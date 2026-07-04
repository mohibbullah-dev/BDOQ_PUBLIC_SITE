import { contentMessages } from "./content";
import { coreMessages } from "./core";
import { courseDetailsMessages } from "./courseDetails";
import { formsMessages } from "./forms";
import { homeMessages } from "./home";
import { pagesMessages } from "./pages";
import { welcomeMessages } from "./welcome";

const heroMarquee = {
  ariaLabel: "Quranic verses and Hadith",
  bismillah: "In the name of Allah, the Most Merciful, the Especially Merciful",
  light_healing:
    "O mankind — guidance from your Lord and healing for what weighs on the heart",
  remember_me: "Remember Me, and I will remember you",
  hearts_find_rest:
    "Truly, in the remembrance of Allah do hearts find peace and tranquility",
  sakina: "He sent down tranquility into the hearts of the believers",
  quran_intercedes:
    "Recite the Qur'an — on the Day of Judgment it will intercede for its companions",
  people_of_quran:
    "The people of the Qur'an are the people of Allah and those closest to Him",
  best_learn_teach:
    "The best among you are those who learn the Qur'an and teach it to others",
  letter_reward:
    "Whoever reads a letter of Allah's Book receives a good deed for it",
  call_me: "Your Lord says: Call upon Me — I will answer you",
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
