"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ITeacher } from "@/lib/types";
import { TeacherAvatar } from "@/components/shared/TeacherAvatar";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

interface ITeacherPreviewCardProps {
  teacher: ITeacher;
}

function TeacherPreviewCard({ teacher }: ITeacherPreviewCardProps) {
  return (
    <div className="flex-shrink-0 w-[200px] sm:w-auto snap-start">
      <Link
        href={`/teachers/${teacher.slug}`}
        className="flex flex-col items-center text-center rounded-2xl bg-white p-6 shadow-md border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
      >
        <TeacherAvatar
          teacher={teacher}
          avatarVariant={teacher.gender === "female" ? "female" : "default"}
          className="mb-4 shadow-lg"
        />
        <h3 className="font-inter text-sm font-bold text-primary-dark mb-1 leading-snug">
          {teacher.name}
        </h3>
        <p className="font-inter text-xs text-text-gray mb-2">{teacher.role}</p>
        {teacher.country && (
          <p className="font-inter text-xs font-medium text-primary">
            {teacher.country}
          </p>
        )}
      </Link>
    </div>
  );
}

export function TeachersPreviewSection({ teachers }: { teachers: ITeacher[] }) {
  const t = useTranslations("home.teachers");
  const tCta = useTranslations("cta");

  return (
    <section className="py-16 md:py-24 bg-teal-accent/10">
      <div className="site-container">
        <ScrollReveal className="text-center mb-10 md:mb-12">
          <h2 className="font-inter text-2xl md:text-3xl font-semibold text-primary-dark">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-base text-text-gray">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-visible scrollbar-thin">
          {teachers.map((teacher) => (
            <TeacherPreviewCard key={teacher.id} teacher={teacher} />
          ))}
        </div>

        <ScrollReveal delay={0.2} className="text-center mt-10">
          <Link
            href="/teachers"
            className="site-btn-hover-overlay inline-flex items-center justify-center rounded-full border-2 border-primary text-primary font-semibold px-8 py-3 transition-all duration-300"
          >
            {tCta("seeAllMentors")}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
