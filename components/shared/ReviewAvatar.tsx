import Image from "next/image";
import type { ITestimonial } from "@/lib/types";
import {
  DEFAULT_PROFILE_AVATAR,
  getTestimonialAvatar,
} from "@/lib/testimonialAvatars";
import { cn } from "@/lib/cn";

interface IReviewAvatarProps {
  testimonial: ITestimonial;
  size?: number;
  className?: string;
}

/** Uploaded review photo, or generic profile when user skipped image */
export function ReviewAvatar({
  testimonial,
  size = 48,
  className,
}: IReviewAvatarProps) {
  const uploaded = getTestimonialAvatar(testimonial);
  const src = uploaded ?? DEFAULT_PROFILE_AVATAR;

  return (
    <Image
      src={src}
      alt={testimonial.name}
      width={size}
      height={size}
      className={cn(
        "shrink-0 rounded-full border-2 border-primary/15 object-cover",
        className
      )}
      style={{ width: size, height: size }}
      unoptimized={!src.includes("res.cloudinary.com")}
    />
  );
}
