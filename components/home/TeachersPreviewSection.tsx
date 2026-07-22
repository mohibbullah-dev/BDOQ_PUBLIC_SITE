"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ITeacher } from "@/lib/types";
import { TeacherAvatar } from "@/components/shared/TeacherAvatar";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SiteCta } from "@/components/shared/SiteCta";

interface ITeacherPreviewCardProps {
  teacher: ITeacher;
}

function TeacherPreviewCard({ teacher }: ITeacherPreviewCardProps) {
  return (
    <div className="flex-shrink-0 w-[200px] sm:w-auto snap-start">
      <Link
        href={`/teachers/${teacher.slug}`}
        className="site-card flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center transition-shadow duration-200 hover:shadow-md"
      >
        <TeacherAvatar
          teacher={teacher}
          avatarVariant={teacher.gender === "female" ? "female" : "default"}
          className="mb-4 shadow-lg"
        />
        <h3 className="mb-1 font-playfair text-sm font-bold leading-snug tracking-tight text-primary-dark">
          {teacher.name}
        </h3>
        <p className="mb-2 font-body text-xs text-text-gray">{teacher.role}</p>
        {teacher.country && (
          <p className="font-body text-xs font-medium text-primary">
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
    <section className="bg-white py-16 md:py-20">
      <div className="site-container">
        <ScrollReveal className="mb-10 md:mb-12">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            centered
          />
        </ScrollReveal>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-visible scrollbar-thin">
          {teachers.map((teacher) => (
            <TeacherPreviewCard key={teacher.id} teacher={teacher} />
          ))}
        </div>

        <ScrollReveal delay={0.2} className="mt-10 text-center">
          <SiteCta href="/teachers" variant="secondary">
            {tCta("seeAllMentors")}
          </SiteCta>
        </ScrollReveal>
      </div>
    </section>
  );
}
