import { cloudinaryImageUrl } from "@/lib/cloudinary";

const AVATAR_ROOT = "bdoq-academy/avatars";

export const AVATAR_PUBLIC_IDS = {
  founder: `${AVATAR_ROOT}/founder/abdul-mumin-khan`,
  defaults: {
    male: `${AVATAR_ROOT}/defaults/male-teacher`,
    female: `${AVATAR_ROOT}/defaults/female-teacher`,
  },
  heroTeachers: {
    fatima: `${AVATAR_ROOT}/teachers/ustadha-fatima-rahman`,
    abdullah: `${AVATAR_ROOT}/teachers/mawlana-farid-ahmed`,
    mumin: `${AVATAR_ROOT}/teachers/hafez-mawlana-rahmatullah`,
    sara: `${AVATAR_ROOT}/teachers/ustadha-ayesha-khan`,
  },
  testimonials: [
    `${AVATAR_ROOT}/testimonials/student-1`,
    `${AVATAR_ROOT}/testimonials/student-2`,
    `${AVATAR_ROOT}/testimonials/student-3`,
    `${AVATAR_ROOT}/testimonials/student-4`,
    `${AVATAR_ROOT}/testimonials/student-5`,
  ],
} as const;

export function teacherAvatarPublicId(slug: string): string {
  return `${AVATAR_ROOT}/teachers/${slug}`;
}

export function founderAvatarUrl(size = 512): string {
  return cloudinaryImageUrl(AVATAR_PUBLIC_IDS.founder, {
    width: size,
    height: size,
  });
}

export function defaultTeacherAvatarUrl(
  gender: "male" | "female",
  size = 256
): string {
  void size;
  return gender === "female"
    ? "/images/teachers/female-teacher.png"
    : "/images/teachers/male-teacher.png";
}

export function teacherAvatarUrl(slug: string, size = 256): string {
  return cloudinaryImageUrl(teacherAvatarPublicId(slug), {
    width: size,
    height: size,
  });
}

export function testimonialAvatarUrl(index: number, size = 96): string {
  const publicId =
    AVATAR_PUBLIC_IDS.testimonials[index] ?? AVATAR_PUBLIC_IDS.testimonials[0];
  return cloudinaryImageUrl(publicId, { width: size, height: size });
}

export function heroTeacherAvatarUrl(
  key: keyof typeof AVATAR_PUBLIC_IDS.heroTeachers,
  size = 80
): string {
  return cloudinaryImageUrl(AVATAR_PUBLIC_IDS.heroTeachers[key], {
    width: size,
    height: size,
  });
}
