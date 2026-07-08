"use client";

import { useFormLocale } from "@/lib/i18n/useFormLocale";
import { pickBilingualLabel } from "@/lib/i18n/formLocale";
import { cn } from "@/lib/cn";

interface IBilingualLabelProps {
  htmlFor?: string;
  labelBn: string;
  labelEn: string;
  required?: boolean;
  hint?: string;
  className?: string;
}

export function BilingualLabel({
  htmlFor,
  labelBn,
  labelEn,
  required = false,
  hint,
  className,
}: IBilingualLabelProps) {
  const locale = useFormLocale();
  const text = pickBilingualLabel({ labelBn, labelEn }, locale);

  return (
    <div className={cn("mb-2", className)}>
      <label htmlFor={htmlFor} className="block">
        <span className="font-inter text-sm font-semibold text-primary-dark">
          {text}
          {required && (
            <span className="ml-0.5 text-primary" aria-hidden="true">
              *
            </span>
          )}
        </span>
      </label>
      {hint && (
        <p className="mt-0.5 font-inter text-xs text-text-gray">{hint}</p>
      )}
    </div>
  );
}
