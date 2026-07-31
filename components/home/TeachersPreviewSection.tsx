"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ITeacher } from "@/lib/types";
import { resolveCountryCode } from "@/lib/resolveCountryCode";
import { TeacherAvatar } from "@/components/shared/TeacherAvatar";
import { CountryFlag } from "@/components/shared/CountryFlag";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SiteCta } from "@/components/shared/SiteCta";
import { cn } from "@/lib/cn";
import type { ISectionHeaderContent } from "@/lib/types";
import { useSectionHeaderText } from "@/lib/i18n/useSectionHeaderText";

interface ITeacherPreviewCardProps {
  teacher: ITeacher;
  index: number;
}

function TeacherPreviewCard({ teacher, index }: ITeacherPreviewCardProps) {
  const t = useTranslations("home.teachers");
  const flagCode = resolveCountryCode(teacher.country);
  const experience =
    teacher.experience?.trim() || t("experienceFallback");

  return (
    <ScrollReveal delay={index * 0.05} className="h-full">
      <Link
        href={`/teachers/${teacher.slug}`}
        className={cn(
          "site-card site-card-no-overlay relative flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-5 text-center",
          "shadow-[0_12px_32px_-22px_rgba(15,23,42,0.18)]",
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(38,155,111,0.28)]"
        )}
      >
        <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        </span>

        <div className="relative mb-4 h-[7.5rem] w-[7.5rem]">
          <div
            className="absolute inset-0 bg-primary/20"
            style={{
              clipPath:
                "polygon(22% 0%, 78% 0%, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0% 78%, 0% 22%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-[3px] overflow-hidden bg-bg-light"
            style={{
              clipPath:
                "polygon(22% 0%, 78% 0%, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0% 78%, 0% 22%)",
            }}
          >
            <TeacherAvatar
              teacher={teacher}
              avatarVariant={
                teacher.gender === "female" ? "female" : "default"
              }
              size={120}
              className="!h-full !w-full !rounded-none !border-0 object-cover"
            />
          </div>
        </div>

        <h3 className="font-body text-sm font-bold leading-snug text-primary-dark sm:text-[15px]">
          {teacher.name}
        </h3>
        <p className="mt-1 font-body text-xs leading-snug text-text-dark">
          {teacher.role}
        </p>

        <span className="relative z-[2] mt-3 inline-flex rounded-full border border-primary/15 bg-white px-2.5 py-1 font-body text-[10px] font-semibold text-primary-dark shadow-sm sm:text-[11px]">
          {experience}
        </span>

        {teacher.country ? (
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {flagCode ? (
              <CountryFlag code={flagCode} name={teacher.country} size="sm" />
            ) : null}
            <span className="font-body text-xs font-medium text-text-dark">
              {teacher.country}
            </span>
          </div>
        ) : null}
      </Link>
    </ScrollReveal>
  );
}

/** Home mentors preview — octagon-framed teacher cards (mockup) */
export function TeachersPreviewSection({
  teachers,
  header,
}: {
  teachers: ITeacher[];
  header?: ISectionHeaderContent;
}) {
  const t = useTranslations("home.teachers");
  const tCta = useTranslations("cta");
  const copy = useSectionHeaderText("home.teachers", header, [
    "eyebrow",
    "title",
    "subtitle",
  ]);

  return (
    <section className="relative overflow-hidden bg-[#F7FCF9] py-16 md:py-24">
      <IslamicShapeBackdrop overlay="home" />
      <Image
        src="/brand/footer-lantern.svg"
        alt=""
        width={56}
        height={76}
        className="pointer-events-none absolute right-6 top-12 z-[1] hidden opacity-90 lg:right-10 lg:block"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1]">
        <ScrollReveal className="mb-10 md:mb-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red sm:text-xs">
              {copy.eyebrow}
            </p>
            <h2 className="font-playfair text-3xl font-bold tracking-tight text-primary-dark md:text-4xl">
              {copy.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-text-dark">
              {copy.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:pb-0">
          {teachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className="w-[200px] shrink-0 snap-start sm:w-[210px] md:w-auto"
            >
              <TeacherPreviewCard teacher={teacher} index={index} />
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.15} className="mt-10 text-center">
          <SiteCta href="/teachers" variant="secondary">
            {tCta("seeAllMentors")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </SiteCta>
        </ScrollReveal>
      </div>
    </section>
  );
}
