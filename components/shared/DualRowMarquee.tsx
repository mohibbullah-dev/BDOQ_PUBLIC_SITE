import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface IMarqueeRowProps {
  children: ReactNode;
  reverse?: boolean;
  /** Seconds for one full loop — higher = slower */
  durationSeconds?: number;
  className?: string;
  gapClassName?: string;
}

function MarqueeRow({
  children,
  reverse = false,
  durationSeconds = 90,
  className,
  gapClassName = "gap-4",
}: IMarqueeRowProps) {
  return (
    <div
      className={cn(
        "group/marquee-row relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max flex-row items-stretch",
          gapClassName,
          reverse ? "animate-marquee-right" : "animate-marquee-left",
          "motion-reduce:animate-none",
          "group-hover/marquee-row:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <div className={cn("flex shrink-0 flex-row items-stretch", gapClassName)}>
          {children}
        </div>
        <div
          className={cn("flex shrink-0 flex-row items-stretch", gapClassName)}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export interface IDualRowMarqueeProps {
  rowOne: ReactNode;
  rowTwo: ReactNode;
  /** Top row duration (seconds) */
  rowOneDuration?: number;
  /** Bottom row duration (seconds) — usually slightly different */
  rowTwoDuration?: number;
  /** Bottom row scrolls opposite direction */
  reverseSecondRow?: boolean;
  className?: string;
  rowClassName?: string;
  gapClassName?: string;
}

/** Slow professional dual-row horizontal marquee */
export function DualRowMarquee({
  rowOne,
  rowTwo,
  rowOneDuration = 95,
  rowTwoDuration = 110,
  reverseSecondRow = true,
  className,
  rowClassName,
  gapClassName = "gap-4",
}: IDualRowMarqueeProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} role="presentation">
      <MarqueeRow
        durationSeconds={rowOneDuration}
        className={rowClassName}
        gapClassName={gapClassName}
      >
        {rowOne}
      </MarqueeRow>
      <MarqueeRow
        reverse={reverseSecondRow}
        durationSeconds={rowTwoDuration}
        className={rowClassName}
        gapClassName={gapClassName}
      >
        {rowTwo}
      </MarqueeRow>
    </div>
  );
}
