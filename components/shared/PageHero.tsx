import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  SectionHeader,
  type ISectionHeaderProps,
} from "@/components/shared/SectionHeader";

export interface IPageHeroProps extends ISectionHeaderProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}

export function PageHero({
  children,
  className,
  containerClassName,
  animate = true,
  titleAs = "h1",
  ...headerProps
}: IPageHeroProps) {
  const header = (
    <SectionHeader {...headerProps} titleAs={titleAs} variant="page" />
  );

  return (
    <section
      className={cn(
        "page-hero-bg relative overflow-hidden border-b border-primary/10 py-14 md:py-20",
        className
      )}
    >
      <div
        className={cn(
          "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {animate ? <ScrollReveal>{header}</ScrollReveal> : header}
        {children}
      </div>
    </section>
  );
}
