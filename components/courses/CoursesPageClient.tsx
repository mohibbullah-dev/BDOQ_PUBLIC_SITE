"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Baby,
  Gift,
  MonitorPlay,
  Radio,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import { useCourseFilterLabels } from "@/lib/i18n/useLocalizedCourse";
import {
  COURSE_CATEGORY_TABS,
  PRIVATE_GENDER_TABS,
  filterCourses,
  isValidCourseCategory,
  isValidCourseGender,
  type CourseFilterType,
} from "@/lib/courses";
import type { CourseGenderType, ICourse } from "@/lib/types";
import { LocalizedPageHeroClient } from "@/components/shared/LocalizedPageHeroClient";
import { SegmentedTabBar } from "@/components/shared/SegmentedTabBar";
import { CourseCard } from "@/components/shared/CourseCard";
import { CoursesEmptyState } from "@/components/courses/CoursesEmptyState";

const CATEGORY_ICONS = {
  private: Users,
  record: MonitorPlay,
  live: Radio,
  free: Gift,
} as const;

const GENDER_ICONS = {
  all: UsersRound,
  children: Baby,
  male: UserRound,
  female: UsersRound,
} as const;

export function CoursesPageClient({ allCourses }: { allCourses: ICourse[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { categoryLabel, genderLabel } = useCourseFilterLabels();

  const typeParam = searchParams.get("type");
  const genderParam = searchParams.get("gender");

  const activeCategory: CourseFilterType = isValidCourseCategory(typeParam)
    ? typeParam
    : "private";

  const activeGender: CourseGenderType | undefined =
    activeCategory === "private" && isValidCourseGender(genderParam)
      ? genderParam
      : undefined;

  const activeGenderTab: CourseGenderType | "all" = activeGender ?? "all";

  const courses = filterCourses(allCourses, activeCategory, activeGender);

  const activeCategoryLabel = categoryLabel(activeCategory);

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        COURSE_CATEGORY_TABS.map((tab) => [
          tab.id,
          filterCourses(allCourses, tab.id).length,
        ])
      ) as Record<CourseFilterType, number>,
    [allCourses]
  );

  const genderCounts = useMemo(() => {
    const privateCourses = allCourses.filter(
      (course) => course.category === "private"
    );

    return {
      all: privateCourses.length,
      children: privateCourses.filter((course) => course.gender === "children")
        .length,
      male: privateCourses.filter((course) => course.gender === "male").length,
      female: privateCourses.filter((course) => course.gender === "female")
        .length,
    } as Record<CourseGenderType | "all", number>;
  }, [allCourses]);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) params.delete(key);
        else params.set(key, value);
      });

      router.push(`/courses?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleCategoryChange = (category: CourseFilterType): void => {
    if (category === "private") {
      updateParams({ type: category });
    } else {
      updateParams({ type: category, gender: null });
    }
  };

  const handleGenderChange = (gender: CourseGenderType | "all"): void => {
    updateParams({
      type: "private",
      gender: gender === "all" ? null : gender,
    });
  };

  return (
    <>
      <LocalizedPageHeroClient pageKey="courses" centered>
        <div className="mt-10 space-y-4">
          <SegmentedTabBar
            tabs={COURSE_CATEGORY_TABS.map((tab) => ({
              id: tab.id,
              label: categoryLabel(tab.id),
              icon: CATEGORY_ICONS[tab.id],
              count: categoryCounts[tab.id],
            }))}
            activeTab={activeCategory}
            onChange={handleCategoryChange}
            ariaLabel="Course categories"
            layoutId="courses-category-tab-indicator"
            panelIdPrefix="courses-panel"
            maxWidthClass="max-w-4xl"
            columns={4}
          />

          {activeCategory === "private" && (
            <SegmentedTabBar
              tabs={PRIVATE_GENDER_TABS.map((tab) => ({
                id: tab.id,
                label: genderLabel(tab.id),
                icon: GENDER_ICONS[tab.id],
                count: genderCounts[tab.id],
              }))}
              activeTab={activeGenderTab}
              onChange={handleGenderChange}
              ariaLabel="Course audience"
              layoutId="courses-gender-tab-indicator"
              panelIdPrefix="courses-gender-panel"
              maxWidthClass="max-w-3xl"
              columns={4}
              size="sm"
            />
          )}
        </div>
      </LocalizedPageHeroClient>

      <section className="py-12 md:py-16 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))
            ) : (
              <CoursesEmptyState categoryLabel={activeCategoryLabel} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
