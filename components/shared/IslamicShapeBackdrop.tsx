import Image from "next/image";
import { cn } from "@/lib/cn";

export const ISLAMIC_SHAPE_BG = "/images/islamic-shape-bg.png";

/** home = landing hero · page = page hero · form = form card · sidebar = trust panel */
export type IslamicShapeOverlayVariant = "home" | "page" | "form" | "sidebar";

interface IIslamicShapeBackdropProps {
  className?: string;
  overlay?: IslamicShapeOverlayVariant;
  priority?: boolean;
}

const VARIANT: Record<
  IslamicShapeOverlayVariant,
  { image: string; wash: string }
> = {
  home: {
    image: "opacity-[0.22]",
    wash: "from-[#E8FAF2]/82 via-[#E8FAF2]/68 to-[#E8FAF2]/86",
  },
  page: {
    image: "opacity-[0.14]",
    wash: "from-[#E8FAF2]/92 via-[#E8FAF2]/88 to-[#E8FAF2]/94",
  },
  form: {
    image: "opacity-[0.11]",
    wash: "from-white/96 via-[#E8FAF2]/94 to-white/98",
  },
  sidebar: {
    image: "opacity-[0.16]",
    wash: "from-[#E8FAF2]/90 via-[#E8FAF2]/84 to-[#E8FAF2]/92",
  },
};

/** Subtle Islamic shape — hero areas only, never on content sections */
export function IslamicShapeBackdrop({
  className,
  overlay = "page",
  priority = false,
}: IIslamicShapeBackdropProps) {
  const v = VARIANT[overlay];

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      aria-hidden="true"
    >
      <Image
        src={ISLAMIC_SHAPE_BG}
        alt=""
        fill
        priority={priority || overlay === "home"}
        sizes="100vw"
        className={cn("object-cover object-center", v.image)}
      />
      <div className={cn("absolute inset-0 bg-gradient-to-b", v.wash)} />
    </div>
  );
}
