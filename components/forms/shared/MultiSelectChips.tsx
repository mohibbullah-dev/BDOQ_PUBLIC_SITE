"use client";

import { cn } from "@/lib/cn";
import { useOptionLabel } from "@/lib/i18n/useFormLocale";

interface IMultiSelectChipsProps<T extends string> {
  options: readonly { value: T; labelBn: string; labelEn: string }[];
  value: T[];
  onChange: (value: T[]) => void;
  error?: string;
}

export function MultiSelectChips<T extends string>({
  options,
  value,
  onChange,
  error,
}: IMultiSelectChipsProps<T>) {
  const labelFor = useOptionLabel();

  const toggle = (option: T): void => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              aria-pressed={selected}
              className={cn(
                "min-h-[44px] rounded-full border px-4 py-2 font-inter text-xs font-medium transition-all duration-200 sm:text-sm",
                selected
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-text-dark hover:border-primary/40"
              )}
            >
              {labelFor(option)}
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
