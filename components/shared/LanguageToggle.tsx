"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import type { LocaleType } from "@/i18n/routing";
import { getStoredLocale, setLocalePreference } from "@/lib/locale";
import { cn } from "@/lib/cn";

interface ILanguageToggleProps {
  className?: string;
  variant?: "light" | "dark";
}

const LOCALES = [
  { id: "en" as const, flag: "us", label: "EN", name: "English" },
  { id: "bn" as const, flag: "bd", label: "BN", name: "বাংলা" },
] as const;

function FlagImage({
  code,
  name,
  size = "md",
}: {
  code: string;
  name: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full ring-1 ring-black/10",
        size === "sm" ? "h-5 w-5" : "h-6 w-6"
      )}
    >
      <Image
        src={`https://flagcdn.com/w40/${code}.png`}
        alt={`${name} flag`}
        fill
        className="object-cover"
        sizes="24px"
        unoptimized
      />
    </span>
  );
}

export function LanguageToggle({
  className,
  variant = "light",
}: ILanguageToggleProps) {
  const locale = useLocale() as LocaleType;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const active = LOCALES.find((item) => item.id === locale) ?? LOCALES[0];
  const isDark = variant === "dark";

  useEffect(() => {
    const stored = getStoredLocale();
    if (stored && stored !== locale) {
      setLocalePreference(stored);
      startTransition(() => {
        router.refresh();
      });
    }
    // Sync stored preference once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleSelect = (nextLocale: LocaleType): void => {
    setOpen(false);
    if (nextLocale === locale || isPending) return;

    setLocalePreference(nextLocale);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div ref={rootRef} className={cn("relative shrink-0", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${active.name}`}
        disabled={isPending}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full px-2 font-body text-sm font-semibold transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isPending && "opacity-70",
          isDark
            ? "bg-white/10 text-white hover:bg-white/15"
            : "bg-transparent text-primary-dark hover:bg-bg-light"
        )}
      >
        <FlagImage code={active.flag} name={active.name} />
        <span className="uppercase tracking-wide">{active.label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            isDark ? "text-white/80" : "text-text-gray",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Select language"
          className={cn(
            "absolute right-0 top-[calc(100%+6px)] z-50 min-w-[10rem] overflow-hidden rounded-xl border p-1 shadow-lg",
            isDark
              ? "border-white/15 bg-primary-dark text-white"
              : "border-gray-200 bg-white text-primary-dark"
          )}
        >
          {LOCALES.map((item) => {
            const selected = item.id === locale;
            return (
              <li key={item.id} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-body text-sm transition-colors",
                    selected
                      ? isDark
                        ? "bg-white/15 font-semibold"
                        : "bg-bg-light font-semibold text-primary"
                      : isDark
                        ? "hover:bg-white/10"
                        : "hover:bg-bg-light"
                  )}
                >
                  <FlagImage code={item.flag} name={item.name} size="sm" />
                  <span className="uppercase tracking-wide">{item.label}</span>
                  <span
                    className={cn(
                      "ml-auto text-xs font-normal normal-case",
                      isDark ? "text-white/60" : "text-text-gray"
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
