import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  durationSeconds?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  durationSeconds = 55,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--gap:1.25rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }, (_, index) => (
        <div
          key={index}
          style={{ animationDuration: `${durationSeconds}s` }}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical
              ? reverse
                ? "flex-col animate-marquee-down"
                : "flex-col animate-marquee-up"
              : "flex-row",
            !vertical &&
              (reverse ? "animate-marquee-right" : "animate-marquee-left"),
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
