"use client";

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
                "min-h-[52px] rounded-2xl border px-4 py-3 text-left font-inter transition-all duration-200",
                selected
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-gray-200 bg-white hover:border-primary/40"
              )}
            >
              <span
                className={cn(
                  "block text-sm font-semibold",
                  selected ? "text-primary-dark" : "text-text-dark"
                )}
              >
                {labelFor(option)}
              </span>
              {option.description && (
                <span className="mt-1 block text-xs text-text-gray/80">
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
