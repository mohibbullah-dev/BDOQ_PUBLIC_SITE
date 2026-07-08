"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { useOptionLabel } from "@/lib/i18n/useFormLocale";

interface ISingleSelectChipsProps<T extends string> {
  options: readonly {
    value: T;
    labelBn: string;
    labelEn: string;
    description?: string;
  }[];
  value: T | "";
  onChange: (value: T) => void;
  error?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function SingleSelectChips<T extends string>({
  options,
  value,
  onChange,
  error,
  columns = 2,
}: ISingleSelectChipsProps<T>) {
  const labelFor = useOptionLabel();

  const gridClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : columns === 4
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2";

  return (
    <div>
      <div className={cn("grid gap-3", gridClass)}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
              className={cn(
                "group relative min-h-[56px] rounded-2xl border px-4 py-3.5 text-left font-inter transition-all duration-200",
                selected
                  ? "border-primary bg-primary/10 shadow-md shadow-primary/10 ring-1 ring-primary/20"
                  : "border-gray-200/90 bg-white shadow-sm hover:border-primary/35 hover:shadow-md"
              )}
            >
              {selected && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
              )}
              <span
                className={cn(
                  "block pr-6 text-sm font-semibold",
                  selected ? "text-primary-dark" : "text-text-dark"
                )}
              >
                {labelFor(option)}
              </span>
              {option.description && (
                <span className="mt-1 block text-xs leading-relaxed text-text-gray">
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p
          className="mt-2 font-inter text-xs font-medium text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
