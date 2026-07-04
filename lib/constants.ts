import type {
  ICourse,
  IFounder,
  ILearningPlan,
  IHowToStartStep,
  ITopic,
  ITopicsSectionContent,
  IPackage,
  IAcademyInfo,
  IStat,
  ISocialLink,
  IWhyChooseItem,
  ICountryPresence,
  ITestimonial,
  IFAQItem,
  IBlogPost,
  IEbook,
  IAudioVerse,
  IAudioRecitation,
  IVideoItem,
  IGalleryItem,
  IQuickNavItem,
} from "./types";

import { TEACHER_AVATARS } from "./teacherData";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bdoq-academy.onrender.com/api";

export const ACADEMY_FOUNDED_YEAR = 2019;

export const SITE_URL = "https://bdonlinequranacademy.com";

export function getAcademyYearsExperience(): number {
  return Math.max(1, new Date().getFullYear() - ACADEMY_FOUNDED_YEAR);
}

export const BRAND_LOGO = {
  src: "/images/brand/bdoq-logo.png?v=4",
  footerSrc: "/images/brand/bdoq-logo-footer.png?v=4",
  alt: "BDOQ Academy",
  width: 832,
  height: 443,
} as const;

export const ACADEMY_INFO: IAcademyInfo = {
  name: "BDOQ Academy",
  shortName: "BDOQ Academy",
  tagline:
    "A reliable virtual classroom for online Quran teachers and students",
  mission:
    "BD Online Quran Academy (BDOQ Academy) is an international standard online Quran education platform offering one-to-one live classes, Tajweed, Hifz, and Noorani Qaida courses with experienced Hafiz and scholars. We serve students across Bangladesh and worldwide with flexible schedules, separate classes for men and women, and multilingual instruction in Bengali, English, Arabic, and Urdu.",
  founded: "7+ years experience",
  contactBD: "+8801923-947460",
  contactEG: "+20122681709",
  email: "contact@bdonlinequranacademy.com",
  whatsapp: "+88 01923-947460",
  address: "Gopalganj, Dhaka, Bangladesh",
  website: "bdonlinequranacademy.com",
  footerMobile: "+8801747311761",
};

export const ABOUT_HOME_SNIPPET =
  "One-to-one live Quran classes with certified Hafiz teachers — Tajweed, Hifz, and Noorani Qaida for students worldwide.";

export const ABOUT_HOME_TAGS = [
  "Live 1-to-1",
  "Male & Female",
  "Flexible Schedule",
] as const;

export const FOUNDER: IFounder = {
  name: "Hafez Mawlana Mufti Abdul Mumin Khan",
  role: "Founder & Director, BD Online Quran Academy",
  bio: "Hafiz, trained Mufti, experienced Da'i. Established BDOQ Academy as an international standard online Quran education platform.",
  image: TEACHER_AVATARS.male,
};

export const FOUNDER_VISION =
  "To illuminate every home with the light of the Quran through accessible, trustworthy, and internationally standard online education — nurturing generations of confident reciters, Hafiz, and practicing Muslims across the world.";

export const MISSION_POINTS: string[] = [
  "Provide one-to-one and structured Quran education for all ages",
  "Connect students with qualified Hafiz, scholars, and certified teachers",
  "Offer flexible online classes for Bangladesh and international students",
  "Maintain separate, privacy-focused classes for men, women, and children",
  "Deliver multilingual instruction in Bengali, English, Arabic, and Urdu",
  "Support families with affordable packages and transparent progress tracking",
];

export const VISION_POINTS: string[] = [
  "Become a globally trusted name in online Quran education",
  "Empower 10,000+ students to read, understand, and memorize the Quran",
  "Train and onboard dedicated teachers from Bangladesh and abroad",
  "Use technology to make Islamic learning engaging and effective",
  "Build a community rooted in sincerity, discipline, and Islamic values",
  "Expand record, live, and private learning pathways for every learner",
];

export const FAMILY_DISCOUNT_INTRO =
  "We understand tuition fees are important for many families. At BD Online Quran Academy, we strive to keep quality Quran education affordable without compromising on teacher standards or personal care.";

export const FAMILY_DISCOUNT_DETAIL =
  "A 20% discount on tuition fees will apply for the second child and all subsequent children enrolled in our private learning packages.";

export const STATS: IStat[] = [
  { value: "4,000+", label: "Hours" },
  { value: "7+", label: "Years" },
  { value: "10+", label: "Teachers" },
  { value: "300+", label: "Students" },
  { value: "10+", label: "Popular Teachers" },
];

