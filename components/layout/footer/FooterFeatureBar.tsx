import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface IFooterFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface IFooterFeatureBarProps {
  features: IFooterFeature[];
}

export function FooterFeatureBar({ features }: IFooterFeatureBarProps) {
  return (
    <div
      className={cn(
        "relative z-[2] mt-12 grid grid-cols-1 gap-4 rounded-[8px] border border-[var(--green-primary)]/12 bg-white p-4",
        "shadow-[0_18px_48px_-20px_rgba(13,74,47,0.28)] sm:grid-cols-2 sm:p-5 lg:mt-14 lg:grid-cols-4 lg:gap-2 lg:p-3",
        "-mb-8 md:-mb-10"
      )}
    >
      {features.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className={cn(
              "footer-feature group flex items-center gap-3 rounded-[8px] px-3 py-3",
              "transition-all duration-300 hover:bg-[#F0FBF6]"
            )}
          >
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-[8px]",
                "bg-[linear-gradient(135deg,#E8FAF2_0%,#D8F5E8_100%)] text-[var(--green-primary)]",
                "ring-1 ring-[var(--green-primary)]/15",
                "transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-body text-sm font-bold text-[var(--green-dark)]">
                {item.title}
              </p>
              <p className="mt-0.5 font-body text-xs text-[var(--text-gray)]">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
