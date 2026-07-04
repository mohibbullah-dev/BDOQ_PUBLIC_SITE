"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface ISearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  id?: string;
  className?: string;
  inputClassName?: string;
  onClear?: () => void;
  autoFocus?: boolean;
  ariaLabel?: string;
}

export function SearchField({
  value,
  onChange,
  placeholder,
  id = "site-search",
  className,
  inputClassName,
  onClear,
  autoFocus = false,
  ariaLabel = "Search",
}: ISearchFieldProps) {
  const handleClear = (): void => {
    onChange("");
    onClear?.();
  };

  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        className={cn(
          "w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-11 font-inter text-sm text-primary-dark",
          "placeholder:text-text-gray/80 shadow-sm transition-all duration-200",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          inputClassName
        )}
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-text-gray transition-colors hover:bg-gray-100 hover:text-primary-dark"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
