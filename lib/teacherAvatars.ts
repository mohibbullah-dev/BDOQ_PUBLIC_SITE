import { TEACHER_AVATARS } from "@/lib/teacherData";
import { teacherAvatarUrl } from "@/lib/avatarCatalog";
import type { ITeacher } from "@/lib/types";

export type TeacherAvatarContext = "card" | "detail";

function resolveTeacherGender(
  teacher: ITeacher,
  avatarVariant?: "default" | "female"
): "male" | "female" {
  if (avatarVariant === "female") return "female";
  if (avatarVariant === "default") return "male";
  return teacher.gender;
}

/** Generic male/female illustration — homepage, teachers list, related cards */
export function getTeacherCardAvatarSrc(
  teacher: ITeacher,
  avatarVariant?: "default" | "female"
): string {
  return TEACHER_AVATARS[resolveTeacherGender(teacher, avatarVariant)];
}

/** Per-teacher Cloudinary photo — teacher profile page only */
export function getTeacherDetailAvatarSrc(
  teacher: ITeacher,
  avatarVariant?: "default" | "female",
  size = 512
): string {
  const image = teacher.image?.trim() ?? "";
  if (image.length > 0) {
    return image;
  }

  const slug = teacher.slug?.trim() ?? "";
  if (slug.length > 0) {
    return teacherAvatarUrl(slug, size);
  }

  return TEACHER_AVATARS[resolveTeacherGender(teacher, avatarVariant)];
}

export function getTeacherAvatarSrc(
  teacher: ITeacher,
  avatarVariant?: "default" | "female",
  context: TeacherAvatarContext = "card",
  size?: number
): string {
  return context === "detail"
    ? getTeacherDetailAvatarSrc(teacher, avatarVariant, size)
    : getTeacherCardAvatarSrc(teacher, avatarVariant);
}

export function isTeacherDetailPhoto(teacher: ITeacher): boolean {
  const image = teacher.image?.trim() ?? "";
  return image.length > 0 || Boolean(teacher.slug?.trim());
}
