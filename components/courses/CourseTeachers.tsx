"use client";

import { useTranslations } from "next-intl";
import { TeacherCard } from "@/components/shared/TeacherCard";
import type { ITeacher } from "@/lib/types";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface ICourseTeachersProps {
  teachers: ITeacher[];
}

export function CourseTeachers({ teachers }: ICourseTeachersProps) {
  const t = useTranslations("courseDetails.ui.teachers");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="site-container">
        <div className="mb-12">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </div>
    </section>
  );
}