export const QUICK_NAV_ITEMS: IQuickNavItem[] = [
  {
    id: "male-teachers",
    label: "Male Teachers",
    href: "/teachers?gender=male#male-teachers",
    description: "Hafiz & male scholars",
    icon: "users",
  },
  {
    id: "female-teachers",
    label: "Female Teachers",
    href: "/teachers?gender=female#female-teachers",
    description: "Qualified sisters instructors",
    icon: "user-round",
  },
  {
    id: "all-courses",
    label: "All Courses",
    href: "/courses",
    description: "Tajweed, Hifz & more",
    icon: "book-open",
  },
  {
    id: "free-course",
    label: "Free Course",
    href: "/courses?type=free",
    description: "Learn Quran at no cost",
    icon: "library",
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing",
    description: "Monthly packages",
    icon: "tag",
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
    description: "Articles & guidance",
    icon: "newspaper",
  },
  {
    id: "student-admission",
    label: "Student Admission",
    href: "/student-admission",
    description: "Enroll as a student",
    icon: "graduation-cap",
  },
  {
    id: "free-class",
    label: "Free Trial Class",
    href: "/free-class",
    description: "Book a trial session",
    icon: "gift",
  },
];

export const COURSES: ICourse[] = [
  {
    slug: "noorani-qaida",
    title: "Noorani Qaida Course",
    target: "Children",
    description: "Foundation Arabic alphabet and Quran reading basics",
    icon: "📖",
    category: "private",
    gender: "children",
  },
  {
    slug: "quran-hifz-male",
    title: "Quran Hifz Course (Male)",
    description: "Complete Quran memorization for males",
    icon: "🕌",
    category: "private",
    gender: "male",
  },
  {
    slug: "quran-hifz-female",
    title: "Quran Hifz Course (Women)",
    description: "Complete Quran memorization for women with female teachers",
    icon: "🌙",
    category: "private",
    gender: "female",
  },
  {
    slug: "tajweed-male",
    title: "Quran Learning with Tajweed (Male)",
    description: "Proper Quran recitation with Tajweed rules",
    icon: "📿",
    category: "private",
    gender: "male",
  },
  {
    slug: "tajweed-female",
    title: "Quran Learning with Tajweed (Women)",
    description: "Tajweed for women with female certified teachers",
    icon: "⭐",
    category: "private",
    gender: "female",
  },
  {
    slug: "free-learning",
    title: "Free Quran Learning Course",
    description: "Start your Quran journey at no cost",
    icon: "🎁",
    category: "free",
  },
];

export const PACKAGES: IPackage[] = [
  {
    name: "Basic",
    price: { bdt: 2000, usd: 25 },
    period: "Monthly",
    features: [
      "One-to-one class benefits",
      "Classes 2 days a week",
      "8 days of classes per month",
      "Class duration: 30 minutes",
      "Convenient class times",
      "Noorani/Najera Basic",
    ],
  },
  {
    name: "Standard",
    price: { bdt: 3000, usd: 35 },
    period: "Monthly",
    popular: true,
    features: [
      "One-to-one class benefits",
      "Classes 3 days a week",
      "12 days of classes per month",
      "Class duration: 40 minutes",
      "Convenient class times",
      "Najera with Tajweed",
    ],
  },
  {
    name: "Advance",
    price: { bdt: 4000, usd: 45 },
    period: "Monthly",
    features: [
      "One-to-one class benefits",
      "Classes 4 days a week",
      "16 days of classes per month",
      "Class duration: 50 minutes",
      "Convenient class times",
      "Najera with Tajweed",
    ],
  },
  {
    name: "Premium",
    price: { bdt: 5000, usd: 55 },
    period: "Monthly",
    features: [
      "One-to-one class benefits",
      "Classes 5 days a week",
      "20 days of classes per month",
      "Class duration: 60 minutes",
      "Convenient class times",
      "Hifz/Advance Tajweed",
    ],
  },
];

export const LEARNING_PLANS_SECTION = {
  eyebrow: "Learning pathways",
  title: "Three ways to learn at BDOQ Academy",
  subtitle:
    "Record courses for flexible self-paced study, private one-to-one classes for personal care, or live courses with structured group learning.",
  popularBadge: "Most popular",
  cta: "Get started today",
};

