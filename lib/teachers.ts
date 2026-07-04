import { apiFetch } from "./api";
import {
  FEATURED_TEACHERS,
  FEMALE_TEACHERS,
  MALE_TEACHERS,
} from "./teacherData";
import type { ICourse, ITeacher } from "./types";

const TEACHERS_REVALIDATE = 3600;

function getStaticTeachers(options?: {
  gender?: "male" | "female";
  featured?: boolean;
}): ITeacher[] {
  if (options?.featured) return FEATURED_TEACHERS;
  if (options?.gender === "male") return MALE_TEACHERS;
  if (options?.gender === "female") return FEMALE_TEACHERS;
  return [...MALE_TEACHERS, ...FEMALE_TEACHERS];
}

export async function getTeachers(options?: {
  gender?: "male" | "female";
  featured?: boolean;
}): Promise<ITeacher[]> {
  try {
    const params = new URLSearchParams();
    if (options?.gender) params.set("gender", options.gender);
    if (options?.featured) params.set("featured", "true");

    const query = params.toString();
    const response = await apiFetch<IApiTeachersResponse>(
      `/public/teachers${query ? `?${query}` : ""}`,
      { next: { revalidate: TEACHERS_REVALIDATE } }
    );

    const apiTeachers = response.data?.teachers ?? [];
    return apiTeachers.length > 0 ? apiTeachers : getStaticTeachers(options);
  } catch {
    return getStaticTeachers(options);
  }
}

interface IApiTeachersResponse {
  success: boolean;
  data: { teachers: ITeacher[] };
}

interface IApiTeacherResponse {
  success: boolean;
  data: ITeacher;
}

export async function getAllTeachers(): Promise<ITeacher[]> {
  return getTeachers();
}

export async function getFeaturedTeachers(): Promise<ITeacher[]> {
  return getTeachers({ featured: true });
}

export async function getMaleTeachers(): Promise<ITeacher[]> {
  return getTeachers({ gender: "male" });
}

export async function getFemaleTeachers(): Promise<ITeacher[]> {
  return getTeachers({ gender: "female" });
}

export async function getTeacherBySlug(
  slug: string
): Promise<ITeacher | null> {
  try {
    const response = await apiFetch<IApiTeacherResponse>(
      `/public/teachers/${encodeURIComponent(slug)}`,
      { next: { revalidate: TEACHERS_REVALIDATE } }
    );
    if (response.data) return response.data;
  } catch {
    // fall through to static lookup
  }

  return (
    getStaticTeachers().find((teacher) => teacher.slug === slug) ?? null
  );
}

export async function getTeacherSlugs(): Promise<string[]> {
  const teachers = await getAllTeachers();
  return teachers.map((teacher) => teacher.slug);
}

export function getTeacherHonorific(gender: ITeacher["gender"]): string {
  return gender === "female" ? "Ustadha" : "Ustaz";
}

export function getTeacherAboutTitle(teacher: ITeacher): string {
  return `Briefly about ${getTeacherHonorific(teacher.gender)}`;
}

export function getTeacherAbout(teacher: ITeacher): string {
  return teacher.about ?? teacher.bio;
}

export function getTeacherLocation(teacher: ITeacher): string {
  return teacher.location ?? teacher.country ?? "Bangladesh";
}

export function getTeacherPersonalInfo(
  teacher: ITeacher
): { label: string; value: string }[] {
  const items: { label: string; value: string }[] = [];

  if (teacher.dateOfBirth) {
    items.push({ label: "Date of birth", value: teacher.dateOfBirth });
  }

  if (teacher.age) {
    items.push({ label: "Age", value: teacher.age });
  }

  if (teacher.address) {
    items.push({ label: "Address", value: teacher.address });
  } else if (teacher.location) {
    items.push({ label: "Location", value: teacher.location });
  } else if (teacher.country) {
    items.push({ label: "Country", value: teacher.country });
  }

  return items;
}

export function getTeacherQualifications(teacher: ITeacher): string[] {
  return teacher.qualifications ?? [teacher.role];
}

export function getTeacherSkills(teacher: ITeacher): string[] {
  return (
    teacher.skills ?? [
      "One-to-one live Quran classes",
      "Patient and structured teaching",
      "Progress-focused student care",
    ]
  );
}

export function getTeacherExperience(teacher: ITeacher): string {
  return teacher.experience ?? "Experienced BDOQ Academy instructor";
}

export function getTeacherLanguages(teacher: ITeacher): string[] {
  return teacher.languages ?? ["Bengali", "Arabic"];
}

export function getTeacherCourses(teacher: ITeacher, courses: ICourse[]): ICourse[] {
  if (!teacher.courseSlugs?.length) {
    return courses.slice(0, 3);
  }

  return teacher.courseSlugs
    .map((slug) => courses.find((course) => course.slug === slug))
    .filter((course): course is ICourse => Boolean(course));
}

export function getRelatedTeachers(
  teacher: ITeacher,
  allTeachers: ITeacher[],
  limit = 4
): ITeacher[] {
  return allTeachers
    .filter((item) => item.id !== teacher.id && item.gender === teacher.gender)
    .slice(0, limit);
}

export function getTeacherContactEmail(): string {
  return "contact@bdonlinequranacademy.com";
}

export function getTeacherContactPhone(): string {
  return "+8801923-947460";
}

export function getTeacherWhatsAppUrl(): string {
  return "https://wa.me/8801923947460";
}
