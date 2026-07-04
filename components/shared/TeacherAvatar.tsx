import Image from "next/image";
import type { ITeacher } from "@/lib/types";
import {
  getTeacherAvatarSrc,
  isTeacherDetailPhoto,
  type TeacherAvatarContext,
} from "@/lib/teacherAvatars";
import { isCloudinaryUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/cn";

interface ITeacherAvatarProps {
  teacher: ITeacher;
  context?: TeacherAvatarContext;
  avatarVariant?: "default" | "female";
  size?: number;
  className?: string;
}

export function TeacherAvatar({
  teacher,
  context = "card",
  avatarVariant,
  size = 96,
  className,
}: ITeacherAvatarProps) {
  const isDetail = context === "detail";
  const src = getTeacherAvatarSrc(
    teacher,
    avatarVariant,
    context,
    isDetail ? Math.max(size, 256) : size
  );
  const isPhoto = isDetail && isTeacherDetailPhoto(teacher);

  return (
    <Image
      src={src}
      alt={teacher.name}
      width={size}
      height={size}
      className={cn(
        isPhoto
          ? "rounded-full object-cover border-2 border-primary/20"
          : "object-contain",
        className
      )}
      style={{ width: size, height: size }}
      unoptimized={!isCloudinaryUrl(src) && !src.startsWith("/")}
    />
  );
}
