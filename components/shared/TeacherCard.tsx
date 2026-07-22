import type { ITeacher } from "@/lib/types";
import { TeacherAvatar } from "@/components/shared/TeacherAvatar";
import { SiteCta } from "@/components/shared/SiteCta";

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
    <article className="site-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-center transition-shadow duration-200 hover:shadow-md">
      <div className="relative z-[1] mb-4 flex justify-center">
        <TeacherAvatar
          teacher={teacher}
          avatarVariant={avatarVariant}
          className="shadow-md"
        />
      </div>

      <h3 className="mb-1 font-playfair text-base font-bold text-primary-dark">
        {teacher.name}
      </h3>
      <p className="mb-1 font-body text-sm text-text-gray">{teacher.role}</p>
      {teacher.country && (
        <p className="mb-5 font-body text-xs font-medium text-primary">
          {teacher.country}
        </p>
      )}

      {showDetailsLink && (
        <SiteCta
          href={`/teachers/${teacher.slug}`}
          variant="secondary"
          size="sm"
          className="mt-auto w-full"
        >
          See details
        </SiteCta>
      )}
    </article>
  );
}
