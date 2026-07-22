"use client";

import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { FormCard } from "@/components/forms/shared/FormCard";
import { cn } from "@/lib/cn";

interface IFormSuccessScreenProps {
  title: string;
  body: string;
  children?: ReactNode;
  className?: string;
}

export function FormSuccessScreen({
  title,
  body,
  children,
  className,
}: IFormSuccessScreenProps) {
  return (
    <FormCard
      className={cn("text-center", className)}
      innerClassName="py-12 md:py-16"
    >
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
        <CheckCircle2 className="h-9 w-9 text-primary" aria-hidden="true" />
      </div>
      <h2 className="font-amiri text-2xl font-bold text-primary-dark md:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-text-gray md:text-base">
        {body}
      </p>
      {children && (
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {children}
        </div>
      )}
    </FormCard>
  );
}
