import type { ICourseDetail } from "./types";

const SHARED_WHY_BDOQ = [
  "One teacher for one student — fully personalized attention",
  "Experienced Hafiz and qualified scholars as instructors",
  "Flexible class times for Bangladesh and international students",
  "Separate classes for men, women, and children",
  "Multilingual support: Bengali, English, Arabic, and Urdu",
  "Monthly progress tracking and parent communication",
];

export const COURSE_WHY_BDOQ = SHARED_WHY_BDOQ;

export const COURSE_DETAIL_MAP: Record<string, ICourseDetail> = {
  "noorani-qaida": {
    startingPriceBdt: 2000,
    recommendedPackage: "Basic",
    benefits: [
      {
        id: "b1",
        title: "Arabic Alphabet Mastery",
        description:
          "Learn letters, sounds, and joining rules from the foundation.",
        icon: "book-open",
      },
      {
        id: "b2",
        title: "Correct Pronunciation",
        description:
          "Build accurate articulation with teacher-guided practice.",
        icon: "mic",
      },
      {
        id: "b3",
        title: "Child-Friendly Pace",
        description: "Short, engaging lessons designed for young learners.",
        icon: "heart",
      },
      {
        id: "b4",
        title: "One-to-One Guidance",
        description: "Personal attention from a patient, qualified teacher.",
        icon: "user",
      },
      {
        id: "b5",
        title: "Reading Readiness",
        description: "Progress toward fluent Quran reading step by step.",
        icon: "graduation-cap",
      },
      {
        id: "b6",
        title: "Parent Updates",
        description: "Regular feedback on your child's learning progress.",
        icon: "message-square",
      },
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1 — Arabic Letters",
        topics: ["Individual letters", "Letter shapes", "Pronunciation drills"],
      },
      {
        id: "m2",
        title: "Module 2 — Harakat & Sounds",
        topics: ["Fatha, Kasra, Damma", "Sukoon", "Practice exercises"],
      },
      {
        id: "m3",
        title: "Module 3 — Joining Letters",
        topics: ["Word formation", "Connected reading", "Daily practice"],
      },
      {
        id: "m4",
        title: "Module 4 — Short Surahs",
        topics: ["Simple verses", "Fluency building", "Teacher assessment"],
      },
    ],
    audience: [
      "Children beginning their Quran journey (ages 5+)",
      "Beginners with no prior Arabic reading experience",
      "Parents seeking a structured Noorani Qaida program",
      "Students preparing for Tajweed or Hifz courses",
    ],
    faqs: [
      {
        id: "f1",
        question: "What age is best to start Noorani Qaida?",
        answer:
          "Children can start from age 5 or when they can focus for a 30-minute lesson. Our teachers adapt the pace to each child's ability.",
      },
      {
        id: "f2",
        question: "How long does it take to complete Noorani Qaida?",
        answer:
          "Most students complete the foundation in 3–6 months with regular classes, depending on age, practice time, and lesson frequency.",
      },
      {
        id: "f3",
        question: "Are classes one-to-one for children?",
        answer:
          "Yes. Every child learns with a dedicated teacher in a private online class for maximum attention and progress.",
      },
      {
        id: "f4",
        question: "Can parents observe the classes?",
        answer:
          "Yes. Parents are welcome to sit with younger children during lessons and receive regular progress updates from the teacher.",
      },
    ],
  },
  "quran-hifz-male": {
    startingPriceBdt: 5000,
    recommendedPackage: "Premium",
    benefits: [
      {
        id: "b1",
        title: "Complete Hifz Plan",
        description:
          "Structured memorization schedule from Juz 30 to full Quran.",
        icon: "book-marked",
      },
      {
        id: "b2",
        title: "Daily Murajaah",
        description: "Revision system to strengthen memorized portions.",
        icon: "refresh-cw",
      },
      {
        id: "b3",
        title: "Tajweed in Hifz",
        description: "Memorize with correct pronunciation and rules.",
        icon: "mic",
      },
      {
        id: "b4",
        title: "Experienced Hafiz Teacher",
        description: "Learn under a qualified male Hifz instructor.",
        icon: "award",
      },
      {
        id: "b5",
        title: "Progress Tracking",
        description: "Monthly assessments and personalized targets.",
        icon: "bar-chart",
      },
      {
        id: "b6",
        title: "Flexible Scheduling",
        description: "Choose class times that fit your daily routine.",
        icon: "clock",
      },
    ],
    modules: [
      {
        id: "m1",
        title: "Phase 1 — Foundation & Juz Amma",
        topics: ["Memorization technique", "Short surahs", "Daily revision"],
      },
      {
        id: "m2",
        title: "Phase 2 — Juz 29–28",
        topics: ["Longer surahs", "Tajweed application", "Weekly tests"],
      },
      {
        id: "m3",
        title: "Phase 3 — Middle Juz",
        topics: ["Consistent murajaah", "Fluency drills", "Teacher evaluation"],
      },
      {
        id: "m4",
        title: "Phase 4 — Advanced Hifz",
        topics: ["Full Quran completion", "Ijazah preparation", "Final review"],
      },
    ],
    audience: [
      "Male students committed to Quran memorization",
      "Students with basic Quran reading ability",
      "Adults and teenagers seeking structured Hifz",
      "Learners who want one-to-one Hafiz supervision",
    ],
    faqs: [
      {
        id: "f1",
        question: "Do I need to know Tajweed before starting Hifz?",
        answer:
          "Basic Quran reading ability is required. If needed, your teacher will strengthen Tajweed alongside memorization.",
      },
      {
        id: "f2",
        question: "How many days per week are Hifz classes?",
        answer:
          "Premium plans include up to 5 days per week. Your schedule is set based on your package and availability.",
      },
      {
        id: "f3",
        question: "How long does full Quran Hifz take?",
        answer:
          "Duration varies by student dedication and class frequency — typically 2–4 years with consistent practice and revision.",
      },
      {
        id: "f4",
        question: "Is murajaah (revision) included?",
        answer:
          "Yes. Revision is a core part of our Hifz program and is built into every lesson plan.",
      },
    ],
  },
  "quran-hifz-female": {
    startingPriceBdt: 5000,
    recommendedPackage: "Premium",
    benefits: [
      {
        id: "b1",
        title: "Female Hifz Teachers",
        description:
          "Learn with qualified female instructors in a private setting.",
        icon: "shield-check",
      },
      {
        id: "b2",
        title: "Personalized Hifz Plan",
        description: "Custom schedule based on your pace and goals.",
        icon: "clipboard-list",
      },
      {
        id: "b3",
        title: "Tajweed Integration",
        description: "Memorize with proper pronunciation from day one.",
        icon: "mic",
      },
      {
        id: "b4",
        title: "Consistent Revision",
        description: "Structured murajaah to retain every memorized ayah.",
        icon: "refresh-cw",
      },
      {
        id: "b5",
        title: "Safe Learning Space",
        description: "Separate online classes ensuring privacy and comfort.",
        icon: "heart",
      },
      {
        id: "b6",
        title: "Monthly Check-ups",
        description: "Regular progress reviews with your teacher.",
        icon: "calendar-check",
      },
    ],
    modules: [
      {
        id: "m1",
        title: "Phase 1 — Beginning Hifz",
        topics: ["Memorization method", "Juz Amma", "Daily revision habits"],
      },
      {
        id: "m2",
        title: "Phase 2 — Building Momentum",
        topics: ["Longer surahs", "Tajweed rules", "Weekly assessments"],
      },
      {
        id: "m3",
        title: "Phase 3 — Sustained Progress",
        topics: ["Murajaah system", "Fluency practice", "Teacher feedback"],
      },
      {
        id: "m4",
        title: "Phase 4 — Completion",
        topics: [
          "Final juz memorization",
          "Comprehensive revision",
          "Certification",
        ],
      },
    ],
    audience: [
      "Women and girls seeking Quran memorization",
      "Students who prefer female teachers",
      "Sisters with basic reading ability ready for Hifz",
      "Learners needing a flexible online Hifz program",
    ],
    faqs: [
      {
        id: "f1",
        question: "Are Hifz classes only with female teachers?",
        answer:
          "Yes. This course is taught exclusively by qualified female Hafiza and Quran teachers for sisters and girls.",
      },
      {
        id: "f2",
        question: "Can mothers learn Hifz alongside daughters?",
        answer:
          "Yes. We welcome adult women and can arrange separate class times for mothers and children.",
      },
      {
        id: "f3",
        question: "What package is recommended for Hifz?",
        answer:
          "Our Premium package (5 days/week, 60-minute classes) is ideal for dedicated Hifz students.",
      },
      {
        id: "f4",
        question: "Is there a free trial before enrolling?",
        answer:
          "Yes. Register for a free trial class to meet your teacher and discuss your Hifz goals.",
      },
    ],
  },
  "tajweed-male": {
    startingPriceBdt: 3000,
    recommendedPackage: "Standard",
    benefits: [
      {
        id: "b1",
        title: "Tajweed Rules Mastery",
        description:
          "Learn articulation points and recitation rules in detail.",
        icon: "book-text",
      },
      {
        id: "b2",
        title: "Live Correction",
        description: "Real-time feedback from an experienced male teacher.",
        icon: "mic",
      },
      {
        id: "b3",
        title: "Practical Recitation",
        description: "Apply rules while reading from the Mushaf.",
        icon: "book-open",
      },
      {
        id: "b4",
        title: "Structured Curriculum",
        description: "Step-by-step lessons from basics to advanced Tajweed.",
        icon: "list-checks",
      },
      {
        id: "b5",
        title: "Audio Practice",
        description: "Recorded exercises to practice between classes.",
        icon: "headphones",
      },
      {
        id: "b6",
        title: "Progress Reports",
        description: "Track improvement with regular teacher evaluations.",
        icon: "bar-chart",
      },
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1 — Makharij",
        topics: ["Articulation points", "Letter exits", "Pronunciation drills"],
      },
      {
        id: "m2",
        title: "Module 2 — Sifaat",
        topics: ["Letter characteristics", "Heavy & light letters", "Practice"],
      },
      {
        id: "m3",
        title: "Module 3 — Nun & Meem Rules",
        topics: ["Idgham, Ikhfa, Iqlab", "Ghunnah", "Applied reading"],
      },
      {
        id: "m4",
        title: "Module 4 — Madd & Waqf",
        topics: ["Elongation rules", "Stopping signs", "Fluent recitation"],
      },
    ],
    audience: [
      "Male students who can read Quran and want proper Tajweed",
      "Adults improving recitation for salah and taraweeh",
      "Students preparing for Hifz or further Islamic studies",
      "Reverts and beginners past Noorani Qaida level",
    ],
    faqs: [
      {
        id: "f1",
        question: "Do I need to complete Noorani Qaida first?",
        answer:
          "You should be able to read the Quran at a basic level. If not, we recommend starting with our Noorani Qaida course.",
      },
      {
        id: "f2",
        question: "How long are Tajweed classes?",
        answer:
          "Standard package classes are 40 minutes, 3 days per week. Longer sessions are available in Advance and Premium plans.",
      },
      {
        id: "f3",
        question: "Will I get course materials?",
        answer:
          "Yes. Teachers share Tajweed notes, practice exercises, and recitation references during your learning plan.",
      },
      {
        id: "f4",
        question: "Can I switch class times if needed?",
        answer:
          "Yes. BDOQ Academy offers flexible scheduling — discuss changes with your teacher or our support team.",
      },
    ],
  },
  "tajweed-female": {
    startingPriceBdt: 3000,
    recommendedPackage: "Standard",
    benefits: [
      {
        id: "b1",
        title: "Certified Female Teachers",
        description: "Learn Tajweed with qualified female scholars.",
        icon: "award",
      },
      {
        id: "b2",
        title: "Private Online Classes",
        description: "Comfortable one-to-one learning from home.",
        icon: "video",
      },
      {
        id: "b3",
        title: "Rule-by-Rule Learning",
        description: "Clear explanations of every Tajweed principle.",
        icon: "book-text",
      },
      {
        id: "b4",
        title: "Recitation Practice",
        description: "Guided reading with live correction and feedback.",
        icon: "mic",
      },
      {
        id: "b5",
        title: "Flexible Timings",
        description: "Schedule classes around family and work commitments.",
        icon: "clock",
      },
      {
        id: "b6",
        title: "Women-Only Environment",
        description: "Separate classes ensuring privacy and peace of mind.",
        icon: "shield-check",
      },
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1 — Foundation",
        topics: ["Makharij basics", "Correct pronunciation", "Daily drills"],
      },
      {
        id: "m2",
        title: "Module 2 — Core Rules",
        topics: ["Noon sakinah rules", "Meem sakinah rules", "Practice surahs"],
      },
      {
        id: "m3",
        title: "Module 3 — Advanced Tajweed",
        topics: ["Madd types", "Qalqalah", "Applied recitation"],
      },
      {
        id: "m4",
        title: "Module 4 — Fluency",
        topics: ["Waqf & Ibtida", "Beautiful recitation", "Final assessment"],
      },
    ],
    audience: [
      "Women and girls who want to improve Quran recitation",
      "Sisters seeking female-only Tajweed instruction",
      "Mothers wanting to read correctly for their children",
      "Students with basic reading ready for Tajweed rules",
    ],
    faqs: [
      {
        id: "f1",
        question: "Are classes only with female teachers?",
        answer:
          "Yes. This course is exclusively taught by certified female Tajweed teachers.",
      },
      {
        id: "f2",
        question: "Is this suitable for complete beginners?",
        answer:
          "You should know basic Quran reading. Beginners can start with Noorani Qaida before moving to Tajweed.",
      },
      {
        id: "f3",
        question: "What is the monthly fee for Tajweed?",
        answer:
          "The Standard package starts at ৳3,000/month with 3 classes per week. See our pricing page for all plans.",
      },
      {
        id: "f4",
        question: "Can I try a class before enrolling?",
        answer:
          "Absolutely. Book a free trial class to experience our teaching quality firsthand.",
      },
    ],
  },
  "free-learning": {
    startingPriceBdt: 0,
    recommendedPackage: "Free",
    benefits: [
      {
        id: "b1",
        title: "No Tuition Cost",
        description: "Start learning the Quran without any course fee.",
        icon: "gift",
      },
      {
        id: "b2",
        title: "Qualified Teachers",
        description: "Learn from experienced BDOQ Academy instructors.",
        icon: "award",
      },
      {
        id: "b3",
        title: "Live Online Classes",
        description: "Interactive sessions from the comfort of your home.",
        icon: "video",
      },
      {
        id: "b4",
        title: "Beginner Friendly",
        description:
          "Ideal introduction to Quran reading and Islamic learning.",
        icon: "heart",
      },
      {
        id: "b5",
        title: "Flexible Entry",
        description: "Open to students of all ages and backgrounds.",
        icon: "users",
      },
      {
        id: "b6",
        title: "Path to Advanced Courses",
        description: "Progress to Tajweed, Hifz, or paid plans when ready.",
        icon: "arrow-up-right",
      },
    ],
    modules: [
      {
        id: "m1",
        title: "Introduction to Quran",
        topics: [
          "Importance of learning",
          "Basic etiquette",
          "Getting started",
        ],
      },
      {
        id: "m2",
        title: "Arabic Reading Basics",
        topics: ["Letters & sounds", "Simple words", "Guided practice"],
      },
      {
        id: "m3",
        title: "Short Surah Practice",
        topics: ["Selected surahs", "Recitation support", "Teacher feedback"],
      },
      {
        id: "m4",
        title: "Next Steps Guidance",
        topics: [
          "Course recommendations",
          "Learning plan",
          "Enrollment support",
        ],
      },
    ],
    audience: [
      "Anyone wanting to start Quran learning at no cost",
      "Students exploring online Quran education for the first time",
      "Families looking for an affordable entry point",
      "Learners who want to try BDOQ Academy before committing",
    ],
    faqs: [
      {
        id: "f1",
        question: "Is the free course really free?",
        answer:
          "Yes. There is no tuition fee for this introductory Quran learning course at BDOQ Academy.",
      },
      {
        id: "f2",
        question: "How do I register for the free course?",
        answer:
          "Fill out the free trial registration form or contact us on WhatsApp to get started.",
      },
      {
        id: "f3",
        question: "How long is the free program?",
        answer:
          "The free learning period gives you a solid introduction. Your teacher will guide you on next steps based on your progress.",
      },
      {
        id: "f4",
        question: "Can I upgrade to a paid course later?",
        answer:
          "Yes. Many students move to our Private, Standard, or Premium plans for continued structured learning.",
      },
    ],
  },
};

export function getCourseDetail(slug: string): ICourseDetail {
  return COURSE_DETAIL_MAP[slug] ?? COURSE_DETAIL_MAP["noorani-qaida"];
}
