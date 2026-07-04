import { apiFetch } from "./api";
import type {
  CourseCategoryType,
  CourseGenderType,
  ICourse,
  ICourseDetail,
  IFAQItem,
} from "./types";

const COURSES_REVALIDATE = 3600;

interface IApiCourse extends ICourse {
  detail: ICourseDetail;
}

interface IApiCoursesResponse {
  success: boolean;
  data: { courses: IApiCourse[] };
}

interface IApiCourseResponse {
  success: boolean;
  data: IApiCourse;
}

function mapApiCourse(api: IApiCourse): ICourse & { detail: ICourseDetail } {
  return {
    slug: api.slug,
    title: api.title,
    description: api.description,
    icon: api.icon,
    target: api.target,
    category: api.category as CourseCategoryType | undefined,
    gender: api.gender as CourseGenderType | undefined,
    detail: {
      ...api.detail,
      faqs: api.detail.faqs.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      })) as IFAQItem[],
    },
  };
}

export type CourseFilterType = CourseCategoryType;

export const COURSE_CATEGORY_TABS: {
  id: CourseFilterType;
  labelKey: string;
}[] = [
  { id: "private", labelKey: "private" },
  { id: "record", labelKey: "record" },
  { id: "live", labelKey: "live" },
  { id: "free", labelKey: "free" },
];

export const PRIVATE_GENDER_TABS: {
  id: CourseGenderType | "all";
  labelKey: string;
}[] = [
  { id: "all", labelKey: "all" },
  { id: "children", labelKey: "children" },
  { id: "male", labelKey: "male" },
  { id: "female", labelKey: "female" },
];

export async function getCourses(options?: {
  category?: CourseCategoryType;
  gender?: CourseGenderType;
}): Promise<Array<ICourse & { detail: ICourseDetail }>> {
  try {
    const params = new URLSearchParams();
    if (options?.category) params.set("category", options.category);
    if (options?.gender) params.set("gender", options.gender);
    const query = params.toString();

    const response = await apiFetch<IApiCoursesResponse>(
      `/public/courses${query ? `?${query}` : ""}`,
      { next: { revalidate: COURSES_REVALIDATE } }
    );

    return (response.data?.courses ?? []).map(mapApiCourse);
  } catch {
    return [];
  }
}

export async function getCourseBySlug(
  slug: string
): Promise<(ICourse & { detail: ICourseDetail }) | null> {
  try {
    const response = await apiFetch<IApiCourseResponse>(
      `/public/courses/${encodeURIComponent(slug)}`,
      { next: { revalidate: COURSES_REVALIDATE } }
    );
    return response.data ? mapApiCourse(response.data) : null;
  } catch {
    return null;
  }
}

export async function getCourseSlugs(): Promise<string[]> {
  const courses = await getCourses();
  return courses.map((course) => course.slug);
}

export function filterCourses(
  courses: ICourse[],
  category: CourseFilterType,
  gender?: CourseGenderType
): ICourse[] {
  return courses.filter((course) => {
    if (course.category !== category) return false;
    if (category === "private" && gender && course.gender !== gender) {
      return false;
    }
    return true;
  });
}

export function isValidCourseCategory(
  value: string | null
): value is CourseFilterType {
  return (
    value === "private" ||
    value === "record" ||
    value === "live" ||
    value === "free"
  );
}

export function isValidCourseGender(
  value: string | null
): value is CourseGenderType {
  return value === "male" || value === "female" || value === "children";
}

export async function getTeachersForCourse(
  course: ICourse
): Promise<import("./types").ITeacher[]> {
  const { getFeaturedTeachers } = await import("./teachers");
  const featuredTeachers = await getFeaturedTeachers();
  let teachers = [...featuredTeachers];

  if (course.gender === "female") {
    teachers = teachers.filter((teacher) => teacher.gender === "female");
  } else if (course.gender === "male") {
    teachers = teachers.filter((teacher) => teacher.gender === "male");
  }

  const matchedBySlug = featuredTeachers.filter((teacher) =>
    teacher.courseSlugs?.includes(course.slug)
  );

  if (matchedBySlug.length > 0) {
    teachers = matchedBySlug;
  }

  while (teachers.length < 5 && teachers.length < featuredTeachers.length) {
    const next = featuredTeachers.find(
      (teacher) => !teachers.some((t) => t.id === teacher.id)
    );
    if (!next) break;
    teachers.push(next);
  }

  return teachers.slice(0, 5);
}

export function getCourseDetailFromCourse(
  course: ICourse & { detail?: ICourseDetail }
): ICourseDetail {
  if (course.detail) return course.detail;
  return {
    benefits: [],
    modules: [],
    audience: [],
    faqs: [],
    startingPriceBdt: 0,
    recommendedPackage: "Basic",
  };
}
