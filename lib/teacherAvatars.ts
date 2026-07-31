import { TEACHER_AVATARS } from "@/lib/teacherData";
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

/** Teacher profile — custom upload only; otherwise same Islamic illustration as cards */
export function getTeacherDetailAvatarSrc(
  teacher: ITeacher,
  avatarVariant?: "default" | "female"
): string {
  const image = teacher.image?.trim() ?? "";
  if (image.length > 0) {
    return image;
  }

  return TEACHER_AVATARS[resolveTeacherGender(teacher, avatarVariant)];
}

export function getTeacherAvatarSrc(
  teacher: ITeacher,
  avatarVariant?: "default" | "female",
  context: TeacherAvatarContext = "card"
): string {
  return context === "detail"
    ? getTeacherDetailAvatarSrc(teacher, avatarVariant)
    : getTeacherCardAvatarSrc(teacher, avatarVariant);
}

export function isTeacherDetailPhoto(teacher: ITeacher): boolean {
  return Boolean(teacher.image?.trim());
}
