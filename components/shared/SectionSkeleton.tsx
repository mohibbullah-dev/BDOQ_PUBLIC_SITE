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
      <div className="mx-auto h-48 max-w-7xl rounded-2xl bg-white/50 px-4 sm:px-6 lg:px-8" />
    </div>
  );
}
