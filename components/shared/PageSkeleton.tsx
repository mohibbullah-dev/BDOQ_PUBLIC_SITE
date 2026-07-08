import { cn } from "@/lib/cn";

export type PageSkeletonVariant =
  | "page"
  | "grid"
  | "hero"
  | "detail"
  | "form"
  | "pricing"
  | "tabs"
  | "blog";

interface IPageSkeletonProps {
  variant?: PageSkeletonVariant;
  className?: string;
}

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("rounded-xl bg-gray-200/80", className)} />;
}

function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-bg-light py-16 md:py-20">
      <div className="site-container relative space-y-4">
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="h-10 max-w-xl" />
        <SkeletonBlock className="h-5 max-w-lg" />
      </div>
    </div>
  );
}

function CardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
        >
          <SkeletonBlock className="h-44 rounded-none" />
          <div className="space-y-3 p-5">
            <SkeletonBlock className="h-4 w-3/4" />
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TabPills() {
  return (
    <div className="mx-auto mb-8 w-full max-w-3xl rounded-2xl border border-gray-100/80 bg-white/90 p-1.5 shadow-lg shadow-primary/5">
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-[52px] rounded-xl sm:h-[56px]" />
        ))}
      </div>
    </div>
  );
}

function FormFields() {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-12 w-full rounded-xl" />
        </div>
      ))}
      <SkeletonBlock className="mx-auto mt-4 h-12 w-48 rounded-full" />
    </div>
  );
}

function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6"
        >
          <SkeletonBlock className="h-6 w-24" />
          <SkeletonBlock className="h-10 w-32" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((__, j) => (
              <SkeletonBlock key={j} className="h-3 w-full" />
            ))}
          </div>
          <SkeletonBlock className="h-11 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

function DetailLayout() {
  return (
    <div className="site-container py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-4 w-full" />
          ))}
          <SkeletonBlock className="h-8 w-2/3" />
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={`b-${i}`} className="h-4 w-full" />
          ))}
        </div>
        <div className="hidden space-y-4 lg:block">
          <SkeletonBlock className="h-40 rounded-2xl" />
          <SkeletonBlock className="h-32 rounded-2xl" />
          <SkeletonBlock className="h-48 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton({
  variant = "page",
  className,
}: IPageSkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-bg-light", className)}
      aria-busy="true"
      aria-label="Loading page content"
    >
      {variant === "hero" && (
        <>
          <HeroBanner />
          <div className="py-12 md:py-16">
            <div className="site-container space-y-12">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="space-y-3 rounded-2xl border border-gray-100 bg-white p-6"
                  >
                    <SkeletonBlock className="h-10 w-10 rounded-xl" />
                    <SkeletonBlock className="h-5 w-3/4" />
                    <SkeletonBlock className="h-3 w-full" />
                  </div>
                ))}
              </div>
              <SkeletonBlock className="h-32 rounded-2xl" />
            </div>
          </div>
        </>
      )}

      {variant === "detail" && (
        <>
          <SkeletonBlock className="h-72 rounded-none md:h-80" />
          <DetailLayout />
        </>
      )}

      {variant === "blog" && (
        <div className="py-16 md:py-24">
          <div className="site-container space-y-8">
            <div className="mx-auto space-y-3 text-center">
              <SkeletonBlock className="mx-auto h-10 max-w-md" />
              <SkeletonBlock className="mx-auto h-4 max-w-lg" />
            </div>
            <SkeletonBlock className="mx-auto h-12 max-w-xl rounded-full" />
            <CardGrid />
          </div>
        </div>
      )}

      {variant === "form" && (
        <>
          <HeroBanner />
          <div className="py-12 md:py-16">
            <FormFields />
          </div>
        </>
      )}

      {variant === "pricing" && (
        <>
          <HeroBanner />
          <div className="py-12 md:py-16">
            <div className="site-container">
              <PricingCards />
            </div>
          </div>
        </>
      )}

      {variant === "tabs" && (
        <>
          <HeroBanner />
          <div className="py-12 md:py-16">
            <div className="site-container">
              <TabPills />
              <CardGrid count={8} />
            </div>
          </div>
        </>
      )}

      {variant === "grid" && (
        <div className="py-16 md:py-24">
          <div className="site-container space-y-8">
            <div className="mx-auto space-y-3 text-center">
              <SkeletonBlock className="mx-auto h-10 max-w-md" />
              <SkeletonBlock className="mx-auto h-4 max-w-lg" />
            </div>
            <CardGrid />
          </div>
        </div>
      )}

      {variant === "page" && (
        <>
          <HeroBanner />
          <div className="py-12 md:py-16">
            <div className="site-container space-y-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonBlock
                    key={i}
                    className="h-48 rounded-2xl border border-gray-100 bg-white"
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
