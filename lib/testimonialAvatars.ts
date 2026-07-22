import type { ITestimonial } from "@/lib/types";
import { isCloudinaryUrl } from "@/lib/cloudinary";

export const TESTIMONIAL_AVATAR_COUNT = 5;

/** Generic profile when reviewer did not upload an image */
export const DEFAULT_PROFILE_AVATAR = "/images/avatars/default-profile.svg";

/** True only when the reviewer uploaded a real photo */
export function hasTestimonialUploadedImage(image?: string): boolean {
  const value = image?.trim() ?? "";
  if (!value) return false;
  // Uploaded review photos live on Cloudinary (or absolute CDN URLs)
  if (isCloudinaryUrl(value)) return true;
  if (/^https?:\/\//i.test(value) && !value.includes("/teachers/")) {
    return true;
  }
  return false;
}

export function getTestimonialAvatarUrls(): {
  imageUrl: string;
  profileUrl: string;
}[] {
  return Array.from({ length: TESTIMONIAL_AVATAR_COUNT }, () => ({
    imageUrl: DEFAULT_PROFILE_AVATAR,
    profileUrl: "/reviews",
  }));
}

/**
 * Uploaded review image, or null → UI should show default profile avatar.
 * Never falls back to teacher illustrations.
 */
export function getTestimonialAvatar(testimonial: ITestimonial): string | null {
  if (hasTestimonialUploadedImage(testimonial.image)) {
    return testimonial.image!.trim();
  }
  return null;
}

export function resolveTestimonialAvatarSrc(
  testimonial: ITestimonial
): string {
  return getTestimonialAvatar(testimonial) ?? DEFAULT_PROFILE_AVATAR;
}
