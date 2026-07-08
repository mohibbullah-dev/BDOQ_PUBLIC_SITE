import Link from "next/link";
import type { ITeacher } from "@/lib/types";
import { TeacherAvatar } from "@/components/shared/TeacherAvatar";

export interface ITeacherCardProps {
  teacher: ITeacher;
  showDetailsLink?: boolean;
  avatarVariant?: "default" | "female";
}

export function TeacherCard({
  teacher,
  showDetailsLink = true,
  avatarVariant,
}: ITeacherCardProps) {
  return (
    <article className="group relative flex flex-col h-full rounded-2xl bg-white border border-gray-100 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden">
      <span className="site-card-hover-overlay z-0" aria-hidden="true" />
      <div className="relative z-[1] flex justify-center mb-4">
        <TeacherAvatar
          teacher={teacher}
          avatarVariant={avatarVariant}
          className="shadow-md"
        />
      </div>

      <h3 className="font-inter text-base font-bold text-primary-dark mb-1">
        {teacher.name}
      </h3>
      <p className="font-inter text-sm text-text-gray mb-1">{teacher.role}</p>
      {teacher.country && (
        <p className="font-inter text-xs font-medium text-primary mb-5">
          {teacher.country}
        </p>
      )}

      {showDetailsLink && (
        <Link
          href={`/teachers/${teacher.slug}`}
          className="site-btn-hover-overlay relative z-[1] mt-auto inline-flex items-center justify-center rounded-full border-2 border-primary text-primary hover:text-white font-semibold px-5 py-2 text-sm transition-all duration-300"
        >
          See details
        </Link>
      )}
    </article>
  );
}
