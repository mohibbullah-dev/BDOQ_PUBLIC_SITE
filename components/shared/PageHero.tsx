import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  SectionHeader,
  type ISectionHeaderProps,
} from "@/components/shared/SectionHeader";
import {
  IslamicShapeBackdrop,
  type IslamicShapeOverlayVariant,
} from "@/components/shared/IslamicShapeBackdrop";

export interface IPageHeroProps extends ISectionHeaderProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  heroOverlay?: IslamicShapeOverlayVariant;
}

export function PageHero({
  children,
  className,
  containerClassName,
  animate = true,
  titleAs = "h1",
  heroOverlay = "page",
  ...headerProps
}: IPageHeroProps) {
  const header = (
    <SectionHeader {...headerProps} titleAs={titleAs} variant="page" />
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-primary/10 bg-bg-light py-14 md:py-20",
        className
      )}
    >
      <IslamicShapeBackdrop overlay={heroOverlay} />

      <div className={cn("site-container relative z-[1]", containerClassName)}>
        {animate ? <ScrollReveal>{header}</ScrollReveal> : header}
        {children}
      </div>
    </section>
  );
}