export const LEARNING_PLANS: ILearningPlan[] = [
  {
    id: "record",
    title: "Record Course",
    displayTitle: "Record course",
    description:
      "Lifetime access with smart notes, quizzes, and flexible timing.",
    features: [
      "Lifetime access",
      "Smart Notes",
      "Practice",
      "Quiz",
      "Assignment",
      "Effective Learning Plan",
      "Chapter-wise test",
      "Problem Solving",
      "Flexible timing",
      "Certificate",
    ],
  },
  {
    id: "private",
    title: "Private (1-to-1)",
    displayTitle: "Private",
    description:
      "Live one-to-one classes with your preferred schedule and personal care.",
    featured: true,
    features: [
      "Live classes",
      "Favorite times",
      "Convenient time",
      "Effective Learning Plan",
      "Assignment",
      "Extra class",
      "Monthly check-up",
      "Analytics",
      "Problem Solving",
      "Personal Care",
    ],
  },
  {
    id: "live",
    title: "Live Course",
    displayTitle: "Live course",
    description:
      "Scheduled live sessions with practice, analytics, and class recordings.",
    features: [
      "Live classes",
      "Practice",
      "Quiz",
      "Assignment",
      "Monthly check-up",
      "Extra class",
      "Analytics",
      "BDOQ Award",
      "Class video",
      "Certificate",
    ],
  },
];

export const TOPICS_SECTION: ITopicsSectionContent = {
  eyebrow: {
    en: "In a systematic, easy and understandable way",
    bn: "ধারাবাহিকভাবে, সহজ ও বুঝার মতো পদ্ধতিতে",
  },
  titleBefore: {
    en: "",
    bn: "আমাদের কাছ থেকে যেসকল ",
  },
  titleHighlight: {
    en: "Subjects",
    bn: "বিষয়সমূহ",
  },
  titleAfter: {
    en: " you can learn from us",
    bn: " শিখতে পারবেন",
  },
  subtitle: {
    en: "Our courses are arranged step by step according to our syllabus, so students can gradually master Quran learning and essential religious topics — gaining knowledge, moral guidance, and spiritual growth to strengthen faith and character.",
    bn: "বিভিন্ন কোর্স আমাদের সিলেবাস অনুযায়ী ক্রমান্বয়ে সাজানো হয়েছে, যাতে শিক্ষার্থীরা ধাপে ধাপে কুরআন শিক্ষা এবং বিভিন্ন ধর্মীয় বিষয় আয়ত্ত করতে পারে — জ্ঞান অর্জন, আদর্শিক মার্গদর্শন এবং ঈমান ও চরিত্র গঠনের মাধ্যমে ব্যক্তিগত ও আধ্যাত্মিক উন্নতি ঘটাতে পারে।",
  },
  bookTrial: {
    en: "Book a free trial class",
    bn: "ফ্রি ট্রায়াল ক্লাস বুক করুন",
  },
  exploreCourses: {
    en: "Explore all courses",
    bn: "সব কোর্স দেখুন",
  },
};

export const TOPICS: ITopic[] = [
  {
    id: "quran-education",
    label: "Quran Education",
    labelBn: "কুরআন শিক্ষা",
    icon: "book-open",
  },
  {
    id: "quran-recitation",
    label: "Quran Recitation",
    labelBn: "কুরআন তিলাওয়াত",
    icon: "mic",
  },
  {
    id: "tafsir",
    label: "Tafsirul Quran",
    labelBn: "তাফসীরুল কুরআন",
    icon: "book-text",
  },
  {
    id: "seerah-history",
    label: "Seerah and History",
    labelBn: "সীরাহ এবং ইতিহাস",
    icon: "history",
  },
  {
    id: "islamic-studies",
    label: "Islamic Studies",
    labelBn: "ইসলামিক স্টাডিজ",
    icon: "landmark",
  },
  {
    id: "urdu",
    label: "Urdu Language Learning",
    labelBn: "উর্দু ভাষা শিক্ষা",
    icon: "globe",
  },
  {
    id: "tajweed",
    label: "Learning Tajweed",
    labelBn: "তাজভীদ শেখা",
    icon: "scroll-text",
  },
  {
    id: "hifz",
    label: "Hifzul Quran",
    labelBn: "হিফজুল কুরআন",
    icon: "book-marked",
  },
  {
    id: "surah-memorization",
    label: "Surah Memorization",
    labelBn: "সুরা মুখস্থ",
    icon: "graduation-cap",
  },
  {
    id: "adab",
    label: "Adab & Etiquette",
    labelBn: "আদব-কায়দা",
    icon: "message-square",
  },
  {
    id: "arabic",
    label: "Arabic Language Learning",
    labelBn: "আরবি ভাষা শিক্ষা",
    icon: "languages",
  },
  {
    id: "english",
    label: "English Language Learning",
    labelBn: "ইংরেজি ভাষা শিক্ষা",
    icon: "globe-2",
  },
];

