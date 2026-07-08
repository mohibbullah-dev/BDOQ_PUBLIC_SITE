import type { ReactNode } from "react";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";
import { formSectionClass, formSectionInnerClass } from "./formStyles";

interface IFormCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

export function FormCard({
  children,
  className,
  innerClassName,
}: IFormCardProps) {
  return (
    <div className={cn(formSectionClass, className)}>
      <IslamicShapeBackdrop overlay="form" />
      <div className={cn(formSectionInnerClass, innerClassName)}>
        {children}
      </div>
    </div>
  );
}
