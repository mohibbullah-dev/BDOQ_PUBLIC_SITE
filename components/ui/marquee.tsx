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
  repeat = 2,
  durationSeconds = 55,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--gap:1.25rem]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      <div
        style={{ animationDuration: `${durationSeconds}s` }}
        className={cn(
          "flex shrink-0 [gap:var(--gap)]",
          vertical ? "h-max flex-col" : "w-max flex-row",
          vertical
            ? reverse
              ? "animate-marquee-down"
              : "animate-marquee-up"
            : reverse
              ? "animate-marquee-right"
              : "animate-marquee-left",
          "motion-reduce:animate-none",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {Array.from({ length: repeat }, (_, index) => (
          <div
            key={index}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              vertical ? "flex-col" : "flex-row"
            )}
            aria-hidden={index > 0 ? true : undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