export const HOW_TO_START_SECTION = {
  eyebrow: "Get started in minutes",
  title: "How to start learning",
  subtitle:
    "Three simple steps from free trial registration to your first live Quran class with a qualified teacher.",
  cta: "Register for free class",
};

export const HOW_TO_START_STEPS: IHowToStartStep[] = [
  {
    step: 1,
    title: "Register for free class",
    description:
      "Fill out the free trial form and tell us your learning goals and preferred schedule.",
  },
  {
    step: 2,
    title: "Take your first class",
    description:
      "Meet your qualified teacher online and experience a personalized Quran lesson.",
  },
  {
    step: 3,
    title: "Start your journey",
    description:
      "Choose your learning plan and begin your structured path to Quran mastery.",
  },
];

export const COUNTRIES: string[] = [
  "Bangladesh",
  "Australia",
  "United Kingdom",
  "United States",
  "Canada",
  "Saudi Arabia",
  "UAE",
  "Qatar",
  "Malaysia",
  "Japan",
  "Germany",
  "Pakistan",
  "Indonesia",
  "Turkey",
  "Egypt",
  "India",
  "Singapore",
  "New Zealand",
  "Mexico",
  "France",
];

export const GLOBAL_COUNTRIES: ICountryPresence[] = [
  { name: "Bangladesh", flag: "🇧🇩", code: "bd" },
  { name: "Australia", flag: "🇦🇺", code: "au" },
  { name: "United Kingdom", flag: "🇬🇧", code: "gb" },
  { name: "United States", flag: "🇺🇸", code: "us" },
  { name: "Canada", flag: "🇨🇦", code: "ca" },
  { name: "Saudi Arabia", flag: "🇸🇦", code: "sa" },
  { name: "UAE", flag: "🇦🇪", code: "ae" },
  { name: "Qatar", flag: "🇶🇦", code: "qa" },
  { name: "Malaysia", flag: "🇲🇾", code: "my" },
  { name: "Japan", flag: "🇯🇵", code: "jp" },
  { name: "Germany", flag: "🇩🇪", code: "de" },
  { name: "Pakistan", flag: "🇵🇰", code: "pk" },
  { name: "Indonesia", flag: "🇮🇩", code: "id" },
  { name: "Turkey", flag: "🇹🇷", code: "tr" },
  { name: "Egypt", flag: "🇪🇬", code: "eg" },
  { name: "India", flag: "🇮🇳", code: "in" },
  { name: "Singapore", flag: "🇸🇬", code: "sg" },
  { name: "New Zealand", flag: "🇳🇿", code: "nz" },
  { name: "Mexico", flag: "🇲🇽", code: "mx" },
  { name: "France", flag: "🇫🇷", code: "fr" },
];

export const GLOBAL_PRESENCE_FOOTER =
  "Wherever you are, we bring the light of the Quran to your home — live, interactive, and effective.";

export const WHY_CHOOSE_US: IWhyChooseItem[] = [
  {
    id: "one-to-one",
    title: "One to One System",
    description: "One teacher for one student",
    icon: "users",
  },
  {
    id: "batch",
    title: "Batch System",
    description: "Regular and planned group classes",
    icon: "users-round",
  },
  {
    id: "flexible",
    title: "Flexible Class Times",
    description: "Schedule classes according to your time",
    icon: "clock",
  },
  {
    id: "separate",
    title: "Men and Women are Different",
    description: "Separate education system ensuring privacy",
    icon: "shield-check",
  },
  {
    id: "teachers",
    title: "Domestic and International Teachers",
    description: "Experienced teachers from BD and abroad",
    icon: "globe",
  },
  {
    id: "multilingual",
    title: "Multilingual Teaching",
    description: "Facilities for Bengali, English, Arabic and Urdu",
    icon: "languages",
  },
];

export {
  TEACHER_AVATARS,
  FEATURED_TEACHERS,
  MALE_TEACHERS,
  FEMALE_TEACHERS,
} from "./teacherData";

