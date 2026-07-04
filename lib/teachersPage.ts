import type { ITeacher } from "@/lib/types";

export type TeacherGenderTabType = "male" | "female";

export type TeacherTabIconId = "user-round" | "users-round";

export interface ITeacherGenderTab {
  id: TeacherGenderTabType;
  label: string;
  subtitle: string;
  hash: string;
  iconId: TeacherTabIconId;
  teachers: ITeacher[];
}

export function buildTeacherGenderTabs(
  allTeachers: ITeacher[]
): ITeacherGenderTab[] {
  return [
    {
      id: "male",
      label: "Male Teachers",
      subtitle: "Hafiz & male scholars for brothers",
      hash: "male-teachers",
      iconId: "user-round",
      teachers: allTeachers.filter((teacher) => teacher.gender === "male"),
    },
    {
      id: "female",
      label: "Female Teachers",
      subtitle: "Certified female teachers for sisters",
      hash: "female-teachers",
      iconId: "users-round",
      teachers: allTeachers.filter((teacher) => teacher.gender === "female"),
    },
  ];
}

export function isValidTeacherGenderTab(
  value: string | null | undefined
): value is TeacherGenderTabType {
  return value === "male" || value === "female";
}

export function getTeacherTabById(
  tabs: ITeacherGenderTab[],
  id: TeacherGenderTabType
): ITeacherGenderTab {
  return tabs.find((tab) => tab.id === id) ?? tabs[0];
}

export function resolveTeacherGenderTab(
  genderParam: string | null,
  hash: string
): TeacherGenderTabType {
  if (isValidTeacherGenderTab(genderParam)) {
    return genderParam;
  }

  if (hash.includes("female-teachers")) {
    return "female";
  }

  if (hash.includes("male-teachers")) {
    return "male";
  }

  return "male";
}
