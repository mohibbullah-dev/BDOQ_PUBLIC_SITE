import type { ITestimonial } from "@/lib/types";
import { defaultTeacherAvatarUrl } from "@/lib/avatarCatalog";
import { isCloudinaryUrl } from "@/lib/cloudinary";

export const TESTIMONIAL_AVATAR_COUNT = 5;

const STACK_GENDERS: Array<"male" | "female"> = [
  "female",
  "male",
  "female",
  "male",
  "male",
];

function inferTestimonialGender(testimonial: ITestimonial): "male" | "female" {
  const femaleTokens = [
    "rahima",
    "fatima",
    "nusrat",
    "ayesha",
    "maryam",
    "khadija",
    "wardah",
  ];
  const name = testimonial.name.toLowerCase();
  return femaleTokens.some((token) => name.includes(token)) ? "female" : "male";
}

function hasRealAvatar(image?: string): boolean {
  const value = image?.trim() ?? "";
  return value.length > 0 && isCloudinaryUrl(value);
}

export function getTestimonialAvatarUrls(): {
  imageUrl: string;
  profileUrl: string;
}[] {
  return STACK_GENDERS.map((gender) => ({
    imageUrl: defaultTeacherAvatarUrl(gender),
    profileUrl: "/teachers",
  }));
}

export function getTestimonialAvatar(
  testimonial: ITestimonial,
  index = 0
): string {
  if (hasRealAvatar(testimonial.image)) {
    return testimonial.image!.trim();
  }

  void index;
  return defaultTeacherAvatarUrl(inferTestimonialGender(testimonial));
}