export const TESTIMONIALS: ITestimonial[] = [
  {
    id: "testimonial-1",
    name: "Rahima Khatun",
    role: "Student",
    location: "Dhaka, Bangladesh",
    content:
      "Alhamdulillah, BD Online Quran Academy has been a blessing for our family. My daughter learns Noorani Qaida one-to-one with a caring female teacher. The class times fit our schedule perfectly.",
    rating: 5,
    image: "/images/testimonials/student-1.webp",
  },
  {
    id: "testimonial-2",
    name: "Ahmed Malik",
    role: "Student",
    location: "Los Angeles, America",
    content:
      "I enrolled in the Tajweed course while working full-time in the US. BDOQ Academy matched me with an experienced teacher who explains rules clearly in English. The live classes are interactive.",
    rating: 5,
    image: "/images/testimonials/student-2.webp",
  },
  {
    id: "testimonial-3",
    name: "Fatima Begum",
    role: "Parent",
    location: "Dhaka, Bangladesh",
    content:
      "We chose BDOQ Academy because of their separate system for women and qualified Hafiz teachers. My son is memorizing the Quran with excellent supervision and monthly progress reports.",
    rating: 5,
  },
  {
    id: "testimonial-4",
    name: "Arafat Hossain",
    role: "Student",
    location: "Los Angeles, America",
    content:
      "Fortunately, due to knowing English and having a flexible schedule, I could continue learning Quran under Hafiz teachers. The qualified teachers of BDOQ Academy teach Tajweed excellently from Los Angeles.",
    rating: 5,
    image: "/images/testimonials/student-2.webp",
  },
  {
    id: "testimonial-5",
    name: "Abdullah",
    role: "Student",
    location: "Los Angeles, America",
    content:
      "I could never have imagined Quran from Bangladesh could be taught to such an international standard. I am confidently memorizing the Quran with a dedicated Hafiz teacher at BDOQ Academy.",
    rating: 5,
    image: "/images/testimonials/student-1.webp",
  },
  {
    id: "testimonial-6",
    name: "Nusrat Fatima",
    role: "Student",
    location: "Dhaka, Bangladesh",
    content:
      "In our country there are many madrasas, but not everyone has equal opportunities for women to learn. I found a place where women study with qualified female teachers only — that is why I chose BDOQ.",
    rating: 5,
  },
];

export const FAQ_ITEMS: IFAQItem[] = [
  {
    id: "faq-1",
    question: "How do I book a free trial class?",
    answer:
      "Visit our Free Trial Class page, fill in your name, contact details, subject interest, and preferred time. Our team will contact you via WhatsApp or email to confirm your schedule and assign a suitable teacher for your first session.",
  },
  {
    id: "faq-2",
    question: "When is BDOQ's class time?",
    answer:
      "BDOQ Academy offers flexible class times to suit students in Bangladesh and worldwide. You can choose morning, afternoon, or evening slots based on your timezone. Classes are scheduled according to your availability during registration.",
  },
  {
    id: "faq-3",
    question: "What platform do you use for online classes?",
    answer:
      "We conduct live classes through reliable video conferencing platforms with screen sharing and audio clarity optimized for Quran teaching. Your teacher will share the meeting link before each session, and technical support is available if needed.",
  },
  {
    id: "faq-4",
    question: "What age group can students enroll in the course?",
    answer:
      "Students of all ages can enroll — from young children starting Noorani Qaida to adults learning Tajweed or Hifz. We match each student with an appropriate teacher and learning plan based on age, level, and goals.",
  },
  {
    id: "faq-5",
    question: "How are teachers selected for students?",
    answer:
      "BDOQ Academy assigns teachers based on the student's gender, course type, language preference, and schedule. All teachers are experienced Hafiz or qualified scholars who undergo evaluation to maintain our international teaching standards.",
  },
  {
    id: "faq-6",
    question: "Is there a system for girls to learn the Holy Quran?",
    answer:
      "Yes. BDOQ Academy provides a fully separate education system for women and girls with qualified female teachers. This ensures privacy, comfort, and focused learning for sisters of all ages in a safe online environment.",
  },
];

export const SOCIAL_LINKS: ISocialLink[] = [
  {
    name: "Facebook",
    url: "https://facebook.com/bdonlinequranacademy",
    icon: "facebook",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/bdonlinequranacademy",
    icon: "instagram",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@bdonlinequranacademy",
    icon: "youtube",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/8801923947460",
    icon: "whatsapp",
  },
  {
    name: "Telegram",
    url: "https://t.me/bdonlinequranacademy",
    icon: "telegram",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/bdonlinequranacademy",
    icon: "linkedin",
  },
  {
    name: "X",
    url: "https://x.com/bdonlinequranacademy",
    icon: "x",
  },
];

