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
import { createPortal } from "react-dom";
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
  /** Minimum dropdown width in px (portal positioning). Defaults to 280. */
  dropdownMinWidth?: number;
  renderValue?: (option: ISearchableListboxOption | undefined) => ReactNode;
}

interface IDropdownPosition {
  top: number;
  left: number;
  width: number;
}

const VIEWPORT_PADDING = 8;
const GAP = 6;
const DEFAULT_MIN_WIDTH = 280;
const MENU_ESTIMATED_HEIGHT = 320;

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
  dropdownMinWidth = DEFAULT_MIN_WIDTH,
  renderValue,
}: ISearchableListboxProps) {
  const autoId = useId();
  const listboxId = id ?? autoId;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState<IDropdownPosition | null>(null);

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

  const updatePosition = useCallback(() => {
    const trigger = buttonRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight ?? MENU_ESTIMATED_HEIGHT;
    const menuWidth = Math.max(rect.width, dropdownMinWidth);

    const spaceBelow = window.innerHeight - rect.bottom - GAP;
    const spaceAbove = rect.top - GAP;
    const openUpward = spaceBelow < menuHeight && spaceAbove > spaceBelow;

    let top = openUpward
      ? rect.top - menuHeight - GAP
      : rect.bottom + GAP;

    top = Math.max(
      VIEWPORT_PADDING,
      Math.min(top, window.innerHeight - menuHeight - VIEWPORT_PADDING)
    );

    let left = rect.left;
    left = Math.max(
      VIEWPORT_PADDING,
      Math.min(left, window.innerWidth - menuWidth - VIEWPORT_PADDING)
    );

    setPosition({ top, left, width: menuWidth });
  }, [dropdownMinWidth]);

  useEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }

    updatePosition();
    const raf = requestAnimationFrame(updatePosition);

    function handleScroll(): void {
      updatePosition();
    }

    function handlePointerDown(event: MouseEvent): void {
      const target = event.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      close();
    }

    function handleEscape(event: globalThis.KeyboardEvent): void {
      if (event.key === "Escape") close();
    }

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", updatePosition);
    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("keydown", handleEscape);
    const timer = window.setTimeout(() => {
      menuRef.current
        ?.querySelector<HTMLInputElement>("input[type='search']")
        ?.focus();
    }, 0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("keydown", handleEscape);
      window.clearTimeout(timer);
    };
  }, [close, open, updatePosition]);

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

  const dropdown =
    open && position && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: position.width,
              zIndex: 9999,
            }}
            className={cn(
              "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl",
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
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                    >
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
                        <span className="min-w-0 flex-1 truncate">
                          {option.label}
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>,
          document.body
        )
      : null;

  return (
    <div className={cn("relative", className)}>
      <button
        ref={buttonRef}
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
      {dropdown}
    </div>
  );
}
