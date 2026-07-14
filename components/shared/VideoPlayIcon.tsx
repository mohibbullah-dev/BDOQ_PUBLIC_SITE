import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

type VideoPlayIconSize = "sm" | "md" | "lg";

interface IVideoPlayIconProps {
  size?: VideoPlayIconSize;
  className?: string;
  /** Soft white ping (for green primary fill buttons) */
  tone?: "brand" | "white";
}

const SIZE: Record<
  VideoPlayIconSize,
  { wrap: string; icon: string; ring: string }
> = {
  sm: {
    wrap: "size-12",
    icon: "size-5",
    ring: "ring-2",
  },
  md: {
    wrap: "size-14",
    icon: "size-6",
    ring: "ring-4",
  },
  lg: {
    wrap: "size-16 sm:size-[4.5rem]",
    icon: "size-7",
    ring: "ring-4",
  },
};

/**
 * Circular video play control — same ping pulse as the floating chat button.
 * Place inside a `relative` parent (e.g. thumbnail button). Supports `group-hover`.
 */
export function VideoPlayIcon({
  size = "md",
  className,
  tone = "brand",
}: IVideoPlayIconProps) {
  const dim = SIZE[size];
  const isBrand = tone === "brand";

  return (
    <span
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2",
        "transition-transform duration-300 group-hover:scale-110",
        className
      )}
      aria-hidden="true"
    >
      {/* Chat-style ping ring (matches WhatsAppButton) */}
      <span
        className={cn(
          "absolute inset-0 rounded-full animate-ping opacity-30",
          isBrand ? "bg-[var(--green-primary)]" : "bg-white"
        )}
      />
      <span
        className={cn(
          "relative flex items-center justify-center rounded-full shadow-xl",
          "transition-colors duration-300",
          dim.wrap,
          dim.ring,
          isBrand
            ? "bg-white text-[var(--green-primary)] ring-white/30 group-hover:bg-[var(--green-primary)] group-hover:text-white group-hover:ring-[var(--green-primary)]/30"
            : "bg-[var(--green-primary)] text-white ring-[var(--green-primary)]/30"
        )}
      >
        <Play
          className={cn("ml-0.5 fill-current", dim.icon)}
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
