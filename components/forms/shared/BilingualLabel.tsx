"use client";

import { useFormLocale } from "@/lib/i18n/useFormLocale";
import { pickBilingualLabel } from "@/lib/i18n/formLocale";

interface IBilingualLabelProps {
  htmlFor?: string;
  labelBn: string;
  labelEn: string;
  required?: boolean;
}

export function BilingualLabel({
  htmlFor,
  labelBn,
  labelEn,
  required = false,
}: IBilingualLabelProps) {
  const locale = useFormLocale();
  const text = pickBilingualLabel({ labelBn, labelEn }, locale);

  return (
    <label htmlFor={htmlFor} className="mb-1.5 block">
      <span className="font-inter text-sm font-medium text-text-dark">
        {text}
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </span>
    </label>
  );
}
