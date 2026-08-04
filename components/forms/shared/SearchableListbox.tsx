"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ISearchableListboxOption {
  value: string;
  label: string;
  searchText?: string;
  leading?: ReactNode;
}

interface ISearchableListboxProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: ISearchableListboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  renderValue?: (option: ISearchableListboxOption | undefined) => ReactNode;
}

export function SearchableListbox({
  id,
  value,
  onChange,
  options,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  ariaLabel,
  disabled = false,
  className,
  buttonClassName,
  listClassName,
  renderValue,
}: ISearchableListboxProps) {
  const autoId = useId();
  const listboxId = id ?? autoId;
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((option) => {
      const haystack = `${option.label} ${option.searchText ?? ""} ${option.value}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [options, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent): void {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }

    function handleEscape(event: globalThis.KeyboardEvent): void {
      if (event.key === "Escape") close();
    }

    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("keydown", handleEscape);
    const timer = window.setTimeout(() => searchRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("keydown", handleEscape);
      window.clearTimeout(timer);
    };
  }, [close, open]);

  function handleSelect(nextValue: string): void {
    onChange(nextValue);
    close();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((current) => !current);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
    }
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        id={listboxId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => !disabled && setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left font-body text-sm text-text-dark transition",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
          disabled && "cursor-not-allowed opacity-60",
          buttonClassName
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
          {selected
            ? renderValue
              ? renderValue(selected)
              : selected.label
            : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-text-gray transition",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          className={cn(
            "absolute left-0 right-0 top-[calc(100%+6px)] z-[120] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl",
            listClassName
          )}
        >
          <div className="border-b border-gray-100 p-2">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-text-gray"
                aria-hidden
              />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg border border-gray-200 py-2 pl-8 pr-3 font-body text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>
          <ul
            role="listbox"
            aria-labelledby={listboxId}
            className="max-h-64 overflow-y-auto overscroll-contain py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-text-gray">No results</li>
            ) : (
              filtered.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li key={option.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition",
                        isSelected
                          ? "bg-bg-light font-semibold text-primary-dark"
                          : "text-text-dark hover:bg-gray-50"
                      )}
                    >
                      {option.leading}
                      <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