export const FAMILY_DISCOUNT = "20% off second child";

export const WHATSAPP_PHONE = "+8801923-947460";
export const WHATSAPP_URL = "https://wa.me/8801923947460";

export const PRAYER_TIMES_API =
  "https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh";

export const EBOOK_CATEGORIES = [
  { id: "tajweed" as const, label: "Tajweed book" },
  { id: "islamic-history" as const, label: "Islamic history" },
  { id: "religious" as const, label: "Religious book" },
];

export const EBOOKS: IEbook[] = [
  {
    id: "tajweed-made-easy",
    slug: "tajweed-made-easy",
    title: "Tajweed Rules Made Easy",
    category: "tajweed",
    description:
      "A practical guide to essential Tajweed rules for correct Quran recitation, with examples for beginners.",
    coverGradient: "from-primary to-primary-dark",
    pdfUrl: "/ebooks/tajweed-made-easy.pdf",
    fileSize: "1.8 MB",
    pageCount: 48,
    language: "en",
    author: "BDOQ Academy",
    featured: true,
  },
  {
    id: "tajweed-pronunciation",
    slug: "tajweed-pronunciation",
    title: "Correct Pronunciation in Quran Recitation",
    category: "tajweed",
    description:
      "Makharij and Sifaat explained step by step for students learning Tajweed with a teacher.",
    coverGradient: "from-teal to-primary-dark",
    pdfUrl: "/ebooks/tajweed-pronunciation.pdf",
    fileSize: "2.1 MB",
    pageCount: 56,
    language: "both",
    author: "BDOQ Academy",
  },
  {
    id: "seerah-overview",
    slug: "seerah-overview",
    title: "Brief History of Islam — Seerah Overview",
    category: "islamic-history",
    description:
      "Key events from the life of Prophet Muhammad (ﷺ) and the early Muslim community for young learners.",
    coverGradient: "from-gold/80 to-primary-dark",
    pdfUrl: "/ebooks/seerah-overview.pdf",
    fileSize: "3.2 MB",
    pageCount: 72,
    language: "en",
    author: "BDOQ Academy",
  },
  {
    id: "khulafa-rashidun",
    slug: "khulafa-rashidun",
    title: "The Rightly Guided Caliphs",
    category: "islamic-history",
    description:
      "An introduction to the Khulafa Rashidun and their contributions to Islamic civilization.",
    coverGradient: "from-primary-dark to-teal",
    pdfUrl: "/ebooks/khulafa-rashidun.pdf",
    fileSize: "2.6 MB",
    pageCount: 64,
    language: "en",
    author: "BDOQ Academy",
  },
  {
    id: "daily-duas",
    slug: "daily-duas",
    title: "Daily Duas for Muslim Families",
    category: "religious",
    description:
      "Essential supplications for morning, evening, and daily activities with transliteration.",
    coverGradient: "from-primary to-teal-accent",
    pdfUrl: "/ebooks/daily-duas.pdf",
    fileSize: "1.4 MB",
    pageCount: 36,
    language: "both",
    author: "BDOQ Academy",
  },
  {
    id: "pillars-of-islam",
    slug: "pillars-of-islam",
    title: "Understanding the Five Pillars of Islam",
    category: "religious",
    description:
      "A clear explanation of Shahada, Salah, Zakat, Sawm, and Hajj for students and parents.",
    coverGradient: "from-teal-accent/80 to-primary",
    pdfUrl: "/ebooks/pillars-of-islam.pdf",
    fileSize: "2.0 MB",
    pageCount: 52,
    language: "en",
    author: "BDOQ Academy",
  },
];

export const SURAH_FATIHA_VERSES: IAudioVerse[] = [
  {
    id: "v1",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
  },
  {
    id: "v2",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
  },
  {
    id: "v3",
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "The Entirely Merciful, the Especially Merciful.",
  },
  {
    id: "v4",
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    translation: "Sovereign of the Day of Recompense.",
  },
  {
    id: "v5",
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "It is You we worship and You we ask for help.",
  },
  {
    id: "v6",
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    translation: "Guide us to the straight path.",
  },
  {
    id: "v7",
    arabic:
      "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    translation:
      "The path of those upon whom You have bestowed favor, not of those who have evoked anger or gone astray.",
  },
];

