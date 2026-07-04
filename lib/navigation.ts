export interface INavLink {
  labelKey: string;
  href: string;
}

export interface INavItem {
  labelKey: string;
  href?: string;
  children?: INavLink[];
}

export const MAIN_NAV: INavItem[] = [
  { labelKey: "home", href: "/" },
  {
    labelKey: "aboutUs",
    children: [
      { labelKey: "about", href: "/about" },
      { labelKey: "teachers", href: "/teachers" },
      { labelKey: "successStories", href: "/about#success-stories" },
    ],
  },
  {
    labelKey: "allCourses",
    children: [
      { labelKey: "privateOneToOne", href: "/courses?type=private" },
      { labelKey: "recordCourse", href: "/courses?type=record" },
      { labelKey: "liveCourse", href: "/courses?type=live" },
      { labelKey: "freeCourse", href: "/courses?type=free" },
    ],
  },
  { labelKey: "pricing", href: "/pricing" },
  { labelKey: "blog", href: "/blog" },
  {
    labelKey: "resources",
    children: [
      { labelKey: "ebooks", href: "/resources/ebooks" },
      { labelKey: "audio", href: "/resources/audio" },
      { labelKey: "videos", href: "/resources/videos" },
      { labelKey: "gallery", href: "/gallery" },
    ],
  },
  {
    labelKey: "registration",
    children: [
      { labelKey: "studentAdmission", href: "/student-admission" },
      { labelKey: "teacherRegistration", href: "/teacher-registration" },
    ],
  },
  { labelKey: "contact", href: "/contact" },
];

/** Always visible in the desktop nav bar (lg+) */
export const MAIN_NAV_PRIMARY: INavItem[] = [
  { labelKey: "home", href: "/" },
  {
    labelKey: "aboutUs",
    children: [
      { labelKey: "about", href: "/about" },
      { labelKey: "teachers", href: "/teachers" },
      { labelKey: "successStories", href: "/about#success-stories" },
    ],
  },
  {
    labelKey: "courses",
    children: [
      { labelKey: "privateOneToOne", href: "/courses?type=private" },
      { labelKey: "recordCourse", href: "/courses?type=record" },
      { labelKey: "liveCourse", href: "/courses?type=live" },
      { labelKey: "freeCourse", href: "/courses?type=free" },
    ],
  },
  { labelKey: "pricing", href: "/pricing" },
];

/** Always inside "More" on desktop — keeps the 1280px bar from overflowing */
export const MAIN_NAV_OVERFLOW: INavItem[] = [
  {
    labelKey: "resources",
    children: [
      { labelKey: "ebooks", href: "/resources/ebooks" },
      { labelKey: "audio", href: "/resources/audio" },
      { labelKey: "videos", href: "/resources/videos" },
      { labelKey: "gallery", href: "/gallery" },
    ],
  },
  { labelKey: "blog", href: "/blog" },
  {
    labelKey: "registration",
    children: [
      { labelKey: "studentAdmission", href: "/student-admission" },
      { labelKey: "teacherRegistration", href: "/teacher-registration" },
    ],
  },
  { labelKey: "contact", href: "/contact" },
];

export const FOOTER_OTHER_LINKS: INavLink[] = [
  { labelKey: "aboutUsFooter", href: "/about" },
  { labelKey: "blog", href: "/blog" },
  { labelKey: "privacyPolicy", href: "/privacy-policy" },
  { labelKey: "termsOfUse", href: "/terms-of-use" },
  { labelKey: "teacherRegFooter", href: "/teacher-registration" },
  { labelKey: "contact", href: "/contact" },
];

export const TOPBAR_SOCIAL_ORDER = [
  "facebook",
  "instagram",
  "x",
  "youtube",
  "whatsapp",
  "telegram",
  "linkedin",
] as const;

export const FOOTER_SOCIAL_ORDER = [
  "facebook",
  "instagram",
  "youtube",
  "whatsapp",
  "telegram",
  "linkedin",
  "x",
] as const;

export const PORTAL_BASE_URL = (
  process.env.NEXT_PUBLIC_PORTAL_URL ||
  "https://myacademy.bdonlinequranacademy.com"
)
  .replace(/\/$/, "")
  .replace(/\/login$/, "");

export const PORTAL_LOGIN_URL = `${PORTAL_BASE_URL}/login`;
