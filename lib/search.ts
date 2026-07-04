import { getBlogPosts } from "@/lib/blog";
import { getCourses } from "@/lib/courses";
import { getEbooks } from "@/lib/resources";
import { getAllTeachers } from "@/lib/teachers";
import type { IBlogPost, ICourse, IEbook, ITeacher } from "@/lib/types";

export type SearchResultCategoryType =
  | "course"
  | "teacher"
  | "blog"
  | "ebook"
  | "page";

export interface ISearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchResultCategoryType;
}

export const SEARCH_CATEGORY_LABELS: Record<SearchResultCategoryType, string> =
  {
    course: "Course",
    teacher: "Teacher",
    blog: "Blog",
    ebook: "E-book",
    page: "Page",
  };

const SITE_PAGES: ISearchResult[] = [
  {
    id: "page-about",
    title: "About Us",
    description: "Learn about BD Online Quran Academy and our mission",
    href: "/about",
    category: "page",
  },
  {
    id: "page-pricing",
    title: "Pricing",
    description: "Monthly packages from Basic to Premium",
    href: "/pricing",
    category: "page",
  },
  {
    id: "page-free-class",
    title: "Free Trial Class",
    description: "Book a free one-to-one Quran class",
    href: "/free-class",
    category: "page",
  },
  {
    id: "page-admission",
    title: "Student Admission",
    description: "Register as a new student at BDOQ Academy",
    href: "/student-admission",
    category: "page",
  },
  {
    id: "page-teacher-reg",
    title: "Teacher Registration",
    description: "Apply to teach at BDOQ Academy",
    href: "/teacher-registration",
    category: "page",
  },
  {
    id: "page-contact",
    title: "Contact Us",
    description: "Phone, email, WhatsApp, and contact form",
    href: "/contact",
    category: "page",
  },
  {
    id: "page-teachers",
    title: "Teachers and Mentors",
    description: "Meet our male and female Quran instructors",
    href: "/teachers",
    category: "page",
  },
  {
    id: "page-courses",
    title: "All Courses",
    description: "Private, record, live, and free Quran courses",
    href: "/courses",
    category: "page",
  },
  {
    id: "page-gallery",
    title: "Gallery",
    description: "Photos from BDOQ Academy classes and events",
    href: "/gallery",
    category: "page",
  },
  {
    id: "page-reviews",
    title: "Student Reviews",
    description: "Testimonials from students and parents worldwide",
    href: "/reviews",
    category: "page",
  },
];

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

export function tokenizeQuery(query: string): string[] {
  return normalizeText(query).split(/\s+/).filter(Boolean);
}

function matchesTokens(haystack: string, tokens: string[]): boolean {
  const normalized = normalizeText(haystack);
  return tokens.every((token) => normalized.includes(token));
}

function scoreTokens(haystack: string, tokens: string[]): number {
  const normalized = normalizeText(haystack);
  let score = 0;

  tokens.forEach((token) => {
    if (normalized === token) score += 6;
    else if (normalized.startsWith(token)) score += 4;
    else if (normalized.includes(` ${token}`)) score += 2;
    else if (normalized.includes(token)) score += 1;
  });

  return score;
}

function courseToResult(course: ICourse): ISearchResult {
  return {
    id: `course-${course.slug}`,
    title: course.title,
    description: course.description,
    href: `/courses/${course.slug}`,
    category: "course",
  };
}

function teacherToResult(teacher: ITeacher): ISearchResult {
  return {
    id: `teacher-${teacher.slug}`,
    title: teacher.name,
    description: `${teacher.role} — ${teacher.location ?? teacher.country ?? "BDOQ Academy"}`,
    href: `/teachers/${teacher.slug}`,
    category: "teacher",
  };
}

function blogToResult(post: IBlogPost): ISearchResult {
  return {
    id: `blog-${post.slug}`,
    title: post.title,
    description: post.excerpt,
    href: `/blog/${post.slug}`,
    category: "blog",
  };
}

function ebookToResult(book: IEbook): ISearchResult {
  return {
    id: `ebook-${book.slug}`,
    title: book.title,
    description: book.description,
    href: `/resources/ebooks/${book.slug}`,
    category: "ebook",
  };
}

export function buildSearchIndex(input: {
  blogPosts?: IBlogPost[];
  teachers?: ITeacher[];
  ebooks?: IEbook[];
  courses?: ICourse[];
} = {}): ISearchResult[] {
  const blogPosts = input.blogPosts ?? [];
  const teachers = input.teachers ?? [];
  const ebooks = input.ebooks ?? [];
  const courses = input.courses ?? [];

  return [
    ...courses.map(courseToResult),
    ...teachers.map(teacherToResult),
    ...blogPosts.map(blogToResult),
    ...ebooks.map(ebookToResult),
    ...SITE_PAGES,
  ];
}

export async function buildLiveSearchIndex(): Promise<ISearchResult[]> {
  const [blogPosts, teachers, ebooks, courses] = await Promise.all([
    getBlogPosts("en"),
    getAllTeachers(),
    getEbooks("en"),
    getCourses(),
  ]);

  return buildSearchIndex({ blogPosts, teachers, ebooks, courses });
}

function resultSearchText(result: ISearchResult): string {
  return [result.title, result.description, result.category].join(" ");
}

export function searchSite(
  query: string,
  index: ISearchResult[],
  limit = 12
): ISearchResult[] {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return [];

  return index
    .map((result) => ({
      result,
      score: scoreTokens(resultSearchText(result), tokens),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ result }) => result);
}

function teacherSearchText(teacher: ITeacher): string {
  return [
    teacher.name,
    teacher.role,
    teacher.bio,
    teacher.location,
    teacher.country,
    teacher.experience,
    ...(teacher.qualifications ?? []),
    ...(teacher.skills ?? []),
    ...(teacher.languages ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

export function filterTeachersByQuery(
  teachers: ITeacher[],
  query: string
): ITeacher[] {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return teachers;

  return teachers
    .map((teacher) => ({
      teacher,
      score: scoreTokens(teacherSearchText(teacher), tokens),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ teacher }) => teacher);
}

export function collectBlogTags(posts: IBlogPost[]): string[] {
  const hidden = new Set([
    "payment",
    "bkash",
    "nagad",
    "billing",
    "invoice",
    "fees",
    "paypal",
    "wise",
    "portal",
    "bangladesh",
    "checklist",
  ]);
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!hidden.has(tag.toLowerCase())) {
        tags.add(tag);
      }
    });
  });
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function filterBlogPosts(
  posts: IBlogPost[],
  options: { query?: string; tag?: string | null }
): IBlogPost[] {
  let result = posts;

  if (options.tag) {
    result = result.filter((post) => post.tags.includes(options.tag!));
  }

  const tokens = tokenizeQuery(options.query ?? "");
  if (tokens.length === 0) return result;

  return result.filter((post) =>
    matchesTokens(
      [post.title, post.excerpt, post.author, ...post.tags].join(" "),
      tokens
    )
  );
}
