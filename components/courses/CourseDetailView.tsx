"use client";

import { useLocalizedCourseDetailFromBase } from "@/lib/i18n/useLocalizedCourseDetail";
import type { ICourse, ICourseDetail, ITeacher } from "@/lib/types";
import type { IFormSelectOption } from "@/lib/formOptions";
import { useLocalizedCourse } from "@/lib/i18n/useLocalizedCourse";
import { useCourseDetailUi } from "@/lib/i18n/useLocalizedCourseDetail";
import { FreeClassForm } from "@/components/forms/FreeClassForm";
import { CourseHero } from "@/components/courses/CourseHero";
import { CourseBenefits } from "@/components/courses/CourseBenefits";
import { CourseWhyBdoq } from "@/components/courses/CourseWhyBdoq";
import { CourseModulesAccordion } from "@/components/courses/CourseModulesAccordion";
import { CourseStatsBar } from "@/components/courses/CourseStatsBar";
import { CourseAudience } from "@/components/courses/CourseAudience";
import { CourseTeachers } from "@/components/courses/CourseTeachers";
import { CoursePricingBanner } from "@/components/courses/CoursePricingBanner";
import { CourseFAQ } from "@/components/courses/CourseFAQ";

interface ICourseDetailViewProps {
  course: ICourse;
  detail: ICourseDetail;
  teachers: ITeacher[];
  subjectOptions: IFormSelectOption[];
}

export function CourseDetailView({
  course,
  detail: baseDetail,
  teachers,
  subjectOptions,
}: ICourseDetailViewProps) {
  const localized = useLocalizedCourse(course);
  const detail = useLocalizedCourseDetailFromBase(course.slug, baseDetail);
  const tUi = useCourseDetailUi();
  const displayCourse = { ...course, ...localized };

  return (
    <>
      <CourseHero course={displayCourse} />
      <CourseBenefits benefits={detail.benefits} />
      <CourseWhyBdoq />
      <CourseModulesAccordion modules={detail.modules} />
      <CourseStatsBar />
      <CourseAudience audience={detail.audience} />
      <CourseTeachers teachers={teachers} />
      <CoursePricingBanner
        startingPriceBdt={detail.startingPriceBdt}
        recommendedPackage={detail.recommendedPackage}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-amiri text-2xl md:text-3xl font-bold text-primary-dark mb-3 text-center">
            {tUi("trialForm.title")}
          </h2>
          <p className="font-inter text-sm text-text-gray text-center mb-8">
            {tUi("trialForm.description")}
          </p>
          <FreeClassForm
            subjects={subjectOptions}
            defaultSubject={displayCourse.slug}
          />
        </div>
      </section>

      <CourseFAQ faqs={detail.faqs} />
    </>
  );
}
