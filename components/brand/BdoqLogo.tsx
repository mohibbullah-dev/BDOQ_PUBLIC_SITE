import Image from "next/image";
import { BRAND_LOGO } from "@/lib/constants";
import { cn } from "@/lib/cn";

const sizeClasses = {
  sm: "h-12 w-auto max-w-[190px]",
  md: "h-16 w-auto max-w-[250px]",
  lg: "h-20 w-auto max-w-[310px]",
  xl: "h-24 w-auto max-w-[360px] sm:h-[7.5rem] sm:max-w-[430px]",
} as const;

type BdoqLogoLayout = "default" | "navbar";

interface IBdoqLogoProps {
  className?: string;
  size?: keyof typeof sizeClasses;
  layout?: BdoqLogoLayout;
  /** Shrinks navbar logo on scroll / tight mobile headers */
  compact?: boolean;
  priority?: boolean;
}

function navbarLogoClasses(compact: boolean) {
  if (compact) {
    return "h-10 w-auto max-w-[148px] sm:h-11 sm:max-w-[168px] lg:h-12 lg:max-w-[210px]";
  }

  return "h-11 w-auto max-w-[168px] sm:h-12 sm:max-w-[188px] lg:h-[3.25rem] lg:max-w-[240px]";
}

export function BdoqLogo({
  className,
  size = "md",
  layout = "default",
  compact = false,
  priority = false,
}: IBdoqLogoProps) {
  const isNavbar = layout === "navbar";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center",
        isNavbar && "max-h-full",
        className
      )}
    >
      <Image
        src={BRAND_LOGO.src}
        alt={BRAND_LOGO.alt}
        width={BRAND_LOGO.width}
        height={BRAND_LOGO.height}
        priority={priority}
        className={cn(
          "object-contain object-center",
          isNavbar ? navbarLogoClasses(compact) : sizeClasses[size]
        )}
        sizes={
          isNavbar
            ? compact
              ? "(max-width: 1024px) 148px, 240px"
              : "(max-width: 1024px) 168px, 260px"
            : size === "xl"
              ? "(max-width: 640px) 360px, 430px"
              : size === "md"
                ? "(max-width: 768px) 190px, 250px"
                : "(max-width: 768px) 168px, 210px"
        }
      />
    </span>
  );
}