export const OTHER_RECITATIONS: IAudioRecitation[] = [
  {
    id: "rahman",
    surahName: "Surah Ar-Rahman",
    paraInfo: "Para 27 — Juz 27",
    duration: "12:45",
    progress: 35,
  },
  {
    id: "yasin",
    surahName: "Surah Yasin",
    paraInfo: "Para 22 — Juz 22",
    duration: "18:20",
    progress: 60,
  },
  {
    id: "mulk",
    surahName: "Surah Al-Mulk",
    paraInfo: "Para 29 — Juz 29",
    duration: "8:15",
    progress: 20,
  },
  {
    id: "ikhlas",
    surahName: "Surah Al-Ikhlas",
    paraInfo: "Para 30 — Juz 30",
    duration: "1:05",
    progress: 80,
  },
];

export const FEATURED_AUDIO_SRC =
  "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/1.mp3";

export const FEATURED_VIDEO: IVideoItem = {
  id: "featured",
  title: "Welcome to BD Online Quran Academy",
  youtubeId: "uu0FOZZtz_M",
  startSeconds: 3,
  description:
    "Discover how BDOQ Academy delivers one-to-one online Quran education with experienced teachers worldwide.",
};

export const VIDEO_GALLERY_ITEMS: IVideoItem[] = [
  {
    id: "v1",
    title: "Noorani Qaida — Lesson Introduction",
    youtubeId: "rLmCad9JH3s",
  },
  {
    id: "v2",
    title: "Tajweed Basics for Beginners",
    youtubeId: "i_nu7AvcTaE",
  },
  {
    id: "v3",
    title: "How One-to-One Classes Work at BDOQ",
    youtubeId: "uu0FOZZtz_M",
  },
  {
    id: "v4",
    title: "Surah Al-Fatiha — Beautiful Recitation",
    youtubeId: "G61P8D6K380",
  },
  {
    id: "v5",
    title: "Surah Ar-Rahman — Quran Recitation",
    youtubeId: "HDRL7J8-MDM",
  },
  {
    id: "v6",
    title: "Surah Yaseen — Full Recitation",
    youtubeId: "O3n5HNC7AUs",
  },
];

export const VIDEO_PLAYLIST: IVideoItem[] = [
  {
    id: "p1",
    title: "Getting Started with Online Quran Learning",
    youtubeId: "uu0FOZZtz_M",
  },
  {
    id: "p2",
    title: "Importance of Tajweed in Recitation",
    youtubeId: "i_nu7AvcTaE",
  },
  {
    id: "p3",
    title: "Surah Al-Mulk — Quran Recitation",
    youtubeId: "4dHMsRxbOac",
  },
  {
    id: "p4",
    title: "Surah Al-Kahf — Full Recitation",
    youtubeId: "k17GympXbrE",
  },
  {
    id: "p5",
    title: "BDOQ Academy Class System Explained",
    youtubeId: "uu0FOZZtz_M",
  },
];

export const GALLERY_ALBUMS = [
  { id: "all" as const, label: "All" },
  { id: "gallery-01" as const, label: "Gallery 01" },
  { id: "gallery-02" as const, label: "Gallery 02" },
  { id: "gallery-03" as const, label: "Gallery 03" },
];

export const GALLERY_ITEMS: IGalleryItem[] = [
  {
    id: "g1",
    title: "Online class session",
    album: "gallery-01",
    coverGradient: "from-primary to-teal",
    heightClass: "h-56",
  },
  {
    id: "g2",
    title: "Student recitation practice",
    album: "gallery-01",
    coverGradient: "from-primary-dark to-primary",
    heightClass: "h-72",
  },
  {
    id: "g3",
    title: "Teacher mentoring session",
    album: "gallery-01",
    coverGradient: "from-teal to-primary-dark",
    heightClass: "h-48",
  },
  {
    id: "g4",
    title: "Noorani Qaida class",
    album: "gallery-01",
    coverGradient: "from-gold/70 to-primary-dark",
    heightClass: "h-64",
  },
  {
    id: "g5",
    title: "Tajweed workshop",
    album: "gallery-02",
    coverGradient: "from-primary to-gold/60",
    heightClass: "h-60",
  },
  {
    id: "g6",
    title: "Hifz progress review",
    album: "gallery-02",
    coverGradient: "from-teal-accent/60 to-primary",
    heightClass: "h-52",
  },
  {
    id: "g7",
    title: "Female teachers team",
    album: "gallery-02",
    coverGradient: "from-primary-dark to-teal-accent/50",
    heightClass: "h-72",
  },
  {
    id: "g8",
    title: "International students",
    album: "gallery-02",
    coverGradient: "from-primary to-primary-dark",
    heightClass: "h-48",
  },
  {
    id: "g9",
    title: "Academy orientation",
    album: "gallery-03",
    coverGradient: "from-teal to-primary",
    heightClass: "h-64",
  },
  {
    id: "g10",
    title: "Certificate ceremony",
    album: "gallery-03",
    coverGradient: "from-gold/80 to-teal",
    heightClass: "h-56",
  },
  {
    id: "g11",
    title: "Parent meeting",
    album: "gallery-03",
    coverGradient: "from-primary-dark to-gold/50",
    heightClass: "h-60",
  },
  {
    id: "g12",
    title: "Community gathering",
    album: "gallery-03",
    coverGradient: "from-primary to-teal-accent/70",
    heightClass: "h-72",
  },
];

