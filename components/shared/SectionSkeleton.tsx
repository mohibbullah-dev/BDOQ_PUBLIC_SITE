import { cn } from "@/lib/cn";

interface ISectionSkeletonProps {
  className?: string;
}

export function SectionSkeleton({ className }: ISectionSkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-bg-light/60 py-16 md:py-24", className)}
      aria-hidden="true"
    >
      <div className="site-container h-48 rounded-2xl bg-white/50" />
    </div>
  );
}
