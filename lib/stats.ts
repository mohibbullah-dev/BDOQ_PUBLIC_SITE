import { apiFetch } from "./api";
import { getAcademyYearsExperience } from "./constants";

const STATS_REVALIDATE = 300;

export interface IPublicStats {
  totalTeachingHours: number;
  yearsExperience: number;
  totalTeachers: number;
  totalStudents: number;
  featuredTeachers: number;
}

interface IApiStatsResponse {
  success: boolean;
  data: IPublicStats;
}

export function formatStatValue(value: number): string {
  if (value >= 1000) {
    const rounded = Math.floor(value / 100) * 100;
    return `${rounded.toLocaleString()}+`;
  }
  if (value >= 100) {
    return `${Math.floor(value / 10) * 10}+`;
  }
  if (value >= 10) {
    return `${value}+`;
  }
  return String(value);
}

export async function getPublicStats(): Promise<IPublicStats> {
  const response = await apiFetch<IApiStatsResponse>("/public/stats", {
    next: { revalidate: STATS_REVALIDATE },
  });
  return response.data;
}

export interface IStatDisplay {
  value: string;
  labelKey:
    | "hours"
    | "years"
    | "teachers"
    | "students"
    | "popularTeachers";
}

export async function getPublicStatsDisplay(): Promise<IStatDisplay[]> {
  try {
    const stats = await getPublicStats();

    return [
      { value: formatStatValue(stats.totalTeachingHours), labelKey: "hours" },
      { value: formatStatValue(stats.yearsExperience), labelKey: "years" },
      { value: formatStatValue(stats.totalTeachers), labelKey: "teachers" },
      { value: formatStatValue(stats.totalStudents), labelKey: "students" },
      {
        value: formatStatValue(
          stats.featuredTeachers > 0
            ? stats.featuredTeachers
            : stats.totalTeachers
        ),
        labelKey: "popularTeachers",
      },
    ];
  } catch {
    const years = getAcademyYearsExperience();
    return [
      { value: "0", labelKey: "hours" },
      { value: formatStatValue(years), labelKey: "years" },
      { value: "0", labelKey: "teachers" },
      { value: "0", labelKey: "students" },
      { value: "0", labelKey: "popularTeachers" },
    ];
  }
}