export const STATIC_BLOG_POSTS: IBlogPost[] = [
  {
    slug: "importance-of-tajweed-in-quran-recitation",
    title: "The Importance of Tajweed in Quran Recitation",
    excerpt:
      "Learn why Tajweed is essential for every Muslim and how BDOQ Academy helps students master correct pronunciation.",
    content: `Tajweed is the set of rules governing the correct pronunciation of the Quran. Allah (SWT) revealed the Quran in clear Arabic, and reciting it with proper Tajweed preserves the meaning and beauty of every word.

At BD Online Quran Academy, students learn Tajweed through one-to-one live classes with qualified teachers. Whether you are a beginner or improving your recitation, personalized feedback helps you correct mistakes early.

**Key benefits of learning Tajweed:**
- Preserve the meaning of Quranic verses
- Recite with confidence in Salah and daily worship
- Build a strong foundation for Hifz (memorization)
- Follow the Sunnah of reciting the Quran beautifully

BDOQ Academy offers separate Tajweed courses for men and women, with flexible scheduling for students in Bangladesh and abroad. Book a free trial class to experience our teaching method firsthand.`,
    image: "gradient-tajweed",
    publishedAt: "2025-11-15",
    tags: ["Tajweed", "Quran", "Learning"],
    author: "BDOQ Academy Team",
  },
  {
    slug: "how-to-start-online-quran-learning",
    title: "How to Start Online Quran Learning — A Complete Guide",
    excerpt:
      "A step-by-step guide for parents and students beginning their Quran journey with BDOQ Academy's one-to-one system.",
    content: `Starting your Quran learning journey online is easier than ever with BD Online Quran Academy. Our structured approach ensures every student — child or adult — receives personal attention from an experienced teacher.

**Step 1: Choose your course**
Select from Noorani Qaida, Tajweed, Hifz, or our free learning course based on your current level and goals.

**Step 2: Book a free trial**
Register for a free trial class on our website. Share your preferred time, timezone, and whether you need a male or female teacher.

**Step 3: Meet your teacher**
During the trial, your assigned teacher assesses your level and recommends a learning plan and monthly package.

**Step 4: Begin regular classes**
Attend live one-to-one sessions from home with a device and stable internet. BDOQ teachers use reliable platforms optimized for Quran instruction.

With 7+ years of experience and 300+ students worldwide, BDOQ Academy is a trusted choice for online Quran education.`,
    image: "gradient-guide",
    publishedAt: "2025-10-28",
    tags: ["Guide", "Online Learning", "Students"],
    author: "Hafez Mawlana Mufti Abdul Mumin Khan",
  },
  {
    slug: "benefits-of-one-to-one-quran-classes",
    title: "5 Benefits of One-to-One Quran Classes",
    excerpt:
      "Discover why personalized Quran instruction delivers faster progress than group classes for most learners.",
    content: `One-to-one Quran classes are at the heart of BD Online Quran Academy's teaching model. Here are five reasons students thrive in this format:

**1. Personalized pace**
Your teacher adjusts each lesson to your speed — no rushing ahead or waiting for others.

**2. Immediate correction**
Tajweed mistakes are corrected in real time, building accurate habits from day one.

**3. Flexible scheduling**
Choose class times that fit your work, school, or family routine across any timezone.

**4. Privacy for sisters**
Female students learn exclusively with qualified female teachers in a comfortable environment.

**5. Monthly progress tracking**
Teachers provide regular check-ups, assignments, and analytics so you see measurable improvement.

BDOQ Academy packages start from ৳2,000/month with classes 2–5 days per week. Contact us or book a free trial to get started.`,
    image: "gradient-benefits",
    publishedAt: "2025-09-12",
    tags: ["One-to-One", "Benefits", "BDOQ Academy"],
    author: "BDOQ Academy Team",
  },
];
