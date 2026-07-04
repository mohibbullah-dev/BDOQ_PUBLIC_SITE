"use client";

import { useTranslations } from "next-intl";
import type { ICourse } from "@/lib/types";

export function useLocalizedCourse(course: ICourse) {
  const tItem = useTranslations(`content.courses.items.${course.slug}`);
  const tTarget = useTranslations("content.courses.targets");

  const target =
    course.target && course.gender
      ? tTarget(course.gender === "children" ? "children" : course.gender)
      : course.target
        ? course.target
        : undefined;

  return {
    title: tItem("title"),
    description: tItem("description"),
    target,
  };
}

export function useCourseFilterLabels() {
  const t = useTranslations("content.courses.filters");
  const tGender = useTranslations("content.courses.gender");

  return {
    categoryLabel: (id: string) =>
      t(id as "private" | "record" | "live" | "free"),
    genderLabel: (id: string) =>
      tGender(id as "all" | "children" | "male" | "female"),
  };
}
